angular.module('magmanager')
    .factory('Vendor', function($resource) {
        return $resource(apiAddress + 'vendor/:id');
    });/*
    .service('vendorService', [ function() {
        this.Vendors = undefined;
        this.GetVendors = function() {
            //this.Vendors = Vendor.query(
        };
    }]);*/