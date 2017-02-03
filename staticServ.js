'use strict';

var express      = require('express');
var http         = require('http');
var path         = require('path');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var config       = require('./server/config/global_config');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var webpack              = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig        = require('./webpack.config.dev');
var compiler             = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.join(__dirname, 'client')));

app.use(function(req, res, next) {
    res.set('X-Powered-By', config['X-Powered-By']);
    next();
});

var server = http.Server(app);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error   = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('staticServError');
});

server.listen(config.server.staticPort, function() {
    console.log('StaticServ running at ' + config.server.host + ':' + config.server.staticPort);
});
