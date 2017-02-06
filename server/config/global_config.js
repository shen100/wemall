'use strict';

let host = 'local.zhifuted.com'; //本地开发环境
let url  = 'http://local.zhifuted.com';

if (process.env.NODE_ENV === 'test') {
	host = 'test.testin.cn'; //测试机环境
}

if (process.env.NODE_ENV === 'production') {
	host = 'www.zhifuted.com'; //线上
}

let config = {
	system: {
		poweredBy       : 'wemall',
		poweredByStatic : 'wemallServ',
		name        : '微信商城',
	    version     : '1.0.0',
	    latestVer   : '',
		officialUrl : 'https://www.thewemall.com'
	},
	frontend: {
		title      : 'wemall-微信商城',
		jsPath     : '/javascripts',
		cssPath    : '/styles',
		imagePath  : '/images',
		sitePath   : ''
	},
	db: {
		database : 'wmall',
		username : 'root',
		password : 'test1234',
		host     : '127.0.0.1',
		dialect  : 'mysql',
		charset  : 'utf8',
		debug    : process.env.NODE_ENV === 'development' ? true : false,
		poolMin  : 2,
		poolMax  : 10
	},
	server: {
		host       : host,
		url        : url,
		port       : 8000,
		staticPort : 8001
	}
};

module.exports = config;
