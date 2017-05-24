var config   = require('../../config/config.js');
var testinAB = require('../../sdk/sdk.js');

Page({
    data: {
        categories: [],
        categoryIndex: 0,
        products: [
            {
                "id": 1,
                "name": "testin超级AB测试",
                "url": "../../images/1.jpg",
                "price": 23.44
            },
            {
                "id": 2,
                "name": "testin超级AB测试",
                "url": "https:\/\/img.yzcdn.cn\/upload_files\/2017\/03\/21\/FhYyxdpE9iQU2V1HIwqUf4H8jOXs.jpg",
                "price": 23.44
            },
            {
                "id": 3,
                "name": "测试一下工工fadi地3",
                "url": "../../images/1.jpg",
                "price": 23.44
            },
            {
                "id": 4,
                "name": "测试一下工工fadi地4",
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
        wx.request({
            url : config.reqCategoryList,
            success: function(res) {
                console.log(res);
                self.setData({
                    categories: res.data.data.categories 
                });
            }
        })

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
