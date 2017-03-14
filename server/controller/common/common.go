package common

import (
	"../../config"
	"../../model"
	"gopkg.in/kataras/iris.v6"
	"fmt"
)

// RenderView 渲染视图
func RenderView(ctx *iris.Context) {
	var viewPath string
	if ctx.Get("errNo") != nil {
		if ctx.Get("errNo").(int) == model.ErrorCode.NotFound {
			viewPath = "404.hbs"
		} else {
			viewPath = "error.hbs"
		}
		fmt.Println(ctx.Get("msg").(string))
	} else {
		viewPath = ctx.Get("viewPath").(string)
	}
	data := ctx.Get("data")
	err  := ctx.Render(viewPath, iris.Map{
		"title"     : config.PageConfig.Title,
		"jsPath"    : config.PageConfig.JSPath,
		"sitePath"  : config.PageConfig.SitePath,
		"imagePath" : config.PageConfig.ImagePath,
		"cssPath"   : config.PageConfig.CSSPath,
		"data"      : data,
	})
	if config.ServerConfig.Debug {
		fmt.Println(err)
	}
}