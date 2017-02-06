'use strict';

let Order     = require( '../../../model/Order');
let DateUtil  = require( '../../../utils/DateUtil');

async function action(req, res) {
    try {
        let results = await Promise.all([
            Order.getOrderCountByDate(DateUtil.getTodayYMD()),
            Order.getOrderCountByDate(DateUtil.getYesterdayYMD()),
            Order.getTotalSaleByDate(DateUtil.getTodayYMD()),
            Order.getTotalSaleByDate(DateUtil.getYesterdayYMD())
        ]);

        let todayOrderCount     = results[0]; //今日订单数
        let yesterdayOrderCount = results[1]; //昨日订单数
        let todayTotalSale      = results[2]; //今日销售额
        let yesterdayTotalSale  = results[3]; //昨日销售额
        res.locals.data = {
            todayOrderCount     : todayOrderCount,
            yesterdayOrderCount : yesterdayOrderCount,
            todayTotalSale      : todayTotalSale,
            yesterdayTotalSale  : yesterdayTotalSale
        };
        res.render('admin/overview/userAnalyze');
    } catch(err) {
        console.log(err);
    }
};

module.exports = action;

