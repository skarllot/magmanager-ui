angular.module('magmanager')
    .registerCtrl('productController', [ '$rootScope', '$scope', '$routeParams', 'vendorService', function($rootScope, $scope, $routeParams, vendorService) {
        $scope.vendor = {};
        $scope.loaded = false;
        
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