define([
    'angular',
    'angular-route',
    'angular-bootstrap',
    'common/nglazy'
], function (ng) {
    'use strict';

    var app = ng.module('magmanager', [
        'ngRoute',
        'ui.bootstrap',
        'ngLazy'
    ]);

    app.run(appRun);
    appRun.$inject = ['$location', '$rootScope']
    return app;

    function appRun($location, $rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            if (current.$$route && current.$$route.title) {
                $rootScope.title = current.$$route.title;
            }
        });
    }
});