define(['lodash', 'nglazy', 'config', './service', './controllerCreate', './controllerDelete', './controllerEdit'], function(_, ngLazy, config) {
    'use strict';
    
    ngLazy.controller('vendorController', [ '$scope', '$routeParams', '$location', '$modal', 'vendorService', function($scope, $routeParams, $location, $modal, vendorService) {
        $scope.loaded = false;
        $scope.vendors = [];
        
        $scope.refresh = function() {
            $scope.vendors = [];
            $scope.loaded = false;
            vendorService.GetVendors(true)
                .then(function(vendors) {
                    $scope.vendors = vendors;
                    $scope.loaded = true;
                });
        };
        
        $scope.openEdit = function(vendorTarget) {
            var modalInstance = $modal.open({
                templateUrl: 'modalVendorEdit.html',
                controller: 'vendorEditController',
                backdrop: 'static',
                resolve: {
                    vendorId: function() {
                        return $routeParams.edit;
                    }
                }
            });
            
            modalInstance.result.then(function(selectedItem) {
            }, function(msg) {
                console.info(msg);
            }).then(function() {
                $location.search({});
            });
        };
        $scope.openCreate = function() {
            var modalInstance = $modal.open({
                templateUrl: 'modalVendorCreate.html',
                controller: 'vendorCreateController',
                backdrop: 'static'
            });
            
            modalInstance.result.then(function(selectedItem) {
            }, function(msg) {
                console.info(msg);
            }).then(function() {
                $location.search({});
            });
        };
        $scope.openDelete = function(vendorTarget) {
            var modalInstance = $modal.open({
                templateUrl: 'modalVendorDelete.html',
                controller: 'vendorDeleteController',
                backdrop: 'static',
                resolve: {
                    vendorId: function() {
                        return $routeParams.delete;
                    }
                }
            });
            
            modalInstance.result.then(function(selectedItem) {
            }, function(msg) {
                console.info(msg);
            }).then(function() {
                $location.search({});
            });
        };
        
        $scope.$on('$routeUpdate', function(scope, next, current) {
            if (_.keys($routeParams).length == 0)
                return;
            
            if ($routeParams.edit)
                $scope.openEdit();
            else if ($routeParams.new)
                $scope.openCreate();
            else if ($routeParams.delete)
                $scope.openDelete();
            else {
                console.warn('Unexpected route change');
                $location.search({});
            }
        });
        
        if ($routeParams.edit) {
            $scope.openEdit();
        }
        if ($routeParams.new) {
            $scope.openCreate();
        }
        if ($routeParams.delete) {
            $scope.openDelete();
        }
        
        vendorService.GetVendors()
            .then(function(vendors) {
                $scope.vendors = vendors;
                $scope.loaded = true;
            });
    }]);
});
