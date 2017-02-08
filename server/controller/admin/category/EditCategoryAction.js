'use strict';

let Category   = require('../../../model/Category');
let Validator  = require( '../../../utils/Validator');

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

}

module.exports = {
    get  : get,
    post : post
};
