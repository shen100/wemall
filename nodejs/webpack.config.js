'use strict';

var path              = require('path');
var webpack           = require('webpack');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var ManifestPlugin    = require('webpack-manifest-plugin');
var devWebpack        = require('./webpack.config.dev');

var entry = {};

for (var key in devWebpack.entry) {
    if (devWebpack.entry.hasOwnProperty(key)) {
        if (key == 'vendor') {
            entry[key] = devWebpack.entry[key];
        } else {
            entry[key] = devWebpack.entry[key].slice(0, -1)
        }
    }
}

var config = {
    entry: entry,
    output: {
        publicPath    : '/javascripts/',
        filename      : '[name]-[hash:10].js',
        path          : path.resolve(__dirname, './dist/static/javascripts'),
        chunkFilename : '[name]-[chunkHash:10].js'
    },
    module: {
        loaders: devWebpack.module.loaders
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor', 
            filename: 'vendor-[hash:10].js'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ProgressBarPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ManifestPlugin({
            fileName: 'rev-manifest.json'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"production"'
            }
        })
    ]
};

module.exports = config;
