define([
    './module'
], function (mod) {
    'use strict';

    mod.controller('vendorEditController', vendorEditController);

    vendorEditController.$inject = ['$scope', '$modalInstance', 'vendorService', 'vendorId'];
    function vendorEditController($scope, $modalInstance, vendorService, vendorId) {
        var vm = this;

        vm.vendor = {};
        vm.confirm = false;
        vm.ok = saveHandler;
        vm.cancel = cancelHandler;
        vm.safeCancel = safeCancelHandler;
        $scope.$on('$routeUpdate', closeOnRouteUpdate);

        vendorService.GetVendorClone(vendorId)
            .then(function (vendor) {
                vm.vendor = vendor;
            })
            .catch(function (msg) {
                $modalInstance.dismiss(msg.message);
            });

        function saveHandler() {
            vendorService.UpdateVendor(vm.vendor)
                .then(function () {
                    $modalInstance.close();
                }, function (e) {
                    $modalInstance.dismiss(e.message);
                });
        }

        function cancelHandler() {
            $modalInstance.dismiss('User cancel');
        }

        function safeCancelHandler() {
            vendorService.CompareVendor(vm.vendor)
                .then(function (isEqual) {
                    if (isEqual)
                        cancelHandler();
                    else
                        vm.confirm = true;
                });
        }

        function closeOnRouteUpdate(scope, next, current) {
            $modalInstance.dismiss('Unexpected route change');
        }
    }
});