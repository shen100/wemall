import {
	REQUEST_CATEGORY_LIST
} from '../constants';

function receiveCategories(data) {
    return {
        type: REQUEST_CATEGORY_LIST,
        categories: data.categories
    };
}

export default function() {
    return dispatch => {
        var url = pageConfig.apiURL + '/admin/categories';
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveCategories(json.data)))
    };
}