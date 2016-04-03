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
        controller: 'vendorController',
        controllerAs: 'vm',
        reloadOnSearch: false
    })
    .state('product', {
        title: 'Products',
        url: '/vendor/:id?edit&new&delete',
        template: require('./vendor/product/view.html'),
        controller: 'productController',
        controllerAs: 'vm',
        reloadOnSearch: false
    });
    /*
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
        });*/
}