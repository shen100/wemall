'use strict';

let express        = require('express');
let indexAction    = require('./indexAction');
let overviewRouter = require('./overview/router');
let categoryRouter = require('./category/router');

let router = express.Router();

router.get('/',         indexAction);
router.use('/overview', overviewRouter);
router.use('/category', categoryRouter);

module.exports = router;