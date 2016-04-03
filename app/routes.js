'use strict';

module.exports = routeConfig;

routeConfig.$inject = ['$urlRouterProvider', '$stateProvider'];
function routeConfig($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            title: 'Home',
            url: '/',
            template: require('./home/view.html')
        })
        .state('vendor', {
            title: 'Vendors',
            url: '/vendor?edit&new&delete',
            template: require('./vendor/view.html'),
            resolve: {
                loadVendorModule: loadVendorModule
            },
            controller: 'vendorController',
            controllerAs: 'vm',
            reloadOnSearch: false
        })
        .state('product', {
            title: 'Products',
            url: '/vendor/:id?edit&new&delete',
            template: require('./vendor/product/view.html'),
            resolve: {
                loadProductModule: loadProductModule
            },
            controller: 'productController',
            controllerAs: 'vm',
            reloadOnSearch: false
        });

    loadVendorModule.$inject = ['$q', '$ocLazyLoad'];
    function loadVendorModule($q, $ocLazyLoad) {
        return $q(function(resolve) {
            require.ensure([], function() {
                var modVendor = require('./vendor');
                $ocLazyLoad.load({ name: modVendor });
                resolve(modVendor);
            }, 'vendor');
        });
    }

    loadProductModule.$inject = ['$q', '$ocLazyLoad'];
    function loadProductModule($q, $ocLazyLoad) {
        return $q(function(resolve) {
            require.ensure([], function() {
                var modProduct = require('./vendor/product');
                $ocLazyLoad.load({ name: modProduct });
                resolve(modProduct);
            }, 'product');
        });
    }
}