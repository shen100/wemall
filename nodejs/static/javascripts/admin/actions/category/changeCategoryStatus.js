import {
	CHANGE_CATEGORY_STATUS
} from '../../constants/actionTypes';

function receiveCategoryStatus(data) {
    return {
        type   : CHANGE_CATEGORY_STATUS,
        id     : data.id,
        status : data.status
    };
}

export default function(reqData) {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/category/status/update';
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
            .then(json => dispatch(receiveCategoryStatus(json.data)));
    };
};

