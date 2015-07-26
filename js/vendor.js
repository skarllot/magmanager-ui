app.registerCtrl('vendorController', [ '$scope', '$resource', function($scope, $resource) {
    var vendorApi = $resource(apiAddress + 'vendor/:id');
    
    $scope.vendors = vendorApi.query(function() {
        console.log('Vendors query completed');
    });
}]);