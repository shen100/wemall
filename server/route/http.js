'use strict';

var admin = require('../controller/admin');

module.exports = function(app) {

	app.use('/admin',   admin);
	
};
