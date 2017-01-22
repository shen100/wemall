'use strict';

const Promise  = require('bluebird');
const User     = require( '../../../model/User');
const DateUtil = require( '../../../utils/DateUtil');

async function action(req, res) {
    try {
        var saleUsers = await User.getSaleUserBy30Days();
        for (var i = 0; i < saleUsers.length; i++) {
            console.log( DateUtil.ymdStrToYmdObj(saleUsers[i].createdAt));
            saleUsers[i].date = DateUtil.ymdStrToYmdObj(saleUsers[i].createdAt);
            delete saleUsers[i].createdAt;
        }
        res.json({
            msg   : 'success',
            errNo : 0,
            data: {
                users : saleUsers
            }
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports = action;

