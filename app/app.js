'use strict';

// Styles
require('normalize.css/normalize.css');
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap/dist/css/bootstrap-theme.css');
require('font-awesome/css/font-awesome.css');
require('./common/main.css');

var angular = require('angular');

var app = angular.module('magmanager', [
    require('angular-route'),
    require('angular-ui-bootstrap'),
    require('./vendor'),
    require('./vendor/product')
]);

app.config(require('./routes'));
app.run(appRun);
app.controller('navbarController', require('./common/navbar'));

appRun.$inject = ['$location', '$rootScope'];
function appRun($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
        if (current.$$route && current.$$route.title) {
            $rootScope.title = current.$$route.title;
        }
    });
}