import {
    REQUEST_SAVE_PRODUCT_PROP_VALUE,
	REQUEST_SAVE_PRODUCT_PROP_VALUE_SUCCESS,
} from '../../constants';

function receive(data) {
    var inventories = data.inventories;
    if (inventories && inventories.length) {
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
        type          : REQUEST_SAVE_PRODUCT_PROP_VALUE_SUCCESS,
        propertyValue : data.propertyValue,
        inventories   : inventories,
        removed       : data.removed
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

