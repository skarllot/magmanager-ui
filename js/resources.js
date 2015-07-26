angular.module('magmanager')
    .factory('Vendor', function($resource) {
        return $resource(apiAddress + 'vendor/:id');
    })
    .service('vendorService', [ 'Vendor', function(Vendor) {
        this.Vendors = [];
        this.Vendor = {};
        
        this.GetVendors = function(fn) {
            if (!fn) { fn = function() {}; }
            this.Vendors = Vendor.query(fn);
        };
        
        this.GetVendor = function(id, fn) {
            if (!fn) { fn = function() {}; }
            
            if (this.Vendors.length < 1) {
                myself = this;
                this.GetVendors(function() {
                    myself.GetVendor(id, fn);
                });
                return;
            }
            
            for (i=0; i < this.Vendors.length; ++i) {
                if (this.Vendors[i].id == id) {
                    this.Vendor = this.Vendors[i];
                }
            }
            
            fn(this.Vendor);
        };
    }]);