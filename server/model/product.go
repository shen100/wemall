package model

import (
    "github.com/jinzhu/gorm"
    _ "github.com/jinzhu/gorm/dialects/mysql"
)

type Product struct {
    gorm.Model
    Name            string
    BrowseCount     int
    BuyCount        int
    TotalSale       float64   
    Price           float64      
    OriginalPrice   float64
    Status          int
    Remark          string
    Detail          string
}