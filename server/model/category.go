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

const CATEGORY_STATUS_OPEN  = 1
const CATEGORY_STATUS_CLOSE = 2