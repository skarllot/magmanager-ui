!function(root) {
    root.app = {
        apiAddress: "https://magmanager.herokuapp.com/",
        pickFromObj: function(obj1, obj2) {
            var keys = _.keys(obj2);
            return _.pick(obj1, keys);
        }
    };
    
    root.app.models = {
        getVendor: function() {
            return {
                id: '',
                name: '',
                products: []
            };
        },
        vendorEquals: function(vendor1, vendor2) {
            var emptyVendor = this.getVendor();
            
            vendor1 = app.pickFromObj(vendor1, emptyVendor);
            vendor2 = app.pickFromObj(vendor2, emptyVendor);
            
            return _.isEqual(vendor1, vendor2);
        }
    };
}(window);
