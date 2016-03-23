require.config({
    paths: {
        'domReady': 'deps/requirejs-domready/domReady',
        'angular': 'deps/angular/angular.min',
        'angular-bootstrap': 'deps/angular-bootstrap/ui-bootstrap-tpls.min',
        'angular-route': 'deps/angular-route/angular-route.min',
        'lodash': 'deps/lodash/lodash.min'
    },
    packages: [
        'common',
        'config',
        'models',
        'vendor',
        'vendor/product'
    ],
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-bootstrap': {
            deps: [ 'angular' ]
        },
        'angular-route' : {
            deps: [ 'angular' ]
        },
        'lodash': {
            exports: '_'
        }
    },
    deps: ['./bootstrap']
});