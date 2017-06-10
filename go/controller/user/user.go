package user

import (
	"fmt"
	"net/http"
	"strings"
	"encoding/json"
	"time"
	"gopkg.in/kataras/iris.v6"
	"wemall/go/config"
	"wemall/go/model"
	"wemall/go/utils"
)

// WeAppLogin 微信小程序登录
func WeAppLogin(ctx *iris.Context) {
	code := ctx.FormValue("code")
	if code == "" {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "code不能为空",
			"data"  : iris.Map{},
		})
		return
	}
	appID    := config.WeAppConfig.AppID
	secret   := config.WeAppConfig.Secret
	loginURL := config.WeAppConfig.LoginURL
	loginURL  = strings.Replace(loginURL, "{appid}",  appID,  -1)
	loginURL  = strings.Replace(loginURL, "{secret}", secret, -1)
	loginURL  = strings.Replace(loginURL, "{code}",   code,   -1)

	resp, err := http.Get(loginURL)
    if err != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error",
			"data"  : iris.Map{},
		})
		return
    }

    defer resp.Body.Close()

	isErr := false

	if resp.StatusCode != 200 {
		isErr = true
	}

	var data map[string]interface{}
	err = json.NewDecoder(resp.Body).Decode(&data)
	if err != nil {
		fmt.Println(err.Error())
		isErr = true
	}
	
	if _, ok := data["session_key"]; !ok {
		isErr = true
	}

	if isErr {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error",
			"data"  : iris.Map{},
		})
		return
	}

	var openID string
	var sessionKey string
	openID     = data["openid"].(string)
	sessionKey = data["session_key"].(string)
	session   := ctx.Session()
	session.Set("weAppOpenID",     openID)
	session.Set("weAppSessionKey", sessionKey)

	resData := iris.Map{}
	resData[config.ServerConfig.SessionID] = session.ID()
	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : resData,
	})
}

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

// Login 用户登录
func Login(ctx *iris.Context) {
	var user model.User
	session := ctx.Session()

	session.Get("user")

	if err := ctx.ReadJSON(&user); err != nil {
		fmt.Println(err.Error());
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "参数无效",
			"data"  : iris.Map{},
		})
		return
	}

	hash, pwdErr := utils.HashPassword(user.Password)

	if pwdErr != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.LoginError,
			"msg"   : "用户名或密码错误",
			"data"  : iris.Map{},
		})
	}

	var queryUser model.User

	err := model.DB.Model(&queryUser).Where("password = ?", user.Email).Error

	if err != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error",
			"data"  : iris.Map{},
		})
		return
	}

	if utils.CheckPasswordHash(queryUser.Password, hash) {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.SUCCESS,
			"msg"   : "success",
			"data"  : iris.Map{},
		})
	} else {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.LoginError,
			"msg"   : "用户名或密码错误",
			"data"  : iris.Map{},
		})
		return	
	}
}