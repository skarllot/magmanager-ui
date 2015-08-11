angular.module('magmanager')
    .registerCtrl('vendorController', [ '$scope', '$routeParams', '$location', 'vendorService', function($scope, $routeParams, $location, vendorService) {
        $scope.edit = '';
        if ($routeParams.edit) {
            $scope.edit = $routeParams.edit;
        }
        
        $scope.vendorSvc = vendorService;
        if (!$routeParams.edit)
            vendorService.GetVendors();
        
        $scope.save = function(vendor) {
            vendorService.UpdateVendor(vendor);
            $location.search({});
        }
        
        $scope.$on('$routeUpdate', function(scope, next, current) {
            if ($routeParams.edit) {
                $scope.edit = $routeParams.edit;
            } else {
                $scope.edit = '';
            }
        });
    }]);