'use strict';

var angular = require('angular');

var app = angular.module('magmanager.vendor', []);

app.service('vendorService', require('./service'));
app.controller('vendorController', require('./controller'));
app.controller('vendorCreateController', require('./controllerCreate'));
app.controller('vendorDeleteController', require('./controllerDelete'));
app.controller('vendorEditController', require('./controllerEdit'));