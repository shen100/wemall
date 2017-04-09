import {
	REQUEST_HOT_PRODUCT_LIST,
	REQUEST_PRODUCT_LIST
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
		default: {
			return state
		}
	}
}