package model

import (
    "github.com/jinzhu/gorm"
    _ "github.com/jinzhu/gorm/dialects/mysql"
)

type Category struct {
    gorm.Model
    Name     string
    Order    int
    ParentID int   
    Status   int      
    Remark   string
}