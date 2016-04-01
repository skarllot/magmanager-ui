var connect = require('connect');
var gulp = require('gulp');
var http = require('http');
var protractor = require('gulp-protractor').protractor;
var protractorQA = require('gulp-protractor-qa');
var selenium = require('selenium-standalone');
var serveStatic = require('serve-static');

gulp.task('e2e-test', ['selenium', 'http-e2e'], function(cb) {
    //var args = ['--baseUrl', 'http://127.0.0.1:8000'];
    gulp.src(['test/specs.js'])
        .pipe(protractor({
            configFile: 'test/conf.js',
            //args: args
        }))
        .on('error', function(e) {
            console.log(e);
        })
        .on('end', cb);
});

gulp.task('e2e-qa', function() {
    protractorQA.init({
        testSrc: 'test/specs.js',
        viewSrc: ['app/**/*.html']
    });
});

gulp.task('http-e2e', ['default'], function(done) {
    var app = connect().use(serveStatic('dist'));
    http.createServer(app).listen(8000, done);
});

gulp.task('selenium', function(done) {
    selenium.install({ logger: console.log }, function() {
        selenium.start(done);
    });
});