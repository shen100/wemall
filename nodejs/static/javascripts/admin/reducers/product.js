import {
	REQUEST_HOT_PRODUCT_LIST,
	REQUEST_PRODUCT_LIST,
	CHANGE_PRODUCT_STATUS,
	REQUEST_PRODUCT,
	REQUEST_PRODUCT_SUCCESS,
	REQUEST_CATEGORY_LIST,
	REQUEST_CATEGORY_LIST_SUCCESS
} from '../constants';

let initState = {
	hotProducts: [],
	products   : [],  //产品列表
	product    : null, //当前查询出的产品
	categories : [] //所有的分类
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
		case REQUEST_PRODUCT: {
			return {
				...state,
				product: null
			};	
		}
		case REQUEST_PRODUCT_SUCCESS: {
			return {
				...state,
				product: action.product
			};	
		}
		case REQUEST_CATEGORY_LIST: {
			return {
				...state,
				categories: []
			};
			break;
		}
		case REQUEST_CATEGORY_LIST_SUCCESS: {
			return {
				...state,
				categories: action.categories
			};
		}
		default: {
			return state
		}
	}
}