package order

import (
	"github.com/kataras/iris/v12"
	"time"
	"model"
)

// TodayCount 今日总订单数
func TodayCount(ctx iris.Context) {
	var order model.Order;
	now   := time.Now()
	count := order.CountByDate(now)

	_, _ = ctx.JSON(iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"count": count,
		},
	})
}

// TodaySale 今日总销售额
func TodaySale(ctx iris.Context) {
	var order model.Order;
	now   := time.Now()
	sale  := order.TotalSaleByDate(now)

	_, _ = ctx.JSON(iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"sale": sale,
		},
	})
}

// TotalCount 总订单数
func TotalCount(ctx iris.Context) {
	var order model.Order;
	total  := order.Total()

	_, _ = ctx.JSON(iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"count": total,
		},
	})
}

// TotalSale 总销售额
func TotalSale(ctx iris.Context) {
	var order model.Order;
	sale  := order.TotalSale()

	_, _ = ctx.JSON(iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"sale": sale,
		},
	})
}

// Latest30Day 近30天，每天的订单数
func Latest30Day(ctx iris.Context) {
	var orders model.OrderPerDay;
	result := orders.Latest30Day()
	var data iris.Map;
	if result == nil {
		data = iris.Map{
			"orders": [0]int{},
		}
	} else {
		data = iris.Map{
			"orders": result,
		}
	}
	_, _ = ctx.JSON(iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : data,
	})
}

// AmountLatest30Day 近30天，每天的销售额
func AmountLatest30Day(ctx iris.Context) {
	var amount model.AmountPerDay;
	result := amount.AmountLatest30Day()
	var data iris.Map;
	if result == nil {
		data = iris.Map{
			"amounts": [0]int{},
		}
	} else {
		data = iris.Map{
			"amounts": result,
		}
	}
	_, _ = ctx.JSON(iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : data,
	})
}

// Analyze 订单分析
func Analyze(ctx iris.Context) {
	now            := time.Now()
	nowSec         := now.Unix()
	yesterdaySec   := nowSec - 24 * 60 * 60
	yesterday      := time.Unix(yesterdaySec, 0)

	var order model.Order

	_, _ = ctx.JSON(iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"todayOrderCount"     : order.CountByDate(now),
			"yesterdayOrderCount" : order.CountByDate(yesterday),
			"todayTotalSale"      : order.TotalSaleByDate(now),
			"yesterdayTotalSale"  : order.TotalSaleByDate(yesterday),
		},
	})
}