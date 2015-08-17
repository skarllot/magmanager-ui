//jQuery.ajaxSetup({ cache: true });
//jQuery.ajaxPrefilter(function(options, originalOptions, jqXHR) {
//    options.async = true;
//});

!function(root) {
    var ng = angular.module('magmanager', [ 'ngRoute', 'restangular', 'ui.bootstrap' ]);

    ng.config([ '$routeProvider', '$controllerProvider', '$provide', function($routeProvider, $controllerProvider, $provide) {
        // Lazy loading
        root.ngLazy = {
            controller: $controllerProvider.register,
            //directive: $compileProvider.directive,
            //filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        }

        $routeProvider
        .when('/', {
            title: 'Home',
            templateUrl: 'view/home.html'
        })
        .when('/vendor/:id', {
            title: 'Products',
            templateUrl: 'view/product.html',
            resolve: {
                svc: [ 'lazyService', function(lazyService) {
                    return lazyService.loadScript('services/vendor');
                }],
                ctrl: [ 'lazyService', function(lazyService) {
                    return lazyService.loadScript('controllers/product');
                }]
            }
        })
        .when('/vendor', {
            title: 'Vendors',
            templateUrl: 'view/vendor.html',
            reloadOnSearch: false,
            resolve: {
                svc: [ 'lazyService', function(lazyService) {
                    return lazyService.loadScript('services/vendor');
                }],
                ctrl: [ 'lazyService', function(lazyService) {
                    return lazyService.loadScript('controllers/vendor');
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