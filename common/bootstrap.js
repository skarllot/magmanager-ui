// Bootstraps angular onto the window.document node
define([
    'require',
    'angular',
    'app',
    'routes',
    'navbar'
    ], function(require, ng) {
    'use strict';
    
    require(['domReady!'], function(document) {
        ng.bootstrap(document, ['magmanager']);
    });
});