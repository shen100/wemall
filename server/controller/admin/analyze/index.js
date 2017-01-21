'use strict';

const express  = require('express');
const userAction = require('./userAction');

const router = express.Router();

router.get('/user',        userAction);

module.exports = router;