package main

import (
	"./server/config"
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
		adminRouter.Get("/index",                   overview.IndexByAdmin)
		adminRouter.Get("/categories",              category.ListByAdmin)
		adminRouter.Get("/category/create",         category.CreateView)
		adminRouter.Post("/category/create",        category.Create)
		adminRouter.Get("/category/update/:id",     category.UpdateView)
		adminRouter.Post("/category/update/:id",    category.Update)
		adminRouter.Post("/category/status/update", category.OpenOrCloseStatus)
		adminRouter.Get("/products",                product.ListByAdmin)
		adminRouter.Get("/order/latest/30",         order.Latest30Day)
		adminRouter.Get("/order/amount/latest/30",  order.AmountLatest30Day)

		adminRouter.Get("/user/today",             user.TodayRegisterUser)
		adminRouter.Get("/user/yesterday",         user.YesterdayRegisterUser)
		adminRouter.Get("/user/latest/30",         user.Latest30Day)
		adminRouter.Get("/user/analyze",           user.Analyze)

		adminRouter.DoneFunc(common.RenderView)
    }

	app.Listen(":" + config.ServerConfig.Port)
}
