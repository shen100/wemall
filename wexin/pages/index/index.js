var config   = require('../../config/config.js');
var testinAB = require('../../sdk/sdk.js');

Page({
    data: {
        categories: [],
        categoryIndex: 0,
        itemWidth: '',
        products: [],


        niaoBuShiColor: '',
    },
    onCategoryTap: function() {
        testinAB.track('nbsbtnclick', 1, function() {
            wx.showModal({
                title: '提示',
                content: 'nbsbtnclick 指标上报成功'
            })
        });    
    },
    onProductTap: function(event) {
        var id = event.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/product/product?id=' + id
        });
    },
    onLoad: function() {
        var self = this;

        wx.getSystemInfo({
            success: function(res) {
                self.setData({
                    itemWidth: (res.screenWidth - 40) / 2 + 'px'
                });
            }
        });

        wx.request({
            url : config.api.reqCategoryList,
            success: function(res) {
                var categories = res.data.data.categories || [];
                self.setData({
                    categories: categories 
                });

                if (categories.length > 0) {
                    wx.request({
                        url : config.api.reqProductList + "?cateId=" + categories[0].id,
                        success: function(res) {
                            var products = res.data.data.products || [];
                            for (var i = 0; i < products.length; i++) {
                                products[i].image.url = config.static.imageDomain + products[i].image.url;
                            }
                            self.setData({
                                products: products 
                            });
                        }
                    });
                }
            }
        });

        var self = this;
        testinAB.init('TESTIN_h793c3619-8bac-4ddb-b541-df2c3d7aa1b7');
        testinAB.setDefVars({
            selectedColor: '#e4393c'    
        });

        testinAB.getVars(function getVars(vars) {
            var color = vars.get('color');
            if (color == 'yellow') {
                color = '#ff0';
            } else if (color == 'red') {
                color = '#f00';
            }
            self.setData({
                niaoBuShiColor: color
            });
        });
    }
})
