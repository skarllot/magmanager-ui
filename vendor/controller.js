define(['nglazy', 'config', './service'], function(ngLazy, config) {
    'use strict';
    
    ngLazy.controller('vendorController', [ '$scope', '$routeParams', '$location', '$modal', 'vendorService', function($scope, $routeParams, $location, $modal, vendorService) {
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
            }, function(msg) {
                console.info(msg);
            }).then(function() {
                $location.search({});
            });
        };
        
        $scope.$on('$routeUpdate', function(scope, next, current) {
            if (_.keys($routeParams).length == 0)
                return;
            
            if ($routeParams.edit)
                $scope.openEdit();
            else if ($routeParams.new)
                $scope.openCreate();
            else if ($routeParams.delete)
                $scope.openDelete();
            else {
                console.warn('Unexpected route change');
                $location.search({});
            }
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

    ngLazy.controller('vendorEditController', [ '$scope', '$modalInstance', 'vendorService', 'vendorId', function($scope, $modalInstance, vendorService, vendorId) {
        $scope.vendor = {};
        $scope.confirm = false;
        
        vendorService.CopyVendor(vendorId)
            .then(function(vendor) {
                $scope.vendor = vendor;
            })
            .catch(function(msg) {
                $modalInstance.dismiss(msg.message);
            });
        
        $scope.ok = function() {
            vendorService.UpdateVendor($scope.vendor)
                .then(function() {
                    $modalInstance.close();
                }, function(e) {
                    $modalInstance.dismiss(e.message);
                });
        };
        
        $scope.cancel = function() {
            $modalInstance.dismiss('User cancel');
        };
        
        $scope.safeCancel = function() {
            vendorService.CompareVendor($scope.vendor)
                .then(function(isEqual) {
                    if (isEqual)
                        $scope.cancel();
                    else
                        $scope.confirm = true;
                });
        };
        
        $scope.$on('$routeUpdate', function(scope, next, current) {
            $modalInstance.dismiss('Unexpected route change');
        });
    }]);

    ngLazy.controller('vendorCreateController', [ '$scope', '$modalInstance', 'vendorService', function($scope, $modalInstance, vendorService) {
        $scope.vendor = config.models.getVendor();
        $scope.confirm = false;
        
        $scope.ok = function() {
            if (_.isEqual($scope.vendor, config.models.getVendor())) {
                $modalInstance.dismiss('The vendor was not changed');
                return;
            }
            
            vendorService.CreateVendor($scope.vendor)
                .then(function(result) {
                    $modalInstance.close();
                });
        };
        
        $scope.cancel = function() {
            $modalInstance.dismiss('User cancel');
        };
        
        $scope.$on('$routeUpdate', function(scope, next, current) {
            $modalInstance.dismiss('Unexpected route change');
        });
    }]);

    ngLazy.controller('vendorDeleteController', [ '$scope', '$modalInstance', 'vendorService', 'vendorId', function($scope, $modalInstance, vendorService, vendorId) {
        $scope.vendor = {};
        $scope.confirm = false;
        
        vendorService.GetVendor(vendorId)
            .then(function(vendor) {
                $scope.vendor = vendor;
            })
            .catch(function(msg) {
                $modalInstance.dismiss(msg.message);
            });
        
        $scope.ok = function() {
            vendorService.DeleteVendor($scope.vendor)
                .then(function() {
                    $modalInstance.close();
                });
        };
        
        $scope.cancel = function() {
            $modalInstance.dismiss('User cancel');
        };
        
        $scope.$on('$routeUpdate', function(scope, next, current) {
            $modalInstance.dismiss('Unexpected route change');
        });
    }]);
});
