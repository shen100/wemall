import {
	REQUEST_PRODUCT_LIST
} from '../constants';

function receiveProducts(data) {
    return {
        type: REQUEST_PRODUCT_LIST,
        products: data.products
    };
}

export default function() {
    return dispatch => {
        //请求商品列表，order=2表示按创建时间排序
        var url = pageConfig.apiURL + '/admin/products?order=2';
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveProducts(json.data)))
    };
}