'use strict';

var host = 'local.zhifuted.com'; //本地开发环境

if (process.env.NODE_ENV === 'test') {
	host = 'test.testin.cn'; //测试机环境
}

if (process.env.NODE_ENV === 'production') {
	host = 'www.zhifuted.com'; //线上
}

var config = {
	db: {
		database : 'wmall',
		username : 'root',
		password : 'test1234',
		host     : '127.0.0.1',
		dialect  : 'mysql'
	},
	server: {
		host     : host,
		port     : 8000
	}
};

module.exports = config;
