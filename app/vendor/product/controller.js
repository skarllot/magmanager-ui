'use strict';

var _ = require('lodash');
module.exports = productController;

productController.$inject = ['$rootScope', '$scope', '$stateParams', '$location', '$uibModal', 'vendorService'];
function productController($rootScope, $scope, $stateParams, $location, $uibModal, vendorService) {
    var vm = this;

    vm.vendor = {};
    vm.loaded = false;
    $scope.$on('$locationChangeSuccess', openModalOnRouteUpdate);
    // Open modal when respective URL is open directly
    openModalOnRouteUpdate();

    // Loads the product list to current view
    vendorService.GetVendor($stateParams.id)
        .then(function(vendor) {
            $rootScope.title = vendor.name;
            vm.vendor = vendor;
            vm.loaded = true;
        })
        .catch(function(msg) {
            $rootScope.title = 'Invalid';
            vm.vendor = {
                name: 'Invalid vendor Id',
                products: []
            };
            vm.loaded = true;
        });

    function openModalOnRouteUpdate(scope, next, current) {
        var routeParamsKeys = _.keys($stateParams);
        if (routeParamsKeys.length === 0)
            return;
        if (routeParamsKeys.length === 1 && routeParamsKeys[0] === "id")
            return;

        if ($stateParams.edit)
            openModal(
                'vendor/product/modalEdit.html',
                'productEditController',
                $stateParams.edit
            );
        else if ($stateParams.new)
            openModal(
                require('./modalCreate.html'),
                'productCreateController',
                $stateParams.new
            );
        else if ($stateParams.delete)
            openModal(
                'vendor/product/modalDelete.html',
                'productDeleteController',
                $stateParams.delete
            );
        else {
            $location.search({});
        }
    }

    function openModal(tplContent, ctrlName, vendorId) {
        var modalInstance = $uibModal.open({
            template: tplContent,
            controller: ctrlName,
            controllerAs: 'vm',
            backdrop: 'static',
            resolve: {
                vendorId: function() {
                    return vendorId;
                }
            }
        });

        modalInstance.result.then(function(selectedItem) {
        }, function(msg) {
            console.info(msg);
        }).then(function() {
            $location.search({});
        });
    }
}