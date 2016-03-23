define([
    'require',
    'angular'
], function (require, ng) {
    'use strict';

    var mod = ng.module('ngLazy', []);
    var ngLazy = {
        // Keep references to providers on module object to allow registering of
        // components after bootstrap.
        // Eg:
        // ngLazy.controller('myController', function($scope) {
        // ...
        // });
        controller: null,
        directive: null,
        filter: null,
        factory: null,
        service: null
    };
    mod.config(modConfig);
    mod.factory('ngLazy', ngLazyFactory);

    ngLazyFactory.$inject = ['$q'];
    modConfig.$inject = ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide'];

    return ngLazy;

    function ngLazyFactory($q) {
        return {
            loadScript: loadScript
        };
        
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
        function loadScript(name) {
            var defer = $q.defer();

            require([name], function () {
                defer.resolve(name);
            });

            return defer.promise;
        }
    }

    function modConfig($controllerProvider, $compileProvider, $filterProvider, $provide) {
        ngLazy.controller = $controllerProvider.register;
        ngLazy.directive = $compileProvider.directive;
        ngLazy.filter = $filterProvider.register;
        ngLazy.factory = $provide.factory;
        ngLazy.service = $provide.service;
    }
});