define([
    './module'
], function(mod) {
    'use strict';
    
    mod.controller('vendorEditController', [
        '$scope',
        '$modalInstance',
        'vendorService',
        'vendorId',
        function($scope, $modalInstance, vendorService, vendorId) {
            $scope.vendor = {};
            $scope.confirm = false;
            
            vendorService.CopyVendor(vendorId)
            .then(function(vendor) {
                $scope.vendor = vendor;
            })
            .catch(function(msg) {
                $modalInstance.dismiss(msg.message);
            });
            
            $scope.ok = function() {
                vendorService.UpdateVendor($scope.vendor)
                .then(function() {
                    $modalInstance.close();
                }, function(e) {
                    $modalInstance.dismiss(e.message);
                });
            };
            
            $scope.cancel = function() {
                $modalInstance.dismiss('User cancel');
            };
            
            $scope.safeCancel = function() {
                vendorService.CompareVendor($scope.vendor)
                .then(function(isEqual) {
                    if (isEqual)
                        $scope.cancel();
                    else
                        $scope.confirm = true;
                });
            };
            
            $scope.$on('$routeUpdate', function(scope, next, current) {
                $modalInstance.dismiss('Unexpected route change');
            });
    }]);
});