package product

import (
	"fmt"
	"github.com/kataras/iris/v12"
	"strconv"
	"strings"
	"unicode/utf8"
	"wemall/config"
	"wemall/controller/common"
	"wemall/model"
)

// AddProperty 添加商品属性
func AddProperty(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	var property model.Property

	if err := ctx.ReadJSON(&property); err != nil {
		fmt.Println(err.Error())
		SendErrJSON("参数无效", ctx)
		return
	}

	property.Name = strings.TrimSpace(property.Name)

	if property.ProductID <= 0 {
		SendErrJSON("无效的商品ID", ctx)
		return
	}

	if utf8.RuneCountInString(property.Name) > config.ServerConfig.MaxNameLen {
		errMsg := "属性名称不能超过" + strconv.Itoa(config.ServerConfig.MaxNameLen) + "个字符"
		SendErrJSON(errMsg, ctx)
		return
	}

	if utf8.RuneCountInString(property.Name) <= 0 {
		SendErrJSON("属性名称不能为空", ctx)
		return
	}

	var product model.Product

	if err := model.DB.First(&product, property.ProductID).Error; err != nil {
		fmt.Println(err.Error())
		SendErrJSON("错误的商品id", ctx)
		return
	}

	if err := model.DB.Create(&property).Error; err != nil {
		fmt.Println(err.Error())
		SendErrJSON("error", ctx)
		return
	}

	property.PropertyValues = []model.PropertyValue{}
	ctx.JSON(iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"property": property,
		},
	})
}

// AddPropertyValue 添加商品属性值
func AddPropertyValue(ctx iris.Context) {
	SendErrJSON := common.SendErrJSON
	var productID uint
	var propertyValue model.PropertyValue

	if err := ctx.ReadJSON(&propertyValue); err != nil {
		fmt.Println(err.Error())
		SendErrJSON("参数无效", ctx)
		return
	}

	productID = propertyValue.ProductID
	propertyValue.Name = strings.TrimSpace(propertyValue.Name)

	if productID <= 0 {
		SendErrJSON("无效的商品ID", ctx)
		return
	}

	if utf8.RuneCountInString(propertyValue.Name) > config.ServerConfig.MaxNameLen {
		errMsg := "名称不能超过" + strconv.Itoa(config.ServerConfig.MaxNameLen) + "个字符"
		SendErrJSON(errMsg, ctx)
		return
	}

	if utf8.RuneCountInString(propertyValue.Name) <= 0 {
		SendErrJSON("名称不能为空", ctx)
		return
	}

	var product model.Product

	if err := model.DB.First(&product, productID).Error; err != nil {
		fmt.Println(err.Error())
		SendErrJSON("错误的商品id", ctx)
		return
	}

	if err := model.DB.Model(&product).Related(&product.Properties).Error; err != nil {
		fmt.Println(err.Error())
		SendErrJSON("error", ctx)
		return
	}

	var properties = product.Properties

	for i := 0; i < len(properties); i++ {
		property := properties[i]
		if err := model.DB.Model(&property).Related(&property.PropertyValues).Error; err != nil {
			fmt.Println(err.Error())
			SendErrJSON("error", ctx)
			return
		}
		properties[i] = property
		if property.ID == propertyValue.PropertyID {
			for j := 0; j < len(property.PropertyValues); j++ {
				if property.PropertyValues[j].Name == propertyValue.Name {
					SendErrJSON(propertyValue.Name+"已存在", ctx)
					return
				}
			}
		}
	}

	for i := len(properties) - 1; i >= 0; i-- {
		if properties[i].ID != propertyValue.PropertyID && len(properties[i].PropertyValues) == 0 {
			properties = append(properties[:i], properties[i+1:]...)
		}
	}

	var index = -1
	for i := 0; i < len(properties); i++ {
		if properties[i].ID == propertyValue.PropertyID {
			index = i
			break
		}
	}

	if index < 0 {
		SendErrJSON("错误的propertyID", ctx)
		return
	}

	tx := model.DB.Begin()

	if err := tx.Create(&propertyValue).Error; err != nil {
		tx.Rollback()
		fmt.Println(err.Error())
		SendErrJSON("error", ctx)
		return
	}

	var firstPropertyValue bool
	if len(properties[index].PropertyValues) == 0 {
		firstPropertyValue = true
	}
	properties[index].PropertyValues = append(properties[index].PropertyValues, propertyValue)

	var inventories []model.Inventory
	var removed bool
	if len(properties) == 1 {
		var inventory = model.Inventory{
			ProductID:      productID,
			PropertyValues: append([]model.PropertyValue{}, propertyValue),
		}
		inventories = append(inventories, inventory)
	} else if len(properties) >= 2 {
		if firstPropertyValue {
			if err := tx.Model(&product).Related(&product.Inventories).Error; err != nil {
				tx.Rollback()
				fmt.Println(err.Error())
				SendErrJSON("error", ctx)
				return
			}
			for i := 0; i < len(product.Inventories); i++ {
				if err := tx.Model(&product.Inventories[i]).Related(&product.Inventories[i].PropertyValues, "property_values").Error; err != nil {
					tx.Rollback()
					fmt.Println(err.Error())
					SendErrJSON("error", ctx)
					return
				}
				product.Inventories[i].PropertyValues = append(product.Inventories[i].PropertyValues, propertyValue)
			}
			removed = true
		} else {
			properties = append(properties[:index], properties[index+1:]...)
			inventories = combinationInventory(productID, properties)
			for i := 0; i < len(inventories); i++ {
				inventories[i].PropertyValues = append(inventories[i].PropertyValues, propertyValue)
			}
		}
	}

	if removed {
		inventories = product.Inventories
	}

	for i := 0; i < len(inventories); i++ {
		var err error
		if removed {
			err = tx.Save(&inventories[i]).Error
		} else {
			err = tx.Create(&inventories[i]).Error
		}
		if err != nil {
			tx.Rollback()
			fmt.Println(err.Error())
			SendErrJSON("error", ctx)
			return
		}
	}
	tx.Commit()

	ctx.JSON(iris.Map{
		"errNo": model.ErrorCode.SUCCESS,
		"msg":   "success",
		"data": iris.Map{
			"propertyValue": propertyValue,
			"inventories":   inventories,
			"removed":       removed,
		},
	})
}
