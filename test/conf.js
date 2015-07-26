exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [ 'vendor.js' ],
    multiCapabilities: [{
        browserName: 'firefox'
    }, {
        browserName: 'chrome'
    }]
};