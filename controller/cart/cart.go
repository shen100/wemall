package cart

import (
	"gopkg.in/kataras/iris.v6"
	"wemall/model"
)

// Create 购物车中添加商品
func Create(ctx *iris.Context) {
	var isErr  = false
	var errMsg = ""
	var cart model.Cart

	if ctx.ReadJSON(&cart) != nil {
		isErr  = true
		errMsg = "参数错误"
	}

	if cart.Count <= 0 {
		isErr  = true
		errMsg = "count不能小于0"
	}

	var product model.Product
	if model.DB.First(&product, cart.ProductID).Error != nil {
		isErr  = true
		errMsg = "错误的商品id"
	}

	session := ctx.Session()
	openID  := session.GetString("weAppOpenID")

	if openID == "" {
		isErr  = true
		errMsg = "登录超时"
	}

	if isErr {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : errMsg,
			"data"  : iris.Map{},
		})
		return
	}

	cart.OpenID = openID
	if model.DB.Create(&cart).Error != nil {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error",
			"data"  : iris.Map{},
		})
		return
	}
	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"id": cart.ID,
		},
	})
	return
}

