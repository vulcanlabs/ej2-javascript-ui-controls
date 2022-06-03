define(["require", "exports", "../src/template-engine", "../src/dom", "../src/util"], function (require, exports, template, dom_1, Util) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Template Engine Spec
     */
    var dsJSONArray = [{ name: 'one', info: { id: '01' } }, { name: 'two', info: { id: '02' } }];
    var dsSubArray = [{ name: 'one', items: ['AR Item1', 'AR Item2'] }, { name: 'two', items: ['AR Item1', 'AR Item2'] }];
    var dsJSONSubArray = [{ name: 'one', info: { id: '01', items: ['AR Item1', 'AR Item2'] } }, { name: 'two', info: { id: '02', items: ['AR Item1', 'AR Item2'] } }];
    var tempObj;
    window.getName = function () {
        return "TestName";
    };
    var outDOM = function (tempFunction, data, templateID, propName, index) {
        var output = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            var htmlEle = tempFunction(item, null, propName, templateID, false, index);
            output = output.concat(Array.prototype.slice.call(htmlEle));
        }
        return output.concat([]);
    };
    describe('Template Engine', function () {
        it('JSON Array Input With Template String', function () {
            var templateStr = '<div>${name}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'one' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: 'two' }));
            var res = outDOM(template.compile(templateStr), dsJSONArray);
            expect(res).toEqual(result);
        });
        it('JSON Array input with multiple key mapping String', function () {
            var templateStr = '<div>${name}${info.id}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'one01' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: 'two02' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
        });
        it('Table tag with custom parent tag', function () {
            var templateStr = '<tr><td><span>${name}</span></td><td><span>${info.id}</span></td></tr>';
            var result = outDOM(template.compile(templateStr), dsJSONArray);
            expect(result[0].firstElementChild.tagName.toLowerCase()).toEqual('tr');
            expect(result[1].firstElementChild.tagName.toLowerCase()).toEqual('tr');
        });
        it('Testing for svg tag', function () {
            var templateStr = '<path d= "M150 0 L75 200 L225 200 Z"></path>';
            var result = outDOM(template.compile(templateStr), dsJSONArray);
            expect(result[0].parentNode.localName).toEqual('svg');
        });
        it('Testing for blazor others templates', function () {
            var templateStr = '<div> Blazor  template</div>';
            var Blazor = 'Blazor';
            Util.enableBlazorMode();
            var result = outDOM(template.compile(templateStr), [dsJSONArray[0]], '', 'Template');
            Util.disableBlazorMode();
            expect(result[0].tagName).toEqual('DIV');
        });
        it('Check blazor template', function () {
            var templateStr = '<div class="   class1">blazor</div>';
            var result = [];
            var blazor = 'Blazor';
            var ejsIntrop = 'sfBlazor';
            Util.enableBlazorMode();
            window[ejsIntrop] = { updateTemplate: function () { } };
            result = (template.updateBlazorTemplate('template', 'Template'));
            Util.disableBlazorMode();
            window[ejsIntrop] = null;
            expect(result).toBeUndefined();
        });
        it('Check index blazor template', function () {
            var templateStr = '<div class=" class1">blazor</div>';
            var result = [];
            var blazor = 'Blazor';
            var ejsIntrop = 'sfBlazor';
            var tempID = 'template';
            Util.enableBlazorMode();
            window[ejsIntrop] = { updateTemplate: function () { } };
            template.blazorTemplates[tempID][0] = { text: '0', info: { id: '03' }, name: 'new first name', BlazorTemplateId: 'id1' };
            template.blazorTemplates[tempID][1] = { text: '1', info: { id: '03' }, name: 'new second name', BlazorTemplateId: 'id2' };
            result = outDOM(template.compile(templateStr), [dsJSONArray[0]], 'template', 'templateprop', 1);
            Util.disableBlazorMode();
            window[ejsIntrop] = null;
            expect(result[0].tagName).toEqual('DIV');
        });
        it('Check blazor row template', function () {
            var templateStr = '<div class="   class1">blazor</div>';
            var result = [];
            var blazor = 'Blazor';
            var ejsIntrop = 'sfBlazor';
            Util.enableBlazorMode();
            window[ejsIntrop] = { updateTemplate: function () { } };
            result = (template.updateBlazorTemplate('rowtemplate', 'RowTemplate', null, false));
            Util.disableBlazorMode();
            window[ejsIntrop] = null;
            expect(result).toBeUndefined();
        });
        it('Check reset blazor template', function () {
            var result = [];
            result = (template.resetBlazorTemplate('template', 'Template'));
            expect(result).toBeUndefined();
        });
        it('Check append the blazor template to the body', function () {
            var elem = document.createElement('div');
            elem.setAttribute('id', 'template');
            var newElement = document.createElement('div');
            newElement.setAttribute('class', 'blazor-inner-template');
            newElement.setAttribute('data-templateId', 'tempID');
            elem.appendChild(newElement);
            var elem2 = document.createElement('div');
            elem2.setAttribute('id', 'tempID');
            elem2.setAttribute('data-templateId', 'tempID');
            document.activeElement.appendChild(elem2);
            document.activeElement.appendChild(elem);
            var result = [];
            result = (template.resetBlazorTemplate('template', 'Template'));
            expect(result).toBeUndefined();
        });
        it('Check index reset blazor template to the body', function () {
            var elem = document.createElement('div');
            elem.setAttribute('id', 'template');
            var newElement = document.createElement('div');
            newElement.setAttribute('class', 'blazor-inner-template');
            newElement.setAttribute('data-templateId', 'tempID');
            elem.appendChild(newElement);
            var elem2 = document.createElement('div');
            elem2.setAttribute('id', 'tempID');
            elem2.setAttribute('data-templateId', 'tempID');
            var elem3 = document.createElement('tr');
            elem2.appendChild(elem3);
            document.activeElement.appendChild(elem2);
            document.activeElement.appendChild(elem);
            document.getElementById('tempID').appendChild(elem3);
            var result = [];
            result = (template.resetBlazorTemplate('template', 'Template', 0));
            expect(result).toBeUndefined();
        });
        it('Check  reset blazor template without index', function () {
            var elem = document.createElement('div');
            elem.setAttribute('id', 'template');
            var newElement = document.createElement('div');
            newElement.setAttribute('class', 'blazor-inner-template');
            newElement.setAttribute('data-templateId', 'tempID');
            elem.appendChild(newElement);
            var elem2 = document.createElement('div');
            elem2.setAttribute('id', 'tempID');
            elem2.setAttribute('data-templateId', 'tempID');
            var elem3 = document.createElement('tr');
            elem2.appendChild(elem3);
            document.activeElement.appendChild(elem2);
            document.activeElement.appendChild(elem);
            document.getElementById('tempID').appendChild(elem3);
            var result = [];
            result = (template.resetBlazorTemplate('template', 'Template'));
            expect(result).toBeUndefined();
        });
        it('Testing for blazor Row template', function () {
            var templateStr = '<tr> Blazor template</tr>';
            var Blazor = 'Blazor';
            Util.enableBlazorMode();
            var result = outDOM(template.compile(templateStr), [dsJSONArray[0]], '', 'rowTemplate');
            Util.disableBlazorMode();
            expect(result[0].tagName).toEqual('TR');
        });
        it('custom helper', function () {
            var templateStr = '<div>${uCase(name)}${info.id}</div>';
            var result = [];
            var cHelper = {
                uCase: function (str) {
                    return str.toUpperCase();
                }
            };
            result.push((0, dom_1.createElement)('div', { innerHTML: 'ONE01' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: 'TWO02' }));
            expect(outDOM(template.compile(templateStr, cHelper), dsJSONArray)).toEqual(result);
        });
        it('custom engine', function () {
            var spyCompiler = jasmine.createSpy("compile");
            var CustomEngine = /** @class */ (function () {
                function CustomEngine() {
                }
                CustomEngine.prototype.compile = function (tStr, helper) {
                    return spyCompiler;
                };
                return CustomEngine;
            }());
            var templateStr = '<div>${uCase(name)}${info.id}</div>';
            template.setTemplateEngine(new CustomEngine());
            var tmpFun = template.compile(templateStr);
            tmpFun(dsJSONArray[0]);
            expect(spyCompiler).toHaveBeenCalled();
        });
        it('get template engine', function () {
            var CustomEngine = /** @class */ (function () {
                function CustomEngine() {
                }
                CustomEngine.prototype.compile = function (tStr, helper) {
                    return function () {
                        //no code
                    };
                };
                return CustomEngine;
            }());
            var tempEngine = new CustomEngine();
            template.setTemplateEngine(tempEngine);
            expect(template.getTemplateEngine()).toBe(tempEngine.compile);
        });
    });
});
//# sourceMappingURL=template-engine.spec.js.map