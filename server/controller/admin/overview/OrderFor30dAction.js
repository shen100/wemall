'use strict';

const Order    = require( '../../../model/Order');
const DateUtil = require( '../../../utils/DateUtil');

async function action(req, res) {
    try {
        var orders = await Order.getOrderFor30d();
        orders     = orders || [];
        for (var i = 0; i < orders.length; i++) {
            orders[i].date = DateUtil.ymdStrToYmdObj(orders[i].createdAt);
            delete orders[i].createdAt;
        }
        res.json({
            msg   : 'success',
            errNo : 0,
            data: {
                orders: orders
            }
        });
    } catch(err) {
        console.log(err);
    }
};

module.exports = action;

