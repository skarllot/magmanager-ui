'use strict';

var angular = require('angular');
var app = angular.module('magmanager.vendor.product', []);

app.service('vendorService', require('../service'));
app.controller('productController', require('./controller'));
app.controller('productCreateController', require('./controllerCreate'));