var apiPrefix = 'http://dev.wemall.com/api';

var config = {
    reqCategoryList: '/categories',
};

for (var key in config) {
    config[key] = apiPrefix + config[key];
}

module.exports = config;