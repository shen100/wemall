package model

import "time"

// Property 商品属性
type Property struct {
    ID             uint            `gorm:"primary_key" json:"id"`
    CreatedAt      time.Time       `json:"createdAt"`
    UpdatedAt      time.Time       `json:"updatedAt"`
    DeletedAt      *time.Time      `sql:"index" json:"deletedAt"`
    Name           string          `json:"name"`
    ProductID      uint            `json:"productID"`
    PropertyValues []PropertyValue `json:"values"`
}

// PropertyValue 商品属性值
type PropertyValue struct {
    ID             uint       `gorm:"primary_key" json:"id"`
    CreatedAt      time.Time  `json:"createdAt"`
    UpdatedAt      time.Time  `json:"updatedAt"`
    DeletedAt      *time.Time `sql:"index" json:"deletedAt"`
    Name           string     `json:"name"`
    Note           string     `json:"note"`
    ProductID      uint       `json:"productID"`
    PropertyID     uint       `json:"propertyID"`
}