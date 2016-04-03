'use strict';

module.exports = routeConfig;

routeConfig.$inject = ['$routeProvider'];
function routeConfig($routeProvider) {
    $routeProvider
        .when('/', {
            title: 'Home',
            template: require('./home/view.html')
        })
        .when('/vendor/:id', {
            title: 'Products',
            template: require('./vendor/product/view.html'),
            controller: 'productController',
            controllerAs: 'vm'
        })
        .when('/vendor', {
            title: 'Vendors',
            template: require('./vendor/view.html'),
            controller: 'vendorController',
            controllerAs: 'vm',
            reloadOnSearch: false
        })
        .otherwise({
            redirectTo: '/'
        });
}