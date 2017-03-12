package config

type serverConfig struct {
	Debug        bool
	Port         string
	MaxOrder     int
	MinOrder     int
	PageSize     int
	MaxPageSize  int
	MinPageSize  int
	MaxNameLen   int
	MaxRemarkLen int
}

// ServerConfig 服务器相关配置
var ServerConfig = serverConfig{
	Debug        : true,
	Port         : "8010",
	MaxOrder     : 10000,
	MinOrder     : 0,
	PageSize     : 20,
	MaxPageSize  : 100,
	MinPageSize  : 20,
	MaxNameLen   : 100,
	MaxRemarkLen : 500,
}







