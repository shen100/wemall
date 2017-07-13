package product

import (
	"wemall/model"
)

func combinationInventory(productID uint, properties []model.Property) []model.Inventory {
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
		theInventories := combinationInventory(productID, properties[1:])
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