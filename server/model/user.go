package model

import (
	"strings"
	"time"
	"../config"
	"github.com/jinzhu/gorm"
)

// User 用户
type User struct {
    ID             uint       `gorm:"primary_key" json:"id"`
	CreatedAt      time.Time  `json:"createdAt"`
	UpdatedAt      time.Time  `json:"updatedAt"`
	DeletedAt      *time.Time `sql:"index" json:"deletedAt"`
    ContactID      string     `json:"contactId"`  //默认地址
    OpenID         string     `json:"openId"`
    Nickname       string     `json:"nickname"`
    Username       string     `json:"username"`
    Phone          string     `json:"phone"`      
    Password       string     `json:"password"`
    Token          string     `json:"token"`
    Sex            bool       `json:"sex"`
    Subscribe      bool       `json:"subscribe"`
	Status         int        `json:"status"`
	Lastip         string     `json:"lastip"`
}

// YesterdayRegisterUser 昨日注册的用户数
func (user User) YesterdayRegisterUser() int {
	now           := time.Now()
	today         := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, time.Local)
	todaySec      := today.Unix() //秒
	yesterdaySec  := todaySec - 24 * 60 * 60; //秒
	yesterdayTime := time.Unix(yesterdaySec, 0)
	todayYMD      := today.Format("2006-01-02")
	yesterdayYMD  := yesterdayTime.Format("2006-01-02")

	var count int
	db, err := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)
	if err != nil {
		return 0
	}

	err = db.Model(&User{}).Where("created_at >= ? AND created_at < ?", yesterdayYMD, todayYMD).Count(&count).Error
	if err != nil {
		return 0
    }
	return count
}

// TodayRegisterUser 今日注册的用户数
func (user User) TodayRegisterUser() int {
	now          := time.Now()
	today        := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, time.Local)
	todaySec     := today.Unix() //秒
	tomorrowSec  := todaySec + 24 * 60 * 60; //秒
	tomorrowTime := time.Unix(tomorrowSec, 0)
	todayYMD     := today.Format("2006-01-02")
	tomorrowYMD  := tomorrowTime.Format("2006-01-02")

	var count int
	db, err := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)
	if err != nil {
		return 0
	}

	err = db.Model(&User{}).Where("created_at >= ? AND created_at < ?", todayYMD, tomorrowYMD).Count(&count).Error
	if err != nil {
		return 0
    }
	return count
}

// PurchaseUserByDate 指定日期有消费形为的用户数
func (user User) PurchaseUserByDate(date time.Time) int {
	startTime := time.Date(date.Year(), date.Month(), date.Day(), 0, 0, 0, 0, time.Local)
	startSec  := startTime.Unix() //秒
	endSec    := startSec + 24 * 60 * 60;
	endTime   := time.Unix(endSec, 0)
	startYMD  := startTime.Format("2006-01-02")
	endYMD    := endTime.Format("2006-01-02")

	sqlArr := []string{
		"SELECT COUNT(DISTINCT user_id) as count, DATE_FORMAT(pay_at,'%Y-%m-%d') as payAt",
		"FROM orders",
		"WHERE pay_at >= ? and pay_at < ? and status = ?",
		"GROUP BY DATE_FORMAT(pay_at,'%Y-%m-%d');",
	};
	sql     := strings.Join(sqlArr, " ")
	db, err := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)

	if err != nil {
		return 0
	}

	result := new(struct{
		Count int
		PayAt string `gorm:"column:payAt"` 
	})
	err = db.Raw(sql, startYMD, endYMD, OrderStatusPaid).Scan(&result).Error
	if err != nil {
		return 0
	}
	return result.Count;
}

// UserPerDay 每天的用户数
type UserPerDay []struct {
	Count        int    `json:"count"`
	CreatedAt    string `gorm:"column:createdAt" json:"createdAt"` 
}

// Latest30Day 近30天，每天注册的新用户数
func (users UserPerDay) Latest30Day() (UserPerDay) {
	now          := time.Now()
	today        := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, time.Local)
	todaySec     := today.Unix() //秒
	before29     := todaySec - 29 * 24 * 60 * 60;
	before29Date := time.Unix(before29, 0)

	sqlData      := before29Date.Format("2006-01-02")
    sqlArr       := []string{
		"SELECT count(*) as count, DATE_FORMAT(created_at,'%Y-%m-%d') as createdAt",
		"FROM users",
		"WHERE created_at >= ?",
		"GROUP BY DATE_FORMAT(created_at,'%Y-%m-%d');",
	};

	sql     := strings.Join(sqlArr, " ")
	db, err := gorm.Open(config.DBConfig.Dialect, config.DBConfig.URL)
	if err != nil {
		return nil
	}

	var result UserPerDay
	err = db.Raw(sql, sqlData).Scan(&result).Error
	if err != nil {
		return nil
	}
	return result
}