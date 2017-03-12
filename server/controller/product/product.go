package product

import (
	"../../config"
	"../../model"
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
			"msg"   :   "无效的id或status",
			"data"  : iris.Map{},
		})
		return
	}

	defer db.Close()

	db.Find(&products)

	ctx.Set("viewPath", "admin/category/list.hbs")
	ctx.Set("data", iris.Map{
		"products": products,
	})
	ctx.Next()
}
