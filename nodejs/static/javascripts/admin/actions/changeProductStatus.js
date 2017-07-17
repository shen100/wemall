import {
	CHANGE_PRODUCT_STATUS
} from '../constants/actionTypes';

function receiveProductStatus(data) {
    return {
        type   : CHANGE_PRODUCT_STATUS,
        id     : data.id,
        status : data.status
    };
}

export default function(reqData) {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/product/status/update';
        return fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id     : reqData.id,
                    status : reqData.status
                })   
            })
            .then(response => response.json())
            .then(json => dispatch(receiveProductStatus(json.data)));
    };
}