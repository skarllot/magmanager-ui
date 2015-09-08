define([
    './module'
], function(mod) {
    'use strict';
    
    mod.controller('productController', [
        '$rootScope',
        '$scope',
        '$routeParams',
        '$location',
        '$modal',
        'vendorService',
        function(
            $rootScope,
            $scope,
            $routeParams,
            $location,
            $modal, 
            vendorService
        ) {
            $scope.vendor = {};
            $scope.loaded = false;
            
            $scope.openCreate = function() {
                var modalInstance = $modal.open({
                    templateUrl: 'modalProductCreate.html',
                    controller: 'productCreateController',
                    backdrop: 'static'
                });
                
                modalInstance.result.then(function(selectedItem) {
                }, function(msg) {
                    console.info(msg);
                }).then(function() {
                    $location.search({});
                });
            };
            
            $scope.$on('$routeUpdate', function(scope, next, current) {
                if (_.keys($routeParams).length === 0)
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
            
            vendorService.GetVendor($routeParams.id)
            .then(function(vendor) {
                $rootScope.title = vendor.name;
                $scope.vendor = vendor;
                $scope.loaded = true;
            })
            .catch(function(msg) {
                $rootScope.title = 'Invalid';
                $scope.vendor = {
                    name: 'Invalid vendor Id',
                    products: []
                };
                $scope.loaded = true;
            });
        }]);
});