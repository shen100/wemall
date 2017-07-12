package product

import (
	"fmt"
	"strings"
	"strconv"
	"unicode/utf8"
	"wemall/model"
	"wemall/config"
	"gopkg.in/kataras/iris.v6"
)

func combinationPropValue(productID uint, properties []model.Property) []model.Inventory {
	var inventories []model.Inventory
	if len(properties) == 1 {
		for i := 0; i < len(properties[0].PropertyValues); i++ {
			var inventory = model.Inventory{
				ProductID      : productID,
				PropertyValues : []model.PropertyValue{
					 properties[0].PropertyValues[i],
				},
			}
			inventories = append(inventories, inventory)
		}	
	} else {
		theInventories := combinationPropValue(productID, properties[1:])
		property       := properties[0]
		for i := len(theInventories) - 1; i >= 0; i-- {
			for j := 0; j < len(property.PropertyValues); j++ {
				var inventory = model.Inventory{
					ProductID      : productID,
					PropertyValues : theInventories[i].PropertyValues,
				}
				inventory.PropertyValues = append(inventory.PropertyValues, property.PropertyValues[j])
				inventories = append(inventories, inventory)
			}
			theInventories = append(theInventories[:i], theInventories[i + 1:]...)
		}
	}
	return inventories
}

// test 添加商品属性值
func test(ctx *iris.Context) {
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
		fmt.Println(123, properties[i].ID, propertyValue.PropertyID)
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

	for i := 0; i < len(properties); i++ {
		property := properties[i]
		if err := model.DB.Model(&property).Related(&property.PropertyValues).Error; err != nil {
			fmt.Println(err.Error())
			ctx.JSON(iris.StatusOK, iris.Map{
				"errNo" : model.ErrorCode.ERROR,
				"msg"   : "error",
				"data"  : iris.Map{},
			})
			return
		}
		properties[i] = property
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

	var inventories []model.Inventory
	if len(properties) == 1 {
		var inventory = model.Inventory{
			ProductID      : productID,
			PropertyValues : append([]model.PropertyValue{}, propertyValue),
		}
		inventories = append(inventories, inventory)	
	} else if len(properties) >= 2 {
		properties  = append(properties[:index], properties[index + 1:]...)
		inventories = combinationPropValue(productID, properties)
		for i := 0; i < len(inventories); i++ {
			inventories[i].PropertyValues = append(inventories[i].PropertyValues, propertyValue)
		}
	}

	for i := 0; i < len(inventories); i++ {
		if err := model.DB.Create(&inventories[i]).Error; err != nil {
			fmt.Println(err.Error())
			ctx.JSON(iris.StatusOK, iris.Map{
				"errNo" : model.ErrorCode.ERROR,
				"msg"   : "error",
				"data"  : iris.Map{},
			})
			return
		}
	}
}