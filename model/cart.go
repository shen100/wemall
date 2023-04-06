package model

import "time"

// Cart 购物车
type Cart struct {
	ID        uint       `gorm:"primary_key" json:"id"`
	OpenID    string     `json:"openId"`
	ProductID uint       `json:"productId"`
	Count     int        `json:"count"`
	CreatedAt time.Time  `json:"createdAt"`
	UpdatedAt time.Time  `json:"updatedAt"`
	DeletedAt *time.Time `sql:"index" json:"deletedAt"`
}
