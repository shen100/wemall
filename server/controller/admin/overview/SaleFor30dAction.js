'use strict';

const Order    = require( '../../../model/Order');
const DateUtil = require( '../../../utils/DateUtil');

async function action(req, res) {
    try {
        var sales  = await Order.getSaleFor30d();
        sales      = sales || [];
        for (var i = 0; i < sales.length; i++) {
            sales[i].date = DateUtil.ymdStrToYmdObj(sales[i].createdAt);
            delete sales[i].createdAt;
        }
        res.json({
            msg   : 'success',
            errNo : 0,
            data: {
                sales : sales
            }
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports = action;

