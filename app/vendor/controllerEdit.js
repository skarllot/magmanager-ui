'use strict';

module.exports = vendorEditController;

vendorEditController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'vendorService'];
function vendorEditController($scope, $stateParams, $uibModalInstance, vendorService) {
    var vm = this;

    vm.vendor = {};
    vm.confirm = false;
    vm.ok = saveHandler;
    vm.cancel = cancelHandler;
    vm.safeCancel = safeCancelHandler;
    $scope.$on('$routeChangeSuccess', closeOnRouteUpdate);

    vendorService.GetVendorClone($stateParams.id)
        .then(function(vendor) {
            vm.vendor = vendor;
        })
        .catch(function(msg) {
            $uibModalInstance.dismiss(msg.message);
        });

    function saveHandler() {
        vendorService.UpdateVendor(vm.vendor)
            .then(function() {
                $uibModalInstance.close();
            }, function(e) {
                $uibModalInstance.dismiss(e.message);
            });
    }

    function cancelHandler() {
        $uibModalInstance.dismiss('User cancel');
    }

    function safeCancelHandler() {
        vendorService.CompareVendor(vm.vendor)
            .then(function(isEqual) {
                if (isEqual)
                    cancelHandler();
                else
                    vm.confirm = true;
            });
    }

    function closeOnRouteUpdate(scope, next, current) {
        $uibModalInstance.dismiss('Unexpected route change');
    }
}