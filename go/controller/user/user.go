package user

import (
	"time"
	"gopkg.in/kataras/iris.v6"
	"wemall/go/model"
)

// YesterdayRegisterUser 昨日注册的用户数
func YesterdayRegisterUser(ctx *iris.Context) {
	var user model.User;
	count := user.YesterdayRegisterUser()
	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"count": count,
		},
	})
}

// TodayRegisterUser 今日注册的用户数
func TodayRegisterUser(ctx *iris.Context) {
	var user model.User;
	count := user.TodayRegisterUser()
	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"count": count,
		},
	})
}

// Latest30Day 近30天，每天注册的新用户数
func Latest30Day(ctx *iris.Context) {
	var users model.UserPerDay;
	result := users.Latest30Day()
	var data iris.Map;
	if result == nil {
		data = iris.Map{
			"users": [0]int{},
		}
	} else {
		data = iris.Map{
			"users": result,
		}
	}
	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : data,
	})
}

// Analyze 用户分析
func Analyze(ctx *iris.Context) {
	var user model.User;
	now           := time.Now()
	nowSec        := now.Unix() //秒
	yesterdaySec  := nowSec - 24 * 60 * 60; //秒
	yesterday     := time.Unix(yesterdaySec, 0)

	yesterdayCount         := user.PurchaseUserByDate(yesterday)
	todayCount             := user.PurchaseUserByDate(now)
	yesterdayRegisterCount := user.YesterdayRegisterUser()
	todayRegisterCount     := user.TodayRegisterUser()
	data := iris.Map{
		"todayNewUser"          : todayRegisterCount,
        "yesterdayNewUser"      : yesterdayRegisterCount,
        "todayPurchaseUser"     : todayCount,
        "yesterdayPurchaseUser" : yesterdayCount,
	}

	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : data,
	})	
}