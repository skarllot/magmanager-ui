angular.module('magmanager')
    .factory('Vendor', function($resource) {
        return $resource(apiAddress + 'vendor/:id', { id: '@id' }, {
            update: { method: 'PUT' }
        });
    })
    .service('vendorService', [ 'Vendor', function(Vendor) {
        this.Vendors = [];
        this.Vendor = {};
        
        this.GetVendors = function(fn) {
            if (!fn) { fn = function() {}; }
            if (this.Vendors.length < 1)
                this.Vendors = Vendor.query(fn);
            else
                fn(this.Vendors);
        };
        
        this.preloadVendors = function(caller, fn) {
            if (this.Vendors.length < 1) {
                this.GetVendors(function() {
                    caller(id, fn);
                });
                return true;
            }
            
            return false;
        };
        
        this.unsafeGetVendor = function(id) {
            for (i=0; i < this.Vendors.length; ++i) {
                if (this.Vendors[i].id == id) {
                    return this.Vendors[i];
                }
            }
            
            return null;
        };
        
        this.GetVendor = function(id, fn) {
            if (!fn) { fn = function() {}; }
            
            if (this.preloadVendors(this.GetVendor, fn))
                return;
            
            var vendor = this.unsafeGetVendor(id);
            if (vendor)
                this.Vendor = vendor;
            
            fn(this.Vendor);
        };
        
        this.UpdateVendor = function(vendor, fn) {
            if (!fn) { fn = function() {}; }
            
            vendor.$update();
        };
    }]);