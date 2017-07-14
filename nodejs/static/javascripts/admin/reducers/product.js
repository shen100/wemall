import {
	REQUEST_HOT_PRODUCT_LIST,
	REQUEST_PRODUCT_LIST,
	CHANGE_PRODUCT_STATUS,
	REQUEST_PRODUCT,
	REQUEST_PRODUCT_SUCCESS,
	REQUEST_CATEGORY_LIST,
	REQUEST_CATEGORY_LIST_SUCCESS,
	REQUEST_SAVE_PRODUCT_SUCCESS,
	REQUEST_SAVE_PRODUCT_PROP_SUCCESS,
	REQUEST_SAVE_PRODUCT_PROP_VALUE_SUCCESS,
	REQUEST_UPDATE_INVENTORY_SUCCESS
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
		case REQUEST_SAVE_PRODUCT_SUCCESS: {
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
		}
		case REQUEST_CATEGORY_LIST_SUCCESS: {
			return {
				...state,
				categories: action.categories
			};
		}
		case REQUEST_SAVE_PRODUCT_PROP_SUCCESS: {
			let product        = state.product;
			let properties     = product.properties.concat(action.property);
			product.properties = properties;
			return {
				...state,
				product: product
			};
		}
		case REQUEST_SAVE_PRODUCT_PROP_VALUE_SUCCESS: {
			let product        = state.product;
			let properties     = product.properties;
			for (let i = 0; i < properties.length; i++) {
				if (properties[i].id == action.propertyValue.propertyID) {
					properties[i].values.push(action.propertyValue);
					break;
				}
			}
			if (action.removed) {
				product.inventories = action.inventories;
			} else {
				product.inventories = product.inventories.concat(action.inventories);
			}
			return {
				...state,
				product: product
			};
		}
		case REQUEST_UPDATE_INVENTORY_SUCCESS: {
			let product = state.product;
		    for (let i = 0; i < product.inventories.length; i++) {
		    	if (product.inventories[i].id == action.inventoryId) {
		    		product.inventories[i].count = action.count;
		    		break;
		    	}
		    }
			return {
				...state,
				product: product
			};
		}
		default: {
			return state
		}
	}
}