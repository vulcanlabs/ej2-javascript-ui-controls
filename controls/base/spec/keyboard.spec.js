define(["require", "exports", "../src/keyboard", "../src/util", "../src/dom"], function (require, exports, keyboard_1, util_1, dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ele;
    var objKeyConfig;
    ele = (0, dom_1.createElement)('div', { id: 'keytest' });
    // Spec for KeyConfig Framework    
    describe('KeyConfig', function () {
        describe('instance creation', function () {
            it('with default option', function () {
                var ele1 = (0, dom_1.createElement)('div', { id: 'keytest' });
                var kbEvt = new keyboard_1.KeyboardEvents(ele1, {
                    keyConfigs: { selectAll: 'ctrl+a' },
                    keyAction: function () { }
                });
                //Cover onPropertyChanged function
                kbEvt.onPropertyChanged({}, {});
                expect(kbEvt.element.classList.contains('e-keyboard')).toEqual(true);
            });
            it('without default option', function () {
                ele = (0, dom_1.createElement)('div', { id: 'keytest' });
                objKeyConfig = new keyboard_1.KeyboardEvents(ele);
                objKeyConfig.keyConfigs = { selectAll: 'ctrl+a' };
                objKeyConfig.keyAction = function () { };
                //Cover the code since its not used.
                objKeyConfig.getModuleName();
                expect(objKeyConfig.element.classList.contains('e-keyboard')).toEqual(true);
            });
        });
        describe('Action', function () {
            beforeAll(function () {
                spyOn(objKeyConfig, 'keyAction');
            });
            beforeEach(function () {
                objKeyConfig.keyAction.calls.reset();
            });
            it('single special key (ESC)', function () {
                var eventArgs = { which: 27, altKey: false, ctrlKey: false, shiftKey: false };
                objKeyConfig.keyConfigs = { close: 'escape' };
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs));
                eventArgs.action = 'close';
                expect(objKeyConfig.keyAction).toHaveBeenCalledWith(eventArgs);
            });
            it('single character key (A)', function () {
                var eventArgs = { which: 65, altKey: false, ctrlKey: false, shiftKey: false };
                objKeyConfig.keyConfigs = { close: 'A' };
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs));
                eventArgs.action = 'close';
                expect(objKeyConfig.keyAction).toHaveBeenCalledWith(eventArgs);
            });
            it('two key combination (Ctrl + A)', function () {
                var eventArgs = { which: 65, altKey: false, ctrlKey: true, shiftKey: false };
                objKeyConfig.keyConfigs = { selectAll: 'ctrl+a' };
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs));
                eventArgs.action = 'selectAll';
                expect(objKeyConfig.keyAction).toHaveBeenCalledWith(eventArgs);
            });
            it('three key combination (Ctrl + Shift + Delete)', function () {
                var eventArgs = { which: 46, altKey: false, ctrlKey: true, shiftKey: true };
                objKeyConfig.keyConfigs = { permanentDelete: 'ctrl+shift+delete' };
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs));
                eventArgs.action = 'permanentDelete';
                expect(objKeyConfig.keyAction).toHaveBeenCalledWith(eventArgs);
            });
            it('unhandled key code 202', function () {
                var eventArgs = { which: 202, altKey: true, ctrlKey: false, shiftKey: true };
                objKeyConfig.keyConfigs = { maximize: 'alt+shift+a' };
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs));
                expect(objKeyConfig.keyAction).not.toHaveBeenCalled();
            });
            it('multiple key config', function () {
                var eventArgs1 = { which: 65, altKey: true, ctrlKey: false, shiftKey: true };
                objKeyConfig.keyConfigs = { maximize: 'alt+shift+a', open: 'enter' };
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs1));
                var eventArgs2 = { which: 13, altKey: false, ctrlKey: false, shiftKey: false };
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs2));
                expect(objKeyConfig.keyAction).toHaveBeenCalledTimes(2);
                eventArgs1.action = 'maximize';
                eventArgs2.action = 'open';
                expect(objKeyConfig.keyAction).toHaveBeenCalledWith(eventArgs1);
                expect(objKeyConfig.keyAction).toHaveBeenCalledWith(eventArgs2);
            });
            it('single action with multiple config', function () {
                var eventArgs1 = { which: 40, altKey: false, ctrlKey: false, shiftKey: false };
                var eventArgs2 = { which: 40, altKey: false, ctrlKey: true, shiftKey: false };
                var eventArgs3 = { which: 38, altKey: false, ctrlKey: false, shiftKey: false };
                var eventArgs4 = { which: 38, altKey: false, ctrlKey: true, shiftKey: false };
                objKeyConfig.keyConfigs = { down: 'downarrow,ctrl+downarrow', up: 'uparrow,ctrl+uparrow' };
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs1));
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs2));
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs3));
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs4));
                expect(objKeyConfig.keyAction).toHaveBeenCalledTimes(4);
                eventArgs1.action = 'down';
                eventArgs2.action = 'down';
                eventArgs3.action = 'up';
                eventArgs4.action = 'up';
                expect(objKeyConfig.keyAction).toHaveBeenCalledWith(eventArgs1);
                expect(objKeyConfig.keyAction).toHaveBeenCalledWith(eventArgs2);
                expect(objKeyConfig.keyAction).toHaveBeenCalledWith(eventArgs3);
                expect(objKeyConfig.keyAction).toHaveBeenCalledWith(eventArgs4);
            });
        });
        describe('Control Keys', function () {
            beforeEach(function () {
                objKeyConfig.keyAction.calls.reset();
            });
            it('key (Alt + Shift + Enter) with key (Alt,Ctrl,Shift) => (true,true,true)', function () {
                var eventArgs = { which: 13, altKey: true, ctrlKey: true, shiftKey: true };
                objKeyConfig.keyConfigs = { maximize: 'alt+shift+enter' };
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs));
                expect(objKeyConfig.keyAction).not.toHaveBeenCalled();
            });
            it('key (Alt + Shift + Enter) with key (Alt,Ctrl,Shift) => (false,true,true)', function () {
                var eventArgs = { which: 13, altKey: false, ctrlKey: true, shiftKey: true };
                objKeyConfig.keyConfigs = { maximize: 'alt+shift+enter' };
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs));
                expect(objKeyConfig.keyAction).not.toHaveBeenCalled();
            });
            it('key (Alt + Shift + Enter) with key (Alt,Ctrl,Shift) => (true,true,false)', function () {
                var eventArgs = { which: 13, altKey: true, ctrlKey: true, shiftKey: false };
                objKeyConfig.keyConfigs = { maximize: 'alt+shift+enter' };
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs));
                expect(objKeyConfig.keyAction).not.toHaveBeenCalled();
            });
            it('key (Alt + Shift + Enter) with key (Alt,Ctrl,Shift) => (true,false,true)', function () {
                var eventArgs = { which: 13, altKey: true, ctrlKey: false, shiftKey: true };
                objKeyConfig.keyConfigs = { maximize: 'alt+shift+enter' };
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs));
                eventArgs.action = 'maximize';
                expect(objKeyConfig.keyAction).toHaveBeenCalledWith(eventArgs);
            });
            it('key (Alt + Shift + Enter) with key (Alt,Ctrl,Shift) => (false,false,true)', function () {
                var eventArgs = { which: 13, altKey: false, ctrlKey: false, shiftKey: true };
                objKeyConfig.keyConfigs = { maximize: 'alt+shift+enter' };
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs));
                expect(objKeyConfig.keyAction).not.toHaveBeenCalled();
            });
            it('key (Alt + Shift + Enter) with key (Alt,Ctrl,Shift) => (false,true,false)', function () {
                var eventArgs = { which: 13, altKey: false, ctrlKey: true, shiftKey: false };
                objKeyConfig.keyConfigs = { maximize: 'alt+shift+enter' };
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs));
                expect(objKeyConfig.keyAction).not.toHaveBeenCalled();
            });
            it('key (Alt + Shift + Enter) with key (Alt,Ctrl,Shift) => (true,false,false)', function () {
                var eventArgs = { which: 13, altKey: true, ctrlKey: false, shiftKey: false };
                objKeyConfig.keyConfigs = { maximize: 'alt+shift+enter' };
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs));
                eventArgs.action = 'maximize';
                expect(objKeyConfig.keyAction).not.toHaveBeenCalled();
            });
            it('key ( Alt + Shift + Enter) with key (Alt,Ctrl,Shift) => (false,false,true)', function () {
                var eventArgs = { which: 13, altKey: false, ctrlKey: false, shiftKey: true };
                objKeyConfig.keyConfigs = { maximize: 'alt+shift+enter' };
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs));
                expect(objKeyConfig.keyAction).not.toHaveBeenCalled();
            });
        });
        describe('Key Code', function () {
            beforeEach(function () {
                objKeyConfig.keyAction.calls.reset();
            });
            it('single key code (67)', function () {
                var eventArgs = { which: 67, altKey: false, ctrlKey: true, shiftKey: false };
                objKeyConfig.keyConfigs = { maximize: 'ctrl+67' };
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs));
                eventArgs.action = 'maximize';
                expect(objKeyConfig.keyAction).toHaveBeenCalledWith(eventArgs);
            });
            it('single special key code 202', function () {
                var eventArgs = { which: 202, altKey: false, ctrlKey: false, shiftKey: false };
                objKeyConfig.keyConfigs = { maximize: '202' };
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs));
                eventArgs.action = 'maximize';
                expect(objKeyConfig.keyAction).toHaveBeenCalledWith(eventArgs);
            });
            it('two key combination with keycode (Ctrl + 65)', function () {
                var eventArgs = { which: 65, altKey: false, ctrlKey: true, shiftKey: false };
                objKeyConfig.keyConfigs = { selectAll: 'ctrl+65' };
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs));
                eventArgs.action = 'selectAll';
                expect(objKeyConfig.keyAction).toHaveBeenCalledWith(eventArgs);
            });
            it('three key combination with keycode (Alt + Shift + 13) ', function () {
                var eventArgs = { which: 13, altKey: true, ctrlKey: false, shiftKey: true };
                objKeyConfig.keyConfigs = { maximize: 'alt+shift+13' };
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs));
                eventArgs.action = 'maximize';
                expect(objKeyConfig.keyAction).toHaveBeenCalledWith(eventArgs);
            });
        });
        describe('API/Method', function () {
            it('keyAction handler test', function () {
                var eventArgs = { which: 13, altKey: true, ctrlKey: false, shiftKey: true };
                objKeyConfig.keyConfigs = { maximize: 'alt+shift+13' };
                var spyFun = jasmine.createSpy('keyAction');
                objKeyConfig.keyAction = spyFun;
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs));
                objKeyConfig.keyAction = null;
                objKeyConfig.keyPressHandler((0, util_1.extend)({}, {}, eventArgs));
                eventArgs.action = 'maximize';
                expect(spyFun).toHaveBeenCalledTimes(1);
                expect(spyFun).toHaveBeenCalledWith(eventArgs);
            });
            it('destroy class test', function () {
                expect(ele.classList.contains('e-keyboard')).toEqual(true);
                objKeyConfig.destroy();
                expect(ele.classList.contains('e-keyboard')).toEqual(false);
            });
        });
    });
});
//# sourceMappingURL=keyboard.spec.js.map