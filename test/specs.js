describe('MagManager', function() {
    var address = process.env.WEB_ADDRESS;
    if (!address) {
        address = 'http://localhost:8000/';
    }
    var timeoutMs = 500;
    
    describe('vendor', function() {
        var addressVendor = address + '#/vendor';
        var vendorList = element.all(by.repeater('v in vm.vendors'));
        
        it('open page', function() {
            browser.get(address);

            element(by.css('.container p a')).click();
            browser.getCurrentUrl().then(function(url) {
                expect(url).toBe(addressVendor);
            });
        });

        it('listing', function() {
            /* FAILS IF UNCOMMENTED
            browser.wait(element(by.css('.vendors-loading')).isPresent);
            browser.wait(function() {
                var defer = protractor.promise.defer();
                element(by.css('.vendors-loading')).isDisplayed()
                    .then(function(isDisplayed) {
                        defer.fulfill(!isDisplayed);
                    });
                return defer.promise;
            }, timeoutMs);*/
            browser.sleep(timeoutMs);
            
            expect(vendorList.count()).toBeGreaterThan(0);
        });
        
        it('create', function() {
            var newName = 'TEST VENDOR';
            vendorList.count().then(function(vendorCount) {
                element(by.css('#vendor-new')).click();

                var vName = element(by.model('vm.vendor.name'));
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
                
                txtVName = element(by.model('vm.vendor.name'));
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
        
        it('edit again', function() {
            var vName = vendorList
                .last()
                .element(by.binding('name'));
            
            expect(vName.isPresent()).toBe(true);
            
            vName.getText().then(function(name) {
                var appendText = 'AGAIN';
                vendorList
                    .last()
                    .element(by.css('.vendor-edit'))
                    .click();
                
                txtVName = element(by.model('vm.vendor.name'));
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
            // KEEP PRODUCT LISTING AFTER VENDOR DELETE TO AVOID BUG REGRESSION
            vendorList
                .get(0)
                .element(by.css('.vendor-filter'))
                .click();
            
            /* FAILS IF UNCOMMENTED
            browser.wait(element(by.css('.products-loading')).isPresent);
            browser.wait(function() {
                var defer = protractor.promise.defer();
                element(by.css('.products-loading')).isDisplayed()
                    .then(function(isDisplayed) {
                        defer.fulfill(!isDisplayed);
                    });
                return defer.promise;
            }, timeoutMs);*/
            browser.sleep(timeoutMs);
            
            expect(
                element.all(by.repeater('p in vm.vendor.products')).count()
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