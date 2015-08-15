angular.module('magmanager')
    .registerCtrl('vendorController', [ '$scope', '$routeParams', '$location', '$modal', 'vendorService', function($scope, $routeParams, $location, $modal, vendorService) {
        $scope.loaded = false;
        $scope.vendors = [];
        
        $scope.refresh = function() {
            $scope.vendors = [];
            $scope.loaded = false;
            vendorService.GetVendors(true)
                .then(function(vendors) {
                    $scope.vendors = vendors;
                    $scope.loaded = true;
                });
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
                vendorService.GetVendors()
                    .then(function(vendors) {
                        $scope.vendors = vendors;
                    });
            }, function(msg) {
                console.info(msg);
            }).then(function() {
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
                vendorService.GetVendors()
                    .then(function(vendors) {
                        $scope.vendors = vendors;
                    });
            }, function(msg) {
                console.info(msg);
            }).then(function() {
                $location.search({});
            });
        };
        $scope.openDelete = function(vendorTarget) {
            var modalInstance = $modal.open({
                templateUrl: 'modalVendorDelete.html',
                controller: 'vendorDeleteController',
                backdrop: 'static',
                resolve: {
                    vendorId: function() {
                        return $routeParams.delete;
                    }
                }
            });
            
            modalInstance.result.then(function(selectedItem) {
                vendorService.GetVendors()
                    .then(function(vendors) {
                        $scope.vendors = vendors;
                    });
            }, function(msg) {
                console.info(msg);
            }).then(function() {
                $location.search({});
            });
        };
        
        $scope.$on('$routeUpdate', function(scope, next, current) {
            if ($routeParams.edit)
                $scope.openEdit();
            if ($routeParams.new)
                $scope.openCreate();
            if ($routeParams.delete)
                $scope.openDelete();
        });
        
        if ($routeParams.edit) {
            $scope.openEdit();
        }
        if ($routeParams.new) {
            $scope.openCreate();
        }
        if ($routeParams.delete) {
            $scope.openDelete();
        }
        
        vendorService.GetVendors()
            .then(function(vendors) {
                $scope.vendors = vendors;
                $scope.loaded = true;
            });
    }]);

angular.module('magmanager')
    .registerCtrl('vendorEditController', [ '$scope', '$modalInstance', 'vendorService', 'vendorId', function($scope, $modalInstance, vendorService, vendorId) {
        $scope.vendor = {};
        $scope.confirm = false;
        
        vendorService.CopyVendor(vendorId)
            .then(function(vendor) {
                $scope.vendor = vendor;
            });
        
        $scope.ok = function() {
            vendorService.CompareVendor($scope.vendor)
                .then(function(result) {
                    if (!result) {
                        vendorService.UpdateVendor($scope.vendor)
                            .then(function() {
                                $modalInstance.close();
                            });
                    } else {
                        $modalInstance.dismiss('no changes');
                    }
                });
        };
        
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
        
        $scope.safeCancel = function() {
            vendorService.CompareVendor($scope.vendor)
                .then(function(result) {
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
        
        vendorService.CopyVendor(null)
            .then(function(vendor) {
                $scope.vendor = vendor;
                angular.copy(vendor, $scope.vendorEmpty);
            });
        
        $scope.ok = function() {
            if (angular.equals($scope.vendor, $scope.vendorEmpty)) {
                $modalInstance.dismiss('no changes');
                return;
            }
            
            vendorService.CreateVendor($scope.vendor)
                .then(function(result) {
                    $modalInstance.close();
                });
        };
        
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }]);

angular.module('magmanager')
    .registerCtrl('vendorDeleteController', [ '$scope', '$modalInstance', 'vendorService', 'vendorId', function($scope, $modalInstance, vendorService, vendorId) {
        $scope.vendor = {};
        $scope.confirm = false;
        
        vendorService.GetVendor(vendorId)
            .then(function(vendor) {
                $scope.vendor = vendor;
            });
        
        $scope.ok = function() {
            vendorService.DeleteVendor($scope.vendor)
                .then(function() {
                    $modalInstance.close();
                });
        };
        
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }]);
