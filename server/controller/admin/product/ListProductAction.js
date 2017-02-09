'use strict';

let Product     = require( '../../../model/Product');
let Validator   = require( '../../../utils/Validator');
let Constant    = require('../../../model/Constant');

async function action(req, res) {
	let page     = req.query.page || '';
	let pageSize = Constant.PRODUCT_PAGE_SIZE;

	if (Validator.isEmpty(page)) {
        page = 1;
    } else if (Validator.isInt(page, { min:1 })) {
        page = parseInt(page);
    } else {
        res.status(404);
        return res.render('404');
    }

    try {
        let products = await Product.fetchPage({
        	page     : page,
        	pageSize : pageSize
        });
        res.locals.data = {
            products: products     
        };
        res.render('admin/product/listProduct');
    } catch(err) {
        console.log(err);
    }
};

module.exports = action;