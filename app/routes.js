'use strict';

module.exports = routeConfig;

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
            controller: 'productController',
            controllerAs: 'vm'
        })
        .when('/vendor', {
            title: 'Vendors',
            templateUrl: 'vendor/view.html',
            controller: 'vendorController',
            controllerAs: 'vm',
            reloadOnSearch: false
        })
        .otherwise({
            redirectTo: '/'
        });
}