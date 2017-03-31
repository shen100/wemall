'use strict';

var path                     = require('path');
var webpack                  = require('webpack');
var BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
var appConfig                = require('./appconfig.json');
var hotMiddleware            = 'webpack-hot-middleware/client?reload=true';
var jsPath                   = appConfig.page.JSPath;

function getEntryMap() {
    var entryArr = [
        'admin/index'
    ];
    var entryMap = {};
    entryArr.forEach(function(key) {
        entryMap[key] = ['./client/javascripts/' + key + '.js', hotMiddleware];
    });
    entryMap['vendor'] = [
        'react', 
        'react-dom',
        'react-redux',
        'redux'
    ];
    return entryMap;
}

var config = {
    entry: getEntryMap(),
    output: {
        publicPath : appConfig.page.SitePath + '/',
        filename   : '.' + jsPath + '/[name].js',
        path       : path.resolve(__dirname, './dist/app/client')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader?-babelrc,+cacheDirectory,presets[]=es2015,presets[]=stage-0,presets[]=react'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', 
            filename: '.' + jsPath + '/vendor.bundle.js'
        }),
        new BellOnBundlerErrorPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = config;
