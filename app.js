'use strict';

var express      = require('express');
var http         = require('http');
var path         = require('path');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var config       = require('./server/config/global_config');
var httpRoute    = require('./server/route/http');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

if (process.env.NODE_ENV === 'development') {
    app.use(logger('dev'));
} else {

}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
    app.use(express.static(path.join(__dirname, 'public')));
}

app.use(function(req, res, next) {
    res.set('X-Powered-By', 'wemall');
    next();
});

var server = http.Server(app);

httpRoute(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

server.listen(config.server.port, function() {
    console.log('Server running at ' + config.server.host + ':' + config.server.port);
});


// node-schedule
// lodash
// nodemailer
// moment
// shelljs
