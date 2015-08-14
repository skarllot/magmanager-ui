describe('MagManager', function() {
    var address = process.env.API_ENDPOINT;
    if (!address) {
        address = 'http://development.magmanager.divshot.io/';
    }
    
    describe('vendor', function() {
        var addressVendor = address + '#/vendor';
        var vendorList = element.all(by.repeater('v in vendors'));
        
        it('open page', function() {
            browser.get(address);

            element(by.css('.container p a')).click();
            browser.getCurrentUrl().then(function(url) {
                expect(url).toBe(addressVendor);
            });
        });

        it('listing', function() {
            expect(vendorList.count()).toBeGreaterThan(0);
        });
        
        it('create', function() {
            var newName = 'TEST VENDOR';
            vendorList.count().then(function(vendorCount) {
                element(by.css('#vendor-new')).click();

                var vName = element(by.model('vendor.name'));
                var btnSave = element(by.buttonText('Save'));

                expect(vName.isPresent()).toBe(true);
                expect(btnSave.isPresent()).toBe(true);

                vName.sendKeys(newName);
                btnSave.click();

                expect(vendorList.count()).toEqual(vendorCount + 1);
            });
            
            expect(
                vendorList.last().element(by.binding('name')).getText()
            ).toEqual(newName);
        });
        
        it('edit', function() {
            var vName = vendorList
                .last()
                .element(by.binding('name'));
            
            expect(vName.isPresent()).toBe(true);
            
            vName.getText().then(function(name) {
                var appendText = 'EDITED';
                vendorList
                    .last()
                    .element(by.css('.vendor-edit'))
                    .click();
                
                txtVName = element(by.model('vendor.name'));
                var btnSave = element(by.buttonText('Save'));
                var btnCancel = element(by.buttonText('Cancel'));
                
                expect(txtVName.isPresent()).toBe(true);
                expect(btnSave.isPresent()).toBe(true);
                expect(btnCancel.isPresent()).toBe(true);
                
                txtVName.sendKeys(appendText);
                btnSave.click();
                
                expect(vName.getText()).toEqual(name + appendText);
            });
        });
        
        it('delete', function() {
            vendorList.count().then(function(vendorCount) {
                vendorList
                    .last()
                    .element(by.css('.vendor-delete'))
                    .click();

                var btnYes = element(by.buttonText('Yes'));
                expect(btnYes.isPresent()).toBe(true);
                btnYes.click();

                expect(vendorList.count()).toEqual(vendorCount - 1);
            });
        });
        
        it('products', function() {
            vendorList
                .get(0)
                .element(by.css('.vendor-filter'))
                .click();
            
            expect(
                element.all(by.repeater('p in vendor.products')).count()
            ).toBeGreaterThan(0);
        });
        
        it('return from products', function() {
            element(by.css('.container .row div h1 a')).click();
            browser.getCurrentUrl().then(function(url) {
                expect(url).toBe(addressVendor);
            });
            
            expect(vendorList.count()).toBeGreaterThan(0);
        });
        
        it('loading status after return from products', function() {
            expect(
                element(by.css('.vendors-loading')).isDisplayed()
            ).toBeFalsy();
        });
    });
});