package model

import "time"

// Product 商品
type Product struct {
    ID             uint               `gorm:"primary_key" json:"id"`
    CreatedAt      time.Time          `json:"createdAt"`
    UpdatedAt      time.Time          `json:"updatedAt"`
    DeletedAt      *time.Time         `sql:"index" json:"deletedAt"`
    Name           string             `json:"name"`
    BrowseCount    int                `json:"browseCount"`
    BuyCount       int                `json:"buyCount"`
    TotalSale      float64            `json:"totalSale"`
    Price          float64            `json:"price"`      
    OriginalPrice  float64            `json:"originalPrice"`
    Status         int                `json:"status"`
    ImageID        uint               `json:"imageID"`
    Image          Image              `json:"image"`
    ImageIDs       string             `json:"imageIDs"`
    Images         []Image            `json:"images"`
    HasProperty    bool               `json:"hasProperty"`
    Properties     []Property         `json:"properties"`
    Inventories    []Inventory        `json:"inventories"`
    TotalInventory uint               `json:"totalInventory"`
    Remark         string             `json:"remark"`
    Detail         string             `json:"detail"`
    Categories     []Category         `gorm:"many2many:product_category;ForeignKey:ID;AssociationForeignKey:ID" json:"categories"`
}

const (
    // ProductUpShelf 商品已上架
    ProductUpShelf   = 1

    // ProductDownShelf 商品已下架
    ProductDownShelf = 2

    // ProductPending 商品未上架
    ProductPending   = 3
)