import {
	SET_TODAY_ORDER_COUNT,
	SET_TODAY_TOTAL_SALE,
	SET_TOTAL_ORDER_COUNT,
	SET_TOTAL_SALE,
	SET_WEMALL_VERSION,
	SET_WEMALL_NEW_VERSION,
	SET_SYSTEM_TIME,
	SET_WEMALL_OFFICIAL
} from '../constants';

let initState = {
	todayOrderCount  : 0,  //今日订单数，即新订单数
	todayTotalSale   : 0,  //今日总销售额
	totalOrderCount  : 0,  //总订单数
	totalSale        : 0,  //总销售额
	wemallVersion    : '', //当前wemall程序版本
	wemallNewVersion : '', //最新wemall程序版本
	systemTime       : '', //系统当前时间
	wemallWebsite    : ''  //wemall官网
};

export default (state = initState, action) => {
	switch (action.type) {
		case SET_TODAY_ORDER_COUNT: {
			return {
				...state,
				todayOrderCount: action.todayOrderCount
			};
		}
		case SET_TODAY_TOTAL_SALE: {
			return {
				...state,
				todayTotalSale: action.todayTotalSale
			};
		}
		case SET_TOTAL_ORDER_COUNT: {
			return {
				...state,
				totalOrderCount: action.totalOrderCount
			};
		}
		case SET_TOTAL_SALE: {
			return {
				...state,
				totalSale: action.totalSale
			};
		}
		case SET_WEMALL_VERSION: {
			return {
				...state,
				wemallVersion: action.wemallVersion
			};
		}
		case SET_WEMALL_NEW_VERSION: {
			return {
				...state,
				wemallNewVersion: action.wemallNewVersion
			};
		}
		case SET_SYSTEM_TIME: {
			return {
				...state,
				systemTime: action.systemTime
			};
		}
		case SET_WEMALL_OFFICIAL: {
			return {
				...state,
				wemallWebsite: action.wemallWebsite
			};
		}
		default: {
			return state
		}
	}
}



