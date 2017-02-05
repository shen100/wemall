'use strict';

const express              = require('express');
const UserFor30dAction     = require('./UserFor30dAction');
const UserSaleFor30dAction = require('./UserSaleFor30dAction');
const UserAnalyzeAction    = require('./UserAnalyzeAction');
const OrderAnalyzeAction   = require('./OrderAnalyzeAction');
const OrderFor30dAction    = require('./OrderFor30dAction');
const SaleFor30dAction     = require('./SaleFor30dAction');

const router = express.Router();

router.get('/user/30d',      UserFor30dAction);
router.get('/user/sale/30d', UserSaleFor30dAction);
router.get('/user/analyze',  UserAnalyzeAction);

router.get('/order/analyze', OrderAnalyzeAction);
router.get('/order/30d',     OrderFor30dAction);
router.get('/sale/30d',      SaleFor30dAction);

module.exports = router;