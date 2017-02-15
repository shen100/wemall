'use strict';

let Category   = require('../../../model/Category');
let ErrorCode  = require('../../../model/ErrorCode');
let Validator  = require('../../../utils/Validator');

async function post(req, res) {
    let id       = req.body.id;
    let status   = req.body.status;

    status = parseInt(status);
    if (status !== Category.STATUS_OPEN && status !== Category.STATUS_CLOSE) {
        return res.json({
            msg   : '状态错误',
            errNo : ErrorCode.ERROR
        });
    }

    if (Validator.isEmpty(id)) {
        return res.json({
            msg   : '无效的分类',
            errNo : ErrorCode.ERROR
        });
    }
    id = parseInt(id);
    if (!Validator.isInt(id)) {
        return res.json({
            msg   : '无效的分类',
            errNo : ErrorCode.ERROR
        });
    }
    try {
        let theCategory = await new Category({id: id}).fetch();
        if (!theCategory) {
            return res.json({
                msg   : '无效的分类',
                errNo : ErrorCode.ERROR
            });   
        }
    } catch (err) {
        console.log(err);
        return res.json({
            msg   : 'error',
            errNo : ErrorCode.ERROR
        });
    }
    
    try {
        let now = new Date();
        let category = await new Category({
            id: id
        }).save({
            status   : status,
            updateAt : now
        }, {
            patch: true
        });
        return res.json({
            msg   : 'success',
            errNo : 0,
            data: {
                id     : category.get('id'),
                status : status
            }
        });
    } catch (err) {
        console.log(err);
        return res.json({
            msg   : 'error',
            errNo : ErrorCode.ERROR
        });
    }
}

module.exports = post;
