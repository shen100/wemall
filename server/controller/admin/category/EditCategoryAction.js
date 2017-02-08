'use strict';

let Constant   = require('../../../model/Constant');
let Category   = require('../../../model/Category');
let ErrorCode  = require('../../../model/ErrorCode');
let Validator  = require('../../../utils/Validator');
let StringUtil = require('../../../utils/StringUtil');

async function get(req, res) {
	let id = req.params.id;

    id = parseInt(id);
    if (!Validator.isInt(id)) {
        res.status(404);
        return res.render('404');
    }

    try {
        let category = await new Category({id, id}).fetch();
        if (!category) {
            res.status(404);
            return res.render('404');
        }
        res.locals.data = {
            category: category     
        };
        res.render('admin/category/editCategory');
    } catch(err) {
        console.log(err);
    }
}

async function post(req, res) {
    let id       = req.body.id;
    let name     = req.body.name;
    let parentId = req.body.parentId;
    let order    = req.body.order;
    let remark   = req.body.remark;
    let status   = req.body.status;
    let minOrder = Constant.MIN_ORDER;
    let maxOrder = Constant.MAX_ORDER;

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
        return res.json({
            msg   : 'error',
            errNo : ErrorCode.ERROR
        });
    }

    if (Validator.isEmpty(name)) {
        return res.json({
            msg   : '分类名称不能为空',
            errNo : ErrorCode.ERROR
        });   
    } 
    name = StringUtil.trim('' + name);
    if (name.length > Constant.MAX_TITLE_LEN) {
        return res.json({
            msg   : '分类名称的长度不能大于'+ Constant.MAX_TITLE_LEN + '个字符',
            errNo : ErrorCode.ERROR
        });
    }
    
    if (Validator.isEmpty(order)) {
        return res.json({
            msg   : '分类的排序不能为空',
            errNo : ErrorCode.ERROR
        });
    } 
    order = parseInt(order);
    if (!Validator.isInt(order, {min: minOrder, max: maxOrder})) {
        return res.json({
            msg   : '分类的排序要在 ' + minOrder + '到' + maxOrder + ' 之间',
            errNo : ErrorCode.ERROR
        });    
    }

    if (Validator.isEmpty(parentId)) {
        return res.json({
            msg   : '父分类不能为空',
            errNo : ErrorCode.ERROR
        });
    } 
    parentId = parseInt(parentId);
    if (!Validator.isInt(parentId)) {
        return res.json({
            msg   : '父分类无效',
            errNo : ErrorCode.ERROR
        });
    }
    
    try {
        let model = await new Category({id: parentId}).fetch();
        if (parentId && !model) {
            return res.json({
                msg   : '父分类无效',
                errNo : ErrorCode.ERROR
            });
        }
        if (Validator.isEmpty(remark)) {
            remark = '';
        } 
        remark = '' + remark;
        if (remark.length > Constant.MAX_REMARK_LEN) {
            return res.json({
                msg   : '备注的长度不能大于'+ Constant.MAX_REMARK_LEN + '个字符',
                errNo : ErrorCode.ERROR
            });    
        }

        status = parseInt(status);
        if (status !== Category.STATUS_OPEN && status !== Category.STATUS_CLOSE) {
            return res.json({
                msg   : '状态错误',
                errNo : ErrorCode.ERROR
            });
        }

        let now = new Date();
        let category = await new Category({
            id: id
        }).save({
            name     : name,
            parentId : parentId,
            order    : order,
            remark   : remark,
            status   : status,
            updateAt : now
        }, {
            patch: true
        });
        return res.json({
            msg   : 'success',
            errNo : 0,
            data: {
                id: category.get('id')
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

module.exports = {
    get  : get,
    post : post
};
