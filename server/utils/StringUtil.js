'use strict';

module.exports = {
	trim: function(arg) {
		return arg = arg.replace(/^\s+|\s$/g, '');
	}
};