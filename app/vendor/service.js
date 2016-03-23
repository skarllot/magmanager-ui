define([
    './module',
    'config',
    'models',
    'lodash'
], function (mod, config, models, _) {
    'use strict';

    mod.service('vendorService', vendorService);

    vendorService.$inject = ['$q', '$http'];
    function vendorService($q, $http) {
        var service = {
            CompareVendor: compareVendor,
            CopyVendor: copyVendor,
            CreateVendor: createVendor,
            DeleteVendor: deleteVendor,
            GetVendor: getVendor,
            GetVendorList: getVendorList,
            GetVendors: getVendorList,
            UpdateVendor: updateVendor,
        };

        var baseUrl = config.apiAddress + "vendor";
        var qGetVendors;
        var vendorList = [];
        var currentVendor = -1;

        return service;

        function getVendorIndex(id) {
            return getVendorList().then(function (vendors) {
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
        };

        function getVendor(id) {
            if (currentVendor > -1 && currentVendor < vendorList.length) {
                var vendor = vendorList[currentVendor];
                if (vendor.id == id) {
                    return $q(function (resolve, reject) {
                        resolve(vendor);
                    });
                }
            }

            return getVendorIndex(id).then(function (index) {
                currentVendor = index;
                return vendorList[index];
            });
        };

        function copyVendor(id) {
            if (!id) {
                return $q.reject(new Error('The vendor Id must be defined'));
            } else {
                return getVendor(id).then(function (vendor) {
                    return _.clone(vendor);
                });
            }
        };

        function compareVendor(vendor) {
            return getVendor(vendor.id)
                .then(function (vendorGot) {
                    return _.isEqual(vendor, vendorGot);
                });
        };
            
        // UpdateVendor updates vendor object to upstream;
        // otherwise rejects.
        function updateVendor(vendor) {
            var url = baseUrl + "/" + vendor.id;
            return compareVendor(vendor)
                .then(function (isEqual) {
                    if (!isEqual) {
                        return $http.put(url, vendor)
                            .then(function () {
                                vendorList[currentVendor] = vendor;
                            });
                    }

                    return $q.reject(new Error('The vendor was not changed'));
                });
        };

        function createVendor(vendor) {
            return $http.post(baseUrl, vendor)
                .then(function (response) {
                    vendorList.push(response.data);
                    return response.data;
                });
        };

        function deleteVendor(vendor) {
            var url = baseUrl + "/" + vendor.id;
            return $http.delete(url)
                .then(function () {
                    return getVendorIndex(vendor.id)
                        .then(function (index) {
                            vendorList.splice(index, 1);
                            return vendor.id;
                        });
                });
        };
    }
});
