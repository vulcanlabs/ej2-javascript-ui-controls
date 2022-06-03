define(["require", "exports", "../src/touch", "../src/dom"], function (require, exports, touch_1, dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /*tslint:disable */
    var touchTestObj;
    /*tslint:enable */
    var node;
    var direction;
    //Spy function for testing callback 
    var tEvents = {
        tapEvent: function () { },
        tapHold: function () { },
        swipe: function (e) { direction = e.swipeDirection; },
        scroll: function () { },
        cancel: function () { }
    };
    //Simulated MouseEvents Args
    var startMouseEventArs = {
        clientX: 200, clientY: 200, target: node, type: 'touchstart',
        preventDefault: function () { }
    };
    var moveMouseEventArs = {
        clientX: 500, clientY: 400, target: node, type: 'touchmove',
        preventDefault: function () { }
    };
    var endMouseEventArs = {
        clientX: 200, clientY: 200, target: node, type: 'touchend',
        preventDefault: function () { }
    };
    //Async Test For Tap Event // Tap delay is 300ms
    function TapEventTest(done, delay) {
        touchTestObj.startEvent(startMouseEventArs);
        touchTestObj.endEvent(endMouseEventArs);
        setTimeout(function () {
            done();
        }, delay);
    }
    node = (0, dom_1.createElement)('div', { id: 'test' });
    touchTestObj = new touch_1.Touch(node);
    touchTestObj.swipe = function (e) { tEvents.swipe(e); };
    touchTestObj.scroll = function () { tEvents.scroll(); };
    touchTestObj.tap = function () { tEvents.tapEvent(); };
    // //Cover on property change.
    touchTestObj.onPropertyChanged();
    // Spec for Touch Framework    
    describe('Touch', function () {
        beforeEach(function () {
            spyOn(tEvents, 'tapEvent').and.callThrough();
            spyOn(tEvents, 'tapHold').and.callThrough();
            spyOn(tEvents, 'swipe').and.callThrough();
            spyOn(tEvents, 'scroll').and.callThrough();
            spyOn(tEvents, 'cancel').and.callThrough();
        });
        describe('Initialization of touch', function () {
            it('empty constructor', function () {
                var ele = (0, dom_1.createElement)('div', { id: 'test' });
                var objTouch = new touch_1.Touch(ele);
                expect(ele.classList.contains('e-touch')).toEqual(true);
            });
            it('constructor with options', function () {
                var ele = (0, dom_1.createElement)('div', { id: 'test' });
                var objTouch = new touch_1.Touch(ele, { tap: function () { } });
                expect(typeof objTouch.tap).toEqual('function');
                expect(ele.classList.contains('e-touch')).toEqual(true);
            });
            it('ie browser constructor', function () {
                var ele = (0, dom_1.createElement)('div', { id: 'test' });
                var myWindow = window;
                myWindow['browserDetails'].isIE = true;
                var objTouch = new touch_1.Touch(ele, { tap: function () { } });
                expect(typeof objTouch.tap).toEqual('function');
                expect(ele.classList.contains('e-block-touch')).toEqual(true);
            });
        });
        describe('Swipe', function () {
            it('event handler callback on swipe vertical', function () {
                var movedEnd = moveMouseEventArs;
                movedEnd.type = 'touchend';
                movedEnd.clientY = 400;
                var swipeFn = jasmine.createSpy('clickEvent');
                touchTestObj.swipe = swipeFn;
                //Actions
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveMouseEventArs);
                touchTestObj.endEvent(movedEnd);
                //Asserts
                expect(swipeFn).toHaveBeenCalled();
                touchTestObj.swipe = undefined;
            });
            it('event handler callback on swipe horizontal', function () {
                var movedEnd = moveMouseEventArs;
                movedEnd.type = 'touchend';
                movedEnd.clientX = 400;
                var swipeFn = jasmine.createSpy('swipeEvent');
                touchTestObj.addEventListener('swipe', swipeFn);
                //Actions
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveMouseEventArs);
                touchTestObj.endEvent(movedEnd);
                //Asserts
                expect(swipeFn).toHaveBeenCalled();
            });
            it('swipe callback test on swipe down', function () {
                touchTestObj.swipe = function (e) { tEvents.swipe(e); };
                var movedEnd = moveMouseEventArs;
                movedEnd.type = 'touchend';
                movedEnd.clientY = 400;
                //Actions
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveMouseEventArs);
                touchTestObj.endEvent(movedEnd);
                //Asserts
                expect(direction).toBe('Down');
                expect(tEvents.swipe).toHaveBeenCalled();
                expect(tEvents.scroll).toHaveBeenCalled();
                expect(tEvents.tapEvent).not.toHaveBeenCalled();
                expect(tEvents.tapHold).not.toHaveBeenCalled();
            });
            it('swipe callback test on swipe up', function () {
                var movedEnd = moveMouseEventArs;
                movedEnd.type = 'touchend';
                movedEnd.clientY = 100;
                movedEnd.clientX = 200;
                //Actions
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveMouseEventArs);
                touchTestObj.endEvent(movedEnd);
                //Asserts
                expect(direction).toBe('Up');
                expect(tEvents.swipe).toHaveBeenCalled();
                expect(tEvents.scroll).toHaveBeenCalled();
                expect(tEvents.tapEvent).not.toHaveBeenCalled();
                expect(tEvents.tapHold).not.toHaveBeenCalled();
            });
            it('swipe callback test on swipe direction right.', function () {
                var movedEnd = moveMouseEventArs;
                movedEnd.type = 'touchend';
                movedEnd.clientX = 400;
                //Actions
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveMouseEventArs);
                touchTestObj.endEvent(movedEnd);
                //Asserts
                expect(direction).toBe('Right');
                expect(tEvents.swipe).toHaveBeenCalled();
                expect(tEvents.scroll).toHaveBeenCalled();
                expect(tEvents.tapEvent).not.toHaveBeenCalled();
                expect(tEvents.tapHold).not.toHaveBeenCalled();
            });
            it('swipe callback test on swipe left', function () {
                var movedEnd = moveMouseEventArs;
                movedEnd.clientX = 100;
                movedEnd.clientY = 200;
                //Actions
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(movedEnd);
                touchTestObj.endEvent(movedEnd);
                //Asserts
                expect(direction).toBe('Left');
                expect(tEvents.swipe).toHaveBeenCalled();
                expect(tEvents.scroll).toHaveBeenCalled();
                expect(tEvents.tapEvent).not.toHaveBeenCalled();
                expect(tEvents.tapHold).not.toHaveBeenCalled();
            });
            it('swipe event callback test without handler.', function () {
                var movedEnd = moveMouseEventArs;
                movedEnd.clientX = 100;
                movedEnd.clientY = 200;
                touchTestObj.swipe = undefined;
                //Actions
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(movedEnd);
                touchTestObj.endEvent(movedEnd);
                //Asserts
                expect(tEvents.swipe).not.toHaveBeenCalled();
                expect(tEvents.scroll).toHaveBeenCalled();
                expect(tEvents.tapEvent).not.toHaveBeenCalled();
                expect(tEvents.tapHold).not.toHaveBeenCalled();
                touchTestObj.addEventListener('swipe', function (e) { tEvents.swipe(e); });
            });
        });
        describe('Scroll event', function () {
            it('event handler callback on scroll', function () {
                var movedEnd = moveMouseEventArs;
                movedEnd.type = 'touchend';
                var moveArgs = moveMouseEventArs;
                moveArgs.clientY = 300;
                var scrollFn = jasmine.createSpy('scrollEvt');
                touchTestObj.scroll = scrollFn;
                //Actions
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveArgs);
                touchTestObj.endEvent(movedEnd);
                expect(scrollFn).toHaveBeenCalled();
            });
            it('scroll event callback test on vertical scrolling.', function () {
                touchTestObj.scroll = function () { tEvents.scroll(); };
                var movedEnd = moveMouseEventArs;
                movedEnd.type = 'touchend';
                var moveArgs = moveMouseEventArs;
                moveArgs.clientY = 300;
                //Actions
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveArgs);
                touchTestObj.endEvent(movedEnd);
                expect(tEvents.scroll).toHaveBeenCalled();
            });
            it('scroll event callback test on vertical scrolling.', function () {
                var movedEnd = moveMouseEventArs;
                movedEnd.type = 'touchend';
                var moveArgs = moveMouseEventArs;
                moveArgs.clientY = 300;
                //Actions
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveArgs);
                touchTestObj.endEvent(movedEnd);
                expect(tEvents.scroll).toHaveBeenCalled();
            });
            it('scroll event callback test on horizontal scrolling.', function () {
                var movedEnd = moveMouseEventArs;
                movedEnd.type = 'touchend';
                var moveArgs = moveMouseEventArs;
                moveArgs.clientX = 300;
                //Actions
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveArgs);
                touchTestObj.endEvent(movedEnd);
                expect(tEvents.scroll).toHaveBeenCalled();
            });
            it('scroll event callback test on without move action.', function () {
                //Actions
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(startMouseEventArs);
                touchTestObj.endEvent(startMouseEventArs);
                expect(tEvents.scroll).not.toHaveBeenCalled();
            });
            it('left and right scroll direction', function () {
                var movedEnd = moveMouseEventArs;
                movedEnd.type = 'touchend';
                var moveArgs = moveMouseEventArs;
                var direction = '';
                moveArgs.clientX = 400;
                touchTestObj.scroll = function (e) {
                    direction = e.scrollDirection;
                };
                //Actions
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveArgs);
                touchTestObj.endEvent(movedEnd);
                expect(direction).toBe('Right');
                moveArgs.clientX = 50;
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveArgs);
                touchTestObj.endEvent(movedEnd);
                expect(direction).toBe('Left');
            });
            it('scroll event callback test without handler.', function () {
                var movedEnd = moveMouseEventArs;
                movedEnd.type = 'touchend';
                var moveArgs = moveMouseEventArs;
                moveArgs.clientX = 300;
                //Actions
                touchTestObj.scroll = undefined;
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.moveEvent(moveArgs);
                touchTestObj.endEvent(movedEnd);
                expect(tEvents.scroll).not.toHaveBeenCalled();
                touchTestObj.addEventListener('scroll', function () { tEvents.scroll(); });
            });
        });
        describe('TapHold event', function () {
            beforeEach(function (done) {
                touchTestObj.startEvent(startMouseEventArs);
                setTimeout(function () {
                    done();
                }, 750);
            });
            it('taphold event callback with handler', function () {
                expect(tEvents.tapHold).not.toHaveBeenCalled();
                expect(tEvents.tapEvent).not.toHaveBeenCalled();
                expect(tEvents.swipe).not.toHaveBeenCalled();
                expect(tEvents.scroll).not.toHaveBeenCalled();
            });
        });
        describe('TapHold event', function () {
            beforeEach(function (done) {
                touchTestObj.tapHold = function () { tEvents.tapHold(); };
                touchTestObj.startEvent(startMouseEventArs);
                setTimeout(function () {
                    done();
                }, 750);
            });
            it('taphold event callback with handler', function () {
                expect(tEvents.tapHold).toHaveBeenCalled();
                expect(tEvents.tapEvent).not.toHaveBeenCalled();
                expect(tEvents.swipe).not.toHaveBeenCalled();
                expect(tEvents.scroll).not.toHaveBeenCalled();
            });
        });
        describe('Touch cancel event', function () {
            beforeEach(function (done) {
                touchTestObj.tapHold = function () { tEvents.tapHold(); };
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.cancelEvent(startMouseEventArs);
                setTimeout(function () {
                    done();
                }, 750);
            });
            it('cancel event callback with handler', function () {
                expect(tEvents.tapHold).not.toHaveBeenCalled();
                expect(tEvents.tapEvent).not.toHaveBeenCalled();
                expect(tEvents.swipe).not.toHaveBeenCalled();
                expect(tEvents.scroll).not.toHaveBeenCalled();
                expect(tEvents.cancel).not.toHaveBeenCalled();
            });
        });
        describe('swipe trigger during cancel event', function () {
            beforeEach(function (done) {
                touchTestObj.tapHold = function () { tEvents.tapHold(); };
                touchTestObj.startEvent(startMouseEventArs);
                touchTestObj.cancelEvent(moveMouseEventArs);
                setTimeout(function () {
                    done();
                }, 750);
            });
            it('cancel event callback', function () {
                expect(tEvents.tapHold).not.toHaveBeenCalled();
                expect(tEvents.tapEvent).not.toHaveBeenCalled();
                expect(tEvents.swipe).toHaveBeenCalled();
                expect(tEvents.scroll).not.toHaveBeenCalled();
                expect(tEvents.cancel).not.toHaveBeenCalled();
            });
        });
        describe('Tap event', function () {
            var tapFn = jasmine.createSpy('tapEvent');
            beforeEach(function (done) {
                touchTestObj.tap = tapFn;
                TapEventTest(done, 500);
            });
            it('event handler for tap event', function () {
                expect(tapFn).toHaveBeenCalled();
            });
            beforeEach(function (done) {
                touchTestObj.tap = function () { tEvents.tapEvent(); };
                TapEventTest(done, 500);
            });
            it('tap event callback 500ms delay with doubletap.', function () {
                expect(tEvents.tapEvent).toHaveBeenCalled();
                expect(tEvents.tapHold).not.toHaveBeenCalled();
                expect(tEvents.swipe).not.toHaveBeenCalled();
                expect(tEvents.scroll).not.toHaveBeenCalled();
            });
            beforeEach(function (done) {
                TapEventTest(done, 0);
            });
            it('tap event callback 0ms delay without doubletap.', function () {
                expect(tEvents.tapEvent).toHaveBeenCalled();
                expect(tEvents.tapHold).not.toHaveBeenCalled();
                expect(tEvents.swipe).not.toHaveBeenCalled();
                expect(tEvents.scroll).not.toHaveBeenCalled();
            });
        });
        describe('Tap Count', function () {
            var tapCount = 0;
            var tapFn = jasmine.createSpy('tapEvent');
            beforeEach(function (done) {
                tapCount++;
                touchTestObj.tap = tapFn;
                TapEventTest(done, 500);
            });
            it('Count for tap event', function () {
                expect(tapFn).toHaveBeenCalled();
            });
        });
        describe('Changed touches', function () {
            it('changed touches event argument', function () {
                var startEvt = { changedTouches: [startMouseEventArs], preventDefault: function () { } };
                var moveEvt = { changedTouches: [moveMouseEventArs], preventDefault: function () { } };
                //Actions
                touchTestObj.startEvent(startEvt);
                touchTestObj.moveEvent(moveEvt);
                touchTestObj.endEvent(moveEvt);
                //Asserts
                expect(tEvents.swipe).toHaveBeenCalled();
                expect(tEvents.scroll).toHaveBeenCalled();
                expect(tEvents.tapEvent).not.toHaveBeenCalled();
                expect(tEvents.tapHold).not.toHaveBeenCalled();
            });
        });
        describe('Method event', function () {
            it('destroy class test', function () {
                var ele = (0, dom_1.createElement)('div', { id: 'test' });
                var objTouch = new touch_1.Touch(ele);
                objTouch.tapHoldThreshold = 650;
                expect(ele.classList.contains('e-touch')).toEqual(true);
                objTouch.destroy();
                expect(ele.classList.contains('e-touch')).toEqual(false);
            });
        });
        describe('swipe while scroll', function () {
            var inst;
            var element;
            var spy;
            var spy1;
            beforeAll(function () {
                element = (0, dom_1.createElement)('div', {
                    // tslint:disable-next-line:no-multiline-string
                    id: 'test', innerHTML: "Swipe while scroll\n                India is a vast South Asian<br>\n                Capital: New Delhi<br>\n                President: Pranab Mukherjee<br>\n                Prime minister: Narendra Modi<br>\n                Population: 1.252 billion (2013) World Bank<br>\n                Currency: Indian rupee<br>\n                Gross domestic product: 1.877 trillion USD (2013) World Bank\n\n                India is a vast South Asian country with<br>\n                Capital: New Delhi<br>\n                President: Pranab Mukherjee<br>\n                Prime minister: Narendra Modi<br>\n                Population: 1.252 billion (2013) World Bank<br>\n                Currency: Indian rupee<br>\n                Gross domestic product: 1.877 trillion USD (2013) World Bank\n                India is a vast South Asian<br>\n                Capital: New Delhi<br>\n                President: Pranab Mukherjee<br>\n                Prime minister: Narendra Modi<br>\n                Population: 1.252 billion (2013) World Bank<br>\n                Currency: Indian rupee<br>\n                Gross domestic product: 1.877 trillion USD (2013) World Bank",
                    styles: 'overflow:auto;width:250px;height:350px'
                });
                document.body.appendChild(element);
                inst = new touch_1.Touch(element, {});
            });
            beforeEach(function () {
                spy = jasmine.createSpy('testSpy');
                spy1 = jasmine.createSpy('tSpy');
            });
            afterAll(function () {
                var child = document.getElementById('test');
                document.removeChild(child);
            });
            it('no swipe - Up', function () {
                inst.swipe = spy;
                inst.scroll = spy1;
                var startEvt = {
                    clientX: 100, clientY: 450, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                var moveEvt = {
                    clientX: 100, clientY: 400, target: node, type: 'touchmove',
                    preventDefault: function () { }
                };
                //Actions
                inst.startEvent(startEvt);
                inst.moveEvent(moveEvt);
                inst.endEvent(moveEvt);
                //Asserts
                expect(spy).not.toHaveBeenCalled();
                expect(spy1).toHaveBeenCalled();
            });
            it('no swipe - Down', function () {
                inst.swipe = spy;
                inst.scroll = spy1;
                var startEvt = {
                    clientX: 100, clientY: 400, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                var moveEvt = {
                    clientX: 100, clientY: 420, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                //Actions
                inst.startEvent(startEvt);
                inst.moveEvent(moveEvt);
                inst.endEvent(moveEvt);
                //Asserts
                expect(spy).not.toHaveBeenCalled();
                expect(spy1).toHaveBeenCalled();
            });
            it('no swipe - Left', function () {
                inst.swipe = spy;
                inst.scroll = spy1;
                var startEvt = {
                    clientX: 150, clientY: 450, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                var moveEvt = {
                    clientX: 100, clientY: 450, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                //Actions
                inst.startEvent(startEvt);
                inst.moveEvent(moveEvt);
                inst.endEvent(moveEvt);
                //Asserts
                expect(spy).not.toHaveBeenCalled();
                expect(spy1).toHaveBeenCalled();
            });
            it('no swipe - Right', function () {
                inst.swipe = spy;
                inst.scroll = spy1;
                var startEvt = {
                    clientX: 100, clientY: 450, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                var moveEvt = {
                    clientX: 150, clientY: 450, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                //Actions
                inst.startEvent(startEvt);
                inst.moveEvent(moveEvt);
                inst.endEvent(moveEvt);
                //Asserts
                expect(spy).not.toHaveBeenCalled();
                expect(spy1).toHaveBeenCalled();
            });
            it('swipe - Up', function () {
                inst.swipe = spy;
                var startEvt = {
                    clientX: 100, clientY: 470, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                var moveEvt = {
                    clientX: 100, clientY: 410, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                //Actions
                inst.startEvent(startEvt);
                inst.moveEvent(moveEvt);
                inst.endEvent(moveEvt);
                //Asserts
                expect(spy).toHaveBeenCalled();
            });
            it('swipe - Down', function () {
                inst.swipe = spy;
                var startEvt = {
                    clientX: 100, clientY: 410, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                var moveEvt = {
                    clientX: 105, clientY: 470, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                //Actions
                inst.startEvent(startEvt);
                inst.moveEvent(moveEvt);
                inst.endEvent(moveEvt);
                //Asserts
                expect(spy).toHaveBeenCalled();
            });
            it('swipe - Right', function () {
                inst.swipe = spy;
                var startEvt = {
                    clientX: 100, clientY: 450, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                var moveEvt = {
                    clientX: 170, clientY: 450, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                //Actions
                inst.startEvent(startEvt);
                inst.moveEvent(moveEvt);
                inst.endEvent(moveEvt);
                //Asserts
                expect(spy).toHaveBeenCalled();
            });
            it('swipe - Left', function () {
                inst.swipe = spy;
                var startEvt = {
                    clientX: 170, clientY: 450, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                var moveEvt = {
                    clientX: 100, clientY: 450, target: node, type: 'touchstart',
                    preventDefault: function () { }
                };
                //Actions
                inst.startEvent(startEvt);
                inst.moveEvent(moveEvt);
                inst.endEvent(moveEvt);
                //Asserts
                expect(spy).toHaveBeenCalled();
            });
        });
    });
});
//# sourceMappingURL=touch.spec.js.map