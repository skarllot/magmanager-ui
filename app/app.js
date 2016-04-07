'use strict';

var angular = require('angular');

var app = angular.module('magmanager', [
    require('angular-ui-router'),
    require('angular-ui-bootstrap'),
    require('./components/modal'),
    require('./vendor'),
    require('./vendor/product')
]);

app.config(require('./routes'));
app.run(appRun);
app.controller('navbarController', require('./common/navbar'));

appRun.$inject = ['$location', '$rootScope'];
function appRun($location, $rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, current, previous) {
        if (current.title) {
            $rootScope.title = current.title;
        }
    });
}