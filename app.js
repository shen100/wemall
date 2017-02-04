'use strict';

//读取.env文件，模拟在命令行设置环境变量，这行代码要放在程序的最开头
require('dotenv').load();

var express      = require('express');
var hbs          = require('hbs');
var http         = require('http');
var path         = require('path');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var helpers      = require('./server/helpers');
var config       = require('./server/config/global_config');
var httpRoute    = require('./server/route/http');

var app = express();

hbs.registerPartials(__dirname + '/server/views/partials');
for (var key in helpers) {
    if (helpers.hasOwnProperty(key)) {
        hbs.registerHelper(key, helpers[key]);
    }
}

app.enable('trust proxy');
app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'hbs');

if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
} else {

}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
    res.set('X-Powered-By', config.poweredBy);
    var locals        = res.locals;
    locals.title      = config.frontend.title;
    locals.jsPath     = config.frontend.jsPath;
    locals.cssPath    = config.frontend.cssPath;
    locals.imagePath  = config.frontend.imagePath;
    locals.sitePath   = config.frontend.sitePath;
    next();
});

var server = http.Server(app);

httpRoute(app);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error   = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

server.listen(config.server.port, function() {
    console.log('Server running at ' + config.server.url);
});
