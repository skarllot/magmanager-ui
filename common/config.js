define([ 'lodash' ], function(_) {
    'use strict';
    
    var config = {
        apiAddress: "https://magmanager.herokuapp.com/",
        
        pickFromObj: function(obj1, obj2) {
            var keys = _.keys(obj2);
            return _.pick(obj1, keys);
        },
        
        models: {
            getVendor: function() {
                return {
                    id: '',
                    name: '',
                    products: []
                };
            },
            
            vendorEquals: function(vendor1, vendor2) {
                var emptyVendor = this.getVendor();

                vendor1 = config.pickFromObj(vendor1, emptyVendor);
                vendor2 = config.pickFromObj(vendor2, emptyVendor);

                return _.isEqual(vendor1, vendor2);
            }
        }
    };
    
    return config;
});
