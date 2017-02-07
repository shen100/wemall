'use strict';

let validator  = require('validator');

module.exports = {
	isEmpty: function(value) {
		if (typeof value === 'undefined' || value === null) {
			return true;
		}
		if (typeof value === 'string') {
			value = value.replace(/^\s+|\s$/g, '');
			if (!value) {
				return true;
			}
		}
		return false;
	},
	isInt: function(value, options) {
		return validator.isInt('' + value, options);
	}
};