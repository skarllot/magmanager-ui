'use strict';

var _ = require('lodash');
module.exports = vendorController;

vendorController.$inject = ['vendorService'];
function vendorController(vendorService) {
    var vm = this;

    vm.loaded = false;
    vm.vendors = [];
    vm.refresh = refresh;

    // Loads the vendor list to current view
    vendorService.GetVendorList()
        .then(function(vendors) {
            vm.vendors = vendors;
            vm.loaded = true;
        });

    function refresh() {
        vm.vendors = [];
        vm.loaded = false;
        vendorService.GetVendors(true)
            .then(function(vendors) {
                vm.vendors = vendors;
                vm.loaded = true;
            });
    }
}
