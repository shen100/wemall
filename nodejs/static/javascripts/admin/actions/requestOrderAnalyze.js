import {
	REQUEST_ORDER_ANALYZE
} from '../constants/actionTypes';

function receiveOrderAnalyze(data) {
    return {
        type: REQUEST_ORDER_ANALYZE,
        data: {
            ...data
        }
    };
}

export default function() {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/order/analyze';
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveOrderAnalyze(json.data)))
    };
}