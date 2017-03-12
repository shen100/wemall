package model

import (
    "github.com/jinzhu/gorm"
)

// Category 商品分类
type Category struct {
    gorm.Model
    Name     string `json:"name"`
    Order    int    `json:"order"`
    ParentID int    `json:"parentId"`
    Status   int    `json:"status"`     
    Remark   string `json:"remark"`
}

// 开启
const CategoryStatusOpen  = 1

// 关闭
const CategoryStatusClose = 2