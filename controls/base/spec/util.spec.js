define(["require", "exports", "../src/util", "../src/dom"], function (require, exports, Util, dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Util', function () {
        it('getObject function', function () {
            var obj = { type: 'Fiat', model: '500', fields: { text: 'name' } };
            expect(Util.getValue('type', obj)).toBe('Fiat');
            expect(Util.getValue('fields.text', obj)).toBe('name');
        });
        describe('setImmediate', function () {
            var spy = jasmine.createSpy('set');
            beforeAll(function (done) {
                Util.setImmediate(function () {
                    spy();
                    done();
                });
            });
            it('triggers callback properly', function () {
                expect(spy).toHaveBeenCalled();
            });
        });
        it('setObject function', function () {
            var obj = { type: 'Fiat', model: '500', fields: { text: 'name' } };
            Util.setValue('check', true, obj);
            expect(obj.check).toBe(true);
            expect(Object.keys(obj).length).toBe(4);
        });
        it('extend function', function () {
            var first = { type: 'Fiat', model: '500' };
            var second = { model: '500', color: 'white' };
            expect(Util.extend({}, first, second)).toEqual({ type: 'Fiat', model: '500', color: 'white' });
            expect(Util.extend({}, undefined, second)).toEqual({ model: '500', color: 'white' });
            expect(Util.extend(false, first, second)).toEqual({ type: 'Fiat', model: '500', color: 'white' });
            first = { a: { b: { c: 2, d: 5 } }, e: 2 };
            second = { a: { b: { c: 12 } }, e: { test: 2 }, f: 'end' };
            expect(Util.extend({}, first, second, true)).toEqual({ a: { b: { c: 12, d: 5 } }, e: { test: 2 }, f: 'end' });
            expect(Util.extend({}, first)).toEqual({ a: { b: { c: 2, d: 5 } }, e: 2 });
        });
        it('merge function', function () {
            var first = { type: 'Fiat', model: '500' };
            var second;
            expect(Util.merge(first, second)).toEqual(undefined);
        });
        it('delete Object function', function () {
            var first = { type: 'Fiat', model: '500' };
            Util.deleteObject(first, 'type');
            expect(first).toEqual({ model: '500' });
        });
        it('isObject function with JSON', function () {
            var obj = {};
            expect(Util.isObject(obj)).toEqual(true);
        });
        it('isObject function with array', function () {
            var arObj = [];
            expect(Util.isObject(arObj)).toEqual(false);
        });
        it('debounce', function (done) {
            var spyFunction = jasmine.createSpy('scope');
            var listener = function () {
                spyFunction(this);
            };
            var debounceHandler = Util.debounce(listener, 3);
            var bDebounceHandler = debounceHandler.bind({ name: 'debounce' });
            debounceHandler();
            setTimeout(function () {
                expect(spyFunction).toHaveBeenCalledWith(undefined);
                spyFunction.calls.reset();
                bDebounceHandler();
                setTimeout(function () {
                    expect(spyFunction).toHaveBeenCalledWith({ name: 'debounce' });
                    done();
                }, 5);
            }, 5);
        });
        it('debounce with arguments', function (done) {
            var spyFunction = jasmine.createSpy('scope');
            var listener = function (arg) {
                spyFunction(this, arg);
            };
            var debounceHandler = Util.debounce(listener, 3);
            var bDebounceHandler = debounceHandler.bind({ name: 'debounce' });
            debounceHandler({ test: 'debounce' });
            setTimeout(function () {
                expect(spyFunction).toHaveBeenCalledWith(undefined, { test: 'debounce' });
                spyFunction.calls.reset();
                bDebounceHandler({ data: 'debounce' });
                setTimeout(function () {
                    expect(spyFunction).toHaveBeenCalledWith({ name: 'debounce' }, { data: 'debounce' });
                    done();
                }, 5);
            }, 5);
        });
        it('isNullOrUndefined function', function () {
            var obj = {};
            expect(Util.isNullOrUndefined(null)).toEqual(true);
            expect(Util.isNullOrUndefined(undefined)).toEqual(true);
            expect(Util.isNullOrUndefined('data')).toEqual(false);
            expect(Util.isNullOrUndefined(obj)).toEqual(false);
            obj.data = 'some data';
            expect(Util.isNullOrUndefined(obj)).toEqual(false);
        });
        it('isUndefined function', function () {
            var val;
            expect(Util.isUndefined(val)).toEqual(true);
        });
        it('isUndefined function with value', function () {
            var val = '';
            expect(Util.isUndefined(val)).toEqual(false);
        });
        it('getUniqueId function', function () {
            var uniqueId = Util.getUniqueID('event');
            expect(uniqueId).toEqual('event_0');
            uniqueId = Util.getUniqueID('event');
            expect(uniqueId).toEqual('event_1');
            uniqueId = Util.getUniqueID('');
            expect(uniqueId).toEqual('_2');
        });
        it('getenum function', function () {
            var Days;
            (function (Days) {
                Days[Days["Sunday"] = 0] = "Sunday";
                Days[Days["Monday"] = 1] = "Monday";
                Days[Days["Tuesday"] = 2] = "Tuesday";
            })(Days || (Days = {}));
            expect(Util.getEnumValue(Days, '0')).toEqual('Sunday');
            expect(Util.getEnumValue(Days, 1)).toEqual('Monday');
            expect(Util.getEnumValue(Days, 'Tuesday')).toEqual(2);
            expect(Util.getEnumValue(Days, 5)).toEqual(undefined);
            expect(Util.getEnumValue(Days, 'saturday')).toEqual(undefined);
            expect(Util.getEnumValue(Days, 'monday')).toEqual(undefined);
        });
        it('queryParams function', function () {
            var params = { param1: 'value1' };
            var str = Util.queryParams(params);
            expect(str).toBe('param1=value1');
            var params1 = { param1: 'value1', param2: 'value2' };
            var str1 = Util.queryParams(params1);
            expect(str1).toBe('param1=value1&param2=value2');
        });
        it('isObjectArray', function () {
            var result = Util.isObjectArray([{ test: 1 }]);
            expect(result).toBe(true);
            result = Util.isObjectArray(['text']);
            expect(result).toBe(false);
            result = Util.isObjectArray('text');
            expect(result).toBe(false);
        });
        it('throwError', function () {
            expect(function () { Util.throwError('custom Error'); }).toThrow();
        });
        it('print window print testing', function (done) {
            var win = {
                document: { write: function () { }, close: function () { } },
                close: function () { }, print: function () { }, focus: function () { }
            };
            spyOn(win, 'print');
            win.ready = true;
            Util.print((0, dom_1.createElement)('div', { innerHTML: 'print' }), win);
            setTimeout(function () {
                expect(win.print).toHaveBeenCalled();
                done();
            }, 1000);
        });
        it('print window close testing', function (done) {
            var win = {
                document: { write: function () { }, close: function () { } },
                close: function () { }, print: function () { }, focus: function () { }
            };
            document.getElementsByTagName('head')[0].appendChild((0, dom_1.createElement)('style'));
            win.ready = true;
            spyOn(win, 'close');
            Util.print((0, dom_1.createElement)('div', { innerHTML: 'print' }), win);
            setTimeout(function () {
                expect(win.close).toHaveBeenCalled();
                done();
            }, 1000);
        });
        it('formatunit method value testing', function () {
            expect(Util.formatUnit('auto')).toEqual('auto');
            expect(Util.formatUnit('100cm')).toEqual('100cm');
            expect(Util.formatUnit('100mm')).toEqual('100mm');
            expect(Util.formatUnit('100in')).toEqual('100in');
            expect(Util.formatUnit('100px')).toEqual('100px');
            expect(Util.formatUnit('100pt')).toEqual('100pt');
            expect(Util.formatUnit('100pc')).toEqual('100pc');
            expect(Util.formatUnit('100%')).toEqual('100%');
            expect(Util.formatUnit('100em')).toEqual('100em');
            expect(Util.formatUnit('100ex')).toEqual('100ex');
            expect(Util.formatUnit('100ch')).toEqual('100ch');
            expect(Util.formatUnit('100rem')).toEqual('100rem');
            expect(Util.formatUnit('100vw')).toEqual('100vw');
            expect(Util.formatUnit('100vh')).toEqual('100vh');
            expect(Util.formatUnit('100vmin')).toEqual('100vmin');
            expect(Util.formatUnit('100vmax')).toEqual('100vmax');
            expect(Util.formatUnit(100)).toEqual('100px');
        });
        describe('addInstance function', function () {
            var ej2Instances = 'ej2_instances';
            var element = (0, dom_1.createElement)('p');
            it('adding by element', function () {
                var instance = { 0: 'elem', 1: 'inst' };
                Util.addInstance(element, instance);
                expect(element[ej2Instances]).toEqual([instance]);
            });
            it('adding by selector', function () {
                var instance1 = { 0: 'selector' };
                Util.addInstance('p', instance1);
                expect((0, dom_1.select)('p')[ej2Instances]).toEqual([instance1]);
            });
        });
        describe('getInstance function', function () {
            var element = (0, dom_1.createElement)('p');
            var Test = /** @class */ (function () {
                function Test() {
                }
                return Test;
            }());
            var Test1 = /** @class */ (function () {
                function Test1() {
                }
                return Test1;
            }());
            var inst = new Test();
            var inst1 = new Test();
            inst.name = 'test';
            Util.addInstance(element, inst);
            Util.addInstance(element, inst1);
            it('fetching instance by passing element ', function () {
                expect(JSON.stringify(Util.getInstance(element, Test))).toBe(JSON.stringify({ name: 'test' }));
            });
            it('fetching instance by selector', function () {
                expect(Util.getInstance('p', Test1)).toBe(null);
            });
            it('Unavailable component', function () {
                expect(Util.getInstance('div', {})).toBe(null);
            });
        });
        // Extend method changes spec
        it('extend method', function () {
            var result = { deepMerge: ['columns'], columns: [{ a: 1, b: 2 }] };
            Util.merge(result, { columns: [{ a: 1, b: 3, c: 4 }] });
            expect(result.columns[0].c).toBe(4);
            expect(result.columns[0].b).toBe(3);
        });
        it('isBlazor false', function () {
            expect(Util.isBlazor()).toBe(false);
        });
        it('isBlazor true', function () {
            Util.enableBlazorMode();
            window['Blazor'] = {};
            expect(Util.isBlazor()).toBe(true);
            Util.disableBlazorMode();
        });
        it('GetElement with element', function () {
            window['Blazor'] = {};
            var element = document.createElement('span');
            expect(Util.getElement(element)).toBe(element);
        });
        it('GetElement with xpath', function () {
            window['Blazor'] = {};
            Util.enableBlazorMode();
            var element = document.createElement('span');
            element.id = "xpathelement";
            document.body.appendChild(element);
            var eleObj = {
                'xPath': createXPathFromElement(element)
            };
            expect(Util.getElement(eleObj)).toBe(element);
            document.body.innerHTML = "";
            Util.disableBlazorMode();
        });
        function createXPathFromElement(elm) {
            var allNodes = document.getElementsByTagName('*');
            for (var segs = []; elm && elm.nodeType === 1; elm = elm.parentNode) {
                if (elm.hasAttribute('id')) {
                    var uniqueIdCount = 0;
                    for (var n = 0; n < allNodes.length; n++) {
                        if (allNodes[n].hasAttribute('id') && allNodes[n].id === elm.id)
                            uniqueIdCount++;
                        if (uniqueIdCount > 1)
                            break;
                    }
                    ;
                    if (uniqueIdCount === 1) {
                        segs.unshift('id("' + elm.getAttribute('id') + '")');
                        return segs.join('/');
                    }
                    else {
                        segs.unshift(elm.localName.toLowerCase() + '[@id="' + elm.getAttribute('id') + '"]');
                    }
                }
                else if (elm.hasAttribute('class')) {
                    segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]');
                }
                else {
                    for (var i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) {
                        if (sib.localName === elm.localName)
                            i++;
                    }
                    segs.unshift(elm.localName.toLowerCase() + '[' + i + ']');
                }
            }
            return segs.length ? '/' + segs.join('/') : null;
        }
    });
});
//# sourceMappingURL=util.spec.js.map