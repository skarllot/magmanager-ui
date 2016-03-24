define([
    './module'
], function(mod) {
    'use strict';

    mod.controller('vendorDeleteController', vendorDeleteController);

    vendorDeleteController.$inject = ['$scope', '$modalInstance', 'vendorService', 'vendorId'];
    function vendorDeleteController($scope, $modalInstance, vendorService, vendorId) {
        var vm = this;

        vm.vendor = {};
        vm.confirm = false;
        vm.ok = deleteHandler;
        vm.cancel = cancelHandler;
        $scope.$on('$routeUpdate', closeOnRouteUpdate);

        vendorService.GetVendor(vendorId)
            .then(function(vendor) {
                vm.vendor = vendor;
            })
            .catch(function(msg) {
                $modalInstance.dismiss(msg.message);
            });

        function deleteHandler() {
            vendorService.DeleteVendor(vm.vendor)
                .then(function() {
                    $modalInstance.close();
                });
        }

        function cancelHandler() {
            $modalInstance.dismiss('User cancel');
        }

        function closeOnRouteUpdate(scope, next, current) {
            $modalInstance.dismiss('Unexpected route change');
        }
    }
});