package product

import (
	"fmt"
	"wemall/model"
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

// ResetInventory 复位库存
func ResetInventory(ctx *iris.Context) {
	var product model.Product

	if err := ctx.ReadJSON(&product); err != nil {
		fmt.Println(err.Error())
		ctx.JSON(iris.StatusOK, iris.Map{
			"errNo" : model.ErrorCode.ERROR,
			"msg"   : "参数无效",
			"data"  : iris.Map{},
		})
		return
	}

	if err := model.DB.First(&product, product.ID).Error; err != nil {
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
			"msg"   : "error.",
			"data"  : iris.Map{},
		})
		return
	}

	for i := 0; i < len(product.Properties); i++ {
		property := product.Properties[i]
		if err := model.DB.Model(&property).Related(&property.PropertyValues).Error; err != nil {
			fmt.Println(err.Error())
			ctx.JSON(iris.StatusOK, iris.Map{
				"errNo" : model.ErrorCode.ERROR,
				"msg"   : "error",
				"data"  : iris.Map{},
			})
			return
		}
		product.Properties[i] = property
	}

	properties  := product.Properties
	inventories := combinationPropValue(product.ID, properties)
	fmt.Println(inventories)
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

	ctx.JSON(iris.StatusOK, iris.Map{
		"errNo" : model.ErrorCode.SUCCESS,
		"msg"   : "success",
		"data"  : iris.Map{
			"inventories": inventories,
		},
	})
}