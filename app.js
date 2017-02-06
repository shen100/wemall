'use strict';

//读取.env文件，模拟在命令行设置环境变量，这行代码要放在程序的最开头
require('dotenv').load();

if (process.env.NODE_ENV === 'development') {
    process.stderr.on('data', function(data) {
        console.log(data);
    });
}

let express      = require('express');
let hbs          = require('hbs');
let http         = require('http');
let path         = require('path');
let logger       = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser   = require('body-parser');
let helpers      = require('./server/helpers');
let config       = require('./server/config/global_config');
let httpRoute    = require('./server/route/http');

let app = express();

hbs.registerPartials(__dirname + '/server/views/partials');
for (let key in helpers) {
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
    res.set('X-Powered-By', config.system.poweredBy);
    let locals        = res.locals;
    locals.env        = process.env.NODE_ENV;
    locals.title      = config.frontend.title;
    locals.jsPath     = config.frontend.jsPath;
    locals.cssPath    = config.frontend.cssPath;
    locals.imagePath  = config.frontend.imagePath;
    locals.sitePath   = config.frontend.sitePath;
    next();
});

let server = http.Server(app);

httpRoute(app);

app.use(function(req, res, next) {
    let err = new Error('Not Found');
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
