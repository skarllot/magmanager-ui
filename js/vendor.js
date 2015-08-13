angular.module('magmanager')
    .registerCtrl('vendorController', [ '$scope', '$routeParams', '$location', '$modal', 'vendorService', function($scope, $routeParams, $location, $modal, vendorService) {
        $scope.loaded = false;
        $scope.vendors = [];
        
        $scope.save = function(vendor) {
            vendorService.UpdateVendor(vendor);
            $location.search({});
        };
        
        $scope.refresh = function() {
            $scope.vendors = [];
            $scope.loaded = false;
            vendorService.GetVendors(function(result) {
                $scope.vendors = result;
                $scope.loaded = true;
            }, true);
        };
        
        $scope.openEdit = function(vendorTarget) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'vendorEditController',
                backdrop: 'static',
                resolve: {
                    vendorId: function() {
                        return $routeParams.edit;
                    }
                }
            });
            
            modalInstance.result.then(function(selectedItem) {
                vendorService.GetVendors(function(result) {
                    $scope.vendors = result;
                });
                $location.search({});
            }, function() {
                $location.search({});
            });
        };
        
        $scope.$on('$routeUpdate', function(scope, next, current) {
            if ($routeParams.edit)
                $scope.openEdit();
        });
        
        if ($routeParams.edit) {
            $scope.openEdit();
        }
        
        vendorService.GetVendors(function(result) {
            $scope.vendors = result;
            $scope.loaded = true;
        });
    }]);

angular.module('magmanager')
    .registerCtrl('vendorEditController', [ '$scope', '$modalInstance', 'vendorService', 'vendorId', function($scope, $modalInstance, vendorService, vendorId) {
        $scope.vendor = {};
        $scope.confirm = false;
        
        vendorService.CopyVendor(vendorId, function(v) {
            $scope.vendor = v;
        });
        
        $scope.ok = function() {
            vendorService.CompareVendor($scope.vendor, function(result) {
                if (!result) {
                    vendorService.UpdateVendor($scope.vendor);
                    $modalInstance.close();
                } else {
                    $modalInstance.dismiss('no changes');
                }
            });
        };
        
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
        
        $scope.safeCancel = function() {
            vendorService.CompareVendor($scope.vendor, function(result) {
                if (result)
                    $scope.cancel();
                else
                    $scope.confirm = true;
            });
        };
    }]);