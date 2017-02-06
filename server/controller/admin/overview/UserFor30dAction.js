'use strict';

let User    = require( '../../../model/User');
let DateUtil = require( '../../../utils/DateUtil');

async function action(req, res) {
    try {
        var users  = await User.getUserFor30d();
        users      = users || [];
        for (var i = 0; i < users.length; i++) {
            users[i].date = DateUtil.ymdStrToYmdObj(users[i].createdAt);
            delete users[i].createdAt;
        }
        res.json({
            msg: 'success',
            errNo: 0,
            data: {
                users: users
            }
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports = action;

