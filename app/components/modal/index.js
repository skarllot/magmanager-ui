'use strict';

var angular = require('angular');
var mod = angular.module('magmanager.modal', [
    require('angular-ui-router'),
    require('angular-ui-bootstrap')
]);

mod.controller('modalController', require('./controller'));
mod.run(loadDefaultTemplate);
module.exports = mod.name;

loadDefaultTemplate.$inject = ['$templateCache'];
function loadDefaultTemplate($templateCache) {
    $templateCache.put('modal/default-template.html', '<!-- Modal Template -->');
}