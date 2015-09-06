define(['nglazy'], function(ngLazy) {
	ngLazy.controller('vendorDeleteController', [ '$scope', '$modalInstance', 'vendorService', 'vendorId', function($scope, $modalInstance, vendorService, vendorId) {
        $scope.vendor = {};
        $scope.confirm = false;
        
        vendorService.GetVendor(vendorId)
            .then(function(vendor) {
                $scope.vendor = vendor;
            })
            .catch(function(msg) {
                $modalInstance.dismiss(msg.message);
            });
        
        $scope.ok = function() {
            vendorService.DeleteVendor($scope.vendor)
                .then(function() {
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
})