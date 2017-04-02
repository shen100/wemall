import {
	REQUEST_USER_ANALYZE
} from '../constants';

let initState = {
	todayNewUser          : 0,
	yesterdayNewUser      : 0,
	todayPurchaseUser     : 0,
	yesterdayPurchaseUser : 0
};

export default (state = initState, action) => {
	switch (action.type) {
		case REQUEST_USER_ANALYZE: {
			return action.userAnalyze;
		}
		default: {
			return state
		}
	}
}



