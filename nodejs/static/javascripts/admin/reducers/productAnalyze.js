import {
	REQUEST_HOT_PRODUCT_LIST,
	REQUEST_PRODUCT_LIST,
	CHANGE_PRODUCT_STATUS
} from '../constants';

let initState = {
	hotProducts: [],
	products: []
};

export default (state = initState, action) => {
	switch (action.type) {
		case REQUEST_HOT_PRODUCT_LIST: {
			return {
				...state,
				hotProducts: action.hotProducts
			};
		}
		case REQUEST_PRODUCT_LIST: {
			return {
				...state,
				products: action.products
			};
		}
		case CHANGE_PRODUCT_STATUS: {
			let products = state.products.slice(0);
			for (let i = 0; i < products.length; i++) {
				if (products[i].id == action.id) {
					products[i].status = action.status;
					break;
				}
			}
			return {
				...state,
				products: products
			};
		}
		default: {
			return state
		}
	}
}