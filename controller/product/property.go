package product

import (
	"fmt"
	"strconv"
	"strings"
	"unicode/utf8"
	"wemall/model"
	"wemall/config"
	"gopkg.in/kataras/iris.v6"
)

// AddProperty 添加商品属性
func AddProperty(ctx *iris.Context) {
	var property model.Property

	if err := ctx.ReadJSON(&property); err != nil {
		fmt.Println(err.Error())
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "参数无效",
			"data"  : iris.Map{},
		})
		return
	}

	property.Name = strings.TrimSpace(property.Name)

	var isErr bool
	var errMsg = ""

	if property.ProductID <= 0 {
		isErr  = true
		errMsg = "无效的商品ID"
	} else if utf8.RuneCountInString(property.Name) > config.ServerConfig.MaxNameLen {
		isErr  = true
		errMsg = "属性名称不能超过" + strconv.Itoa(config.ServerConfig.MaxNameLen) + "个字符"	
	} else if utf8.RuneCountInString(property.Name) <= 0 {
		isErr  = true
		errMsg = "属性名称不能为空"
	}

	if isErr {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : errMsg,
			"data"  : iris.Map{},
		})
		return
	}

	var product model.Product

	if err := model.DB.First(&product, property.ProductID).Error; err != nil {
		fmt.Println(err.Error())
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.NotFound,
			"msg"   : "错误的商品id",
			"data"  : iris.Map{},
		})
		return
	}

	if err := model.DB.Create(&property).Error; err != nil {
		fmt.Println(err.Error())
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error",
			"data"  : iris.Map{},
		})
		return
	}

	property.PropertyValues = []model.PropertyValue{}
	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"property": property,
		},
	})
}

// AddPropertyValue 添加商品属性值
func AddPropertyValue(ctx *iris.Context) {
	var productID uint
	var propertyValue model.PropertyValue

	if err := ctx.ReadJSON(&propertyValue); err != nil {
		fmt.Println(err.Error());
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "参数无效",
			"data"  : iris.Map{},
		})
		return
	}

	productID = propertyValue.ProductID
	propertyValue.Name = strings.TrimSpace(propertyValue.Name)

	var isErr bool
	var errMsg = ""

	if productID <= 0 {
		isErr  = true
		errMsg = "无效的商品ID"
	} else if utf8.RuneCountInString(propertyValue.Name) > config.ServerConfig.MaxNameLen {
		isErr  = true
		errMsg = "名称不能超过" + strconv.Itoa(config.ServerConfig.MaxNameLen) + "个字符"	
	} else if utf8.RuneCountInString(propertyValue.Name) <= 0 {
		isErr  = true
		errMsg = "名称不能为空"
	}

	if isErr {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : errMsg,
			"data"  : iris.Map{},
		})
		return
	}

	var product model.Product

	if err := model.DB.First(&product, productID).Error; err != nil {
		fmt.Println(err.Error())
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.NotFound,
			"msg"   : "错误的商品id",
			"data"  : iris.Map{},
		})
		return
	}

	if err := model.DB.Model(&product).Related(&product.Properties).Error; err != nil {
		fmt.Println(err.Error())
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "error",
			"data"  : iris.Map{},
		})
		return
	}

	var properties = product.Properties
	var index = -1 //属性（新添加的属性值属于的属性）在属性数组中的索引
	for i := 0; i < len(properties); i++ {
		if properties[i].ID == propertyValue.PropertyID {
			index = i
			break;
		}
	}

	if index < 0 {
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "错误的propertyID",
			"data"  : iris.Map{},
		})
		return	
	}

	if err := model.DB.Create(&propertyValue).Error; err != nil {
		fmt.Println(err.Error())
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
			"propertyValue": propertyValue,
		},
	})
}