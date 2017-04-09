import {
	REQUEST_ORDER_ANALYZE,
	REQUEST_ORDER_30d,
	REQUEST_ORDER_AMOUNT_30d
} from '../constants';

let initState = {
	todayOrderCount     : 0,
	yesterdayOrderCount : 0,
	todayTotalSale      : 0,
	yesterdayTotalSale  : 0,
	orders  : [],
	amounts : []
};

export default (state = initState, action) => {
	switch (action.type) {
		case REQUEST_ORDER_ANALYZE: {
			let data = action.data;
			return {
				...state,
				...data
			};
		}
		case REQUEST_ORDER_30d: {
			return {
				...state,
				orders: action.orders
			};
		}
		case REQUEST_ORDER_AMOUNT_30d: {
			return {
				...state,
				amounts: action.amounts
			};	
		}
		default: {
			return state
		}
	}
}