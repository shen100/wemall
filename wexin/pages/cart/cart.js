var config   = require('../../config/config.js');

Page({
    data: {
        appName: config.name,
        carts: []
    },
    onLoad: function() {
        var carts = [
            {
                id: 1,
                name: "【爱宝宝母婴微商城】防腹泻奶粉——赋儿嘉",
                image: {
                    url: "/upload/img/2017/05/28/4ad4c6f6-fc95-4a1e-940b-81f2e6bceaee.jpg"
                },
                price: 198,
                count: 2
            },
            {
                id: 2,
                name: "【爱宝宝母婴微商城】防腹泻奶粉",
                image: {
                    url: "/upload/img/2017/05/28/4ad4c6f6-fc95-4a1e-940b-81f2e6bceaee.jpg"
                },
                price: 298,
                count: 3
            }
        ]
        for (var i = 0; i < carts.length; i++) {
            carts[i].image.url = config.static.imageDomain + carts[i].image.url;
            carts[i].checked = true;
        }
        this.setData({
            carts: carts 
        });
    }
})