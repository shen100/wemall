package visit

import (
	"../../config"
	"../../model"
	"strconv"
	"time"
	"gopkg.in/kataras/iris.v6"
	"github.com/jinzhu/gorm"
)

// Latest30Day 近30天，每天的PV
func Latest30Day(ctx *iris.Context) {
	var userVisit model.UserVisit;
	result := userVisit.Latest30DayPV()
	var data iris.Map;
	if result == nil {
		data = iris.Map{
			"list": [0]int{},
		}
	} else {
		data = iris.Map{
			"list": result,
		}
	}
	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : data,
	})
}

// PV 增加一次页面访问
func PV(ctx *iris.Context) {
	var err error
	var msg = ""
	var userVisit model.UserVisit	
	userVisit.ClientID     = ctx.FormValue("clientId")
	userVisit.OSName       = ctx.FormValue("osName")
	userVisit.OSVersion    = ctx.FormValue("osVersion")
	userVisit.Language     = ctx.FormValue("language")
	userVisit.Country      = ctx.FormValue("country")
	userVisit.DeviceModel  = ctx.FormValue("deviceModel")
	userVisit.DeviceWidth, err = strconv.Atoi(ctx.FormValue("deviceWidth"))
	if err != nil {
		msg = "无效的deviceWidth"
	}
	userVisit.DeviceHeight, err = strconv.Atoi(ctx.FormValue("deviceHeight"))
	if err != nil {
		msg = "无效的deviceHeight"
	}
	userVisit.IP             = ctx.RemoteAddr()
	userVisit.VisitTime      = time.Now()
	userVisit.Referrer       = ctx.FormValue("referrer")
	userVisit.URL            = ctx.FormValue("url")
	userVisit.BrowserName    = ctx.FormValue("browserName")
	userVisit.BrowserVersion = ctx.FormValue("browserVersion")

	if userVisit.ClientID == "" {
		msg = "clientId不能为空"
	}
	if msg != "" {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : msg,
			"data"  : iris.Map{},
		})
		return
	}

	db, connErr := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)

	if connErr != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error",
			"data"  : iris.Map{},
		})
		return
	}

	defer db.Close()

	if err := db.Create(&userVisit).Error; err != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error.",
			"data"  : iris.Map{},
		})
		return	
	}

	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{},
	})
}
