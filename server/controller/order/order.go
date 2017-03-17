package order

import (
	"../../model"
	"gopkg.in/kataras/iris.v6"
	"time"
)

// Latest30Day 近30天，每天的订单数
func Latest30Day(ctx *iris.Context) {
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
	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : data,
	})
}

// AmountLatest30Day 近30天，每天的销售额
func AmountLatest30Day(ctx *iris.Context) {
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
	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : data,
	})
}

// Analyze 订单分析
func Analyze(ctx *iris.Context) {
	now            := time.Now()
	nowSec         := now.Unix()
	yesterdaySec   := nowSec - 24 * 60 * 60
	yesterday      := time.Unix(yesterdaySec, 0)

	var order model.Order

	ctx.JSON(iris.StatusOK, iris.Map{
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