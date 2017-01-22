'use strict';

const express      = require('express');
const indexAction  = require('./indexAction');
const overview     = require('./overview');

const router = express.Router();

router.get('/',         indexAction);
router.use('/overview', overview);

module.exports = router;