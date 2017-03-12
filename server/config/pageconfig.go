package config

type pageConfig struct {
	Title      string `json:"title"`
	SitePath   string `json:"sitePath"`
	JSPath     string `json:"jsPath"`
	ImagePath  string `json:"imagePath"`
	CSSPath    string `json:"cssPath"`
}

// PageConfig 页面相关配置
var PageConfig = pageConfig{
	Title     : "微信商城",
	SitePath  : "",
	JSPath    : "/javascripts",
	ImagePath : "/images",
	CSSPath   : "/styles",
}

func init() {
	PageConfig.JSPath    = PageConfig.SitePath + PageConfig.JSPath
	PageConfig.ImagePath = PageConfig.SitePath + PageConfig.ImagePath
	PageConfig.CSSPath   = PageConfig.SitePath + PageConfig.CSSPath
}