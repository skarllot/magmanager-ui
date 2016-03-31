'use strict';

var _ = require('lodash');
var models = require('../models');
module.exports = vendorCreateController;

vendorCreateController.$inject = ['$scope', '$uibModalInstance', 'vendorService'];
function vendorCreateController($scope, $uibModalInstance, vendorService) {
    var vm = this;

    vm.vendor = models.vendor.get();
    vm.confirm = false;
    vm.ok = saveHandler;
    vm.cancel = cancelHandler;
    $scope.$on('$routeUpdate', closeOnRouteUpdate);

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

    function closeOnRouteUpdate(scope, next, current) {
        $uibModalInstance.dismiss('Unexpected route change');
    }
}