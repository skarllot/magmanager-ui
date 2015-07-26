describe('MagManager', function() {
    var address = process.env.API_ENDPOINT;
    if (!address) {
        address = 'https://magmanager.github.io/';
    }
    
    describe('vendor', function() {
        it('open page', function() {
            browser.get(address);

            element(by.css('.container p a')).click();
            browser.getCurrentUrl()
            .then(function(url) {
                expect(url).toBe(address + '#/vendor');
            });
        });

        it('listing', function() {
            var vendors = element.all(by.repeater('v in vendors'));
            expect(vendors.count()).toBeGreaterThan(0);
        });
    });
});