import {
    REQUEST_SAVE_PRODUCT_PROP,
	REQUEST_SAVE_PRODUCT_PROP_SUCCESS,
} from '../../constants';

function receive(data) {
    return {
        type     : REQUEST_SAVE_PRODUCT_PROP_SUCCESS,
        property : data.property
    };
}

export default function(data) {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/product/property/create';
        var reqData = {
            productID  : data.productID,
            name       : data.name
        };
        return fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reqData)
            })
			.then(response => response.json())
            .then(json => dispatch(receive(json.data)));
    };
};

