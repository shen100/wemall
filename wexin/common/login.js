var login = {
    loginResponders: [],
    addLoginResponder: function(responder) {
        this.loginResponders.push(responder);
    },
    login: function() {
        var self    = this;
        var resData = {};
        var app     = App();

        function setUserInfo() {
            wx.request({
                url: config.api.setWeAppUser,
                data: {
                    encryptedData : resData.encryptedData,
                    iv            : resData.iv
                },
                header: {
                    'content-type' : 'application/json',
                    'Cookie'       : resData.sid
                },
                success: function(res) {
                    app.globalData.userInfo      = resData.userInfo;
                    app.globalData.encryptedData = resData.encryptedData;
                    app.globalData.iv            = resData.iv;
                    app.globalData.sid           = resData.sid;
                    for (var i = 0; i < self.loginResponders.length; i++) {
                        self.loginResponders[i]();
                    }
                }
            });
        }

        wx.login({
            success: function(res) {
                if (res.code) {
                    wx.request({
                        url: config.api.weappLogin,
                        data: {
                            code: res.code
                        },
                        success: function(res) {
                            resData.sid = res.data.data.sid;
                            jsCodeDone = true;
                            jsCodeDone && userInfoDone && setUserInfo();
                        }
                    });

                    wx.getUserInfo({
                        success: function(res) {
                            resData.userInfo      = res.userInfo;
                            resData.encryptedData = res.encryptedData;
                            resData.iv            = res.iv;
                            userInfoDone          = true;
                            jsCodeDone && userInfoDone && setUserInfo();
                        },
                        fail: function(data) {
                            console.log(data);
                        }
                    });
                }
            }
        });
    },

    logout: function() {

    }
}

module.exports = login;