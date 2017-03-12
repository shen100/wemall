package config

import (
	"strings"
)

type dBConfig struct {
	Dialect  string
	Database string
	User     string
	Password string
	Charset  string
	SQLLog   bool
	URL      string
}

// DBConfig 数据库相关配置
var DBConfig = dBConfig{
	Dialect	 : "mysql",
	Database : "wemall",
	User	 : "root",
	Password : "test1234",
	Charset	 : "utf8",
	SQLLog	 : true,
	URL      : "",
}

func init() {
	url := "{user}:{password}@/{database}?charset={charset}&parseTime=True&loc=Local"
	url  = strings.Replace(url, "{database}", DBConfig.Database, -1)
	url  = strings.Replace(url, "{user}",     DBConfig.User,     -1)
	url  = strings.Replace(url, "{password}", DBConfig.Password, -1)
	url  = strings.Replace(url, "{charset}",  DBConfig.Charset,  -1)	

	DBConfig.URL = url
}