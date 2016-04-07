'use strict';

module.exports = routeConfig;

routeConfig.$inject = ['$urlRouterProvider', '$stateProvider'];
function routeConfig($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            title: 'Home',
            url: '/',
            templateUrl: 'home/view.html'
        })
        .state('vendor', {
            title: 'Vendors',
            url: '/vendor?edit&new&delete',
            templateUrl: 'vendor/view.html',
            controller: 'vendorController',
            controllerAs: 'vm',
            reloadOnSearch: false
        })
        .state('vendor.edit', {
            title: 'Edit Vendor',
            url: '/edit/:id',
            templateUrl: 'modal/default-template.html',
            controller: 'modalController',
            resolve: {
                modalParams: function() {
                    return {
                        templateUrl: 'vendor/modalEdit.html',
                        controller: 'vendorEditController',
                        controllerAs: 'vm',
                        backdrop: 'static'
                    };
                }
            }
        })
        .state('product', {
            title: 'Products',
            url: '/vendor/:id?edit&new&delete',
            templateUrl: 'vendor/product/view.html',
            controller: 'productController',
            controllerAs: 'vm',
            reloadOnSearch: false
        });
}