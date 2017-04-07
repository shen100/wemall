package common

import (
	"../../config"
	"../../model"
	"gopkg.in/kataras/iris.v6"
	"fmt"
)

// RenderView 渲染视图
func RenderView(ctx *iris.Context) {
	data    := ctx.Get("data")
	if data == nil {
		data = iris.Map{};
	}
	binding := iris.Map{
		"title"          : config.PageConfig.Title,
		"jsPath"         : config.PageConfig.JSPath,
		"sitePath"       : config.PageConfig.SitePath,
		"imagePath"      : config.PageConfig.ImagePath,
		"cssPath"        : config.PageConfig.CSSPath,
		"data"           : data,
		"pageConfig"     : config.PageConfig,
		"softwareConfig" : config.SoftwareConfig,
	}

	var err error
	errNo := ctx.Get("errNo").(int)
	if errNo == model.ErrorCode.NotFound {
		err = ctx.RenderWithStatus(iris.StatusNotFound, "404.hbs", binding)
	} else if errNo == model.ErrorCode.ERROR {
		err = ctx.RenderWithStatus(iris.StatusInternalServerError, "500.hbs", binding)
	} else if errNo == model.ErrorCode.SUCCESS {
		viewPath := ctx.Get("viewPath").(string)
		err = ctx.RenderWithStatus(iris.StatusOK, viewPath, binding)
	}

	if err != nil && config.ServerConfig.Debug {
		fmt.Println(err)
	}
}