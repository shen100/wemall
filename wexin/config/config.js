var apiPrefix = 'https://dev.wemall.com/api';

var config = {
    name: "爱宝宝微商城",
    wemallSession: "wemallSession",
    static: {
        imageDomain: 'https://dev.wemall.com'
    },
    api: {
        weappLogin: '/weappLogin',
        reqCategoryList: '/categories',
        reqProductList: '/products',
        reqProductDetail: '/product/:id'
    }
};

for (var key in config.api) {
    config.api[key] = apiPrefix + config.api[key];
}

module.exports = config;