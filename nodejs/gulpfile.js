var gulp         = require('gulp');
var gulpUtil     = require('gulp-util');
var minifycss    = require('gulp-minify-css');
var clean        = require('gulp-clean');
var rename       = require('gulp-rename');
var rev          = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var webpack      = require('webpack');
var webpkConfig  = require('./webpack.config.js');

function getTimestamp() {
    var date      = new Date();
    var year      = date.getFullYear();
    var month     = date.getMonth() + 1;
    var d         = date.getDate();
    month         = month < 10 ? '0' + month : month;
    d             = d < 10 ? '0' + d : d;
    var hour      = date.getHours();
    hour          = hour < 10 ? '0' + hour : hour; 
    var minute    = date.getMinutes();
    minute        = minute < 10 ? '0' + minute : minute; 
    return '' + year + month + d + hour + minute;
}

var timestamp  = getTimestamp();
var distPath   = 'dist/';

//nodejs项目发布目录
var nodejsDistPath = distPath + 'nodejs/';

//nodejs项目发布目录下的timestamp目录
var nodejsTimestampPath = nodejsDistPath + timestamp + '/';

//静态资源发布目录
var staticDistPath = distPath + 'static/';

gulp.task('clean', function() {
    return gulp.src(distPath)
        .pipe(clean());
});

//运行webpack
gulp.task('webpack', ['clean'], function(callback) {
    var compiler = webpack(Object.create(webpkConfig));
    compiler.run(function(err, stats) {
        if (err) {
            throw new gulpUtil.PluginError('webpack', err);
        }
        gulpUtil.log('webpack', stats.toString({
            colors: true
        }));
        callback();
    });
});

//webpack没有处理javascripts/libs目录下的js
gulp.task('jslibs', ['clean'], function() {
    return gulp.src(['static/javascripts/libs/**/*.js'])
        .pipe(gulp.dest(staticDistPath + 'javascripts/libs'))
});

gulp.task('copy-css', ['clean'], function() {
    return gulp.src(['static/styles/**/*.css'])
        .pipe(minifycss()) //压缩
        .pipe(rev())       //文件名加hash
        .pipe(gulp.dest(staticDistPath + 'styles'))
        .pipe(rev.manifest())
        .pipe(gulp.dest(staticDistPath + 'styles'));//生成rev-manifest.json
});

gulp.task('copy-server', ['clean'], function() {
    return gulp.src(['server/**/*'])
        .pipe(gulp.dest(nodejsTimestampPath + 'server'))
});

//修改HTML中js文件名，css文件名
gulp.task('rev', ['copy-server', 'webpack', 'jslibs', 'copy-css'], function() {
    return gulp.src([
            staticDistPath      + '**/*.json', 
            nodejsTimestampPath + 'server/views/**/*.hbs'
        ])
        .pipe(revCollector()) 
        .pipe(gulp.dest(nodejsTimestampPath + 'server/views'));
});

//依赖webpack任务，运行webpack任务后，也会生成图片
gulp.task('copy-images', ['webpack'], function() {
    return gulp.src([
            'static/images/**/*'
        ])
        .pipe(gulp.dest(staticDistPath + 'images'));
});

//依赖webpack任务，运行webpack任务后，也会生成字体文件
gulp.task('copy-fonts', ['webpack'], function() {
    return gulp.src([
            'static/fonts/**/*'
        ])
        .pipe(gulp.dest(staticDistPath + 'fonts'));
});

gulp.task('copy-app.js', ['clean'], function() {
    return gulp.src(['app.js'])
        .pipe(gulp.dest(nodejsTimestampPath));
});

gulp.task('copy-package.json', ['clean'], function() {
    return gulp.src(['package.json'])
        .pipe(gulp.dest(nodejsDistPath));
});

gulp.task('copy-configuration.json', ['clean'], function() {
    return gulp.src(['../configuration.prod.json'])
        .pipe(rename('configuration.json'))
        .pipe(gulp.dest(nodejsDistPath));
});

//产品模式
gulp.task('default', [
    'rev',
    'copy-fonts', 
    'copy-images',
    'copy-app.js', 
    'copy-package.json',
    'copy-configuration.json'
]);





