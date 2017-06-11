var config = require('./config/config.js');
var login  = require('./common/login.js');

App({
    onLaunch: function() {
        login.login();
    },
    globalData: {
        userInfo: null,
        encryptedData: "",
        iv: "",
        sid: ""
    }
})