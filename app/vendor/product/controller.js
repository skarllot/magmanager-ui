'use strict';

var _ = require('lodash');
module.exports = productController;

productController.$inject = ['$rootScope', '$stateParams', 'vendorService'];
function productController($rootScope, $stateParams, vendorService) {
    var vm = this;

    vm.vendor = {};
    vm.loaded = false;

    // Loads the product list to current view
    vendorService.GetVendor($stateParams.id)
        .then(function(vendor) {
            $rootScope.title = vendor.name;
            vm.vendor = vendor;
            vm.loaded = true;
        })
        .catch(function(msg) {
            $rootScope.title = 'Invalid';
            vm.vendor = {
                name: 'Invalid vendor Id',
                products: []
            };
            vm.loaded = true;
        });
}