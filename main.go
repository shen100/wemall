package main

import (
	"./server/config"
	"./server/controller/category"
	"./server/controller/product"
	"./server/controller/overview"

	"gopkg.in/kataras/iris.v6"
	"gopkg.in/kataras/iris.v6/adaptors/httprouter"
	"gopkg.in/kataras/iris.v6/adaptors/view"
	"fmt"
)

func main() {
	app := iris.New(iris.Configuration{
        Gzip    : true, 
        Charset : "UTF-8"
	})

    app.Adapt(iris.DevLogger())
	app.Adapt(httprouter.New())
	app.Adapt(view.Handlebars("./server/views", ".hbs").Reload(config.ServerConfig.Debug))

	admin := iris.Party("/admin", admin.Authentication) {
		app.Get("/admin/index",                   overview.IndexByAdmin)
		app.Get("/admin/categories",              category.ListByAdmin)
		app.Post("/admin/category/create",        category.Create)
		app.Post("/admin/category/status/update", category.OpenOrCloseStatus)
		app.Get("/admin/products",                product.ListByAdmin)
    }

	app.DoneFunc(func(ctx *iris.Context) {
		viewPath := ctx.Get("viewPath").(string)
		data     := ctx.Get("data")
		err := ctx.Render(viewPath, iris.Map{
			"title"     : config.PageConfig.Title,
			"jsPath"    : config.PageConfig.JSPath,
			"sitePath"  : config.PageConfig.SitePath,
			"imagePath" : config.PageConfig.ImagePath,
			"cssPath"   : config.PageConfig.CSSPath,
			"data"      : data,
		})
		if config.ServerConfig.Debug {
			fmt.Println(err)
		}
	})

	app.Listen(":" + config.ServerConfig.Port)
}
