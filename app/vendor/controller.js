define([
    'lodash',
    './module'
], function(_, mod) {
    'use strict';

    mod.controller('vendorController', vendorController);

    vendorController.$inject = ['$scope', '$routeParams', '$location', '$modal', 'vendorService']
    function vendorController($scope, $routeParams, $location, $modal, vendorService) {
        var vm = this;

        vm.loaded = false;
        vm.vendors = [];
        vm.refresh = refresh;
        $scope.$on('$routeUpdate', openModalOnRouteUpdate);
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
            if (_.keys($routeParams).length === 0)
                return;

            if ($routeParams.edit)
                openModal(
                    'vendor/modalVendorEdit.html',
                    'vendorEditController',
                    $routeParams.edit
                );
            else if ($routeParams.new)
                openModal(
                    'vendor/modalVendorCreate.html',
                    'vendorCreateController',
                    $routeParams.new
                );
            else if ($routeParams.delete)
                openModal(
                    'vendor/modalVendorDelete.html',
                    'vendorDeleteController',
                    $routeParams.delete
                );
            else {
                console.warn('Unexpected route change');
                $location.search({});
            }
        }

        function openModal(tplURL, ctrlName, vendorId) {
            var modalInstance = $modal.open({
                templateUrl: tplURL,
                controller: ctrlName + ' as vm',
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
});
