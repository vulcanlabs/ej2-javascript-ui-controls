define(["require", "exports", "../src/event-handler", "../src/dom"], function (require, exports, event_handler_1, dom_1) {
    "use strict";
    var _this = this;
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('EventHandler', function () {
        describe('add event', function () {
            it('Check event binding', function () {
                var node = (0, dom_1.createElement)('div', { id: 'test' });
                var clickFn = jasmine.createSpy('clickEvent');
                var event = new event_handler_1.EventHandler();
                event_handler_1.EventHandler.add(node, 'click', clickFn);
                expect(clickFn).not.toHaveBeenCalled();
                event_handler_1.EventHandler.trigger(node, 'click');
                expect(clickFn).toHaveBeenCalled();
            });
        });
        describe('add event with debounce', function () {
            beforeEach(function (done) {
                setTimeout(function () {
                    done();
                }, 100);
            });
            // to check click event
            var node = (0, dom_1.createElement)('div', { id: 'test' });
            var clickFn = jasmine.createSpy('clickEvent');
            event_handler_1.EventHandler.add(node, 'click', clickFn, _this, 100);
            event_handler_1.EventHandler.trigger(node, 'click');
            it('Check event binding', function () {
                expect(clickFn).toHaveBeenCalled();
            });
        });
        describe('remove event', function () {
            it('remove event without binding', function () {
                var node = (0, dom_1.createElement)('div', { id: 'test' });
                var clickFn = jasmine.createSpy('clickEvent');
                clickFn = jasmine.createSpy('clickEvent');
                event_handler_1.EventHandler.remove(node, 'click', clickFn);
                event_handler_1.EventHandler.trigger(node, 'click');
                expect(clickFn).not.toHaveBeenCalled();
            });
            it('remove event listener', function () {
                var node = (0, dom_1.createElement)('div', { id: 'test' });
                var clickFn = jasmine.createSpy('clickEvent');
                event_handler_1.EventHandler.add(node, 'click', clickFn);
                event_handler_1.EventHandler.trigger(node, 'click');
                expect(clickFn).toHaveBeenCalled();
                clickFn = jasmine.createSpy('clickEvent');
                event_handler_1.EventHandler.remove(node, 'click', clickFn);
                event_handler_1.EventHandler.trigger(node, 'click');
                expect(clickFn).not.toHaveBeenCalled();
            });
            it('remove different event listener', function () {
                var node = (0, dom_1.createElement)('div', { id: 'test' });
                var clickFn = jasmine.createSpy('clickEvent');
                event_handler_1.EventHandler.add(node, 'click', clickFn);
                event_handler_1.EventHandler.trigger(node, 'click');
                expect(clickFn).toHaveBeenCalled();
                var clickFunc = jasmine.createSpy('clickEvent');
                event_handler_1.EventHandler.remove(node, 'click', clickFunc);
                event_handler_1.EventHandler.trigger(node, 'click');
                expect(clickFn).toHaveBeenCalled();
            });
            it('remove unbound events', function () {
                var node = (0, dom_1.createElement)('div', { id: 'test' });
                var clickFn = jasmine.createSpy('clickEvent');
                // added click event
                event_handler_1.EventHandler.add(node, 'click', clickFn);
                event_handler_1.EventHandler.trigger(node, 'click');
                expect(clickFn).toHaveBeenCalled();
                // removing unbound event
                clickFn = jasmine.createSpy('clickEvent');
                event_handler_1.EventHandler.remove(node, '', clickFn);
                event_handler_1.EventHandler.trigger(node, '');
                expect(clickFn).not.toHaveBeenCalled();
            });
            it('remove bound events', function () {
                var node = (0, dom_1.createElement)('div', { id: 'test' });
                var clickFn = jasmine.createSpy('clickEvent');
                event_handler_1.EventHandler.add(node, 'click', clickFn);
                event_handler_1.EventHandler.trigger(node, 'click');
                expect(clickFn).toHaveBeenCalled();
                clickFn = jasmine.createSpy('clickEvent');
                event_handler_1.EventHandler.remove(node, 'click', clickFn);
                event_handler_1.EventHandler.trigger(node, 'click');
                expect(clickFn).not.toHaveBeenCalled();
            });
        });
        describe('clear event', function () {
            it('Check event cleared properly using instance method', function () {
                var node = (0, dom_1.createElement)('div', { id: 'test' });
                // click event bind
                var clickFn = jasmine.createSpy('clickEvent');
                event_handler_1.EventHandler.add(node, 'click', clickFn);
                // mouseup event bind
                var mouseup = jasmine.createSpy('clickEvent');
                event_handler_1.EventHandler.add(node, 'mouseup', mouseup);
                // clear all the events from element
                event_handler_1.EventHandler.clearEvents(node);
                event_handler_1.EventHandler.trigger(node, 'click');
                event_handler_1.EventHandler.trigger(node, 'mouseup');
                expect(clickFn).not.toHaveBeenCalled();
                expect(mouseup).not.toHaveBeenCalled();
            });
        });
        describe('multiple events', function () {
            it('trigger handler', function () {
                var node = (0, dom_1.createElement)('div', { id: 'test' });
                // click event bind
                var clickFn1 = jasmine.createSpy('clickEvent1');
                event_handler_1.EventHandler.add(node, 'click', clickFn1);
                event_handler_1.EventHandler.add(node, 'click', clickFn1);
                event_handler_1.EventHandler.add(node, 'click', clickFn1);
                event_handler_1.EventHandler.trigger(node, 'click');
                expect(clickFn1).toHaveBeenCalledTimes(3);
            });
        });
    });
});
//# sourceMappingURL=event-handler.spec.js.map