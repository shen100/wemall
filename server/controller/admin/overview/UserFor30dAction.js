'use strict';

const Promise = require('bluebird');
const User    = require( '../../../model/User');
const Order   = require( '../../../model/Order');
const DateUtil = require( '../../../utils/DateUtil');

async function action(req, res) {
    try {
        var newUsers =  await User.getUserCountBy30Days();
        for (var i = 0; i < newUsers.length; i++) {
            newUsers[i].date = DateUtil.ymdStrToYmdObj(newUsers[i].createdAt);
            delete newUsers[i].createdAt;
        }
        res.json({
            msg           : 'success',
            errNo         : 0,
            data: {
                users  : newUsers || []
            }
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports = action;

