import {
	REQUEST_CATEGORY_LIST,
    REQUEST_CATEGORY_LIST_SUCCESS
} from '../../constants';

function receiveCategories(data) {
    return {
        type: REQUEST_CATEGORY_LIST_SUCCESS,
        categories: data.categories
    };
}

export default function() {
    return dispatch => {
        dispatch({
            type: REQUEST_CATEGORY_LIST,
        });
        var url = pageConfig.apiURL + '/admin/categories';
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveCategories(json.data)))
    };
}