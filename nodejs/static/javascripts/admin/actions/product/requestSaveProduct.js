import {
    REQUEST_SAVE_PRODUCT,
	REQUEST_SAVE_PRODUCT_SUCCESS,
} from '../../constants';

function receive(data) {
    return {
        type    : REQUEST_SAVE_PRODUCT_SUCCESS,
        product : data.product
    };
}

export default function(product) {
    return dispatch => {
        var url = pageConfig.apiPath + '/admin/product/update';
        if (!product.id) {
            url = pageConfig.apiPath + '/admin/product/create';
        }
        var categories = [];
        for (var i = 0; i < product.categories.length; i++) {
            var idArr = product.categories[i].split('-');
            categories.push({
                id: parseInt(idArr[idArr.length - 1])
            });
        }
        var reqData = {
            name          : product.name,
            categories    : categories,
            status        : parseInt(product.status),
            imageID       : product.imageID,
            imageIDs      : product.imageIDs,
            originalPrice : product.originalPrice,
            price         : product.price,
            remark        : product.remark,
            detail        : product.detail
        };
        if (product.id) {
            reqData.id = product.id;
        }
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

