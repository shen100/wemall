'use strict';

let Order    = require( '../../model/Order');
let DateUtil = require( '../../utils/DateUtil');
let wemall   = require( '../../model/wemall');

async function action(req, res) {
    try {
        var results = await Promise.all([
            Order.getOrderCountByDate(DateUtil.getTodayYMD()),
            Order.getTotalSaleByDate(DateUtil.getTodayYMD()),
            Order.getTotalOrderCount(),
            Order.getTotalSale()
        ]);
        res.locals.data = {
            todayOrder  : results[0] || 0, //今日总的订单数
            todaySale   : results[1] || 0, //今日总的销售额
            totalOrder  : results[2] || 0, //总的订单数
            totalSale   : results[3] || 0, //总的销售额
            wemall      : wemall
        };
        res.render('admin/index');
    } catch (err) {
        console.log(err);
    }
};

module.exports = action;

