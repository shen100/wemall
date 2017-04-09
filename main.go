package main

import (
	"./go/config"
	"./go/model"
	"./go/controller/admin"
	"./go/controller/category"
	"./go/controller/product"
	"./go/controller/order"
	"./go/controller/user"
	"./go/controller/visit"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"gopkg.in/kataras/iris.v6"
	"gopkg.in/kataras/iris.v6/adaptors/httprouter"
	"strconv"
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

	apiPrefix   := config.APIConfig.Prefix

	router := app.Party(apiPrefix) 
	{
		router.Get("/visit",   visit.PV)
    }

	adminRouter := app.Party(apiPrefix + "/admin", admin.Authentication) 
	{
		adminRouter.Get("/categories",              category.List)
		adminRouter.Get("/category/:id",            category.Info)
		adminRouter.Post("/category/create",        category.Create)
		adminRouter.Post("/category/update/:id",    category.Update)
		adminRouter.Post("/category/status/update", category.UpdateStatus)
		
		adminRouter.Get("/products",                           product.List)
		adminRouter.Post("/product/create",                    product.Create)
		adminRouter.Get("/product/status/update/:id/:status",  product.UpdateStatus)

		adminRouter.Get("/order/analyze",           order.Analyze)
		adminRouter.Get("/order/todaycount",        order.TodayCount)
		adminRouter.Get("/order/totalcount",        order.TotalCount)
		adminRouter.Get("/order/todaysale",         order.TodaySale)
		adminRouter.Get("/order/totalsale",         order.TotalSale)
		adminRouter.Get("/order/latest/30",         order.Latest30Day)
		adminRouter.Get("/order/amount/latest/30",  order.AmountLatest30Day)

		adminRouter.Get("/user/today",              user.TodayRegisterUser)
		adminRouter.Get("/user/yesterday",          user.YesterdayRegisterUser)
		adminRouter.Get("/user/latest/30",          user.Latest30Day)
		adminRouter.Get("/user/analyze",            user.Analyze)

		adminRouter.Get("/visit/pv/latest/30",      visit.Latest30Day)
    }

	app.OnError(iris.StatusNotFound, func(ctx *iris.Context) {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.NotFound,
			"msg"   : "Not Found",
			"data"  : iris.Map{},
		})

	})

	app.OnError(500, func(ctx *iris.Context) {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error",
			"data"  : iris.Map{},
		})
	})

	app.Listen(":" + strconv.Itoa(config.ServerConfig.Port))
}
