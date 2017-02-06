'use strict';

let express              = require('express');
let UserFor30dAction     = require('./UserFor30dAction');
let UserSaleFor30dAction = require('./UserSaleFor30dAction');
let UserAnalyzeAction    = require('./UserAnalyzeAction');
let OrderAnalyzeAction   = require('./OrderAnalyzeAction');
let OrderFor30dAction    = require('./OrderFor30dAction');
let SaleFor30dAction     = require('./SaleFor30dAction');

let router = express.Router();

router.get('/user/30d',      UserFor30dAction);
router.get('/user/sale/30d', UserSaleFor30dAction);
router.get('/user/analyze',  UserAnalyzeAction);

router.get('/order/analyze', OrderAnalyzeAction);
router.get('/order/30d',     OrderFor30dAction);
router.get('/sale/30d',      SaleFor30dAction);

module.exports = router;