'use strict';

var express              = require('express');
var http                 = require('http');
var path                 = require('path');
var logger               = require('morgan');
var cookieParser         = require('cookie-parser');
var bodyParser           = require('body-parser');
var webpack              = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig        = require('./webpack.config.dev');
var config               = require('./server/config');
var compiler             = webpack(webpackConfig);

var app = express();

app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function(req, res, next) {
    res.set('X-Powered-By', 'staticServ');
    next();
});

app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));

app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.join(__dirname, 'static')));

app.use(config.page.imgPath, express.static(config.uploadImgDir));

var server = http.Server(app);

app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message : err.message,
        error   : config.env === 'development' ? err : {}
    });
});

server.listen(config.staticPort, function() {
    console.log('StaticServ running at :' + config.staticPort);
});
