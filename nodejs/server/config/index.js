var configData = require('../../../configuration.json');

/*
 * nodejs和go都用同一个配置文件(即configuration.json)进行配置
 * go语言结构体的属性名首字母大写，外界才有访问权限, 相当于java中的public属性
 */
var config = {
	webPoweredBy : configData.webPoweredBy,
	env          : configData.nodejs.env,
	useProxy     : configData.nodejs.useProxy,
	proxyUri     : configData.nodejs.proxyUri,
	port         : configData.nodejs.port,
	staticPort   : configData.nodejs.staticPort,
	page: {
		title     : configData.nodejs.page.title,
		sitePath  : configData.nodejs.page.sitePath,
		jsPath    : configData.nodejs.page.jsPath,
		imagePath : configData.nodejs.page.imagePath,
		cssPath   : configData.nodejs.page.cssPath,
		apiPath   : configData.api.URL,
		UEDITOR_HOME_URL: '/ueditor/',
	},
	software: {
		name        : configData.software.name,
		version     : configData.software.version,
		officialURL : configData.software.officialURL
	},
	api: {
		todayOrderCount : "/admin/order/todaycount",
		todayOrderSale  : "/admin/order/todaysale",
		totalOrderCount : "/admin/order/totalcount",
		totalSale       : "/admin/order/totalsale"
	},
	docs: {
		github: configData.docs.github
	}
};

(function() {
	var url = configData.api.NodeURL;
	for (var key in config.api) {
		if (config.api.hasOwnProperty(key)) {
			config.api[key] = url + config.api[key];
		}
	}
}())

module.exports = config;
