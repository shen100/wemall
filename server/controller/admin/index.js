'use strict';

const express     = require('express');
const indexAction = require('./indexAction');
const analyze     = require('./analyze');

const router = express.Router();

router.get('/',        indexAction);
router.use('/analyze', analyze);

module.exports = router;