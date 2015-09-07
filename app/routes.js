define(['app'], function(app) {
    'use strict';
    
    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/', {
            title: 'Home',
            templateUrl: 'home/view.html'
        })
        .when('/vendor/:id', {
            title: 'Products',
            templateUrl: 'vendor/product/view.html',
            resolve: {
                deps : [ 'ngLazy', function(ngLazy) {
                    return ngLazy.loadScript('vendor/product');
                }]
            }
        })
        .when('/vendor', {
            title: 'Vendors',
            templateUrl: 'vendor/view.html',
            reloadOnSearch: false,
            resolve: {
                deps: [ 'ngLazy', function(ngLazy) {
                    return ngLazy.loadScript('vendor');
                }]
            }
        })
        .otherwise({
            redirectTo: '/'
        });
    }]);
});