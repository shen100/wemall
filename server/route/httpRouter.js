'use strict';

let adminRouter = require('../controller/admin/router');

module.exports = function(app) {

	app.use('/admin',   adminRouter);
	
};
