var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webserver = require('gulp-webserver');
var zip = require('gulp-zip');

gulp.task('default', ['jshint'], function(done) {
    webpack(getProdWebpackConfig(), function(err, stats) {
        if (err) throw new gutil.PluginError('default', err);
        gutil.log('[default]', stats.toString({
            colors: true
        }));
        done();
    });
});

gulp.task('serve', ['default'], function() {
    gulp.src('dist')
        .pipe(webserver({
            livereload: false,
            open: true
        }));
});

gulp.task('create-package', function() {
    return gulp.src('dist/**/*')
        .pipe(zip('magmanager-ui.zip'))
        .pipe(gulp.dest('./'));
});

function getProdWebpackConfig() {
    var webpackConfig = require('../webpack.config.js');
    // var config = Object.create(webpackConfig);
    webpackConfig.debug = false;
    webpackConfig.output.path = 'dist';
    webpackConfig.plugins[0].paths = ['dist'];
    webpackConfig.plugins = webpackConfig.plugins.concat(
        webpackConfig.prodPlugins);
    return webpackConfig;
}