describe('MagManager', function() {
    var address = process.env.API_ENDPOINT;
    if (!address) {
        address = 'http://development.magmanager.divshot.io/';
    }
    
    describe('vendor', function() {
        var addressVendor = address + '#/vendor';
        it('open page', function() {
            browser.get(address);

            element(by.css('.container p a')).click();
            browser.getCurrentUrl().then(function(url) {
                expect(url).toBe(addressVendor);
            });
        });

        it('listing', function() {
            expect(
                element.all(by.repeater('v in vendors')).count()
            ).toBeGreaterThan(0);
        });
        
        it('products', function() {
            element.all(by.repeater('v in vendors'))
                .get(0)
                .element(by.css('.vendor-filter'))
                .click();
            
            expect(
                element.all(by.repeater('p in vendor.products')).count()
            ).toBeGreaterThan(0);
        });
        
        it('loading status when return from products', function() {
            element(by.css('.container .row div h1 a')).click();
            browser.getCurrentUrl().then(function(url) {
                expect(url).toBe(addressVendor);
            });
            
            expect(
                element(by.css('.vendors-loading')).isDisplayed()
            ).toBeFalsy();
        });
    });
});