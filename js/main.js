angular.module('magmanager', [ 'ngRoute', 'ngResource', 'ui.bootstrap' ]);

angular.module('magmanager')
    .config([ '$routeProvider', '$controllerProvider', function($routeProvider, $controllerProvider) {
        // Lazy loading
        angular.module('magmanager').registerCtrl = $controllerProvider.register;

        $routeProvider
        .when('/', {
            title: 'Home',
            templateUrl: 'view/home.html'
        })
        .when('/vendor/:id', {
            title: 'Vendor',
            templateUrl: 'view/vendorid.html'
        })
        .when('/vendor', {
            title: 'Vendors',
            templateUrl: 'view/vendor.html'
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