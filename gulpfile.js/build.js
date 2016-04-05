'use strict';

var browserify = require('browserify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var merge = require('merge-stream');
var runSequence = require('run-sequence');
var source = require('vinyl-source-stream');
var webserver = require('gulp-webserver');

// Compile files to intermediary directory (build)
gulp.task('build', ['jshint'], function(cb) {
    runSequence('clean-build', [
        'browserify',
        'copy-css',
        'copy-html',
        'deploy-deps'
    ], cb);
});

gulp.task('serve-test', ['build'], function() {
    gulp.src('build')
        .pipe(webserver({
            livereload: false,
            open: true
        }));
});

gulp.task('browserify', function() {
    return browserify('app/bootstrap.js')
        .bundle()
        .pipe(source('bootstrap.js'))
        .pipe(gulp.dest('build'));
});

gulp.task('clean-build', function() {
    return gulp.src('build/')
        .pipe(clean());
});

gulp.task('copy-css', function() {
    gulp.src(['app/**/*.css'])
        .pipe(gulp.dest('build/'));
});

gulp.task('copy-html', function() {
    gulp.src(['app/**/*.html'])
        .pipe(gulp.dest('build/'));
});

gulp.task('deploy-deps', function() {
    var cssfiles = gulp.src([
        'normalize.css/normalize.css',
        'bootstrap/dist/css/bootstrap.css',
        'bootstrap/dist/css/bootstrap-theme.css',
        'font-awesome/css/font-awesome.css'
    ], { cwd: 'node_modules' })
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('build/deps/css'));

    var fonts = gulp.src([
        'bootstrap/dist/fonts/*',
        'font-awesome/fonts/*'
    ], { cwd: 'node_modules' })
        .pipe(gulp.dest('build/deps/fonts'));

    var ltIE9 = gulp.src([
        'html5shiv/dist/html5shiv.min.js',
        'respond.js/dest/respond.min.js'
    ], { cwd: 'node_modules' })
        .pipe(gulp.dest('build/deps/js'));

    return merge(cssfiles, fonts, ltIE9);
});

gulp.task('jshint', function() {
    return gulp.src([
        '*.js',
        'gulpfile.js/**/*.js',
        'app/**/*.js'
    ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});