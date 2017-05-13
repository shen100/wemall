import {
	REQUEST_HOT_PRODUCT_LIST
} from '../constants';

function receiveHotProducts(data) {
    return {
        type: REQUEST_HOT_PRODUCT_LIST,
        hotProducts: data.products
    };
}

export default function() {
    return dispatch => {
        //请求销售总额最高的前十个商品
        //order=1表示按销售总额排序
        //limit=10表示只获取10条数据
        var url = pageConfig.apiPath + '/admin/products?order=1&limit=10';
        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveHotProducts(json.data)))
    };
}