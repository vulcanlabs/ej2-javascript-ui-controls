var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "../src/base", "../src/notify-property-change", "../src/dom", "../src/touch", "../src/util"], function (require, exports, base_1, notify_property_change_1, dom_1, touch_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DemoClass = /** @class */ (function (_super) {
        __extends(DemoClass, _super);
        function DemoClass(element) {
            var _this = _super.call(this, {}, element) || this;
            _this.testFunction = function () { };
            return _this;
        }
        DemoClass.prototype.getModuleName = function () {
            return 'demolib';
        };
        DemoClass.prototype.callServerDataBind = function () {
            this.serverDataBind();
        };
        DemoClass.prototype.setServerDataBinding = function (isServerDataBind) {
            this.allowServerDataBinding = isServerDataBind;
        };
        DemoClass.prototype.bind = function () {
            //
        };
        DemoClass.prototype.onPropertyChanged = function (newProp, oldProp) {
            var keys = Object.keys(newProp);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var prop = keys_1[_i];
                switch (prop) {
                    case 'value':
                        this.text = this.value;
                        this.trigger('test', {});
                        break;
                }
            }
            this.testFunction(newProp, oldProp);
        };
        DemoClass.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        __decorate([
            (0, notify_property_change_1.Property)('Value')
        ], DemoClass.prototype, "text", void 0);
        __decorate([
            (0, notify_property_change_1.Property)('Property')
        ], DemoClass.prototype, "value", void 0);
        __decorate([
            (0, notify_property_change_1.Event)()
        ], DemoClass.prototype, "test", void 0);
        __decorate([
            (0, notify_property_change_1.Event)()
        ], DemoClass.prototype, "testCollection", void 0);
        DemoClass = __decorate([
            notify_property_change_1.NotifyPropertyChanges
        ], DemoClass);
        return DemoClass;
    }(base_1.Base));
    var ele = (0, dom_1.createElement)('div', { id: 'singleEle', styles: 'height:100px;width:100px;' });
    var objClass = new DemoClass();
    describe('Library', function () {
        describe('base method availability', function () {
            it('addEvent Listener', function () {
                expect(typeof objClass.addEventListener).toEqual('function');
            });
            it('removeEvent Listener', function () {
                expect(typeof objClass.removeEventListener).toEqual('function');
            });
        });
        describe('element binding', function () {
            it('bind element in constructor', function () {
                var obj = new DemoClass(ele);
                expect(obj.element).toEqual(ele);
            });
            it(' destroy property', function () {
                var obj = new DemoClass(ele);
                expect(obj.isDestroyed).toEqual(false);
                obj.destroy();
                expect(obj.isDestroyed).toEqual(true);
            });
        });
        describe('event binding', function () {
            var propspy;
            var externalHandler;
            beforeEach(function () {
                propspy = jasmine.createSpy('functionSpy');
                externalHandler = jasmine.createSpy('temp');
            });
            it('addEventListener using property and external adding ', function () {
                var obj = new DemoClass(ele);
                obj.test = propspy;
                obj.addEventListener('test', externalHandler);
                obj.trigger('test');
                expect(propspy).toHaveBeenCalledTimes(1);
                expect(externalHandler).toHaveBeenCalled();
            });
            it('removeEventListener using  property value and external removal', function () {
                var obj = new DemoClass(ele);
                obj.test = propspy;
                var spy2 = jasmine.createSpy('temp');
                obj.test = undefined;
                obj.addEventListener('test', spy2);
                obj.removeEventListener('test', spy2);
                obj.trigger('test');
                expect(propspy).not.toHaveBeenCalled();
                expect(spy2).not.toHaveBeenCalled();
            });
            it('trigger event instance method', function () {
                var obj = new DemoClass(ele);
                obj.addEventListener('test', propspy);
                obj.trigger('test', { arg1: 'val1' });
                expect(propspy).toHaveBeenCalled();
            });
        });
        describe('Root class declaration', function () {
            it(' test module class name at class instance creation', function () {
                var obj = new DemoClass(ele);
                expect(obj.element.className.indexOf('e-lib e-demolib')).toEqual(0);
            });
            it(' test module class name at class instance destroy', function () {
                var ele = (0, dom_1.createElement)('div', { id: 'element' });
                var obj = new DemoClass(ele);
                obj.destroy();
                expect(obj.element.className.indexOf('e-lib e-demolib')).toEqual(-1);
            });
        });
        describe('check whether the notify trigger after component destroyed', function () {
            var destInst;
            beforeEach(function () {
                destInst = new DemoClass(ele);
            });
            it('check destroyed before notify', function () {
                var spy = jasmine.createSpy('test');
                destInst.test = spy;
                destInst.destroy();
                destInst.trigger('test');
                expect(spy).not.toHaveBeenCalled();
            });
            it('notify with success', function (done) {
                var spy = jasmine.createSpy('test');
                destInst.test = spy;
                destInst.trigger('test', {}, function () {
                    expect(spy).toHaveBeenCalled();
                    done();
                });
            });
            it('notify with success for not registed event', function (done) {
                var spy = jasmine.createSpy('test');
                destInst.test = spy;
                destInst.trigger('test1', {}, function () {
                    expect(spy).not.toHaveBeenCalled();
                    done();
                });
            });
            it('notify with success', function (done) {
                window["Blazor"] = true;
                destInst.test = function () {
                    var promise = new Promise(function (resolve, reject) {
                        setTimeout(function () { return resolve("done"); }, 0);
                    });
                    return promise;
                };
                destInst.trigger('test', {}, function () {
                    window["Blazor"] = false;
                    done();
                });
            });
            it('notify with success -non promise call', function (done) {
                window["Blazor"] = true;
                destInst.test = function () {
                };
                destInst.trigger('test', {}, function () {
                    window["Blazor"] = false;
                    done();
                });
            });
            it('notify with success json', function (done) {
                window["Blazor"] = true;
                destInst.test = function () {
                    var promise = new Promise(function (resolve, reject) {
                        setTimeout(function () { return resolve('{"data":"success"}'); }, 0);
                    });
                    return promise;
                };
                destInst.trigger('test', {}, function () {
                    window["Blazor"] = false;
                    done();
                });
            });
            it('notify with error for registed event', function (done) {
                window["Blazor"] = true;
                destInst.test = function () {
                    return Promise.reject({ data: { message: 'Error message' } });
                };
                destInst.trigger('test', {}, function () { }, function () {
                    window["Blazor"] = false;
                    done();
                });
            });
            it('notify with error for registed event -stringify', function (done) {
                window["Blazor"] = true;
                destInst.test = function () {
                    return Promise.reject('{"data":"error"}');
                };
                destInst.trigger('test', {}, function () { }, function () {
                    window["Blazor"] = false;
                    done();
                });
            });
        });
        describe('check whether the notify trigger after component destroyed', function () {
            var destInst;
            var originalTimeout = 0;
            beforeEach(function () {
                destInst = new DemoClass(ele);
                originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
                jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
            });
            it('notify with success json with array', function (done) {
                window["Blazor"] = true;
                destInst.addEventListener("testCollection", function () {
                    var promise = new Promise(function (resolve, reject) {
                        setTimeout(function () { return resolve('{"data":"success"}'); }, 0);
                    });
                    return promise;
                });
                destInst.addEventListener("testCollection", function () {
                    return { data2: "success" };
                });
                destInst.addEventListener("testCollection", function () {
                    var promise = new Promise(function (resolve, reject) {
                        setTimeout(function () { return resolve({ data: "successs-done" }); }, 0);
                    });
                    return promise;
                });
                destInst.trigger('testCollection', { data: "preparing", add: "good" }, function () {
                    window["Blazor"] = false;
                    done();
                });
            });
            it('notify with success json with array', function (done) {
                window["Blazor"] = true;
                destInst.addEventListener("testCollection", function () {
                    var promise = new Promise(function (resolve, reject) {
                        setTimeout(function () { return resolve('{"data":"success"}'); }, 0);
                    });
                    return promise;
                });
                destInst.addEventListener("testCollection", function () {
                    return { data2: "success-final" };
                });
                destInst.trigger('testCollection', { data: "preparing", add: "good" }, function () {
                    window["Blazor"] = false;
                    done();
                });
            });
            it('notify with out success json with array', function () {
                window["Blazor"] = true;
                var data = destInst.trigger('testCollection', { data: "preparing", add: "good" });
                expect(data).not.toBe(null);
                window["Blazor"] = false;
            });
            afterEach(function () {
                jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
                destInst.destroy();
            });
        });
        describe('change detection inside of onproperty', function () {
            it('inside property change', function () {
                var obj = new DemoClass(ele);
                spyOn(obj, 'testFunction');
                obj.value = 'newVal';
                obj.dataBind();
                obj.dataBind();
                expect(obj.testFunction).toHaveBeenCalledTimes(1);
            });
            it('inside property change', function () {
                var obj = new DemoClass(ele);
                obj.test = function (arg) {
                    obj.value = 'ValueAdded';
                };
                spyOn(obj, 'testFunction');
                obj.value = 'newVal';
                obj.dataBind();
                obj.dataBind();
                expect(obj.testFunction).toHaveBeenCalledTimes(2);
            });
        });
        describe("Blazor", function () {
            var bulkChanges = null;
            beforeAll(function () {
                (0, util_1.enableBlazorMode)();
                window['sfBlazor'] = {
                    updateModel: function (comp) {
                        bulkChanges = comp.bulkChanges;
                        return true;
                    }
                };
            });
            it('single property change', function (done) {
                var obj = new DemoClass(ele);
                obj.text = "testing";
                obj.dataBind();
                expect(bulkChanges).not.toBeNull();
                expect(bulkChanges).toEqual({ text: "testing" });
                bulkChanges = null;
                done();
            });
            it('bulk property changes', function (done) {
                var obj = new DemoClass(ele);
                obj.setServerDataBinding(false);
                obj.text = "textValue";
                obj.dataBind();
                obj.value = "valueText";
                obj.dataBind();
                obj.setServerDataBinding(true);
                obj.callServerDataBind();
                expect(bulkChanges).not.toBeNull();
                // the text value changed in the DemoClass OnPropertyChanged
                expect(bulkChanges).toEqual({ text: "valueText", value: "valueText" });
                bulkChanges = null;
                done();
            });
            it('setProperties', function (done) {
                var obj = new DemoClass(ele);
                obj.setProperties({ text: "texting" }, true);
                expect(bulkChanges).not.toBeNull();
                expect(bulkChanges).toEqual({ text: "texting" });
                bulkChanges = null;
                done();
            });
            afterAll(function () {
                (0, util_1.disableBlazorMode)();
                delete window['sfBlazor'];
            });
        });
    });
    // spec for getComponent() funtion
    describe("getcomponent funtion", function () {
        it("if statement", function () {
            var elem = (0, dom_1.createElement)('div', { id: 'test' });
            var comp = { ej2_instances: [new touch_1.Touch(elem)] };
            expect((0, base_1.getComponent)(comp, 'touch') instanceof touch_1.Touch).toBe(true);
        });
        it("For element value as string type", function () {
            var elem = (0, dom_1.createElement)('div', { id: 'test' });
            var touchObj = new touch_1.Touch(elem);
            var stringElement = touchObj.element.id;
            document.body.appendChild(elem);
            expect((0, base_1.getComponent)(stringElement, 'touch') instanceof touch_1.Touch).toBe(true);
        });
        it("else statement", function () {
            var elem = (0, dom_1.createElement)('div', { id: 'test' });
            var comp = { ej2_instances: [new touch_1.Touch(elem)] };
            expect((0, base_1.getComponent)(comp, 'button') instanceof touch_1.Touch).toBe(false);
        });
        it("compenent instance", function () {
            var elem = (0, dom_1.createElement)('div', { id: 'test' });
            var comp = { ej2_instances: [new touch_1.Touch(elem)] };
            expect((0, base_1.getComponent)(comp, touch_1.Touch) instanceof touch_1.Touch).toBe(true);
        });
        it("component not instance", function () {
            var elem = (0, dom_1.createElement)('div', { id: 'test' });
            var comp = { ej2_instances: [new touch_1.Touch(elem)] };
            expect((0, base_1.getComponent)(comp, DemoClass) instanceof touch_1.Touch).toBe(false);
        });
    });
    // spec for removeChildInstance() funtion
    describe('removeChildInstance', function () {
        it('destroying the element Instance', function () {
            var elem = (0, dom_1.createElement)('div', { id: 'test' });
            var comp = { ej2_instances: [new touch_1.Touch(elem)] };
            var compEle = comp.ej2_instances[0].element;
            compEle.className = 'e-control e-touch ' + compEle.className;
            var htmlEle = (0, dom_1.createElement)('div', { id: 'parent', className: 'parentclass' });
            htmlEle.appendChild(compEle);
            (0, base_1.removeChildInstance)(htmlEle);
            expect(document.getElementsByClassName('e-control').length).toBe(0);
        });
        it('destroying the element Instance when component is not instance', function () {
            var elem = (0, dom_1.createElement)('div', { id: 'test' });
            var comp = { ej2_instances: [new touch_1.Touch(elem)] };
            var compEle = comp.ej2_instances[0].element;
            var htmlEle = (0, dom_1.createElement)('div', { id: 'parent', className: 'parentclass' });
            htmlEle.appendChild(compEle);
            (0, base_1.removeChildInstance)(htmlEle);
            expect(htmlEle.getElementsByClassName('e-control').length).toBe(0);
        });
    });
});
//# sourceMappingURL=base.spec.js.map