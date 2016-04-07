'use strict';

module.exports = vendorDeleteController;

vendorDeleteController.$inject = ['$stateParams', '$uibModalInstance', 'vendorService'];
function vendorDeleteController($stateParams, $uibModalInstance, vendorService) {
    var vm = this;

    vm.vendor = {};
    vm.confirm = false;
    vm.ok = deleteHandler;
    vm.cancel = cancelHandler;

    vendorService.GetVendor($stateParams.id)
        .then(function(vendor) {
            vm.vendor = vendor;
        })
        .catch(function(msg) {
            $uibModalInstance.dismiss(msg.message);
        });

    function deleteHandler() {
        vendorService.DeleteVendor(vm.vendor)
            .then(function() {
                $uibModalInstance.close();
            });
    }

    function cancelHandler() {
        $uibModalInstance.dismiss('User cancel');
    }
}