'use strict';

var webpack           = require('webpack');
var devWebpack        = require('./webpack.config.dev');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

var entry = {};

for (var key in devWebpack.entry) {
    if (devWebpack.entry.hasOwnProperty(key)) {
        entry[key] = devWebpack.entry[key][0];
    }
}

module.exports = {
    entry: entry,
    output: devWebpack.output,
    module: {
        loaders: devWebpack.module.loaders
    },
    resolve: {
        extensions: devWebpack.resolve.extensions
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new ProgressBarPlugin()
    ]
};







