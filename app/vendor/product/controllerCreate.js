define([
    'lodash',
    './module',
    'models'
], function(_, mod, models) {
    'use strict';

    mod.controller('productCreateController', productCreateController);

    productCreateController.$inject = ['$scope', '$modalInstance', 'vendorService'];
    function productCreateController($scope, $modalInstance, vendorService) {
        var vm = this;

        vm.product = models.product.get();
        vm.confirm = false;
        vm.ok = saveHandler;
        vm.cancel = cancelHandler;
        $scope.$on('$routeUpdate', closeOnRouteUpdate);

        function saveHandler() {
            if (_.isEqual(vm.vendor, models.product.get())) {
                $modalInstance.dismiss('The product was not changed');
                return;
            }

            vendorService.CreateVendor(vm.vendor)
                .then(function(result) {
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