'use strict';

const User     = require( '../../../model/User');
const DateUtil = require( '../../../utils/DateUtil');

async function action(req, res) {
    try {
        let results = await Promise.all([
            User.getTodayNewUser(),
            User.getYesterdayNewUser(),
            User.getPurchaseUserByDate(DateUtil.getTodayYMD()),
            User.getPurchaseUserByDate(DateUtil.getYesterdayYMD())
        ]);

        let todayNewUser          = results[0]; //今日注册的用户数
        let yesterdayNewUser      = results[1]; //昨日注册的用户数
        let todayPurchaseUser     = results[2]; //今日有消费形为的用户数
        let yesterdayPurchaseUser = results[3]; //昨日有消费形为的用户数
        res.locals.data = {
            todayNewUser         : todayNewUser,
            yesterdayNewUser     : yesterdayNewUser,
            todayPurchaseUser    : todayPurchaseUser,
            yesterdayPurchaseUser: yesterdayPurchaseUser
        };
        res.render('admin/overview/userAnalyze');
    } catch(err) {
        console.log(err);
    }
};

module.exports = action;

