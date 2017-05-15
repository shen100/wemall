import {
    REQUEST_PRODUCT,
	REQUEST_PRODUCT_SUCCESS
} from '../../constants';

function receive(data) {
    return {
        type    : REQUEST_PRODUCT_SUCCESS,
        product : data.product
    };
}

export default function(id) {
    return dispatch => {
        dispatch({
            type: REQUEST_PRODUCT,
        });
        var url = pageConfig.apiPath + '/admin/product/:id';
        url     = url.replace(':id', id);
        return fetch(url)
			.then(response => response.json())
            .then(json => dispatch(receive(json.data)));
    };
};

