define([
    'lodash',
    './module',
    'models'
], function (_, mod, models) {
    'use strict';

    mod.controller('vendorCreateController', vendorCreateController);

    vendorCreateController.$inject = ['$scope', '$modalInstance', 'vendorService'];
    function vendorCreateController($scope, $modalInstance, vendorService) {
        var vm = this;

        vm.vendor = models.vendor.get();
        vm.confirm = false;
        vm.ok = saveHandler;
        vm.cancel = cancelHandler;
        $scope.$on('$routeUpdate', closeOnRouteUpdate);

        function saveHandler() {
            if (_.isEqual(vm.vendor, models.vendor.get())) {
                $modalInstance.dismiss('The vendor was not changed');
                return;
            }

            vendorService.CreateVendor(vm.vendor)
                .then(function (result) {
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