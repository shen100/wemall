
process.env.NODE_ENV = 'development';

const Promise = require('bluebird');
const Order    = require('../server/model/Order');

Order.getOrderFor30d().then(function(data) {
	console.log('---------2');
	console.log(data.valueOf());
});