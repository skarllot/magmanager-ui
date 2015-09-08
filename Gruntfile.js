var pkgjson = require('./package.json');

var config = {
  pkg: pkgjson,
  app: 'app',
  dist: 'dist'
};

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
            'bootstrap/dist/fonts/*',
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
        cwd: '<%= config.dist %>',
        src: [ '**/*' ],
        dest: '.'
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'app/**/*.js', '!**/deps/**']
    },
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost'
      },
      test: {
        options: {
          base: ['app']
        }
      },
      server: {
        options: {
          base: 'dist'
        }
      }
    },
    protractor_webdriver: {
      e2eUpdate: {
        options: {
          command: 'webdriver-manager update --standalone'
        }
      },
      e2eStart: {
        options: {}
      }
    },
    protractor: {
      options: {
        configFile: 'test/conf.js',
        noColor: false,
        args: {}
      },
      e2e: {
        options: {
          keepAlive: false
        }
      },
      continuous: {
        options: {
          keepAlive: true
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      protractor: {
        files: ['app/**/*'],
        tasks: ['jshint', 'protractor:continuous']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-protractor-webdriver');
  grunt.loadNpmTasks('grunt-protractor-runner');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'clean',
    'copy',
    'uglify',
    'cssmin',
    'htmlmin',
    'compress'
  ]);
  
  grunt.registerTask('serve', [
    'connect:server:keepalive'
  ]);
  
  grunt.registerTask('serve-test', [
    'connect:test:keepalive'
  ]);
  
  grunt.registerTask('e2e-test', [
    'connect:test',
    'protractor_webdriver:e2eStart',
    'protractor:e2e'
  ]);
  
  grunt.registerTask('e2e-continuous', [
    'connect:test',
    'protractor_webdriver:e2eStart',
    'protractor:continuous'
  ]);
};