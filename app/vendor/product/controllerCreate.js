define([
    'lodash',
    './module',
    'models'
], function(_, mod, models) {
    'use strict';
    
	mod.controller('productCreateController', [
        '$scope',
        '$modalInstance',
        'vendorService',
        function($scope, $modalInstance, vendorService) {
            $scope.product = models.product.get();
            $scope.confirm = false;
            
            $scope.ok = function() {
                if (_.isEqual($scope.vendor, models.product.get())) {
                    $modalInstance.dismiss('The product was not changed');
                    return;
                }
                
                vendorService.CreateVendor($scope.vendor)
                .then(function(result) {
                    $modalInstance.close();
                });
            };
            
            $scope.cancel = function() {
                $modalInstance.dismiss('User cancel');
            };
            
            $scope.$on('$routeUpdate', function(scope, next, current) {
                $modalInstance.dismiss('Unexpected route change');
            });
    }]);
});