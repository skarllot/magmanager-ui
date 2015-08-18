// Deps: lodash (or Underscore.js)
!function(global, appname) {
    'use strict';
    var ng = angular.module(appname);
    
    ng.config([ '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', function($controllerProvider, $compileProvider, $filterProvider, $provide) {
        // Register 'ngLazy' globally to allow registering of components after bootstrap.
        // Eg:
        // ngLazy.controller('myController', function($scope) {
        // ...
        // });
        global.ngLazy = {
            controller: $controllerProvider.register,
            directive: $compileProvider.directive,
            filter: $filterProvider.register,
            factory: $provide.factory,
            service: $provide.service
        }
    }]);
    
    ng.factory('ngLazy', [ '$q', '$http', function($q, $http) {
        var delim = '${ name }';
        var jsPath = 'js/${ name }.js';
        var promisesCache = {};
        
        // getPromise returns cached promise, or creates a new one
        // whether is not cached yet.
        function getPromise(name) {
            var promise = promisesCache[name];
            if (promise) {
                return promise;
            }
            
            var url = jsPath.replace(delim, name);
            promise = $http.get(url).then(function(result) {
                eval(result.data);
                console.info('Loaded: ' + url);
            });
            
            promisesCache[name] = promise;
            return promise;
        }
        
        return {
            // loadScript returns a promise of javascript file load and eval.
            // Eg:
            // ...
            // $routeProvider
            //    .when('/product/:id', {
            //        templateUrl: 'view/product.html',
            //        resolve: {
            //            deps : [ 'ngLazy', function(ngLazy) {
            //                return ngLazy.loadScript(
            //                    'controllers/product',
            //                    [ 'services/product' ]);
            //            }]
            //        }
            // })
            // ...
            loadScript: function(name, deps) {
                // Relies on lodash or Underscore.js
                if (deps) {
                    if (!_.isString(deps)) {
                        deps = [ deps ];
                    } else if (!_.isArray(deps)) {
                        return $q.defer(new Error('Dependencies must be specified as array'));
                    }
                }
                
                // Base promise to create a sequence
                var defer = $q.defer();
                defer.resolve(name);
                
                var promise = defer.promise;
                if (deps) {
                    // Stacks each promise in sequence to resolve before main js
                    deps.forEach(function(d) {
                        promise = promise.then(getPromise(d));
                    });
                }
                // Then last stack specified js
                promise = promise.then(getPromise(name));
                return promise;
            },
            
            // setJSPath changes default URL path for javascript files.
            setJSPath: function(path) {
                // Relies on lodash or Underscore.js
                if (!path) {
                    throw new Error('To set javascript files path you must define a path');
                } else if (!_.isString(path)) {
                    throw new Error('The javascript files path must be a String');
                }
                
                if (path.indexOf(delim) < 0) {
                    throw new Error('The javascripts files path must have \'${ name }\' delimiter');
                }
                
                jsPath = path;
            }
        }
    }]);
}(window, 'magmanager');