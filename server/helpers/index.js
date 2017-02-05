'use strict';

var helpers = {
	equal: function(v1, v2, options) {
		if (v1 === v2) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	},
	json: function(data) {
        data = data || {};
        return JSON.stringify(data);
    }
};

module.exports = helpers;