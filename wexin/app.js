var userInfoCallbacks = [];

App({
    onLaunch: function() {
        var self = this;
        wx.login({
            success: function(res) {
                console.log(res);
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
                })
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