var address = 'https://magmanager.github.io/';

describe('Vendor Testing', function() {
    it('Open vendors page', function() {
        browser.get(address);
        
        element(by.css('.container p a')).click();
        browser.getCurrentUrl()
        .then(function(url) {
            expect(url).toBe(address + '#/vendor');
        });
    });
    
    it('Vendor Listing', function() {
        var vendors = element.all(by.repeater('v in vendors'));
        expect(vendors.count()).toBeGreaterThan(0);
    });
});