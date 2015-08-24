require.config({
    paths: {
        'domReady': '../deps/requirejs-domready/domReady',
        'angular': '../deps/angular/angular.min',
        'angular-bootstrap': '../deps/angular-bootstrap/ui-bootstrap-tpls.min',
        'angular-route': '../deps/angular-route/angular-route.min',
        'lodash': '../deps/lodash/lodash.min',
        'restangular': '../deps/restangular/dist/restangular.min',
        'vendor': '../vendor',
        'product': '../vendor/product'
    },
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
        },
        'restangular': {
            deps: [ 'angular', 'lodash' ]
        }
    },
    deps: ['./bootstrap']
});