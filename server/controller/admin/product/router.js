'use strict';

let express             = require('express');
let ListProductAction   = require('./ListProductAction');
let CreateProductAction = require('./CreateProductAction');

let router = express.Router();

router.get('/list',      ListProductAction);
router.post('/create',   CreateProductAction);

module.exports = router;