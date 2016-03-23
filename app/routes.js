define(['app'], function (app) {
    'use strict';

    app.config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];
    function routeConfig($routeProvider) {
        $routeProvider
            .when('/', {
                title: 'Home',
                templateUrl: 'home/view.html'
            })
            .when('/vendor/:id', {
                title: 'Products',
                templateUrl: 'vendor/product/view.html',
                resolve: {
                    deps: loadProductScript
                }
            })
            .when('/vendor', {
                title: 'Vendors',
                templateUrl: 'vendor/view.html',
                reloadOnSearch: false,
                resolve: {
                    deps: loadVendorScript
                }
            })
            .otherwise({
                redirectTo: '/'
            });

        loadVendorScript.$inject = ['ngLazy'];
        function loadVendorScript(ngLazy) {
            return ngLazy.loadScript('vendor');
        }

        loadProductScript.$inject = ['ngLazy'];
        function loadProductScript(ngLazy) {
            return ngLazy.loadScript('vendor/product');
        }
    }
});