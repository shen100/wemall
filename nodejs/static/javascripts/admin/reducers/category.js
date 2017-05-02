import {
	REQUEST_CATEGORY_LIST,
	CHANGE_CATEGORY_STATUS
} from '../constants';

let initState = {
	categories: []
};

export default (state = initState, action) => {
	switch (action.type) {
		case REQUEST_CATEGORY_LIST: {
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
		default: {
			return state
		}
	}
}