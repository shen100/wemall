package product

import (
	"encoding/json"
	"fmt"
	"github.com/kataras/iris/v12"
	"strconv"
	"strings"
	"time"
	"unicode/utf8"
	"wemall/config"
	"wemall/controller/common"
	"wemall/model"
)

// List 商品列表
func List(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	var products []model.Product
	pageNo, err := strconv.Atoi(ctx.FormValue("pageNo"))

	if err != nil || pageNo < 1 {
		pageNo = 1
	}

	offset := (pageNo - 1) * config.ServerConfig.PageSize

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

	cateID, err := strconv.Atoi(ctx.FormValue("cateId"))

	if err != nil {
		fmt.Println(err.Error())
		SendErrJSON("分类ID不正确", ctx)
		return
	}

	var category model.Category

	if model.DB.First(&category, cateID).Error != nil {
		SendErrJSON("分类ID不正确", ctx)
		return
	}

	pageSize := config.ServerConfig.PageSize
	queryErr := model.DB.Offset(offset).Limit(pageSize).Order(orderStr).Find(&products).Error

	if queryErr != nil {
		SendErrJSON("error", ctx)
		return
	}

	for i := 0; i < len(products); i++ {
		err := model.DB.First(&products[i].Image, products[i].ImageID).Error
		if err != nil {
			fmt.Println(err.Error())
			SendErrJSON("error", ctx)
			return
		}
	}

	ctx.JSON(iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"products": products,
		},
	})
}

// AdminList 商品列表，后台管理提供的接口
func AdminList(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	var products []model.Product
	pageNo, err := strconv.Atoi(ctx.FormValue("pageNo"))

	if err != nil || pageNo < 1 {
		pageNo = 1
	}

	offset := (pageNo - 1) * config.ServerConfig.PageSize

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
	queryErr := model.DB.Offset(offset).Limit(config.ServerConfig.PageSize).Order(orderStr).Find(&products).Error

	if queryErr != nil {
		SendErrJSON("error.", ctx)
		return
	}

	ctx.JSON(iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"products": products,
		},
	})
}

func save(ctx iris.Context, isEdit bool) {
	SendErrJSON := common.SendErrJSON
	var product model.Product

	if err := ctx.ReadJSON(&product); err != nil {
		fmt.Println(err.Error())
		SendErrJSON("参数无效", ctx)
		return
	}

	var queryProduct model.Product
	if isEdit {
		if model.DB.First(&queryProduct, product.ID).Error != nil {
			SendErrJSON("无效的产品ID", ctx)
			return
		}
	}

	if isEdit {
		product.BrowseCount = queryProduct.BrowseCount
		product.BuyCount = queryProduct.BuyCount
		product.TotalSale = queryProduct.TotalSale
		product.CreatedAt = queryProduct.CreatedAt
		product.UpdatedAt = time.Now()
	} else {
		product.BrowseCount = 0
		product.BuyCount = 0
		product.TotalSale = 0
		if product.Status != model.ProductUpShelf && product.Status != model.ProductDownShelf && product.Status != model.ProductPending {
			product.Status = model.ProductPending
		}
	}

	product.Name = strings.TrimSpace(product.Name)
	product.Detail = strings.TrimSpace(product.Detail)
	product.Remark = strings.TrimSpace(product.Remark)

	if product.Name == "" {
		SendErrJSON("商品名称不能为空", ctx)
		return
	}

	if utf8.RuneCountInString(product.Name) > config.ServerConfig.MaxNameLen {
		msg := "商品名称不能超过" + strconv.Itoa(config.ServerConfig.MaxNameLen) + "个字符"
		SendErrJSON(msg, ctx)
		return
	}

	if isEdit && product.Status != model.ProductUpShelf && product.Status != model.ProductDownShelf && product.Status != model.ProductPending {
		SendErrJSON("status无效", ctx)
		return
	}

	if product.ImageID <= 0 {
		SendErrJSON("封面图片不能为空", ctx)
		return
	}

	if product.Remark != "" && utf8.RuneCountInString(product.Remark) > config.ServerConfig.MaxRemarkLen {
		msg := "备注不能超过" + strconv.Itoa(config.ServerConfig.MaxRemarkLen) + "个字符"
		SendErrJSON(msg, ctx)
		return
	}

	if product.Detail == "" || utf8.RuneCountInString(product.Detail) <= 0 {
		SendErrJSON("商品详情不能为空", ctx)
		return
	}

	if utf8.RuneCountInString(product.Detail) > config.ServerConfig.MaxContentLen {
		msg := "商品详情不能超过" + strconv.Itoa(config.ServerConfig.MaxContentLen) + "个字符"
		SendErrJSON(msg, ctx)
		return
	}

	if product.Categories == nil || len(product.Categories) <= 0 {
		SendErrJSON("至少要选择一个商品分类", ctx)
		return
	}

	if len(product.Categories) > config.ServerConfig.MaxProductCateCount {
		msg := "最多只能选择" + strconv.Itoa(config.ServerConfig.MaxProductCateCount) + "个商品分类"
		SendErrJSON(msg, ctx)
		return
	}

	if product.Price < 0 {
		SendErrJSON("无效的商品售价", ctx)
		return
	}

	if product.OriginalPrice < 0 {
		SendErrJSON("无效的商品原价", ctx)
		return
	}

	var images []uint
	if err := json.Unmarshal([]byte(product.ImageIDs), &images); err != nil {
		SendErrJSON("商品图片集无效", ctx)
		return
	}

	if images == nil || len(images) <= 0 {
		SendErrJSON("商品图片集不能为空", ctx)
		return
	}

	if len(images) > config.ServerConfig.MaxProductImgCount {
		msg := "商品图片集个数不能超过" + strconv.Itoa(config.ServerConfig.MaxProductImgCount) + "个"
		SendErrJSON(msg, ctx)
		return
	}

	for i := 0; i < len(product.Categories); i++ {
		var category model.Category
		queryErr := model.DB.First(&category, product.Categories[i].ID).Error
		if queryErr != nil {
			SendErrJSON("无效的分类id", ctx)
			return
		}
		product.Categories[i] = category
	}

	var saveErr = false

	if isEdit {
		var sql = "DELETE FROM product_category WHERE product_id = ?"
		if model.DB.Exec(sql, product.ID).Error != nil {
			saveErr = true
		}
		if model.DB.Save(&product).Error != nil {
			saveErr = true
		}
	} else {
		if model.DB.Create(&product).Error != nil {
			saveErr = true
		}
	}

	if saveErr {
		SendErrJSON("error.", ctx)
		return
	}

	ctx.JSON(iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data":  product,
	})
}

// Create 创建产品
func Create(ctx iris.Context) {
	save(ctx, false)
}

// Update 更新产品
func Update(ctx iris.Context) {
	save(ctx, true)
}

// Info 获取商品信息
func Info(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	reqStartTime := time.Now()
	id, err := ctx.URLParamInt("id")
	if err != nil {
		SendErrJSON("错误的商品id", ctx)
		return
	}

	var product model.Product

	if model.DB.First(&product, id).Error != nil {
		SendErrJSON("错误的商品id", ctx)
		return
	}

	if model.DB.First(&product.Image, product.ImageID).Error != nil {
		product.Image = model.Image{}
	}

	var imagesSQL []uint
	if err := json.Unmarshal([]byte(product.ImageIDs), &imagesSQL); err == nil {
		var images []model.Image
		if model.DB.Where("id in (?)", imagesSQL).Find(&images).Error != nil {
			product.Images = nil
		} else {
			product.Images = images
		}
	} else {
		product.Images = nil
	}

	if err := model.DB.Model(&product).Related(&product.Categories, "categories").Error; err != nil {
		fmt.Println(err.Error())
		SendErrJSON("error", ctx)
		return
	}

	if product.HasProperty {
		if err := model.DB.Model(&product).Related(&product.Properties).Error; err != nil {
			fmt.Println(err.Error())
			SendErrJSON("error", ctx)
			return
		}

		for i := 0; i < len(product.Properties); i++ {
			property := product.Properties[i]
			if err := model.DB.Model(&property).Related(&property.PropertyValues).Error; err != nil {
				fmt.Println(err.Error())
				SendErrJSON("error", ctx)
				return
			}
			product.Properties[i] = property
		}

		if err := model.DB.Model(&product).Related(&product.Inventories).Error; err != nil {
			fmt.Println(err.Error())
			SendErrJSON("error", ctx)
			return
		}

		for i := 0; i < len(product.Inventories); i++ {
			inventory := product.Inventories[i]
			if err := model.DB.Model(&inventory).Related(&inventory.PropertyValues, "property_values").Error; err != nil {
				fmt.Println(err.Error())
				SendErrJSON("error", ctx)
				return
			}
			product.Inventories[i] = inventory
		}
	}

	fmt.Println("duration: ", time.Now().Sub(reqStartTime).Seconds())
	ctx.JSON(iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"product": product,
		},
	})
}

// UpdateStatus 更新产品状态
func UpdateStatus(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	var tmpProduct model.Product
	tmpErr := ctx.ReadJSON(&tmpProduct)

	if tmpErr != nil {
		SendErrJSON("无效的id或status", ctx)
		return
	}

	productID := tmpProduct.ID
	status := tmpProduct.Status

	var product model.Product
	if err := model.DB.First(&product, productID).Error; err != nil {
		SendErrJSON("无效的产品ID.", ctx)
		return
	}

	if status != model.ProductDownShelf && status != model.ProductUpShelf && status != model.ProductPending {
		SendErrJSON("无效的产品状态", ctx)
		return
	}

	product.Status = status

	if err := model.DB.Save(&product).Error; err != nil {
		SendErrJSON("error.", ctx)
		return
	}

	ctx.JSON(iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"id":     product.ID,
			"status": product.Status,
		},
	})
}

// UpdateHasProperty 更新是否含有商品属性
func UpdateHasProperty(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	type Data struct {
		ProductID   uint `json:"productID"`
		HasProperty bool `json:"hasProperty"`
	}
	var data Data
	if err := ctx.ReadJSON(&data); err != nil {
		SendErrJSON("参数无效", ctx)
		return
	}

	var product model.Product
	if err := model.DB.First(&product, data.ProductID).Error; err != nil {
		fmt.Println(err.Error())
		SendErrJSON("错误的商品id", ctx)
		return
	}

	if (data.HasProperty && !product.HasProperty) || (!data.HasProperty && product.HasProperty) {
		tx := model.DB.Begin()
		var sql = "DELETE FROM properties WHERE product_id = ?"
		if err := tx.Exec(sql, product.ID).Error; err != nil {
			tx.Rollback()
			SendErrJSON("error", ctx)
			return
		}

		sql = "DELETE FROM inventories WHERE product_id = ?"
		if err := tx.Exec(sql, product.ID).Error; err != nil {
			tx.Rollback()
			SendErrJSON("error", ctx)
			return
		}

		product.HasProperty = data.HasProperty
		product.TotalInventory = 0
		if err := model.DB.Save(&product).Error; err != nil {
			tx.Rollback()
			SendErrJSON("error", ctx)
			return
		}
		tx.Commit()
	}

	ctx.JSON(iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data":  iris.Map{},
	})
}

// UpdateTotalInventory 更新商品总库存(没有商品属性时才会调此接口)
func UpdateTotalInventory(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	type Data struct {
		ProductID      uint `json:"productID"`
		TotalInventory uint `json:"totalInventory"`
	}
	var data Data
	if err := ctx.ReadJSON(&data); err != nil {
		SendErrJSON("参数无效", ctx)
		return
	}

	var product model.Product
	if err := model.DB.First(&product, data.ProductID).Error; err != nil {
		fmt.Println(err.Error())
		SendErrJSON("错误的商品id", ctx)
		return
	}

	if product.HasProperty {
		SendErrJSON("商品添加过属性", ctx)
		return
	}

	product.TotalInventory = data.TotalInventory

	if err := model.DB.Save(&product).Error; err != nil {
		SendErrJSON("error", ctx)
		return
	}

	ctx.JSON(iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data":  iris.Map{},
	})
}
