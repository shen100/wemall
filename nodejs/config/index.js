var configData = require('../../configuration.json');

/*
 * nodejs和go都用同一个配置文件(即configuration.json)进行配置
 * go语言结构体的属性名首字母大写，外界才有访问权限, 相当于java中的public属性
 */
var config = {
	webPoweredBy : configData.webPoweredBy,
	env          : configData.nodejs.env,
	useProxy     : configData.nodejs.useProxy,
	port         : configData.nodejs.port,
	page: {
		title     : configData.nodejs.page.title,
		sitePath  : configData.nodejs.page.sitePath,
		jsPath    : configData.nodejs.page.jsPath,
		imagePath : configData.nodejs.page.imagePath,
		cssPath   : configData.nodejs.page.cssPath
	},
	software: {
		name        : configData.software.name,
		version     : configData.software.version,
		officialURL : configData.software.officialURL
	},
	api: {
		todayOrderCount : configData.api.todayOrderCount,
		todayOrderSale  : configData.api.todayOrderSale,
		totalOrderCount : configData.api.totalOrderCount,
		totalSale       : configData.api.totalSale
	},
	docs: {
		github: configData.docs.github
	}
};

(function() {
	var url = configData.api.serverApiURL + configData.api.apiPrefix;
	for (var key in config.api) {
		if (config.api.hasOwnProperty(key)) {
			config.api[key] = url + config.api[key];
		}
	}
}())
