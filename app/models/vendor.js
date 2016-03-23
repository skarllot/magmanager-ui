define([
	'lodash',
	'./product'
], function(_, product) {
	var vendor = {
		get: function() {
			return {
				id: '',
                name: '',
                products: []
			};
		}
	};
	
	return vendor;
});