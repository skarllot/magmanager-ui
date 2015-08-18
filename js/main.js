!function(global) {
    'use strict';
    var ng = angular.module('magmanager', [ 'ngRoute', 'restangular', 'ui.bootstrap' ]);

    ng.config([ '$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/', {
            title: 'Home',
            templateUrl: 'view/home.html'
        })
        .when('/vendor/:id', {
            title: 'Products',
            templateUrl: 'view/product.html',
            resolve: {
                deps : [ 'ngLazy', function(ngLazy) {
                    return ngLazy.loadScript(
                        'controllers/product',
                        [ 'services/vendor' ]);
                }]
            }
        })
        .when('/vendor', {
            title: 'Vendors',
            templateUrl: 'view/vendor.html',
            reloadOnSearch: false,
            resolve: {
                deps: [ 'ngLazy', function(ngLazy) {
                    return ngLazy.loadScript(
                        'controllers/vendor',
                        [ 'services/vendor' ]);
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