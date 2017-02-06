'use strict';

let express        = require('express');
let indexAction    = require('./indexAction');
let overviewRouter = require('./overview/router');

let router = express.Router();

router.get('/',         indexAction);
router.use('/overview', overviewRouter);

module.exports = router;