!function(global) {
    'use strict';
    var ng = angular.module('magmanager', [ 'ngRoute', 'restangular', 'ui.bootstrap' ]);

    ng.config([ '$routeProvider', function($routeProvider) {
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
                    return ngLazy.loadScript(
                        'vendor/product/controller',
                        [ 'vendor/service' ]);
                }]
            }
        })
        .when('/vendor', {
            title: 'Vendors',
            templateUrl: 'vendor/view.html',
            reloadOnSearch: false,
            resolve: {
                deps: [ 'ngLazy', function(ngLazy) {
                    return ngLazy.loadScript(
                        'vendor/controller',
                        [ 'vendor/service' ]);
                }]
            }
        })
        .otherwise({
            redirectTo: '/'
        });
    }])
    .run(['$location', '$rootScope', function($location, $rootScope) {
        $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
            if (current.$$route && current.$$route.title) {
                $rootScope.title = current.$$route.title;
            }
        });
    }]);
}(window);