var apiPrefix = 'http://dev.wemall.com/api';

var config = {
    static: {
        imageDomain: 'http://dev.wemall.com'
    },
    api: {
        reqCategoryList: '/categories',
        reqProductList: '/products'
    }
};

for (var key in config.api) {
    config.api[key] = apiPrefix + config.api[key];
}

module.exports = config;