'use strict';

var path                     = require('path');
var webpack                  = require('webpack');
var BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
var config                   = require('./server/config');
var hotMiddleware            = 'webpack-hot-middleware/client?reload=true';
var jsPath                   = config.page.jsPath;

function getEntryMap() {
    var entryArr = [
        'admin/app'
    ];
    var entryMap = {};
    entryArr.forEach(function(key) {
        entryMap[key] = ['babel-polyfill', './static/javascripts/' + key + '.js', hotMiddleware];
    });

    entryMap['vendor'] = [
        'react', 
        'react-dom',
        'react-redux',
        'redux',
        'echarts'
    ];
    return entryMap;
}

var config = {
    entry: getEntryMap(),
    output: {
        publicPath    : '/',
        filename      : './javascripts/[name].js',
        path          : path.resolve(__dirname, './dist/app/client'),
        chunkFilename : './javascripts/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader?+babelrc,+cacheDirectory,presets[]=es2015,presets[]=stage-0,presets[]=react'
            }
        ]
    },
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', 
            filename:  './javascripts/vendor.bundle.js'
        }),
        new BellOnBundlerErrorPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = config;
