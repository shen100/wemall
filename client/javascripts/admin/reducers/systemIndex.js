import {
	REQUEST_SYSTEM_INDEX
} from '../constants';

let initState = {
    todayOrderCount : globalData.todayOrderCount,
    todayTotalSale  : globalData.todayTotalSale,
    totalOrderCount : globalData.totalOrderCount,
    totalSale       : globalData.totalSale,
    software: {
    	name        : softwareConfig.name,
    	version     : softwareConfig.version,
    	OfficialURL : softwareConfig.OfficialURL
    }
};

export default (state = initState, action) => {
	switch (action.type) {
		case REQUEST_SYSTEM_INDEX: {
			return state;
		}
		default: {
			return state
		}
	}
}



