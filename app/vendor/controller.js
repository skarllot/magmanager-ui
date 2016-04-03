'use strict';

var _ = require('lodash');
module.exports = vendorController;

vendorController.$inject = ['$scope', '$stateParams', '$location', '$uibModal', 'vendorService'];
function vendorController($scope, $stateParams, $location, $uibModal, vendorService) {
    var vm = this;

    vm.loaded = false;
    vm.vendors = [];
    vm.refresh = refresh;
    $scope.$on('$locationChangeSuccess', openModalOnRouteUpdate);
    // Open modal when respective URL is open directly
    openModalOnRouteUpdate();

    // Loads the vendor list to current view
    vendorService.GetVendorList()
        .then(function(vendors) {
            vm.vendors = vendors;
            vm.loaded = true;
        });

    function refresh() {
        vm.vendors = [];
        vm.loaded = false;
        vendorService.GetVendors(true)
            .then(function(vendors) {
                vm.vendors = vendors;
                vm.loaded = true;
            });
    }

    function openModalOnRouteUpdate(scope, next, current) {
        if (_.keys($stateParams).length === 0)
            return;

        if ($stateParams.edit)
            openModal(
                require('./modalEdit.html'),
                'vendorEditController',
                $stateParams.edit
            );
        else if ($stateParams.new)
            openModal(
                require('./modalCreate.html'),
                'vendorCreateController',
                $stateParams.new
            );
        else if ($stateParams.delete)
            openModal(
                require('./modalDelete.html'),
                'vendorDeleteController',
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
