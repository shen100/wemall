'use strict';

let express              = require('express');
let CreateCategoryAction = require('./CreateCategoryAction');

let router = express.Router();

router.get('/create',  CreateCategoryAction.get);
router.post('/create', CreateCategoryAction.post);

module.exports = router;