'use strict';

let express      = require('express');
let indexAction  = require('./indexAction');
let overview     = require('./overview');

let router = express.Router();

router.get('/',         indexAction);
router.use('/overview', overview);

module.exports = router;