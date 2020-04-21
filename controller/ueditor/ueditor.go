package ueditor

import (
	"fmt"
	"io"
	"mime"
	"os"
	"time"
	"strconv"
	"strings"
	"github.com/kataras/iris/v12"
	"github.com/satori/go.uuid"
	"config"
	"utils"
)

func upload(ctx *iris.Context) {
	errResData := iris.Map{
		"state"    : "FAIL", //上传状态，上传成功时必须返回"SUCCESS"
		"url"      : "",     //返回的地址
		"title"    : "",     //新文件名
		"original" : "",     //原始文件名
		"type"     : "",     //文件类型
		"size"     : "",     //文件大小
	}

	file, info, err := ctx.FormFile("upFile")
	if err != nil {
		ctx.JSON(iris.StatusInternalServerError, errResData)
		return
	}

	var filename = info.Filename
	var index    = strings.LastIndex(filename, ".")

	if index < 0 {
		errResData["state"] = "无效的文件名"
		ctx.JSON(iris.StatusInternalServerError, errResData)
		return
	}

	var ext      = filename[index:]
	var mimeType = mime.TypeByExtension(ext)

	if mimeType == "" {
		errResData["state"] = "无效的图片类型"
		ctx.JSON(iris.StatusInternalServerError, errResData)
		return
	}
	
	defer file.Close()

	now          := time.Now()
	year         := now.Year()
	month        := utils.StrToIntMonth(now.Month().String())
	date         := now.Day()

	var monthStr string
	var dateStr string
	if month < 9 {
		monthStr = "0" + strconv.Itoa(month + 1)
	} else {
		monthStr = strconv.Itoa(month + 1)
	}

	if date < 10 {
		dateStr = "0" + strconv.Itoa(date)
	} else {
		dateStr = strconv.Itoa(date)
	}

	sep := string(os.PathSeparator)

	timeDir := strconv.Itoa(year) + sep + monthStr + sep + dateStr

	title := uuid.NewV4().String() + ext

	uploadDir := config.ServerConfig.UploadImgDir + sep + timeDir
	mkErr := os.MkdirAll(uploadDir, 0777)
	
	if mkErr != nil {
		ctx.JSON(iris.StatusInternalServerError, errResData)
		return	
	}

	uploadFilePath := uploadDir + sep + title

	fmt.Println(uploadFilePath);

	out, err := os.OpenFile(uploadFilePath, os.O_WRONLY|os.O_CREATE, 0666)

	if err != nil {
		ctx.JSON(iris.StatusInternalServerError, errResData)
		return
	}

	defer out.Close()

	io.Copy(out, file)

	imgURL := config.ServerConfig.ImgPath + sep + timeDir + sep + title

	ctx.JSON(iris.StatusOK, iris.Map{
		"state"    : "SUCCESS",     //上传状态，上传成功时必须返回"SUCCESS"
		"url"      : imgURL,        //返回的地址
		"title"    : title,         //新文件名
		"original" : info.Filename, //原始文件名
		"type"     : mimeType,      //文件类型
		"size"     : "",            //文件大小
	})
	return	
}

// Handler UEditor 控制器
func Handler(ctx *iris.Context) {
	action := ctx.FormValue("action")
	switch action {
		case "config": {
			ctx.JSON(iris.StatusOK, UEditor)
			break
		}
		case "uploadImage": {
			upload(ctx)
			break
		}
	}
}