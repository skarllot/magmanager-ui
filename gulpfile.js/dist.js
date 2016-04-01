var clean = require('gulp-clean');
var cleanCSS = require('gulp-clean-css');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var merge = require('merge-stream');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');
var zip = require('gulp-zip');

//var buffer = require('vinyl-buffer');
//var es = require('event-stream');

gulp.task('default', ['build'], function(cb) {
    runSequence('clean-dist', [
        'cssmin',
        'htmlmin',
        'uglify',
        'copy-deps'
    ],
        'create-package',
        cb);
});

gulp.task('serve', ['default'], function() {
    gulp.src('dist')
        .pipe(webserver({
            livereload: false,
            open: true
        }));
});

gulp.task('clean-dist', function() {
    return gulp.src('dist/')
        .pipe(clean());
});

gulp.task('create-package', function() {
    return gulp.src('dist/**/*')
        .pipe(zip('magmanager-ui.zip'))
        .pipe(gulp.dest('./'));
});

gulp.task('cssmin', function() {
    var config = {
        advanced: true,
        aggresiveMerging: true,
        keepSpecialComments: 0
    };

    return gulp.src(['build/**/*.css'])
        .pipe(cleanCSS(config))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy-deps', function() {
    var fonts = gulp.src('build/deps/fonts/*')
        .pipe(gulp.dest('dist/deps/fonts'));

    var ltIE9 = gulp.src('build/deps/js/*')
        .pipe(gulp.dest('dist/deps/js'));

    return merge(fonts, ltIE9);
});

gulp.task('htmlmin', function() {
    var config = {
        collapseWhitespace: true,
        removeComments: true
    };

    return gulp.src(['build/**/*.html'])
        .pipe(htmlmin(config))
        .pipe(gulp.dest('dist'));
});

gulp.task('uglify', function() {
    return gulp.src(['build/**/*.js', '!build/deps/**'])
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});