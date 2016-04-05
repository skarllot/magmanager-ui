'use strict';

var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var production = process.env.NODE_ENV === 'production';

var outputDir = production ? 'dist' : 'build';
var allPlugins = [
    new CleanPlugin(outputDir),
    new CopyWebpackPlugin([
        { from: 'app/index.html' }
    ]),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        minChunks: Infinity
    })
];
var prodPlugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 51200     // ~50kb
    }),
    new webpack.optimize.UglifyJsPlugin({
        comments: false,
        mangle: true,
        compress: {
            warnings: false
        }
    }),
    new webpack.DefinePlugin({
        __SERVER__: !production,
        __DEVELOPMENT__: !production,
        __DEVTOOLS__: !production,
        'process.env': {
            BABEL_ENV: JSON.stringify(process.env.NODE_ENV)
        }
    })
];

if (production) {
    allPlugins = allPlugins.concat(prodPlugins);
}

module.exports = {
    debug: !production,
    //devtool: production ? false : 'eval',
    entry: {
        'common': [
            'angular',
            'angular-ui-bootstrap',
            'angular-ui-router',
            'lodash',
            'normalize.css/normalize.css',
            'bootstrap/dist/css/bootstrap.css',
            'bootstrap/dist/css/bootstrap-theme.css',
            'font-awesome/css/font-awesome.css'
        ],
        'app': './app/bootstrap.js',
        'app-ie8': './app/index.ie8.js'
    },
    module: {
        preLoaders: [
            { test: /\.js$/, loader: 'jshint', exclude: /node_modules/ }
        ],
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.html$/, loader: 'html' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" },
            { test: /\.(woff|woff2)(\?v=[0-9.]+)?$/, loader: "url?prefix=font/&limit=5000&name=fonts/[name].[ext]" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml&name=fonts/[name].[ext]" }
        ]
    },
    output: {
        path: __dirname + '/' + outputDir,
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: allPlugins,
    prodPlugins: prodPlugins,
    jshint: {
        failOnHint: true
    }
};
