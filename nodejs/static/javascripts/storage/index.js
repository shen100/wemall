export default {
	getCookie: function(key) {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i];
			cookie = cookie.replace(/^\s+/, '');
			var cookieArr = cookie.split('=');
			if (cookieArr[0] === key) {
				return decodeURIComponent(cookieArr[1]);
			}
		}
		return '';
	},
	setCookie: function(key, value, day) {
		day         = day || 36500;
		var expires = '';
		var date    = new Date(new Date().getTime() + day * 24 * 60 * 60 * 1000);
		expires     = '; expires=' + date.toUTCString();

		var cookie = [
			key + '=' + encodeURIComponent(value),
			expires,
			'; path=/'
		].join('');
		document.cookie = cookie;
	},
	getItem: function(key) {
		var local  = window.localStorage;
		var result = local ? local.getItem(key) : this.getCookie(key);
		return result ? JSON.parse(result) : null;
	},
	setItem: function(key, value) {
		if (!value) {
			return;
		}
		var local = window.localStorage;
		value = JSON.stringify(value);
		try {
			local ? local.setItem(key, value) : this.setCookie(key, value);
		} catch (e) {

		}
	}
};