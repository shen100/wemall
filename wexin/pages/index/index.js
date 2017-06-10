var config   = require('../../config/config.js');

Page({
    data: {
        categories: [],
        categoryIndex: 0,
        itemWidth: '',
        products: [],


        niaoBuShiColor: '',
    },
    onCategoryTap: function() {
        
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
    }
})
