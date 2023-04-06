package model

import (
	"strings"
	"time"
)

// UserVisit 访客记录
type UserVisit struct {
	ID             uint      `gorm:"primary_key" json:"id"`
	URL            string    `json:"url"`
	Referrer       string    `json:"referrer"`
	ClientID       string    `json:"clientID"`
	UserID         uint      `json:"userID"`
	VisitTime      time.Time `json:"visitTime"`
	IP             string    `json:"ip"`
	DeviceWidth    int       `json:"deviceWidth"`
	DeviceHeight   int       `json:"deviceHeight"`
	BrowserName    string    `json:"browserName"`
	BrowserVersion string    `json:"browserVersion"`
	DeviceModel    string    `json:"deviceModel"`
	Country        string    `json:"country"`
	Language       string    `json:"language"`
	OSName         string    `json:"osName"`
	OSVersion      string    `json:"osVersion"`
}

// PVPerDay 每天的pv
type PVPerDay []struct {
	PV   int    `json:"pv"`
	Date string `gorm:"column:date" json:"date"`
}

// Latest30DayPV 近30天的PV
func (userVisit UserVisit) Latest30DayPV() PVPerDay {
	now := time.Now()
	today := time.Date(now.Year(), now.Month(), now.Day(), 0, 0, 0, 0, time.Local)
	todaySec := today.Unix() //秒
	before29 := todaySec - 29*24*60*60
	before29Date := time.Unix(before29, 0)

	sqlData := before29Date.Format("2006-01-02")
	sqlArr := []string{
		"SELECT count(*) as pv, DATE_FORMAT(visit_time,'%Y-%m-%d') as date",
		"FROM user_visits",
		"WHERE visit_time >= ?",
		"GROUP BY DATE_FORMAT(visit_time,'%Y-%m-%d');",
	}

	sql := strings.Join(sqlArr, " ")
	var result PVPerDay
	var err = DB.Raw(sql, sqlData).Scan(&result).Error
	if err != nil {
		return nil
	}
	return result
}
