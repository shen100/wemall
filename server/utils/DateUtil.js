module.exports = {
	ymdStrToYmdObj: function(str) {
		var dateArr = str.split('-');
		return {
			year  : parseInt(dateArr[0]),
			month : parseInt(dateArr[1]),
			date  : parseInt(dateArr[2]),
		};
	}	
};