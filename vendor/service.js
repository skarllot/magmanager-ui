define(['nglazy', 'config'], function(ngLazy, config) {
    'use strict';
    
    ngLazy.service('vendorService', [ '$q', 'Restangular', function($q, Restangular) {
        Restangular.setBaseUrl(config.apiAddress);
        var apiVendors = Restangular.all('vendor');
        
        var qGetVendors;
        var fetchedData = false;
        var vendorList = [];
        var self = this;
        var currentVendor = -1;
        
        function getVendorIndex(id) {
            return self.GetVendors().then(function(vendors) {
                for (var i = 0; i < vendors.length; ++i) {
                    if (vendors[i].id == id) {
                        return i;
                    }
                }
                
                return $q.reject(new Error('Invalid vendor Id \'' + id + '\''));
            });
        }
        
        this.GetVendors = function(force) {
            qGetVendors = qGetVendors || apiVendors.getList();
            if (force) {
                qGetVendors = apiVendors.getList();
            }
            
            return qGetVendors.then(function(vendors) {
                vendorList = vendors;
                return vendorList;
            });
        };
        
        this.GetVendor = function(id) {
            if (currentVendor > -1 && currentVendor < vendorList.length) {
                var vendor = vendorList[currentVendor];
                if (vendor.id == id) {
                    return $q(function(resolve, reject) {
                        resolve(vendor);
                    });
                }
            }
            
            return getVendorIndex(id).then(function(index) {
                currentVendor = index;
                return vendorList[index];
            });
        };
        
        this.CopyVendor = function(id) {
            if (!id) {
                return $q.reject(new Error('The vendor Id must be defined'));
            } else {
                return self.GetVendor(id).then(function(vendor) {
                    return Restangular.copy(vendor);
                });
            }
        };
        
        this.CompareVendor = function(vendor) {
            return self.GetVendor(vendor.id)
                .then(function(vendorGot) {
                    return config.models.vendorEquals(vendor, vendorGot);
                });
        };
        
        // UpdateVendor updates vendor object to upstream;
        // otherwise rejects.
        this.UpdateVendor = function(vendor) {
            return self.CompareVendor(vendor)
                .then(function(isEqual) {
                    if (!isEqual) {
                        return vendor.put().then(function() {
                            vendorList[currentVendor] = vendor;
                        });
                    }
                    
                    return $q.reject(new Error('The vendor was not changed'));
                });
        };
        
        this.CreateVendor = function(vendor) {
            return apiVendors.post(vendor)
                .then(function(vendorCreated) {
                    vendorList.push(vendorCreated);
                    return vendorCreated;
                });
        };
        
        this.DeleteVendor = function(vendor) {
            return vendor.remove()
                .then(function() {
                    return getVendorIndex(vendor.id)
                        .then(function(index) {
                            vendorList.splice(index, 1);
                            return vendor.id;
                        });
                });
        };
    }]);
});
