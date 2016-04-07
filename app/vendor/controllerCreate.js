'use strict';

var _ = require('lodash');
var models = require('../models');
module.exports = vendorCreateController;

vendorCreateController.$inject = ['$uibModalInstance', 'vendorService'];
function vendorCreateController($uibModalInstance, vendorService) {
    var vm = this;

    vm.vendor = models.vendor.get();
    vm.confirm = false;
    vm.ok = saveHandler;
    vm.cancel = cancelHandler;

    function saveHandler() {
        if (_.isEqual(vm.vendor, models.vendor.get())) {
            $uibModalInstance.dismiss('The vendor was not changed');
            return;
        }

        vendorService.CreateVendor(vm.vendor)
            .then(function(result) {
                $uibModalInstance.close();
            });
    }

    function cancelHandler() {
        $uibModalInstance.dismiss('User cancel');
    }
}