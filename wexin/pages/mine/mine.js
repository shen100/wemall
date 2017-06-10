Page({
    data: {
        userInfo: null
    },
    onUserInfoCallback(userInfo) {
        this.setData({
            userInfo: userInfo
        })
    },
    onLoad: function() {
        var app = getApp();
        var userInfo = app.globalData.userInfo;
        if (!userInfo) {
            app.addUserInfoCallback(this.onUserInfoCallback.bind(this));
        } else {
            this.setData({
                userInfo: userInfo
            })    
        }
    }
})