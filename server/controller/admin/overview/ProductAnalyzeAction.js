'use strict';

let Product     = require( '../../../model/Product');
let validator   = require('validator');

async function action(req, res) {
	let page     = req.query.page || '';
	let pageSize = 30;

	if (validator.isInt(page)) {
		page = parseInt(page);
	} else {
		page = 1;
	}
	if (page < 1) {
		page = 1;
	}
    try {
        let products = await Product.fetchPage({
        	page     : page,
        	pageSize : pageSize
        });
        res.locals.data = {
            products: products     
        };
        res.render('admin/overview/productAnalyze');
    } catch(err) {
        console.log(err);
    }
};

module.exports = action;