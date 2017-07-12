import {
    REQUEST_SAVE_PRODUCT_PROP_VALUE,
	REQUEST_SAVE_PRODUCT_PROP_VALUE_SUCCESS,
} from '../../constants';

function receive(data) {
    return {
        type          : REQUEST_SAVE_PRODUCT_PROP_VALUE_SUCCESS,
        propertyValue : data.propertyValue
    };
}

export default function(data) {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/product/property/saveval';
        var reqData = {
            productID  : data.productID,
            name       : data.name,
            propertyID : data.propertyID
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

