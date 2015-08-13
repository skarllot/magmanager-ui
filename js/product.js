angular.module('magmanager')
    .registerCtrl('productController', [ '$rootScope', '$scope', '$routeParams', 'vendorService', function($rootScope, $scope, $routeParams, vendorService) {
        $scope.vendor = {};
        vendorService.GetVendor($routeParams.id, function(vendor) {
            $rootScope.title = vendor.name;
            $scope.vendor = vendor;
        });
    }]);