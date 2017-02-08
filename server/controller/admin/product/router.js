'use strict';

let express             = require('express');
let ListProductAction   = require('./ListProductAction');

let router = express.Router();

router.get('/list',      ListProductAction);

module.exports = router;