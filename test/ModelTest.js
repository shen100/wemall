'use strict';

process.env.NODE_ENV = 'development';

let Promise  = require('bluebird');
let Order    = require('../server/model/Order');
let DateUtil = require('../server/utils/DateUtil');

Order.getTotalSaleByDate(DateUtil.getTodayYMD()).then(function(data) {
	console.log('---------2');
	console.log(data);
});