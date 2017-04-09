import {
	REQUEST_ORDER_30d
} from '../constants';

function receiveOrder30d(data) {
    return {
        type: REQUEST_ORDER_30d,
        orders: data.orders
    };
}

export default function() {
    return dispatch => {
        var url = pageConfig.apiURL + '/admin/order/latest/30';
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveOrder30d(json.data)))
    };
}