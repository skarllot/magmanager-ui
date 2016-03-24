define([
    'lodash',
    './module'
], function (_, mod) {
    'use strict';

    mod.controller('vendorController', vendorController);

    vendorController.$inject = ['$scope', '$routeParams', '$location', '$modal', 'vendorService']
    function vendorController($scope, $routeParams, $location, $modal, vendorService) {
        var vm = this;

        vm.loaded = false;
        vm.vendors = [];
        vm.refresh = refresh;
        vm.openEdit = openEdit;
        vm.openCreate = openCreate;
        vm.openDelete = openDelete;
        $scope.$on('$routeUpdate', openModalOnRouteUpdate);
        // Open modal when respective URL is open directly
        openModalOnRouteUpdate();

        // Loads the vendor list to current view
        vendorService.GetVendorList()
            .then(function (vendors) {
                vm.vendors = vendors;
                vm.loaded = true;
            });

        function refresh() {
            vm.vendors = [];
            vm.loaded = false;
            vendorService.GetVendors(true)
                .then(function (vendors) {
                    vm.vendors = vendors;
                    vm.loaded = true;
                });
        }

        function openEdit(vendorTarget) {
            var modalInstance = $modal.open({
                templateUrl: 'vendor/modalVendorEdit.html',
                controller: 'vendorEditController as vm',
                backdrop: 'static',
                resolve: {
                    vendorId: function () {
                        return $routeParams.edit;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
            }, function (msg) {
                console.info(msg);
            }).then(function () {
                $location.search({});
            });
        }

        function openCreate() {
            var modalInstance = $modal.open({
                templateUrl: 'vendor/modalVendorCreate.html',
                controller: 'vendorCreateController as vm',
                backdrop: 'static'
            });

            modalInstance.result.then(function (selectedItem) {
            }, function (msg) {
                console.info(msg);
            }).then(function () {
                $location.search({});
            });
        }

        function openDelete(vendorTarget) {
            var modalInstance = $modal.open({
                templateUrl: 'vendor/modalVendorDelete.html',
                controller: 'vendorDeleteController as vm',
                backdrop: 'static',
                resolve: {
                    vendorId: function () {
                        return $routeParams.delete;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
            }, function (msg) {
                console.info(msg);
            }).then(function () {
                $location.search({});
            });
        }

        function openModalOnRouteUpdate(scope, next, current) {
            if (_.keys($routeParams).length === 0)
                return;

            if ($routeParams.edit)
                vm.openEdit();
            else if ($routeParams.new)
                vm.openCreate();
            else if ($routeParams.delete)
                vm.openDelete();
            else {
                console.warn('Unexpected route change');
                $location.search({});
            }
        }
    }
});
