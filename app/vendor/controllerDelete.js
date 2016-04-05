'use strict';

module.exports = vendorDeleteController;

vendorDeleteController.$inject = ['$scope', '$uibModalInstance', 'vendorService', 'vendorId'];
function vendorDeleteController($scope, $uibModalInstance, vendorService, vendorId) {
    var vm = this;

    vm.vendor = {};
    vm.confirm = false;
    vm.ok = deleteHandler;
    vm.cancel = cancelHandler;
    $scope.$on('$routeChangeSuccess', closeOnRouteUpdate);

    vendorService.GetVendor(vendorId)
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

    function closeOnRouteUpdate(scope, next, current) {
        $uibModalInstance.dismiss('Unexpected route change');
    }
}