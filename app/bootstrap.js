'use strict';

// Bootstraps angular onto the window.document node
var angular = require('angular');
angular.element(document).ready(function() {
    angular.element(document).find('html').addClass('ng-app');
    angular.bootstrap(document, [require('./index')]);
});