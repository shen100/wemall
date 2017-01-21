'use strict';
const Promise = require('bluebird');
const Order   = require( '../../model/Order');
const wemall  = require( '../../model/wemall');

async function index(req, res) {
    var results = await Promise.all([
        Order.getTodayOrderCount(),
        Order.getTodayTotalSale(),
        Order.getTotalOrderCount(),
        Order.getTotalSale()
    ]);
    res.json({
        msg           : '222',
        errNo         : 0,
        data: {
            todayOrder  : results[0] || 0,
            todaySale   : results[1] || 0,
            totalOrder  : results[2] || 0,
            totalSale   : results[3] || 0,
            wemall      : wemall
        }
    });
};

module.exports = index;

