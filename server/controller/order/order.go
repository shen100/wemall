package order

import (
	"../../config"
	"../../model"
	"gopkg.in/kataras/iris.v6"
	"github.com/jinzhu/gorm"
	"time"
	"fmt"
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

// countByDate 指定日期的订单数
func countByDate(date time.Time) int {
	startTime    := date
	startSec     := startTime.Unix();
	tomorrowSec  := startSec + 24 * 60 * 60;
	tomorrowTime := time.Unix(tomorrowSec, 0)
	startYMD     := startTime.Format("2006-01-02")
	tomorrowYMD  := tomorrowTime.Format("2006-01-02")

	var count int
	db, err := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)
	if err != nil {
		return 0
	}
	err = db.Model(&model.Order{}).Where("created_at >= ? AND created_at < ?", 
		startYMD, tomorrowYMD).Count(&count).Error
	if err != nil {
		return 0
    }
	return count
}

// TotalSaleByDate 指定日期的销售额
func totalSaleByDate(date time.Time) float64 {
	startTime    := date
	startSec     := startTime.Unix();
	tomorrowSec  := startSec + 24 * 60 * 60;
	tomorrowTime := time.Unix(tomorrowSec, 0)
	startStr     := startTime.Format("2006-01-02")
	tomorrowStr  := tomorrowTime.Format("2006-01-02")

	db, err := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)

	if err != nil {
		return 0
	}

	result := new(struct{
		TotalPay float64 `gorm:"column:totalPay"` 
	})

	err = db.Table("orders").Select("sum(payment) as totalPay").Where("pay_at >= ? AND pay_at < ? AND status = ?",
		startStr, tomorrowStr, model.OrderStatusPaid).Scan(&result).Error

	if err != nil {
		return 0
	}
	return result.TotalPay
}

// Analyze 订单分析
func Analyze(ctx *iris.Context) {
	now            := time.Now()
	nowSec         := now.Unix()
	yesterdaySec   := nowSec - 24 * 60 * 60
	yesterday      := time.Unix(yesterdaySec, 0)

	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"todayOrderCount"     : countByDate(now),
			"yesterdayOrderCount" : countByDate(yesterday),
			"todayTotalSale"      : totalSaleByDate(now),
			"yesterdayTotalSale"  : totalSaleByDate(yesterday),
		},
	})
}