package config

import (
	"strings"
	"encoding/json"
    "fmt"
    "io/ioutil"
	"../utils"
)

var jsonData map[string]interface{}

func initJSON() {
    bytes, err := ioutil.ReadFile("./appconfig.json")
    if err != nil {
        fmt.Println("ReadFile: ", err.Error())
    }
    if err := json.Unmarshal(bytes, &jsonData); err != nil {
        fmt.Println("invalid config: ", err.Error())
    }
}

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
var DBConfig dBConfig

func initDB() {
	utils.SetStructByJSON(&DBConfig, jsonData["database"].(map[string]interface{}))
	url := "{user}:{password}@/{database}?charset={charset}&parseTime=True&loc=Local"
	url  = strings.Replace(url, "{database}", DBConfig.Database, -1)
	url  = strings.Replace(url, "{user}",     DBConfig.User,     -1)
	url  = strings.Replace(url, "{password}", DBConfig.Password, -1)
	url  = strings.Replace(url, "{charset}",  DBConfig.Charset,  -1)
	DBConfig.URL = url
}

type pageConfig struct {
	Title         string `json:"title"`
	SitePath      string `json:"sitePath"`
	JSPath        string `json:"jsPath"`
	ImagePath     string `json:"imagePath"`
	CSSPath       string `json:"cssPath"`
}

// PageConfig 页面相关配置
var PageConfig pageConfig

func initPage() {
	utils.SetStructByJSON(&PageConfig, jsonData["page"].(map[string]interface{}))
	PageConfig.JSPath    = PageConfig.SitePath + PageConfig.JSPath
	PageConfig.ImagePath = PageConfig.SitePath + PageConfig.ImagePath
	PageConfig.CSSPath   = PageConfig.SitePath + PageConfig.CSSPath
}

type serverConfig struct {
	Debug               bool
	URL                 string
	Port                int
	StaticPort          int
	MaxOrder            int
	MinOrder            int
	PageSize            int
	MaxPageSize         int
	MinPageSize         int
	MaxNameLen          int
	MaxRemarkLen        int
	MaxContentLen       int
	MaxProductCateCount int
}

// ServerConfig 服务器相关配置
var ServerConfig serverConfig

func initServer() {
	utils.SetStructByJSON(&ServerConfig, jsonData["server"].(map[string]interface{}))
}

type softwareConfig struct {
	Name                string `json:"name"`
	Version             string `json:"version"`
	OfficialURL         string `json:"officialURL"`
}

// SoftwareConfig 软件相关配置
var SoftwareConfig softwareConfig

func initSoftware() {
	utils.SetStructByJSON(&SoftwareConfig, jsonData["software"].(map[string]interface{}))
}

func init() {
	initJSON()
	initDB()
	initPage()
	initServer()
	initSoftware()	
}