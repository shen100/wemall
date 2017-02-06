'use strict';

let Product     = require( '../../../model/Product');

async function action(req, res) {
    try {
        let products = await Product.fetchAll();
        res.locals.data = {
            products: products     
        };
        res.render('admin/overview/productAnalyze');
    } catch(err) {
        console.log(err);
    }
};

module.exports = action;