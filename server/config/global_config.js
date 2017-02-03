'use strict';

var host = 'local.zhifuted.com'; //本地开发环境

if (process.env.NODE_ENV === 'test') {
	host = 'test.testin.cn'; //测试机环境
}

if (process.env.NODE_ENV === 'production') {
	host = 'www.zhifuted.com'; //线上
}

var config = {
	'X-Powered-By': 'wemall',
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
		port       : 8000,
		staticPort : 8001
	}
};

module.exports = config;
