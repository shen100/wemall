var fs   = require('fs');
var path = require('path');

var configData;

//只在程序启动时，读一次配置文件，此时可以使用同步的io操作
try {
	var configStr = fs.readFileSync(path.join(__dirname, '../../../configuration.json'), 'utf8');
	configStr     = configStr.replace(/\/\*.*\*\//g, '');
	configData    = JSON.parse(configStr);
} catch (err) {
	console.log(err);
	process.exit(0);
}

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
	uploadImgDir : configData.go.UploadImgDir, /*图片上传的目录*/
	page: {
		title      : configData.nodejs.page.title,
		sitePath   : configData.nodejs.page.sitePath,
		jsPath     : configData.nodejs.page.jsPath,
		imagePath  : configData.nodejs.page.imagePath,
		cssPath    : configData.nodejs.page.cssPath,
		ueditorURL : configData.nodejs.page.ueditorURL,
		imgPath    : configData.go.ImgPath, /*上传后的图片请求地址前缀*/
		apiPath    : configData.api.Prefix
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
	var url = configData.api.URL;
	for (var key in config.api) {
		if (config.api.hasOwnProperty(key)) {
			config.api[key] = url + config.api[key];
		}
	}
}())

module.exports = config;
