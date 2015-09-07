define([
    'angular',
    'angular-route',
    'restangular',
    'angular-bootstrap',
    'common/nglazy'
], function(ng) {
    'use strict';
    
    var app = ng.module('magmanager', [
        'ngRoute',
        'restangular',
        'ui.bootstrap',
        'ngLazy'
    ]);
    
    app.run(['$location', '$rootScope', function($location, $rootScope) {
        $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
            if (current.$$route && current.$$route.title) {
                $rootScope.title = current.$$route.title;
            }
        });
    }]);
    
    return app;
});