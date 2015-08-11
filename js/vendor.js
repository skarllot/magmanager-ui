angular.module('magmanager')
    .registerCtrl('vendorController', [ '$scope', '$routeParams', '$location', 'vendorService', function($scope, $routeParams, $location, vendorService) {
        $scope.loaded = false;
        $scope.edit = '';
        if ($routeParams.edit) {
            $scope.edit = $routeParams.edit;
        }
        
        $scope.vendorSvc = vendorService;
        vendorService.GetVendors(function() {
            $scope.loaded = true;
        });
        
        $scope.save = function(vendor) {
            vendorService.UpdateVendor(vendor);
            $location.search({});
        };
        $scope.refresh = function() {
            vendorService.Vendors = [];
            $scope.loaded = false;
            vendorService.GetVendors(function() {
                $scope.loaded = true;
            });
        };
        
        $scope.$on('$routeUpdate', function(scope, next, current) {
            if ($routeParams.edit) {
                $scope.edit = $routeParams.edit;
            } else {
                $scope.edit = '';
            }
        });
    }]);