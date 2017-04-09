import {
	REQUEST_SYSTEM_INDEX,
	REQUEST_RECENT_PV
} from '../constants';

let initState = {
    todayOrderCount : globalData.todayOrderCount,
    todayTotalSale  : globalData.todayTotalSale,
    totalOrderCount : globalData.totalOrderCount,
    totalSale       : globalData.totalSale,
    recentPV: []
};

export default (state = initState, action) => {
	switch (action.type) {
		case REQUEST_SYSTEM_INDEX: {
			return state;
		}
		case REQUEST_RECENT_PV: {
			return {
				...state,
				recentPV: action.recentPV
			};
		}
		default: {
			return state
		}
	}
}



