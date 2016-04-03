var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('../webpack.config.js');

// Compile files to intermediary directory (build)
gulp.task('build', ['jshint'], function(done) {
    webpack(webpackConfig).run(function(err, stats) {
        if (err) throw new gutil.PluginError('build', err);
        gutil.log('[build]', stats.toString({
            colors: true
        }));
        done();
    });
});

gulp.task('serve-test', function() {
    new WebpackDevServer(webpack(webpackConfig), {
        publicPath: '/',
        stats: {
            colors: true
        }
    }).listen(8080, 'localhost', function(err) {
        if (err) throw new gutil.PluginError('serve-test', err);
        gutil.log('[serve-test]', 'http://localhost:8080/webpack-dev-server/');
    });
});

gulp.task('jshint', function() {
    return gulp.src([
        '*.js',
        'app/**/*.js',
        'gulpfile.js/**/*.js',
        'test/**/*.js'
    ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});
