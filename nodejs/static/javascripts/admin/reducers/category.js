import {
	REQUEST_CATEGORY_LIST,
	REQUEST_CATEGORY_LIST_SUCCESS,
	CHANGE_CATEGORY_STATUS,
	REQUEST_CATEGORY,
	REQUEST_CATEGORY_SUCCESS
} from '../constants/actionTypes';

let initState = {
	category       : null,
	categories     : []
};

export default (state = initState, action) => {
	switch (action.type) {
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
		case CHANGE_CATEGORY_STATUS: {
			let categories = state.categories.slice(0);
			for (let i = 0; i < categories.length; i++) {
				if (categories[i].id == action.id) {
					categories[i].status = action.status;
					break;
				}
			}
			return {
				...state,
				categories: categories
			};
		}
		case REQUEST_CATEGORY: {
			return {
				...state,
				category: null
			};	
		}
		case REQUEST_CATEGORY_SUCCESS: {
			return {
				...state,
				category: action.category
			};	
		}
		default: {
			return state
		}
	}
}