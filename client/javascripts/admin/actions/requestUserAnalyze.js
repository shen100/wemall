import {
	REQUEST_USER_ANALYZE
} from '../constants';

function receiveUserAnalyze(json) {
    return {
        type: REQUEST_USER_ANALYZE,
        userAnalyze: {
	        todayNewUser          : json.todayNewUser,
	        yesterdayNewUser      : json.yesterdayNewUser,
	        todayPurchaseUser     : json.todayPurchaseUser,
	        yesterdayPurchaseUser : json.yesterdayPurchaseUser
	    }
    };
}

export default function() {
    return dispatch => {
        var url = config.sitePath + '/admin/user/analyze';
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveUserAnalyze(json.data)))
    };
}