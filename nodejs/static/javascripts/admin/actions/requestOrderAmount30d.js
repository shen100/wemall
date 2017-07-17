import {
	REQUEST_ORDER_AMOUNT_30d
} from '../constants/actionTypes';

function receiveOrderAmount30d(data) {
    return {
        type: REQUEST_ORDER_AMOUNT_30d,
        amounts: data.amounts
    };
}

export default function() {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/order/amount/latest/30';
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveOrderAmount30d(json.data)))
    };
}