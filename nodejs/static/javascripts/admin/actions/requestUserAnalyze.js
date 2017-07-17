import {
	REQUEST_USER_ANALYZE
} from '../constants/actionTypes';

function receiveUserAnalyze(data) {
    return {
        type: REQUEST_USER_ANALYZE,
        userAnalyze: {
	        todayNewUser          : data.todayNewUser,
	        yesterdayNewUser      : data.yesterdayNewUser,
	        todayPurchaseUser     : data.todayPurchaseUser,
	        yesterdayPurchaseUser : data.yesterdayPurchaseUser
	    }
    };
}

export default function() {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/user/analyze';
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveUserAnalyze(json.data)))
    };
}