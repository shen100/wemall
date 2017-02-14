'use strict';

let ErrorCode   = require('../../../model/ErrorCode');
let StringUtil  = require('../../../utils/StringUtil');
let Product     = require( '../../../model/Product');
let Validator   = require( '../../../utils/Validator');
let Constant    = require('../../../model/Constant');
let Category    = require('../../../model/Category');

async function action(req, res) {
	let name          = req.body.name || '';
    let categories    = req.body.categories || '';
    let price         = req.body.price;
    let originalPrice = req.body.originalPrice;
    let remark        = req.body.remark;
    let detail        = req.body.detail;
    let status        = Product.DOWN_SHELF;

    if (Validator.isEmpty(name)) {
        return res.json({
            msg   : '商品名称不能为空',
            errNo : ErrorCode.ERROR
        });   
    } 
    name = StringUtil.trim('' + name);
    if (name.length > Constant.MAX_TITLE_LEN) {
        return res.json({
            msg   : '商品名称的长度不能大于'+ Constant.MAX_TITLE_LEN + '个字符',
            errNo : ErrorCode.ERROR
        });
    }

    if (Validator.isEmpty(categories)) {
        return res.json({
            msg   : '商品分类不能为空',
            errNo : ErrorCode.ERROR
        });   
    }
    categories = '' + categories;
    let categoryArr = categories.split(',');
    if (categoryArr.length > Constant.PRODUCT_MAX_CATEGORY_COUNT) {
        return res.json({
            msg   : '商品最多只能有' + Constant.PRODUCT_MAX_CATEGORY_COUNT + '个分类',
            errNo : ErrorCode.ERROR
        });
    } else if (categoryArr.length < 1) {
        return res.json({
            msg   : '至少要选择一个商品分类',
            errNo : ErrorCode.ERROR
        });
    }
    for (let i = 0; i < categoryArr.length; i++) {
        if (Validator.isEmpty(categoryArr[i]) || !Validator.isInt(categoryArr[i])) {
            return res.json({
                msg   : '无效的商品分类',
                errNo : ErrorCode.ERROR
            });
        }
        categoryArr[i] = parseInt(categoryArr[i]);
        try {
            let category = await new Category({id: categoryArr[i]}).fetch();
            if (!category) {
                return res.json({
                    msg   : '无效的商品分类',
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
    }

    if (Validator.isEmpty(price) || !Validator.isFloat(price)) {
        return res.json({
            msg   : '无效的商品价格',
            errNo : ErrorCode.ERROR
        });  
    }
    price = Number(price);

    if (Validator.isEmpty(originalPrice) || !Validator.isFloat(originalPrice)) {
        return res.json({
            msg   : '无效的商品原价',
            errNo : ErrorCode.ERROR
        });  
    }
    originalPrice = Number(originalPrice);

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

    if (Validator.isEmpty(detail)) {
        return res.json({
            msg   : '商品详情不能为空',
            errNo : ErrorCode.ERROR
        });
    } 
    detail = '' + detail;
    if (detail.length > Constant.PRODUCT_MAX_DETAIL_LEN) {
        return res.json({
            msg   : '商品详情的长度不能大于'+ Constant.PRODUCT_MAX_DETAIL_LEN + '个字符',
            errNo : ErrorCode.ERROR
        });  
    }

    try {
        let product = await new Product({
            name          : name,
            price         : price,
            originalPrice : originalPrice,
            remark        : remark,
            detail        : detail,
            status        : status
        }).save();
        return res.json({
            msg   : 'success',
            errNo : 0,
            data: {
                id : product.get('id')
            }
        });
    } catch (err) {
        console.log(err);
        return res.json({
            msg   : 'error',
            errNo : ErrorCode.ERROR
        });
    }
};

module.exports = action;