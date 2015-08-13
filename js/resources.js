angular.module('magmanager')
    .service('vendorService', [ 'Restangular', function(Restangular) {
        Restangular.setBaseUrl(apiAddress);
        var vendors = Restangular.all('vendor');
        var fetchedData = false;
        var vendorList = [];
        var myself = this;
        this.CurrentVendor = -1;
        
        this.GetVendors = function(fn, force) {
            if (!fn) { fn = function() {}; }
            force = force || false;
            
            if (force || !fetchedData)
                vendors.getList().then(function(result) {
                    vendorList = result;
                    fetchedData = true;
                    fn(result);
                });
            else
                fn(vendorList);
        };
        
        var getVendorById = function(id, caller) {
            if (!fetchedData) {
                myself.GetVendors(function() {
                    getVendorById(id, caller);
                });
                return;
            }
            
            for (i=0; i < vendorList.length; ++i) {
                if (vendorList[i].id == id) {
                    caller(i);
                    return;
                }
            }
            caller(-1);
        };
        
        this.CopyVendor = function(id, fn) {
            if (!fn) { fn = function() {}; }
            
            if (!id) {
                var vNew = {
                    id: '',
                    name: '',
                    products: []
                }
                fn(vNew);
                return;
            }
            
            myself.GetVendor(id, function(v) {
                var vEdit = Restangular.copy(v);
                fn(vEdit);
            });
        };
        
        this.CompareVendor = function(v, fn) {
            if (!fn) { fn = function() {}; }
            
            myself.GetVendor(v.id, function(v2) {
                fn(angular.equals(v, v2));
            });
        };
        
        this.GetVendor = function(id, fn) {
            if (!fn) { fn = function() {}; }
            
            if (fetchedData && this.CurrentVendor > -1) {
                var current = vendorList[this.CurrentVendor];
                if (current.id == id) {
                    fn(current);
                    return;
                }
            }
            
            getVendorById(id, function(index) {
                this.CurrentVendor = index;
                var v = null;
                if (index > -1)
                    v = vendorList[index];
                
                fn(v);
            });
        };
        
        this.UpdateVendor = function(vendor, fn) {
            if (!fn) { fn = function() {}; }
            
            vendor.put().then(fn);
            this.CompareVendor(vendor, function(result) {
                if (!result && this.CurrentVendor > -1) {
                    vendorList[this.CurrentVendor] = vendor;
                }
            });
        };
        
        this.CreateVendor = function(vendor, fn) {
            if (!fn) { fn = function() {}; }
            
            vendors.post(vendor).then(function(result) {
                vendorList.push(result);
                fn(result);
            });
        };
    }]);