module.exports = {
	ymdStrToYmdObj: function(str) {
		var dateArr = str.split('-');
		return {
			year  : parseInt(dateArr[0]),
			month : parseInt(dateArr[1]),
			date  : parseInt(dateArr[2])
		};
	},
	longToYmdStr: function(d) {
		d         = new Date(d);
		let year  = d.getFullYear();
		let month = d.getMonth() + 1;
		let date  = d.getDate();
		month     = month < 10 ? '0' + month : month;
		date      = date  < 10 ? '0' + date  : date;
		return [year, month, date].join('-');
	},
	getTodayYMD: function() {
		let d     = new Date();
	    let year  = d.getFullYear();
	    let month = d.getMonth() + 1;
	    let date  = d.getDate();
	    return {
	    	year  : year,
	    	month : month,
	    	date  : date
	    };
	},
	getYesterdayYMD: function() {
		let d     = new Date().getTime() - 24 * 60 * 60 * 1000;
		d         = new Date(d);
	    let year  = d.getFullYear();
	    let month = d.getMonth() + 1;
	    let date  = d.getDate();
	    return {
	    	year  : year,
	    	month : month,
	    	date  : date
	    };
	}
};