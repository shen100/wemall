package cart

import (
	"config"
	"controller/common"
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/sessions"
	"model"
)

var (
	cookieNameForSessionID = config.ServerConfig.SessionID
	sess                   = sessions.New(sessions.Config{Cookie: cookieNameForSessionID})
)

// Create 购物车中添加商品
func Create(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	var cart model.Cart

	if ctx.ReadJSON(&cart) != nil {
		SendErrJSON("参数错误", ctx)
		return
	}

	if cart.Count <= 0 {
		SendErrJSON("count不能小于0", ctx)
		return
	}

	var product model.Product
	if model.DB.First(&product, cart.ProductID).Error != nil {
		SendErrJSON("错误的商品id", ctx)
		return
	}

	session := sess.Start(ctx)
	openID := session.GetString("weAppOpenID")

	if openID == "" {
		SendErrJSON("登录超时", ctx)
		return
	}

	cart.OpenID = openID
	if model.DB.Create(&cart).Error != nil {
		SendErrJSON("error", ctx)
		return
	}
	_, _ = ctx.JSON(iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"id": cart.ID,
		},
	})
	return
}
