package common

import (
	"model"
	"github.com/kataras/iris/v12"
)

// SendErrJSON 有错误发生时，发送错误JSON
func SendErrJSON(msg string, ctx iris.Context) {
	_, _ = ctx.JSON(iris.Map{
		"errNo" : model.ErrorCode.ERROR,
		"msg"   : msg,
		"data"  : iris.Map{},
	})
}