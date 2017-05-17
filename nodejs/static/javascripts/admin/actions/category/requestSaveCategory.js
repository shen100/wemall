import {
    REQUEST_SAVE_CATEGORY,
	REQUEST_SAVE_CATEGORY_SUCCESS,
} from '../../constants';

function receive(data) {
    return {
        type     : REQUEST_SAVE_CATEGORY_SUCCESS,
        category : data.category
    };
}

export default function(category) {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/category/update';
        return fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(category)
            })
			.then(response => response.json())
            .then(json => dispatch(receive(json.data)));
    };
};

