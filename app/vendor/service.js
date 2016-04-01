'use strict';

var _ = require('lodash');
var config = require('../config');
var models = require('../models');
module.exports = vendorService;

vendorService.$inject = ['$q', '$http'];
function vendorService($q, $http) {
    var service = {
        CompareVendor: compareVendor,
        CreateVendor: createVendor,
        DeleteVendor: deleteVendor,
        GetVendor: getVendor,
        GetVendorClone: getVendorClone,
        GetVendorList: getVendorList,
        UpdateVendor: updateVendor,
    };

    var baseUrl = config.apiAddress + "vendor";
    var qGetVendors;
    var vendorList = [];
    var currentVendor = -1;

    return service;

    function getVendorIndex(id) {
        return getVendorList().then(function(vendors) {
            for (var i = 0; i < vendors.length; ++i) {
                if (vendors[i].id == id) {
                    return i;
                }
            }

            return $q.reject(new Error('Invalid vendor Id \'' + id + '\''));
        });
    }

    function getVendorList(force) {
        if (force) {
            qGetVendors = $http.get(baseUrl).then(updateVendors);
        }

        qGetVendors = qGetVendors || $http.get(baseUrl).then(updateVendors);
        return qGetVendors;

        function updateVendors(response) {
            vendorList = response.data;
            return vendorList;
        }
    }

    function getVendor(id) {
        if (currentVendor > -1 && currentVendor < vendorList.length) {
            var vendor = vendorList[currentVendor];
            if (vendor.id == id) {
                return $q(function(resolve, reject) {
                    delete vendor.$$hashKey;
                    resolve(vendor);
                });
            }
        }

        return getVendorIndex(id).then(function(index) {
            currentVendor = index;
            delete vendorList[index].$$hashKey;
            return vendorList[index];
        });
    }

    function getVendorClone(id) {
        if (!id) {
            return $q.reject(new Error('The vendor Id must be defined'));
        } else {
            return getVendor(id).then(function(vendor) {
                return _.cloneDeep(vendor);
            });
        }
    }

    function compareVendor(vendor) {
        return getVendor(vendor.id)
            .then(function(vendorGot) {
                return _.isEqual(vendor, vendorGot);
            });
    }

    // UpdateVendor updates vendor object to upstream;
    // otherwise rejects.
    function updateVendor(vendor) {
        var url = baseUrl + "/" + vendor.id;
        return compareVendor(vendor)
            .then(function(isEqual) {
                if (!isEqual) {
                    return $http.put(url, vendor)
                        .then(function() {
                            vendorList[currentVendor] = vendor;
                        });
                }

                return $q.reject(new Error('The vendor was not changed'));
            });
    }

    function createVendor(vendor) {
        return $http.post(baseUrl, vendor)
            .then(function(response) {
                vendorList.push(response.data);
                return response.data;
            });
    }

    function deleteVendor(vendor) {
        var url = baseUrl + "/" + vendor.id;
        return $http.delete(url)
            .then(function() {
                return getVendorIndex(vendor.id)
                    .then(function(index) {
                        vendorList.splice(index, 1);
                        return vendor.id;
                    });
            });
    }
}
