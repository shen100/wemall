var config   = require('../../config/config.js');

Page({
    data: {
        id               : '',
        product          : null,
        swiperHeight     : '',
        buyAnimationData : {},
        buyPopupVisible  : false,
        //小程序不能获取组件的高度，暂时写个相对较大的固定值
        buyPopupBottom   : '-1000rpx',
        propertyNames    : ''
    },
    onPriceTap() {

    },
    onHomeTap() {
        wx.switchTab({
            url: '/pages/index/index'
        });
    },
    onCartTap() {
        wx.switchTab({
            url: '/pages/cart/cart'
        });
    },
    onAddToCartTap() {
        var app = getApp();
        // todo 验证是否登陆
        wx.request({
            url: config.api.addToCart,
            method: "POST",
            data: {
                productId : parseInt(this.data.id),
                count: 1
            },
            header: {
                'content-type' : 'application/json',
                'Cookie'       : 'sid=' + app.globalData.sid
            },
            success: function(res) {
                
            }
        });
    },
    onLoad(options) {
        var self = this;
        this.setData({
            id: options.id
        });

        wx.getSystemInfo({
            success: function(res) {
                self.setData({
                    swiperHeight : (res.screenWidth) + 'px'
                });
            }
        });

        wx.request({
            url: config.api.reqProductDetail.replace(':id', options.id),
            success: function(res) {
                var product = res.data.data.product || null;
                product.image.url = config.static.imageDomain + product.image.url;
                product.price     = product.price.toFixed(2);
                for (var i = 0; i < product.images.length; i++) {
                    var url = product.images[i].url;
                    product.images[i].url = config.static.imageDomain + url;
                }
                product.contents = JSON.parse(product.detail);
                for (var i = 0; i < product.contents.length; i++) {
                    if (product.contents[i].type == 'image') {
                        var url = product.contents[i].value;
                        product.contents[i].value = config.static.imageDomain + url;
                    }
                }

                product.properties = [
                    {
                        id: 1, 
                        name: '尺寸',
                        values: [
                            {
                                id: 1,
                                parentId: 1,
                                name: 'S',
                            },
                            {
                                id: 2,
                                parentId: 1,
                                name: 'M',
                            },
                            {
                                id: 3,
                                parentId: 1,
                                name: 'L',
                            },
                            {
                                id: 4,
                                parentId: 1,
                                name: 'XL',
                            },
                            {
                                id: 5,
                                parentId: 1,
                                name: 'XXL',
                            }
                        ]
                    },
                    {
                        id: 2,
                        name: '颜色',
                        values: [
                            {
                                id: 1,
                                parentId: 2,
                                name: '红色',
                            },
                            {
                                id: 2,
                                parentId: 2,
                                name: '绿色',
                            },
                            {
                                id: 3,
                                parentId: 2,
                                name: '红色',
                            },
                            {
                                id: 4,
                                parentId: 2,
                                name: '红色',
                            },
                            {
                                id: 5,
                                parentId: 2,
                                name: '红色',
                            },
                            {
                                id: 6,
                                parentId: 2,
                                name: '绿色',
                            }
                        ]
                    }
                ];
                var propertyNames = '';
                for (var i = 0; i < product.properties.length; i++) {
                    propertyNames += (product.properties[i].name + ' ');
                }
                self.setData({
                    product       : product,
                    propertyNames : propertyNames
                });
            }
        });
    },
    onPropertyChange(event) {
        var data       = event.currentTarget.dataset.id;
        var dataArr    = data.split('-');
        var parentId   = dataArr[0];
        var id         = dataArr[1];
        var properties = this.data.product.properties;
        for (var i = 0; i < properties.length; i++) {
            if (parentId == properties[i].id) {
                var values = properties[i].values;
                for (var j = 0; j < values.length; j++) {
                    if (values[j].id == id) {
                        values[j].selected = !values[j].selected;
                    } else {
                        values[j].selected = false;
                    }
                }
            }
        }
        this.setData({
            product: this.data.product
        });
    },
    onWillBuy() {
        var self = this;
        var animation = wx.createAnimation({
            duration       : 300,
            timingFunction : 'ease-out'    
        });
        animation.bottom(0).step();
        this.setData({
            buyPopupVisible : true,
            buyPopupBottom  : this.data.buyPopupBottom
        });
        setTimeout(function() {
            self.setData({
                buyAnimationData : animation.export()
            });    
        }, 50);
    },
    onWillHideBuy() {
        var self = this;
        var animation = wx.createAnimation({
            duration       : 300,
            timingFunction : 'ease-in'    
        });
        animation.bottom(this.data.buyPopupBottom).step();
        this.setData({
            buyAnimationData : animation.export()
        });
        setTimeout(function() {
            self.setData({
                buyPopupVisible : false
            });    
        }, 330);
    }
})