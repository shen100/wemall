package model

import (
	"strings"
	"time"
	"../config"
	"github.com/jinzhu/gorm"
)

// Order 订单
type Order struct {
    ID             uint       `gorm:"primary_key" json:"id"`
	CreatedAt      time.Time  `json:"createdAt"`
	UpdatedAt      time.Time  `json:"updatedAt"`
	DeletedAt      *time.Time `sql:"index" json:"deletedAt"`
    UserID         uint       `json:"userId"`
    TotalPrice     float64    `json:"totalPrice"`
    Payment        float64    `json:"payment"`
    Freight        float64    `json:"freight"`
    Remark         string     `json:"remark"`      
    Discount       int        `json:"discount"`
    DeliverStart   time.Time  `json:"deliverStart"`
    DeliverEnd     time.Time  `json:"deliverEnd"`
    Status         int        `json:"status"`
	PayAt          time.Time  `json:"payAt"`
}

// OrderStatusPending 未支付
const OrderStatusPending  = 0

// OrderStatusPaid 已支付
const OrderStatusPaid = 1


// OrderPerDay 每天的订单数
type OrderPerDay []struct {
	Count        int    `json:"count"`
	CreatedAt    string `gorm:"column:createdAt" json:"createdAt"` 
}

// Latest30Day 近30天，每天的订单数
func (orders OrderPerDay) Latest30Day() (OrderPerDay) {
    now          := time.Now()
	year         := now.Year()
	month        := now.Month()
	date         := now.Day()
	today        := time.Date(year, month, date, 0, 0, 0, 0, time.Local)

	before29     := today.Unix() - 29 * 24 * 60 * 60; //29天前（秒）
	before29Date := time.Unix(before29, 0)

	sqlData      := before29Date.Format("2006-01-02")
	sqlArr       := []string{
		"SELECT count(id) as count, DATE_FORMAT(created_at,'%Y-%m-%d') as createdAt",
		"FROM `orders`",
		"WHERE created_at > ?",
		"GROUP BY DATE_FORMAT(created_at,'%Y-%m-%d');",
	}
	sql     := strings.Join(sqlArr, " ")
	db, err := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)
	if err != nil {
		return nil
	}

	var result OrderPerDay
	err = db.Raw(sql, sqlData).Scan(&result).Error
	if err != nil {
		return nil
	}
	return result
}


// AmountPerDay 每天的销售额
type AmountPerDay []struct {
	Amount   float64 `json:"amount"`
	PayAt    string  `gorm:"column:payAt" json:"payAt"` 
}

// AmountLatest30Day 近30天，每天的销售额
func (amount AmountPerDay) AmountLatest30Day() (AmountPerDay) {
	now          := time.Now()
	year         := now.Year()
	month        := now.Month()
	date         := now.Day()
	today        := time.Date(year, month, date, 0, 0, 0, 0, time.Local)

	before29     := today.Unix() - 29 * 24 * 60 * 60; //29天前（秒）
	before29Date := time.Unix(before29, 0)

	sqlData      := before29Date.Format("2006-01-02")
	sqlArr       := []string{
		"SELECT sum(payment) as amount, DATE_FORMAT(pay_at,'%Y-%m-%d') as payAt",
		"FROM `orders`",
		"WHERE pay_at > ? and status = ?",
		"GROUP BY DATE_FORMAT(pay_at,'%Y-%m-%d');",
	};

	sql     := strings.Join(sqlArr, " ")
	db, err := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)
	if err != nil {
		return nil
	}

	var result AmountPerDay
	err = db.Raw(sql, sqlData, OrderStatusPaid).Scan(&result).Error
	if err != nil {
		return nil
	}
	return result
}