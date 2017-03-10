package config

import (
	"strings"
)

const DB_DIALECT  = "mysql"
const DB_DATABASE = "wemall"
const DB_USER     = "root"
const DB_PASSWORD = "test1234" 
const DB_CHARSET  = "utf8"
const DB_SQL_LOG  = true

var DB_URL string = "{user}:{password}@/{database}?charset={charset}&parseTime=True&loc=Local"

const SERVER_PORT = "8080"

func init() {
	DB_URL  = strings.Replace(DB_URL, "{database}", DB_DATABASE, -1)
	DB_URL  = strings.Replace(DB_URL, "{user}",     DB_USER,     -1)
	DB_URL  = strings.Replace(DB_URL, "{password}", DB_PASSWORD, -1)
	DB_URL  = strings.Replace(DB_URL, "{charset}",  DB_CHARSET,  -1)
}







