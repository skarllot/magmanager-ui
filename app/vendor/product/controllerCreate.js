'use strict';

var _ = require('lodash');
var models = require('../../models');
module.exports = productCreateController;

productCreateController.$inject = ['$uibModalInstance', 'vendorService'];
function productCreateController($uibModalInstance, vendorService) {
    var vm = this;

    vm.product = models.product.get();
    vm.confirm = false;
    vm.ok = saveHandler;
    vm.cancel = cancelHandler;

    function saveHandler() {
        if (_.isEqual(vm.vendor, models.product.get())) {
            $uibModalInstance.dismiss('The product was not changed');
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