package category

import (
	"fmt"
	"strconv"
	"../../config"
	"../../model"
	"github.com/jinzhu/gorm"
	"gopkg.in/kataras/iris.v6"
)

// Create 创建分类
func Create(ctx *iris.Context) {
	// name, parentId, order, remark
	var category model.Category
	ctx.ReadJSON(&category)
	category.Status = model.CategoryStatusClose
	
	minOrder := config.ServerConfig.MinOrder
	maxOrder := config.ServerConfig.MaxOrder

	db, err := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)
	if err != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"data"  : iris.Map{},
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error",
		})
		return
	}

	defer db.Close()

	if category.Order < minOrder || category.Order > maxOrder {
		ctx.JSON(iris.StatusOK, iris.Map{
			"data"  : iris.Map{},
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "分类的排序要在 " + strconv.Itoa(minOrder) + "到" + strconv.Itoa(maxOrder) + " 之间",
		})
		return	
	}
	ctx.JSON(iris.StatusOK, category)
}

// ListByAdmin 分类列表
func ListByAdmin(ctx *iris.Context) {
	var categories []model.Category

	db, err := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)
	if err != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"data"  : iris.Map{},
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error",
		})
		return
	}

	defer db.Close()

	pageNo, err := strconv.Atoi(ctx.FormValue("pageNo"))
 
	if err != nil || pageNo < 1 {
		pageNo = 1
	}

	format := ctx.FormValue("format")

	offset := (pageNo - 1) * config.ServerConfig.PageSize
	db.Offset(offset).Limit(config.ServerConfig.PageSize).Find(&categories)

	if format == "json" {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.SUCCESS,
			"msg"   :   "success",
			"data"  : iris.Map{
				"categories": categories,
			},
		})
	} else {
		fmt.Println(1111)
		ctx.Set("viewPath", "admin/category/list.hbs")
		ctx.Set("data", iris.Map{
			"categories": categories,
		})
		ctx.Next()
	}
}

// OpenOrCloseStatus 开启或关闭分类
func OpenOrCloseStatus(ctx *iris.Context) {

	var category model.Category
	err    := ctx.ReadJSON(&category)
	id     := category.ID
	status := category.Status

	if err != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   :   "无效的id或status",
			"data"  : iris.Map{},
		})
		return
	}

	if status != model.CategoryStatusOpen && status != model.CategoryStatusClose {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   :   "无效的status!",
			"data"  : iris.Map{},
		})
		return
	}

	db, err := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)

	if err != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   :   "error",
			"data"  : iris.Map{},
		})
		return
	}

	var cate model.Category
	dbErr := db.First(&cate, id).Error

	if dbErr != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "无效的id!",
			"data"  : iris.Map{},
		})
		return
	}

	cate.Status = status

	saveErr := db.Save(&cate).Error
	if saveErr != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "分类状态更新失败",
			"data"  : iris.Map{},
		})
		return
	}
	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.ERROR,
		"msg"   : "success",
		"data"  : iris.Map{
			"id"     : id,
			"status" : status,
		},
	})
}
