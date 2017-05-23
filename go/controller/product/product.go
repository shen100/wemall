package product

import (
	"fmt"
	"strconv"
	"strings"
	"time"
	"unicode/utf8"
	"encoding/json"
	"github.com/jinzhu/gorm"
	"gopkg.in/kataras/iris.v6"
	"wemall/go/config"
	"wemall/go/model"
)

// List 产品列表
func List(ctx *iris.Context) {
	var products []model.Product
	db, err := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)

	if config.DBConfig.SQLLog {
		db.LogMode(true)
	}

	if err != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error",
			"data"  : iris.Map{},
		})
		return
	}

	defer db.Close()

	pageNo, err := strconv.Atoi(ctx.FormValue("pageNo"))
 
	if err != nil || pageNo < 1 {
		pageNo = 1
	}

	offset   := (pageNo - 1) * config.ServerConfig.PageSize

	//默认按创建时间，降序来排序
	var orderStr = "created_at"
	if ctx.FormValue("order") == "1" {
		orderStr = "total_sale"
	} else if ctx.FormValue("order") == "2" {
		orderStr = "created_at"
	}
	if ctx.FormValue("asc") == "1" {
		orderStr += " asc"
	} else {
		orderStr += " desc"	
	}
	queryErr := db.Offset(offset).Limit(config.ServerConfig.PageSize).Order(orderStr).Find(&products).Error

	if queryErr != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error.",
			"data"  : iris.Map{},
		})
		return
	}

	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"products": products,
		},
	})
}

func save(ctx *iris.Context, isEdit bool) {
	var product model.Product

	if err := ctx.ReadJSON(&product); err != nil {
		fmt.Println(err.Error());
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "参数无效",
			"data"  : iris.Map{},
		})
		return
	}

	db, connErr := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)

	if connErr != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error",
			"data"  : iris.Map{},
		})
		return
	}

	defer db.Close()

	if config.DBConfig.SQLLog {
		db.LogMode(true)
	}

	var queryProduct model.Product
	if isEdit {
		if db.First(&queryProduct, product.ID).Error != nil {
			ctx.JSON(iris.StatusOK, iris.Map{
				"errNo" : model.ErrorCode.ERROR,
				"msg"   : "无效的产品ID",
				"data"  : iris.Map{},
			})
			return
		}
	}

	var isError bool
	var msg = ""

	if isEdit {
		product.BrowseCount  = queryProduct.BrowseCount
		product.BuyCount     = queryProduct.BuyCount
		product.TotalSale    = queryProduct.TotalSale
		product.CreatedAt    = queryProduct.CreatedAt
		product.UpdatedAt    = time.Now()
	} else {
		product.BrowseCount = 0
		product.BuyCount    = 0
		product.TotalSale   = 0
		product.Status      = model.ProductPending
	}

	product.Name   = strings.TrimSpace(product.Name)
	product.Detail = strings.TrimSpace(product.Detail)
	product.Remark = strings.TrimSpace(product.Remark)

	if (product.Name == "") {
		isError = true
		msg     = "商品名称不能为空"
	} else if utf8.RuneCountInString(product.Name) > config.ServerConfig.MaxNameLen {
		isError = true
		msg     = "商品名称不能超过" + strconv.Itoa(config.ServerConfig.MaxNameLen) + "个字符"
	} else if isEdit && product.Status != model.ProductUpShelf && product.Status != model.ProductDownShelf && product.Status != model.ProductPending {
		isError = true
		msg     = "status无效"
	} else if product.ImageID <= 0 {
		isError = true
		msg     = "封面图片不能为空"
	} else if product.Remark != "" && utf8.RuneCountInString(product.Remark) > config.ServerConfig.MaxRemarkLen {
		isError = true
		msg     = "备注不能超过" + strconv.Itoa(config.ServerConfig.MaxRemarkLen) + "个字符"	
	} else if product.Detail == "" || utf8.RuneCountInString(product.Detail) <= 0 {
		isError = true	
		msg     = "商品详情不能为空"
	} else if utf8.RuneCountInString(product.Detail) > config.ServerConfig.MaxContentLen {
		isError = true	
		msg     = "商品详情不能超过" + strconv.Itoa(config.ServerConfig.MaxContentLen) + "个字符"	
	} else if product.Categories == nil || len(product.Categories) <= 0  {
		isError = true	
		msg     = "至少要选择一个商品分类"
	} else if len(product.Categories) > config.ServerConfig.MaxProductCateCount {
		isError = true
		msg     = "最多只能选择" + strconv.Itoa(config.ServerConfig.MaxProductCateCount) + "个商品分类"
	} else if product.Price < 0 {
		isError = true	
		msg     = "无效的商品售价"
	} else if product.OriginalPrice < 0 {
		isError = true	
		msg     = "无效的商品原价"
	} else {
		var images []uint
		if err := json.Unmarshal([]byte(product.ImageIDs), &images); err != nil {
			isError = true
			msg     = "商品图片集无效"
    	} else if images == nil || len(images) <= 0 {
			isError = true
			msg     = "商品图片集不能为空"
		} else if len(images) > config.ServerConfig.MaxProductImgCount {
			isError = true
			msg     = "商品图片集个数不能超过" + strconv.Itoa(config.ServerConfig.MaxProductImgCount) + "个"
		}
	}

	if isError {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : msg,
			"data"  : iris.Map{},
		})
		return
	}

	for i := 0; i < len(product.Categories); i++ {
		var category model.Category
		queryErr := db.First(&category, product.Categories[i].ID).Error
		if queryErr != nil {
			ctx.JSON(iris.StatusOK, iris.Map{
				"errNo" : model.ErrorCode.ERROR,
				"msg"   : "无效的分类id",
				"data"  : iris.Map{},
			})
			return	
		}
		product.Categories[i] = category
	}

	var saveErr = false;

	if isEdit {
		var sql = "DELETE FROM product_category WHERE product_id = ?"
		if db.Exec(sql, product.ID).Error != nil {
			saveErr = true;
		}
		if db.Save(&product).Error != nil {
			saveErr = true;
		}
	} else {
		if db.Create(&product).Error != nil {
			saveErr = true;
		}
	}

	if saveErr {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error.",
			"data"  : iris.Map{},
		})
		return	
	}

	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : product,
	})
}

// Create 创建产品
func Create(ctx *iris.Context) {
	save(ctx, false);	
}

// Update 更新产品
func Update(ctx *iris.Context) {
	save(ctx, true);	
}

// Info 获取商品信息
func Info(ctx *iris.Context) {
	id, err := ctx.ParamInt("id")
	if err != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.NotFound,
			"msg"   : "错误的商品id",
			"data"  : iris.Map{},
		})
		return
	}

	db, err := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)

	if err != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error",
			"data"  : iris.Map{},
		})
		return
	}

	if config.DBConfig.SQLLog {
		db.LogMode(true)
	}

	defer db.Close()

	var product model.Product

	if db.First(&product, id).Error != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.NotFound,
			"msg"   : "错误的商品id",
			"data"  : iris.Map{},
		})
		return
	}

	if db.Model(&product).Related(&product.Categories, "categories").Error != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error.",
			"data"  : iris.Map{},
		})
		return
	}

	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"product": product,
		},
	})
}

// UpdateStatus 更新产品状态
func UpdateStatus(ctx *iris.Context) {
	var tmpProduct model.Product
	tmpErr    := ctx.ReadJSON(&tmpProduct)

	if tmpErr != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "无效的id或status",
			"data"  : iris.Map{},
		})
		return
	}

	productID := tmpProduct.ID
	status    := tmpProduct.Status
	errMsg    := ""

	db, connErr := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)

	if connErr != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error",
			"data"  : iris.Map{},
		})
		return
	}

	defer db.Close()

	var product model.Product
	if err := db.First(&product, productID).Error; err != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "无效的产品ID.",
			"data"  : iris.Map{},
		})
		return
	}
	
	if status != model.ProductDownShelf && status != model.ProductUpShelf {
		errMsg = "无效的产品状态."
	} else if status == model.ProductDownShelf && product.Status != model.ProductUpShelf {
		errMsg = "无效的产品状态."
	} else if status == model.ProductUpShelf && product.Status != model.ProductDownShelf && product.Status != model.ProductPending {
		errMsg = "无效的产品状态"
	}

	if (status == model.ProductDownShelf || status == model.ProductUpShelf) && status == product.Status {
		errMsg = ""
	}

	if errMsg != "" {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : errMsg,
			"data"  : iris.Map{},
		})
		return
	}

	product.Status = status

	if err := db.Save(&product).Error; err != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error.",
			"data"  : iris.Map{},
		})
	} else {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.SUCCESS,
			"msg"   : "success",
			"data"  : iris.Map{
				"id"     : product.ID,
				"status" : product.Status,
			},
		})	
	}
}
