import {
    REQUEST_SAVE_INVENTORY,
    REQUEST_SAVE_INVENTORY_SUCCESS
} from '../../constants';

function receive(data) {
    return {
        type     : REQUEST_SAVE_INVENTORY_SUCCESS,
        property : data.property
    };
}

export default function(data) {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/product/inventory/save';
        var reqData = {
            productID   : data.productID,
            inventories : data.inventories
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

