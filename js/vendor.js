angular.module('magmanager')
    .registerCtrl('vendorController', [ '$scope', '$routeParams', '$location', '$modal', 'vendorService', function($scope, $routeParams, $location, $modal, vendorService) {
        $scope.loaded = false;
        $scope.vendors = [];
        
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
                templateUrl: 'modalVendorEdit.html',
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
            }, function(msg) {
                console.info(msg);
                $location.search({});
            });
        };
        $scope.openCreate = function() {
            var modalInstance = $modal.open({
                templateUrl: 'modalVendorCreate.html',
                controller: 'vendorCreateController',
                backdrop: 'static'
            });
            
            modalInstance.result.then(function(selectedItem) {
                vendorService.GetVendors(function(result) {
                    $scope.vendors = result;
                });
                $location.search({});
            }, function(msg) {
                console.info(msg);
                $location.search({});
            });
        };
        
        $scope.$on('$routeUpdate', function(scope, next, current) {
            if ($routeParams.edit)
                $scope.openEdit();
            if ($routeParams.new)
                $scope.openCreate();
        });
        
        if ($routeParams.edit) {
            $scope.openEdit();
        }
        if ($routeParams.new) {
            $scope.openCreate();
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

angular.module('magmanager')
    .registerCtrl('vendorCreateController', [ '$scope', '$modalInstance', 'vendorService', function($scope, $modalInstance, vendorService) {
        $scope.vendor = {};
        $scope.vendorEmpty = {};
        $scope.confirm = false;
        
        vendorService.CopyVendor(null, function(result) {
            $scope.vendor = result;
            angular.copy(result, $scope.vendorEmpty);
        });
        
        $scope.ok = function() {
            if (angular.equals($scope.vendor, $scope.vendorEmpty)) {
                $modalInstance.dismiss('no changes');
                return;
            }
            
            vendorService.CreateVendor($scope.vendor, function(result) {
                $modalInstance.close();
            });
        };
        
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }]);
