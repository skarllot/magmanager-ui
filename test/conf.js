exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    //seleniumServerJar: '../node_modules/selenium-standalone-jar/bin/selenium-server-standalone-2.48.2.jar',
    specs: [ 'specs.js' ]/*,
    multiCapabilities: [{
        browserName: 'firefox'
    }, {
        browserName: 'chrome'
    }]*/
};