import {
    REQUEST_CATEGORY,
	REQUEST_CATEGORY_SUCCESS
} from '../../constants';

function receiveCategory(data) {
    return {
        type     : REQUEST_CATEGORY_SUCCESS,
        category : data
    };
}

export default function(id) {
    return dispatch => {
        dispatch({
            type: REQUEST_CATEGORY,
        });
        var url = pageConfig.apiPath + '/admin/category/:id';
        url     = url.replace(':id', id);
        return fetch(url)
			.then(response => response.json())
            .then(json => dispatch(receiveCategory(json.data)));
    };
};

