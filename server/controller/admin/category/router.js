'use strict';

let express                   = require('express');
let CreateCategoryAction      = require('./CreateCategoryAction');
let ListCategoryAction        = require('./ListCategoryAction');
let EditCategoryAction        = require('./EditCategoryAction');
let OpenOrCloseCategoryAction = require('./OpenOrCloseCategoryAction');

let router = express.Router();

router.get('/list',      ListCategoryAction);
router.get('/edit/:id',  EditCategoryAction.get);
router.post('/edit',     EditCategoryAction.post);

router.get('/create',         CreateCategoryAction.get);
router.post('/create',        CreateCategoryAction.post);
router.post('/status/update', OpenOrCloseCategoryAction);

module.exports = router;