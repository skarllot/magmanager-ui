define([
	'lodash',
	'../common/util',
	'./product'
], function(_, util, product) {
	var vendor = {
		get: function() {
			return {
				id: '',
                name: '',
                products: []
			};
		},
		equals: function(vendor1, vendor2) {
			var emptyVendor = vendor.get();
			var emptyProduct = product.get();
			
			vendor1 = util.pickFromObj(vendor1, emptyVendor);
			vendor2 = util.pickFromObj(vendor2, emptyVendor);
			vendor1.products = util.pickArrayFromObj(
				vendor1.products, emptyProduct);
			vendor2.products = util.pickArrayFromObj(
				vendor2.products, emptyProduct);

			return _.isEqual(vendor1, vendor2);
		}
	};
	
	return vendor;
});