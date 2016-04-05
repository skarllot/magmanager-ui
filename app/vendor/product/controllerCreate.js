'use strict';

var _ = require('lodash');
var models = require('../../models');
module.exports = productCreateController;

productCreateController.$inject = ['$scope', '$uibModalInstance', 'vendorService'];
function productCreateController($scope, $uibModalInstance, vendorService) {
    var vm = this;

    vm.product = models.product.get();
    vm.confirm = false;
    vm.ok = saveHandler;
    vm.cancel = cancelHandler;
    $scope.$on('$routeUpdate', closeOnRouteUpdate);

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

    function closeOnRouteUpdate(scope, next, current) {
        $uibModalInstance.dismiss('Unexpected route change');
    }
}