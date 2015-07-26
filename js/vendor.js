angular.module('magmanager')
    .registerCtrl('vendorController', [ '$scope', 'vendorService', function($scope, vendorService) {
        $scope.vendorSvc = vendorService;
        vendorService.GetVendors();
    }]);