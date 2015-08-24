define([ 'lodash' ], function(_) {
    'use strict';
    
    var config = {
        apiAddress: "https://magmanager.herokuapp.com/",
        
        pickFromObj: function(obj1, obj2) {
            var keys = _.keys(obj2);
            return _.pick(obj1, keys);
        },
        
        pickArrayFromObj: function(arr, obj2) {
            return _.map(arr, function(item) {
                return config.pickFromObj(item, obj2);
            });
        },
        
        models: {
            getProduct: function() {
                return {
                    id: '',
                    name: '',
                    technology: ''
                };
            },
            
            getVendor: function() {
                return {
                    id: '',
                    name: '',
                    products: []
                };
            },
            
            vendorEquals: function(vendor1, vendor2) {
                var emptyVendor = this.getVendor();
                var emptyProduct = this.getProduct();

                vendor1 = config.pickFromObj(vendor1, emptyVendor);
                vendor2 = config.pickFromObj(vendor2, emptyVendor);
                vendor1.products = config.pickArrayFromObj(
                    vendor1.products, emptyProduct);
                vendor2.products = config.pickArrayFromObj(
                    vendor2.products, emptyProduct);

                return _.isEqual(vendor1, vendor2);
            }
        }
    };
    
    return config;
});
