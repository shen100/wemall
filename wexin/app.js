var config = require('./config/config.js');

var userInfoCallbacks = [];

App({
    onLaunch: function() {
        var self = this;
        wx.login({
            success: function(res) {
                console.log(res);

                if (res.code) {
                    wx.request({
                        url: config.api.weappLogin,
                        data: {
                            code: res.code
                        },
                        success: function(res) {
                            try {
                                wx.setStorageSync(config.wemallSession, res.data.data.sid);
                            } catch (err) {
                                console.log(err);
                            }
                        }
                    });

                    wx.getUserInfo({
                        success: function(res) {
                            for (var i = 0; i < userInfoCallbacks.length; i++) {
                                userInfoCallbacks[i](res.userInfo);
                            }
                            userInfoCallbacks = [];
                            self.globalData.userInfo = res.userInfo;
                        },
                        fail: function(data) {
                            console.log(data);
                        }
                    });
                }
            }
        });
    },
    addUserInfoCallback: function(callback) {
        userInfoCallbacks.push(callback);
    },
    globalData: {
        userInfo: null    
    }
})