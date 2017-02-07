'use strict';

var path           = require('path');
var webpack        = require('webpack');
var config         = require('./server/config/global_config');
var hotMiddleware  = 'webpack-hot-middleware/client?reload=true';

function getEntryMap() {
    var entryArr = [
        'admin/index',
        'admin/overview/orderAnalyze',
        'admin/overview/productAnalyze',
        'admin/overview/userAnalyze',

        'admin/category/createCategory'
    ];
    var entryMap = {};
    entryArr.forEach(function(key) {
        entryMap[key] = ['./client/javascripts/' + key + '.js', hotMiddleware];
    });
    return entryMap;
}

module.exports = {
    entry: getEntryMap(),
    output: {
        filename   : './javascripts/[name].js',
        path       : path.resolve(__dirname, './dist/app/client'),
        publicPath : config.frontend.sitePath + '/'
    },
    devtool: 'eval-source-map',
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                loader: 'vue'
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: [/node_modules/, /javascripts\/libs/],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'url-loader?limit=8192&name=fonts/[name].[hash:8].[ext]'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
　　　　　　      loader: 'url-loader?limit=8192&name=images/[name].[hash:8].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json']
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
