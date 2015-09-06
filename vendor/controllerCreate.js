define(['nglazy', 'config'], function(ngLazy, config) {
	ngLazy.controller('vendorCreateController', [ '$scope', '$modalInstance', 'vendorService', function($scope, $modalInstance, vendorService) {
        $scope.vendor = config.models.getVendor();
        $scope.confirm = false;
        
        $scope.ok = function() {
            if (_.isEqual($scope.vendor, config.models.getVendor())) {
                $modalInstance.dismiss('The vendor was not changed');
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
})