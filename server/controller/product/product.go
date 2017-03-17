package product

import (
	"../../config"
	"../../model"
	"strconv"
	"github.com/jinzhu/gorm"
	"gopkg.in/kataras/iris.v6"
)

// ListByAdmin 产品列表
func ListByAdmin(ctx *iris.Context) {
	var products []model.Product
	db, err := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)

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
	queryErr := db.Offset(offset).Limit(config.ServerConfig.PageSize).Find(&products).Error

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
