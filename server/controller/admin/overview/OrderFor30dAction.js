'use strict';

const Promise  = require('bluebird');
const Order    = require( '../../../model/Order');
const DateUtil = require( '../../../utils/DateUtil');

async function index(req, res) {
    try {
        var orders = await Order.getOrderCountBy30Days();
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

module.exports = index;

