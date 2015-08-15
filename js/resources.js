angular.module('magmanager')
    .service('vendorService', [ '$q', 'Restangular', function($q, Restangular) {
        Restangular.setBaseUrl(apiAddress);
        var apiVendors = Restangular.all('vendor');
        
        var qGetVendors;
        var fetchedData = false;
        var vendorList = [];
        var myself = this;
        var currentVendor = -1;
        
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
        
        var getVendorIndex = function(id) {
            return myself.GetVendors().then(function(vendors) {
                for (var i = 0; i < vendors.length; ++i) {
                    if (vendors[i].id == id) {
                        return i;
                    }
                }
                
                throw new Error('No vendor has Id ' + id);
            });
        };
        
        this.GetVendor = function(id) {
            if (currentVendor > -1) {
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
                var vNew = {
                    id: '',
                    name: '',
                    products: []
                }
                return $q(function(resolve, reject) {
                    resolve(vNew);
                });
            } else {
                return myself.GetVendor(id).then(function(vendor) {
                    return Restangular.copy(vendor);
                });
            }
        };
        
        this.CompareVendor = function(v) {
            return myself.GetVendor(v.id).then(function(v2) {
                return angular.equals(v, v2);
            });
        };
        
        this.UpdateVendor = function(vendor) {
            return vendor.put()
                .then(function() {
                    return myself.CompareVendor(vendor);
                })
                .then(function(result) {
                    if (!result && currentVendor > -1) {
                        vendorList[currentVendor] = vendor;
                    }
                });
        };
        
        this.CreateVendor = function(vendor) {
            return apiVendors.post(vendor)
                .then(function(vendor) {
                    vendorList.push(vendor);
                    return vendor;
                });
        };
        
        this.DeleteVendor = function(vendor) {
            return vendor.remove()
                .then(function() {
                    return getVendorIndex(vendor.id)
                        .then(function(index) {
                            vendorList.splice(index, 1);
                            return(vendor.id);
                        });
                });
        };
    }]);