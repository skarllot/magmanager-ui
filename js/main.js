var app = angular.module('magmanager', [ 'ngRoute', 'ngResource', 'ui.bootstrap' ]);

app.config([ '$routeProvider', '$controllerProvider', function($routeProvider, $controllerProvider) {
    // Lazy loading
    app.registerCtrl = $controllerProvider.register;
    
    $routeProvider
    .when('/', {
        title: 'Home',
        templateUrl: 'view/home.html'
    })
    .when('/vendor', {
        title: 'Vendors',
        templateUrl: 'view/vendor.html'
    })
    .otherwise({
        redirectTo: '/'
    });
}]);

app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        if (current.$$route && current.$$route.title) {
            $rootScope.title = current.$$route.title;
        }
    });
}]);