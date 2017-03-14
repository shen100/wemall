package main

import (
	"./server/config"
	"./server/controller/admin"
	"./server/controller/category"
	"./server/controller/common"
	"./server/controller/product"
	"./server/controller/overview"

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
		adminRouter.Get("/category/edit/:id",       category.EditView)
		adminRouter.Post("/category/status/update", category.OpenOrCloseStatus)
		adminRouter.Get("/products",                product.ListByAdmin)
		adminRouter.DoneFunc(common.RenderView)
    }

	app.Listen(":" + config.ServerConfig.Port)
}
