'use strict';

const Promise = require('bluebird');
const User   = require( '../../../model/User');

async function action(req, res) {
    try {
        var results = await Promise.all([
            User.getUserCountBy30Days()
        ]);
        res.json({
            msg           : '222',
            errNo         : 0,
            data: {
                users  : results[0] || []
            }
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports = action;

