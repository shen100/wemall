var config   = require('../../config/config.js');
var testinAB = require('../../sdk/sdk.js');

Page({
    data: {
        categories: [],
        categoryIndex: 0,
        itemWidth: '',
        products: [
            {
                "id": 1,
                "name": "[爱宝宝母婴微商城]雅培菁智1段老包装3听装",
                "url": "../../images/1.jpg",
                "price": 23.44
            },
            {
                "id": 2,
                "name": "[爱宝宝母婴微商城]雅培菁智1段老包装3听装",
                "url": "https:\/\/img.yzcdn.cn\/upload_files\/2017\/03\/21\/FhYyxdpE9iQU2V1HIwqUf4H8jOXs.jpg",
                "price": 23.44
            },
            {
                "id": 3,
                "name": "[爱宝宝母婴微商城]雅培菁智1段老包装3听装",
                "url": "../../images/1.jpg",
                "price": 23.44
            },
            {
                "id": 4,
                "name": "[爱宝宝母婴微商城]雅培菁智1段老包装3听装",
                "url": "../../images/1.jpg",
                "price": 23.44
            },
            {
                "id": 5,
                "name": "测试一下工工fadi地5",
                "url": "../../images/1.jpg",
                "price": 23.44
            },
            {
                "id": 6,
                "name": "测试一下工工fadi地6",
                "url": "../../images/1.jpg",
                "price": 23.44
            },
            {
                "id": 7,
                "name": "测试一下工工fadi地7",
                "url": "../../images/1.jpg",
                "price": 23.44
            },
            {
                "id": 8,
                "name": "测试一下工工fadi地8",
                "url": "../../images/1.jpg",
                "price": 23.44
            },
            {
                "id": 9,
                "name": "测试一下工工fadi地9",
                "url": "../../images/1.jpg",
                "price": 23.44
            }
        ]
    },
    onCategoryTap: function() {
        testinAB.track('click', 1, function() {
            wx.showModal({
                title: '提示',
                content: 'click指标上报成功'
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
                console.log((res.screenWidth - 60) / 2)
                console.log(res.pixelRatio)
                console.log(res.windowWidth)
                console.log(res.screenWidth)
                console.log(res.pixelRatio)
                console.log(res.version)
                console.log(res.platform)
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
        testinAB.init('TESTIN_h7b3111f2-e238-441b-8951-24c4e2121c58');
        testinAB.setDefVars({
            selectedColor: '#e4393c'    
        });

        testinAB.getVars(function(vars) {
            console.log(vars.get('selectedColor'));
            self.setData({
                //selectedColor: vars.get('selectedColor')
            });
        });
    }
})
