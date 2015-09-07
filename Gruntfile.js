var pkgjson = require('./package.json');

var config = {
  pkg: pkgjson,
  app: 'app',
  dist: 'dist'
}

module.exports = function (grunt) {

  // Configuration
  grunt.initConfig({
    config: config,
    pkg: config.pkg,
    bower: grunt.file.readJSON('./.bowerrc'),
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/',
          src: ['*.*', '**/*.*', '!**/deps/**', '!**/*.js', '!**/*.css', '!**/*.html'],
          dest: '<%= config.dist %>'
        },
        {
          expand: true,
          cwd: '<%= config.app %>/deps',
          src: [
            'bootstrap/dist/css/bootstrap.min.css',
            'bootstrap/dist/css/bootstrap-theme.min.css',
            'bootstrap/fonts/*',
            'font-awesome/css/font-awesome.min.css',
            'font-awesome/fonts/*',
            'lodash/lodash.min.js',
            'angular/angular.min.js',
            'angular-bootstrap/ui-bootstrap-tpls.min.js',
            'angular-route/angular-route.min.js',
            'restangular/dist/restangular.min.js',
            'html5shiv/dist/html5shiv.min.js',
            'respond/dest/respond.min.js'
          ],
          dest: '<%= config.dist %>/deps'
        }]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> lib - v<%= pkg.version %> -' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>',
          src: [ '**/*.js', '!**/deps/**' ],
          dest: '<%= config.dist %>'
        },
        {
          expand: true,
          cwd: '<%= config.app %>/deps',
          src: [
            'requirejs/require.js',
            'requirejs-domready/domReady.js'
          ],
          dest: '<%= config.dist %>/deps'
        }]
      }
    },
    clean: {
      dist: ['<%= config.dist %>']
    },
    cssmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>',
          src: [ '**/*.css', '!**/deps/**' ],
          dest: '<%= config.dist %>'
        },
        {
          expand: true,
          cwd: '<%= config.app %>',
          src: 'deps/normalize.css/normalize.css',
          dest: '<%= config.dist %>'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.app %>',
          src: [ '**/*.html', '!**/deps/**' ],
          dest: '<%= config.dist %>'
        }]
      }
    },
    compress: {
      dist: {
        options: {
          archive: 'magmanager-ui.zip'
        },
        expand: true,
        cwd: '<%= config.app %>',
        src: [ '**/*' ],
        dest: '.'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-compress');

  grunt.registerTask('default', [
    'clean',
    'copy',
    'uglify',
    'cssmin',
    'htmlmin',
    'compress'
  ]);
};