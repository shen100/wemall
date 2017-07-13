import {
    REQUEST_PRODUCT,
	REQUEST_PRODUCT_SUCCESS
} from '../../constants';

function receive(data) {
    var product = data.product;
    if (product.inventories && product.inventories.length) {
        var inventories = product.inventories;
        for (var i = 0; i < inventories.length; i++) {
            inventories[i].propertyValues.sort(function(a, b) {
                return a.propertyID > b.propertyID;
            });
        }
    }
    return {
        type    : REQUEST_PRODUCT_SUCCESS,
        product : product
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

