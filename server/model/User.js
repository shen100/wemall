'use strict';

const bookshelf = require('./bookshelf');
const DateUtil  = require('../utils/DateUtil');

const User = bookshelf.Model.extend({
    tableName: 'user',
    // orders: function() {
    //     return this.hasMany(Order);
    // }
});

/*
 * 今日注册的用户数
 */
User.getTodayNewUser = () => {
    let today    = new Date();
    today        = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    today        = today.getTime();
    let tomorrow = today + 24 * 60 * 60 * 1000;
    return User
            .where('created_at', '>=', DateUtil.longToYmdStr(today))
            .where('created_at', '<', DateUtil.longToYmdStr(tomorrow))
            .count();
};

/*
 * 昨日注册的用户数
 */
User.getYesterdayNewUser = () => {
    let today    = new Date();
    today        = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    today        = today.getTime();
    let yester   = today - 24 * 60 * 60 * 1000;
    return User
            .where('created_at', '>=', DateUtil.longToYmdStr(yester))
            .where('created_at', '<', DateUtil.longToYmdStr(today))
            .count();
};

/*
 * 近30天，每天注册的新用户数
 */
User.getUserFor30d = () => {
    let today    = new Date();
    today        = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let before29 = today.getTime() - 29 * 24 * 60 * 60 * 1000;
    before29     = DateUtil.longToYmdStr(before29);
    var sql = `
        SELECT count(*) as count, DATE_FORMAT(created_at,'%Y-%m-%d') as createdAt
        FROM user
        WHERE created_at >= ${before29}
        GROUP BY DATE_FORMAT(created_at,'%Y-%m-%d');
    `;
    return bookshelf.knex.raw(sql);
};

/*
 * 近30天，每天有消费形为的用户数
 */
User.getPurchaseUserFor30d = () => {
    const Order  = require('./Order');
    let today    = new Date();
    today        = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let before29 = today.getTime() - 29 * 24 * 60 * 60 * 1000;
    before29     = DateUtil.longToYmdStr(before29);
    let status   = Order.STATUS_PAYED;
    var sql = `
        SELECT COUNT(DISTINCT user_id) as count, DATE_FORMAT(pay_at,'%Y-%m-%d') as payAt
        FROM \`order\`
        WHERE pay_at >= ? and status = ?
        GROUP BY DATE_FORMAT(pay_at,'%Y-%m-%d');
    `;
    return bookshelf.knex.raw(sql, [before29, status]);
};

/*
 * 指定日期有消费形为的用户数
 */
User.getPurchaseUserByDate = async (date) => {
    const Order  = require('./Order');
    let start    = new Date(date.year, date.month - 1, date.date).getTime();
    let tomorrow = start + 24 * 60 * 60 * 1000;
    start        = DateUtil.longToYmdStr(start);
    tomorrow     = DateUtil.longToYmdStr(tomorrow);
    let status   = Order.STATUS_PAYED;
    var sql = `
        SELECT COUNT(DISTINCT user_id) as count, DATE_FORMAT(pay_at,'%Y-%m-%d') as payAt
        FROM \`order\`
        WHERE pay_at >= ? and pay_at < ? and status = ?
        GROUP BY DATE_FORMAT(pay_at,'%Y-%m-%d');
    `;
    try {
        let result = await bookshelf.knex.raw(sql, [start, tomorrow, status]);
        return result[0][0].count;
    } catch (err) {
        throw err;
    }
};

module.exports = User;