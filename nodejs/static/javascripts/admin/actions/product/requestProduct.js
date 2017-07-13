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
                return a.propertyID > b.propertyID ? 1 : -1;
            });
        }
        inventories.sort(function(a, b) {
            function compare(pvA, pvB) {
                var index = pvA.length - 1;
                if (pvA[index].id > pvB[index].id) {
                    return 1;
                } else if (pvA[index].id < pvB[index].id) {
                    return -1;
                }
                return compare(pvA.slice(0, pvA.length - 1), pvB.slice(0, pvB.length - 1));
            }
            return compare(a.propertyValues, b.propertyValues);
        });
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

