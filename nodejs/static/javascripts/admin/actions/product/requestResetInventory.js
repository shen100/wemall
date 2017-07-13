import {
    REQUEST_RESET_INVENTORY,
	REQUEST_RESET_INVENTORY_SUCCESS,
} from '../../constants';

function receive(data) {
    var inventories = data.inventories;
    for (var i = 0; i < inventories.length; i++) {
        inventories[i].propertyValues.sort(function(a, b) {
            return a.propertyID > b.propertyID;
        });
    }
    return {
        type        : REQUEST_RESET_INVENTORY_SUCCESS,
        inventories : inventories
    };
}

export default function(data) {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/product/inventory/reset';
        var reqData = {
            id  : data.productID
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

