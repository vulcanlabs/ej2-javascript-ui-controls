define(["require", "exports", "../src/ajax", "../node_modules/es6-promise/dist/es6-promise"], function (require, exports, ajax_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Ajax', function () {
        describe('onSuccess event', function () {
            beforeAll(function () {
                jasmine.Ajax.install();
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('Ajax options using objects.', function () {
                var doneFn = jasmine.createSpy('onSuccess');
                var ajaxObj = new ajax_1.Ajax();
                ajaxObj.url = '/test';
                ajaxObj.type = 'GET';
                ajaxObj.onSuccess = doneFn;
                ajaxObj.send();
                var request = jasmine.Ajax.requests.mostRecent();
                // check the url get reflected in jasmine ajax 
                expect(request.url).toBe(ajaxObj.url);
                // check the method get reflected in jasmine ajax
                expect(request.method).toBe('GET');
                // check the event not fired before jasmine ajax request
                expect(doneFn).not.toHaveBeenCalled();
                request.respondWith({
                    'status': 200,
                    'contentType': 'text/plain',
                    'responseText': 'Response from Ajax'
                });
                // check the event fired properly after jasmine ajax request
                expect(doneFn).toHaveBeenCalled();
            });
            it('Ajax event get success.', function () {
                var doneFn = jasmine.createSpy('onSuccess');
                var ajaxObj = new ajax_1.Ajax('/test', 'GET', true);
                ajaxObj.onSuccess = doneFn;
                ajaxObj.send();
                var request = jasmine.Ajax.requests.mostRecent();
                // check the url get reflected in jasmine ajax 
                expect(request.url).toBe(ajaxObj.url);
                // check the method get reflected in jasmine ajax
                expect(request.method).toBe('GET');
                // check the event not fired before jasmine ajax request
                expect(doneFn).not.toHaveBeenCalled();
                request.respondWith({
                    'status': 200,
                    'contentType': 'text/plain',
                    'responseText': 'Response from Ajax'
                });
                // check the event fired properly after jasmine ajax request
                expect(doneFn).toHaveBeenCalled();
            });
            it('Ajax event get success without async.', function () {
                var doneFn = jasmine.createSpy('onSuccess');
                var ajaxObj = new ajax_1.Ajax('/test');
                ajaxObj.onSuccess = doneFn;
                ajaxObj.send();
                var request = jasmine.Ajax.requests.mostRecent();
                expect(request.method).toBe('GET');
                // check the event not fired before jasmine ajax request
                expect(doneFn).not.toHaveBeenCalled();
                request.respondWith({
                    'status': 200,
                    'contentType': 'text/plain',
                    'responseText': 'Response without async'
                });
                // check the event fired properly after jasmine ajax request
                expect(doneFn).toHaveBeenCalled();
            });
        });
        describe('onFailure event', function () {
            beforeAll(function () {
                jasmine.Ajax.install();
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('Ajax event get failure.', function () {
                var failFn = jasmine.createSpy('onFailure');
                var ajaxObj = new ajax_1.Ajax('ajax.ts', 'GET', true);
                ajaxObj.onFailure = failFn;
                ajaxObj.send();
                var request = jasmine.Ajax.requests.mostRecent();
                // check the event not fired before jasmine ajax request
                expect(failFn).not.toHaveBeenCalled();
                request.respondWith({});
                // check the event fired properly after jasmine ajax request
                expect(failFn).toHaveBeenCalled();
            });
            it('Ajax event get failure without async.', function () {
                var failFn = jasmine.createSpy('onFailure');
                var ajaxObj = new ajax_1.Ajax('ajax.ts', 'GET');
                ajaxObj.onFailure = failFn;
                ajaxObj.send();
                var request = jasmine.Ajax.requests.mostRecent();
                // check the event not fired before jasmine ajax request
                expect(failFn).not.toHaveBeenCalled();
                request.respondWith({});
                // check the event fired properly after jasmine ajax request
                expect(failFn).toHaveBeenCalled();
            });
        });
        describe('Send method', function () {
            beforeAll(function () {
                jasmine.Ajax.install();
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('Ajax event get success with data in send method.', function () {
                var doneFn = jasmine.createSpy('onSuccess');
                var ajaxObj = new ajax_1.Ajax('/test', 'GET', true);
                ajaxObj.onSuccess = doneFn;
                ajaxObj.send('some string');
                var request = jasmine.Ajax.requests.mostRecent();
                // check the event not fired before jasmine ajax request
                expect(doneFn).not.toHaveBeenCalled();
                request.respondWith({
                    'status': 200,
                    'contentType': 'text/plain',
                    'responseText': 'Response from Ajax'
                });
                // check the event fired properly after jasmine ajax respond
                expect(doneFn).toHaveBeenCalled();
                // check the send data is reflected in jasmine ajax request
                expect(request.params).toEqual(ajaxObj.data);
            });
        });
        describe('without onSuccess event', function () {
            beforeAll(function () {
                jasmine.Ajax.install();
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('Ajax event get success.', function () {
                var ajaxObj = new ajax_1.Ajax('/test', 'GET', true);
                ajaxObj.send();
                var request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({
                    'status': 200,
                    'responseText': 'Response from Ajax'
                });
                // check the event fired properly after jasmine ajax request
                expect(ajaxObj.httpRequest.responseText).toEqual('Response from Ajax');
            });
        });
        describe('without onFailure event', function () {
            beforeAll(function () {
                jasmine.Ajax.install();
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('Ajax event get failure.', function () {
                var ajaxObj = new ajax_1.Ajax('ajax.ts', 'GET', true);
                ajaxObj.send();
                var request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({
                    'responseText': 'XMLHttpRequest failed'
                });
                // check the event fired properly after jasmine ajax request
                expect(ajaxObj.httpRequest.responseText).toEqual('XMLHttpRequest failed');
            });
        });
        describe('getResponseHeader', function () {
            var ajax;
            beforeAll(function (done) {
                jasmine.Ajax.install();
                ajax = new ajax_1.Ajax('mock/url', 'GET');
                var promise = ajax.send();
                var request = jasmine.Ajax.requests.mostRecent();
                request.respondWith({
                    'status': 200,
                    'contentType': 'application/json',
                    'responseText': JSON.stringify([{ Item: 1 }, { Item: 2 }, { Item: 3 }]),
                    'responseHeaders': { 'testheader': 'hi', 'Content-Type': 'application/json' }
                });
                promise.then(function (e) {
                    done();
                });
            });
            afterAll(function () {
                jasmine.Ajax.uninstall();
            });
            it('check responseHeaders', function () {
                expect(ajax.getResponseHeader('testheader')).toBe('hi');
                expect(ajax.getResponseHeader('dude')).toBeNull();
            });
        });
        // describe('option as object', () => {
        //     let ajax: Ajax; let request: JasmineAjaxRequest;
        //     beforeAll((done: Function) => {
        //         jasmine.Ajax.install();
        //         ajax = new Ajax({ url: 'mock/url', type: 'GET' });
        //         let promise: Promise<Object> = ajax.send();
        //         this.request = jasmine.Ajax.requests.mostRecent();
        //         this.request.respondWith({
        //             'status': 200,
        //             'contentType': 'application/json',
        //             'responseText': JSON.stringify([{ Item: 1 }, { Item: 2 }, { Item: 3 }])
        //         });
        //         promise.then((e) => {
        //             done();
        //         });
        //     });
        //     afterAll(() => {
        //         jasmine.Ajax.uninstall();
        //     });
        //     it('check options in request', () => {
        //         expect(this.request.url).toBe(ajax.url);
        //         expect(this.request.method).toBe(ajax.type);
        //     });
        // });
        // describe('beforeSend callback', () => {
        //     let ajax: Ajax;
        //     let request: JasmineAjaxRequest;
        //     let spyBeforeSend = jasmine.createSpy('beforeSend');
        //     let spyOnload = jasmine.createSpy('onLoad');
        //     let spyOnprogress = jasmine.createSpy('onProgress');
        //     beforeAll((done: Function) => {
        //         jasmine.Ajax.install();
        //         ajax = new Ajax({
        //             url: 'mock/url', type: 'GET',
        //             beforeSend: spyBeforeSend,
        //             onLoad: spyOnload,
        //             onProgress: spyOnprogress,
        //             dataType: 'json', contentType: 'application/json', data: JSON.stringify({ hi: 'hello' })
        //         });
        //         let promise: Promise<Object> = ajax.send();
        //         this.request = jasmine.Ajax.requests.mostRecent();
        //         this.request.respondWith({
        //             'status': 200,
        //             'contentType': 'application/json',
        //             'responseText': ''
        //         });
        //         promise.then((e) => {
        //             done();
        //         });
        //     });
        //     afterAll(() => {
        //         jasmine.Ajax.uninstall();
        //     });
        //     it('beforeSend call check', () => {
        //         expect(spyBeforeSend).toHaveBeenCalled();
        //         expect(this.request.requestHeaders['Content-Type']).toBe('application/json');
        //     });
        //     it('onload', () => {
        //         expect(spyOnload).toHaveBeenCalled();
        //     });
        //     it('onprogress', () => {
        //         expect(spyOnprogress).toHaveBeenCalled();
        //     });
        // });
        // describe('AJAX request with content-type null', () => {
        //     let ajax: Ajax;
        //     let request: JasmineAjaxRequest;
        //     let spyBeforeSend = jasmine.createSpy('beforeSend');
        //     let spyOnload = jasmine.createSpy('onLoad');
        //     let spyOnprogress = jasmine.createSpy('onProgress');
        //     beforeAll((done: Function) => {
        //         jasmine.Ajax.install();
        //         ajax = new Ajax({
        //             url: 'mock/url', type: 'GET',
        //             beforeSend: spyBeforeSend,
        //             onLoad: spyOnload,
        //             onProgress: spyOnprogress,
        //             dataType: 'json', contentType: null, data: JSON.stringify({ hi: 'hello' })
        //         });
        //         let promise: Promise<Object> = ajax.send();
        //         this.request = jasmine.Ajax.requests.mostRecent();
        //         this.request.respondWith({
        //             'status': 200,
        //             'contentType': 'application/json',
        //             'responseText': ''
        //         });
        //         promise.then((e) => {
        //             done();
        //         });
        //     });
        //     afterAll(() => {
        //         jasmine.Ajax.uninstall();
        //     });
        //     it('beforeSend call check', () => {
        //         expect(spyBeforeSend).toHaveBeenCalled();
        //         expect(this.request.requestHeaders['Content-Type']).not.toBe('application/json');
        //     });
        //     it('onload', () => {
        //         expect(spyOnload).toHaveBeenCalled();
        //     });
        //     it('onprogress', () => {
        //         expect(spyOnprogress).toHaveBeenCalled();
        //     });
        // });
        // describe('Cancel the request in beforeSend event', () => {
        //     let ajax: Ajax;
        //     let spyUploadInprogress = jasmine.createSpy('spyUploadInprogress');
        //     beforeAll((done: Function) => {
        //         jasmine.Ajax.install();
        //         ajax = new Ajax({
        //             url: 'mock/url', type: 'GET',
        //             beforeSend: function (args: any) {
        //                 args.cancel = true;
        //             },
        //             data: JSON.stringify({ hi: 'hello' })
        //         });
        //         ajax.onUploadProgress = spyUploadInprogress;
        //         let promise: Promise<Object> = ajax.send();
        //         this.request = jasmine.Ajax.requests.mostRecent();
        //         this.request.respondWith({
        //             'status': 200,
        //             'responseText': ''
        //         });
        //         promise.then((e) => {
        //             done();
        //         });
        //     });
        //     afterAll(() => {
        //         jasmine.Ajax.uninstall();
        //     });
        //     it('Upload progress', () => {
        //         expect(spyUploadInprogress).not.toHaveBeenCalled();
        //     });
        // });
    });
});
//# sourceMappingURL=ajax.spec.js.map