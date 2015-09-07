define(['require', 'angular'], function(require, ng) {
    'use strict';
    
    var mod = ng.module('ngLazy', []);
    var ngLazy = {};
    
    mod.config([ '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', function($controllerProvider, $compileProvider, $filterProvider, $provide) {
        // Keep references to providers on module object to allow registering of
        // components after bootstrap.
        // Eg:
        // ngLazy.controller('myController', function($scope) {
        // ...
        // });
        ngLazy.controller = $controllerProvider.register;
        ngLazy.directive = $compileProvider.directive;
        ngLazy.filter = $filterProvider.register;
        ngLazy.factory = $provide.factory;
        ngLazy.service = $provide.service;
    }]);
    
    mod.factory('ngLazy', [ '$q', function($q) {
        
        return {
            // loadScript returns a promise of javascript file load and eval.
            // Eg:
            // ...
            // $routeProvider
            //    .when('/product/:id', {
            //        templateUrl: 'product/view.html',
            //        resolve: {
            //            deps : [ 'ngLazy', function(ngLazy) {
            //                return ngLazy.loadScript('product/controller');
            //            }]
            //        }
            // })
            // ...
            loadScript: function(name) { 
                var defer = $q.defer();
                
                require([ name ], function() {
                    defer.resolve(name);
                });
                
                return defer.promise;
            }
        }
    }]);
    
    return ngLazy;
});