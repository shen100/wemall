var request  = require('request');
var url      = require('url');
var config   = require('../config');

var req = function(options, callback) {
	options.json = options.json === undefined ? true : options.json;
	var client   = options.client;
	if (client.headers) {
		options.headers = {};
		options.headers['User-Agent'] = client.headers['user-agent'];
	}

	var urlObj = url.parse(options.uri);
	if (client.cookies) {
		var cookieUrl = urlObj.protocol + '//' + urlObj.host;
		var j = request.jar();
		for (var key in client.cookies) {
			if (client.cookies.hasOwnProperty(key)) {
				var cookie = request.cookie(key + '=' + client.cookies[key]);
				j.setCookie(cookie, cookieUrl);
			}
		}
		options.jar = j;
	}

	delete options.client;
	if (config.useProxy) {
		options.proxy = config.proxy.uri;
	}
	var startTime = new Date().getTime();
	request(options, function(error, response, data) {
		if (!error && typeof data === 'string') {
			error = {
				message : data,
				url     : options.uri
			};
		}
		callback(error, response, data);
	})
};

req.getJSON = function(options, callback) {
	options.method = 'GET';
	req(options, callback);
};

req.postJSON = function(options, callback) {
	options.method = 'POST';
	options.body   = options.body || {};
	req(options, callback);
};

module.exports = req;