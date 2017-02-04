'use strict';

var host = 'local.zhifuted.com'; //本地开发环境
var url  = 'http://local.zhifuted.com';

if (process.env.NODE_ENV === 'test') {
	host = 'test.testin.cn'; //测试机环境
}

if (process.env.NODE_ENV === 'production') {
	host = 'www.zhifuted.com'; //线上
}

var config = {
	poweredBy       : 'wemall',
	poweredByStatic : 'wemallServ',
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
		dialect  : 'mysql'
	},
	server: {
		host       : host,
		url        : url,
		port       : 8000,
		staticPort : 8001
	}
};

module.exports = config;
