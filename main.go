package main

import (
	"./server/config"
	"./server/model"
	"./server/controller/admin"
	"./server/controller/category"
	"./server/controller/common"
	"./server/controller/product"
	"./server/controller/order"
	"./server/controller/user"
	"./server/controller/overview"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"gopkg.in/kataras/iris.v6"
	"gopkg.in/kataras/iris.v6/adaptors/httprouter"
	"gopkg.in/kataras/iris.v6/adaptors/view"
)

func main() {
	app := iris.New(iris.Configuration{
        Gzip    : true, 
        Charset : "UTF-8",
	})

	if config.ServerConfig.Debug {
		app.Adapt(iris.DevLogger())
	}
	app.Adapt(httprouter.New())
	app.Adapt(view.Handlebars("./server/views", ".hbs").Reload(config.ServerConfig.Debug))

	adminRouter := app.Party("/admin", admin.Authentication) 
	{
		adminRouter.Get("/",                        overview.IndexByAdmin)
		adminRouter.Get("/categories",              category.List)
		adminRouter.Get("/category/:id",            category.Info)
		adminRouter.Post("/category/create",        category.Create)
		adminRouter.Post("/category/update/:id",    category.Update)
		adminRouter.Post("/category/status/update", category.UpdateStatus)
		
		adminRouter.Get("/products",                product.List)
		adminRouter.Post("/product/create",         product.Create)

		adminRouter.Get("/order/analyze",           order.Analyze)
		adminRouter.Get("/order/latest/30",         order.Latest30Day)
		adminRouter.Get("/order/amount/latest/30",  order.AmountLatest30Day)

		adminRouter.Get("/user/today",              user.TodayRegisterUser)
		adminRouter.Get("/user/yesterday",          user.YesterdayRegisterUser)
		adminRouter.Get("/user/latest/30",          user.Latest30Day)
		adminRouter.Get("/user/analyze",            user.Analyze)

		adminRouter.DoneFunc(common.RenderView)
    }

	app.OnError(iris.StatusNotFound, func(ctx *iris.Context) {
		ctx.Set("errNo", model.ErrorCode.NotFound)
		common.RenderView(ctx)
	})

	app.OnError(500, func(ctx *iris.Context) {
  		ctx.Set("errNo", model.ErrorCode.ERROR)
		common.RenderView(ctx)
	})

	app.Listen(":" + config.ServerConfig.Port)
}
