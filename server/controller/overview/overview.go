package overview

import (
	"time"
	"gopkg.in/kataras/iris.v6"
	"../../model"
)

// IndexByAdmin 后台管理首页
func IndexByAdmin(ctx *iris.Context) {
	var order model.Order
	now             := time.Now()
	todayOrderCount := order.CountByDate(now)
	todayTotalSale  := order.TotalSaleByDate(now)
	totalOrderCount := order.Total()
	totalSale       := order.TotalSale()

	ctx.Set("viewPath", "admin/index.hbs")
	ctx.Set("data", iris.Map{
		"todayOrderCount" : todayOrderCount,
		"todayTotalSale"  : todayTotalSale,
		"totalOrderCount" : totalOrderCount,
		"totalSale"       : totalSale,
	})
	ctx.Next()
}

