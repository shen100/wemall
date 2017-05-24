package route

import (
	"gopkg.in/kataras/iris.v6"
	"wemall/go/config"
	"wemall/go/controller/common"
	"wemall/go/controller/admin"
	"wemall/go/controller/category"
	"wemall/go/controller/product"
	"wemall/go/controller/order"
	"wemall/go/controller/user"
	"wemall/go/controller/visit"
	"wemall/go/controller/ueditor"
)

// Route 路由
func Route(app *iris.Framework) {
	apiPrefix   := config.APIConfig.Prefix

	router := app.Party(apiPrefix) 
	{
		router.Get("/categories",  category.List)
		router.Get("/visit",       visit.PV)
		router.Get("/ueditor",     ueditor.Handler)
		router.Post("/ueditor",    ueditor.Handler)
    }

	adminRouter := app.Party(apiPrefix + "/admin", admin.Authentication) 
	{
		adminRouter.Get("/categories",              category.AllList)
		adminRouter.Get("/category/:id",            category.Info)
		adminRouter.Post("/category/create",        category.Create)
		adminRouter.Post("/category/update",        category.Update)
		adminRouter.Post("/category/status/update", category.UpdateStatus)
		
		adminRouter.Get("/products",                product.List)
		adminRouter.Get("/product/:id",             product.Info)
		adminRouter.Post("/product/create",         product.Create)
		adminRouter.Post("/product/update",         product.Update)
		adminRouter.Post("/product/status/update",  product.UpdateStatus)

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

		adminRouter.Post("/upload",                 common.Upload)

		adminRouter.Get("/visit/pv/latest/30",      visit.Latest30Day)
    }
}