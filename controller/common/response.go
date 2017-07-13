package common

import (
	"wemall/model"
	"gopkg.in/kataras/iris.v6"
)

// SendErrJSON 有错误发生时，发送错误JSON
func SendErrJSON(msg string, ctx *iris.Context) {
	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.ERROR,
		"msg"   : msg,
		"data"  : iris.Map{},
	})
}