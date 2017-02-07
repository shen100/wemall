'use strict';

let Validator  = require('../../../utils/Validator');
let StringUtil = require('../../../utils/StringUtil');
let Category   = require('../../../model/Category');
let ErrorCode  = require('../../../model/ErrorCode');
let Constant   = require('../../../model/Constant');

async function get(req, res) {
    try {
        let categories = await Category.fetchAll();
        res.locals.data = {
            categories: categories     
        };
        res.render('admin/category/createCategory');
    } catch(err) {
        console.log(err);
    }
}

async function post(req, res) {
    let name     = req.body.name;
    let parentId = req.body.parentId;
    let order    = req.body.order;
    let remark   = req.body.remark;
    let status   = Category.STATUS_CLOSE;
    let minOrder = Constant.MIN_ORDER;
    let maxOrder = Constant.MAX_ORDER;

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
        order = maxOrder;
    } 
    order = parseInt(order);
    if (!Validator.isInt(order, {min: minOrder, max: maxOrder})) {
        return res.json({
            msg   : '分类的排序要在 ' + minOrder + '到' + maxOrder + ' 之间',
            errNo : ErrorCode.ERROR
        });    
    }

    if (Validator.isEmpty(parentId)) {
        parentId = 0; //无父分类
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
        //前端传了 parentId 但数据库中没查到
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
        let now = new Date();
        let category = await new Category({
            name     : name,
            parentId : parentId,
            order    : order,
            remark   : remark,
            status   : status,
            createAt : now,
            updateAt : now
        }).save();
        return res.json({
            msg   : 'success',
            errNo : 0,
            data: {
                id: category.get('id')
            }
        });
    } catch (err) {
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

