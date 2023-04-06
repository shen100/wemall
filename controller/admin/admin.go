package admin

import (
	"github.com/kataras/iris/v12"
)

// Authentication 授权
func Authentication(ctx iris.Context) {
	if true {
		ctx.Next()
	}
}
