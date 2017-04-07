var Promise  = require('bluebird');
var OrderAPI = require('../api/OrderAPI');

module.exports = function(app) {
	app.get('/admin', function(req, res) {
		Promise.all([
			OrderAPI.getTodayOrderCount(req),
			OrderAPI.getTodaySale(req),
			OrderAPI.getTotalOrderCount(req),
			OrderAPI.getTotalSale(req)
		])
		.then(function(arr) {
			res.locals.data = {
				todayOrderCount : arr[0],
			    todayTotalSale  : arr[1],
			    totalOrderCount : arr[2],
			    totalSale       : arr[3]
			};
			res.render('admin/index');
		})
		.catch(function(err) {
	        res.status(500);
		    res.render('error', {
		        message : err.message,
		        error   : {}
		    });
		});
	});
};
