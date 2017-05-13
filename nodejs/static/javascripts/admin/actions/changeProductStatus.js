import {
	CHANGE_PRODUCT_STATUS
} from '../constants';

function receiveProductStatus(data) {
    return {
        type   : CHANGE_PRODUCT_STATUS,
        id     : data.id,
        status : data.status
    };
}

export default function(reqData) {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/product/status/update/:id/:status';
        url     = url.replace(':id', reqData.id);
        url     = url.replace(':status', reqData.status);
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveProductStatus(json.data)));
    };
}