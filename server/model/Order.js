'use strict';

const bookshelf = require('./bookshelf');
const DateUtil  = require('../utils/DateUtil');

var Order = bookshelf.Model.extend({
    tableName: 'order',
    // user: function() {
    //     return this.belongsTo(User);
    // }
});

Order.STATUS_PEDDING = 0; //未支付
Order.STATUS_PAYED   = 1; //已支付

/*
 * 总的订单数
 */
Order.getTotalOrderCount = () => {
    return Order.count();
};

/*
 * 指定日期的订单数
 */
Order.getOrderCountByDate = (date) => {
	let start    = new Date(date.year, date.month - 1, date.date).getTime();
    let tomorrow = start + 24 * 60 * 60 * 1000;
    start        = DateUtil.longToYmdStr(start);
    tomorrow     = DateUtil.longToYmdStr(tomorrow);
    return Order.where('created_at', '>=', start)
                .where('created_at', '<',  tomorrow).count();
};

/*
 * 指定日期的销售额
 */
Order.getTotalSaleByDate = (date) => {
    return new Promise(async function(resolve, reject) {
        let start    = new Date(date.year, date.month - 1, date.date).getTime();
        let tomorrow = start + 24 * 60 * 60 * 1000;
        start        = DateUtil.longToYmdStr(start);
        tomorrow     = DateUtil.longToYmdStr(tomorrow);
        try {
            let sum = await Order.query('sum', 'payment as totalPay')
                        .where('pay_at', '>=', start)
                        .where('pay_at', '<',  tomorrow)
                        .where({
                            status: Order.STATUS_PAYED
                        })
                        .fetch();
            resolve(sum.get('totalPay'));
        } catch (err) {
            reject(err);
        }
    });
};

/*
 * 总的销售额
 */
Order.getTotalSale = () => {
    return new Promise(async function(resolve, reject) {
        try {
            let sum = await Order.query('sum', 'payment as totalPay')
                                .where({
                                    status: Order.STATUS_PAYED
                                })
                                .fetch();
            resolve(sum.get('totalPay'));
        } catch (err) {
            reject(err);
        }
    });
};

/*
 * 近30天，每天的销售额
 */
Order.getSaleFor30d = async () => {
    let today    = new Date();
    today        = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let before29 = today.getTime() - 29 * 24 * 60 * 60 * 1000;
    before29     = DateUtil.longToYmdStr(before29);
    let status   = Order.STATUS_PAYED;
    var sql = `
        SELECT sum(payment) as amount, DATE_FORMAT(pay_at,'%Y-%m-%d') as payAt
        FROM \`order\`
        WHERE pay_at > ? and status = ?
        GROUP BY DATE_FORMAT(pay_at,'%Y-%m-%d');
    `;
    try {
        let result = await bookshelf.knex.raw(sql, [before29, status]);
        return result[0];
    } catch (err) {
        throw err;
    }
};

/*
 * 近30天，每天的订单数
 */
Order.getOrderFor30d = async () => {
    let today    = new Date();
    today        = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    let before29 = today.getTime() - 29 * 24 * 60 * 60 * 1000;
    before29     = DateUtil.longToYmdStr(before29);
    var sql = `
        SELECT count(id) as count, DATE_FORMAT(created_at,'%Y-%m-%d') as createdAt
        FROM \`order\`
        WHERE created_at > ?
        GROUP BY DATE_FORMAT(created_at,'%Y-%m-%d');
    `;
    try {
        let result = await bookshelf.knex.raw(sql, [before29]);
        return result[0];
    } catch (err) {
        throw err;
    }
    
};

module.exports = Order;

