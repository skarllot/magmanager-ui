angular.module('magmanager')
    .registerCtrl('vendorController', [ '$scope', 'Vendor', function($scope, Vendor) {
        $scope.vendors = Vendor.query(function() {
            console.log('Vendors query completed');
        });
    }]);