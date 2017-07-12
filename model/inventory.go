package model

import "time"

// Inventory 商品库存
type Inventory struct {
    ID             uint            `gorm:"primary_key" json:"id"`
    CreatedAt      time.Time       `json:"createdAt"`
    UpdatedAt      time.Time       `json:"updatedAt"`
    DeletedAt      *time.Time      `sql:"index" json:"deletedAt"`
    ProductID      uint            `json:"productID"`
    Count          uint            `json:"count"`
    PropertyValues []PropertyValue `gorm:"many2many:inventory_property_value;ForeignKey:ID;AssociationForeignKey:ID" json:"propertyValues"`
}