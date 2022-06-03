define(["require", "exports", "../src/template", "../src/dom"], function (require, exports, template, dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Template Engine Spec
     */
    var arrayOfObj = [
        {
            "IDPRATICA": 700,
            "@DRNT": 0,
            "Giorni": [
                {
                    "Data": "2019-05-01T00:00:00",
                    "IDSTATO": 99,
                },
                {
                    "Data": "2019-05-02T00:00:00",
                    "IDSTATO": 99,
                }
            ],
            "@Prior": [
                {
                    "IDTAG": 0,
                    "Date": "2019-05-02T00:00:00",
                },
                {
                    "IDTAG": 10,
                    "Date": "2019-05-02T00:00:00",
                }
            ]
        }
    ];
    var specialCharValue = [{ '@ShipCountry': 'France' }];
    var dsJSONArray = [{ name: 'one', info: { id: '01' } }, { name: 'two', info: { id: '02' } }];
    var dsSubArray = [{ name: 'one', items: ['AR Item1', 'AR Item2'] }, { name: 'two', items: ['AR Item1', 'AR Item2'] }];
    var dsJSONSubArray = [{ name: 'one', info: { id: '01', items: ['AR Item1', 'AR Item2'] } }, { name: 'two', info: { id: '02', items: ['AR Item1', 'AR Item2'] } }];
    var JSONArray = [{ name: 'one   two', info: { id: '01' } }, { name: 'two three', info: { id: '02' } }];
    var tempObj;
    window.getName = function () {
        return "TestName";
    };
    window.check = function (args) {
        if (args % 2 === 0) {
            return true;
        }
        else {
            return false;
        }
    };
    var outDOM = function (tempFunction, data) {
        var output = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            var htmlEle = (0, dom_1.createElement)('div', { innerHTML: tempFunction(item) });
            output.push(htmlEle.children[0]);
        }
        return output;
    };
    describe('Template', function () {
        it('JSON Array Input With Template String', function () {
            var templateStr = '<div>${name}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'one' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: 'two' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
        });
        it('JSON Array Input With Template String which has special character', function () {
            var templateStr = '<div>${@ShipCountry}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'France' }));
            expect(outDOM(template.compile(templateStr), specialCharValue)).toEqual(result);
        });
        it('JSON Array Input With IF Condition which has special character', function () {
            var templateStr = '${if(@DRNT==0)}<div>true</div>${else}<div>false</div>${/if}';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'true' }));
            expect(outDOM(template.compile(templateStr), arrayOfObj)).toEqual(result);
        });
        it('JSON Array Input With Template String with array of value within object', function () {
            var templateStr = '${if(Giorni[0].IDSTATO==99)}<div>true</div>${else}<div>false</div>${/if}';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'true' }));
            expect(outDOM(template.compile(templateStr), arrayOfObj)).toEqual(result);
        });
        it('JSON Array Input With IF Condition which has special character with array of value within object', function () {
            var templateStr = '${if(@Prior[0].IDTAG==0)}<div>true</div>${else}<div>false</div>${/if}';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'true' }));
            expect(outDOM(template.compile(templateStr), arrayOfObj)).toEqual(result);
        });
        it('JSON Array Input With two space between class Names', function () {
            var templateStr = '<div class="class1  class2  class3">${name}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'one', className: 'class1 class2 class3' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: 'two', className: 'class1 class2 class3' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
        });
        it('JSON Array Input With more than two space between two class Names', function () {
            var templateStr = '<div class="class1    class2">${name}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'one', className: 'class1 class2' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: 'two', className: 'class1 class2' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
        });
        it('JSON Array Input With more than two space between three class Names', function () {
            var templateStr = '<div class="class1    class2    class3">${name}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'one', className: 'class1 class2 class3' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: 'two', className: 'class1 class2 class3' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
        });
        it('JSON Array Input With more than two space in first class name', function () {
            var templateStr = '<div class="   class1">${name}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'one', className: ' class1' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: 'two', className: ' class1' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
        });
        it('JSON Array Input With two space in first class name and multiple space between three class names', function () {
            var templateStr = '<div class="  class1    class2   class3">${name}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'one', className: ' class1 class2 class3' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: 'two', className: ' class1 class2 class3' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
        });
        it('JSON Array Input With multiple sapce between inner text', function () {
            var templateStr = '<div class=" class1   class2    class3">${name}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'one   two', className: ' class1 class2 class3' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: 'two three', className: ' class1 class2 class3' }));
            expect(outDOM(template.compile(templateStr), JSONArray)).toEqual(result);
        });
        it('JSON array input with href value with apostrophe', function () {
            var templateStr = "<div><a href='https://en.wikipedia.org/wiki/France'>France</a><a href='/Projects/Details?id=VINET'>VINET</a></div>";
            var getString = template.compile(templateStr);
            var output = getString(templateStr);
            expect(output).toEqual("<div><a href=\"https://en.wikipedia.org/wiki/France\">France</a><a href=\"/Projects/Details?id=VINET\">VINET</a></div>");
        });
        it('JSON array input with special character apostrophe', function () {
            var templateStr = "<div><input value='HANAR's'></div>";
            var getString = template.compile(templateStr);
            var output = getString(templateStr);
            expect(output).toEqual("<div><input value=\"HANAR's\"></div>");
        });
        it('JSON Array input with multiple key mapping String', function () {
            var templateStr = '<div>${name}${info.id}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'one01' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: 'two02' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
        });
        it('JSON Array input with cacheTemplate', function () {
            var templateStr = '<div>${name}${info.id}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'one01' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: 'two02' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
        });
        it('JSON Array input multi line template', function () {
            template.expression(/\{{([^}]*)}}/g);
            /* tslint:disable */
            var templateStr = "<div>\n            <span>{{name}}</span>{{info.id}}\n            </div>";
            /* tslint:enable */
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: '<span>one</span>01' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: '<span>two</span>02' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
            template.expression(new RegExp('\\${([^}]*)}', 'g'));
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
        it('variable function access', function () {
            var templateStr = '<div>${name.toUpperCase()}${info.id}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'ONE01' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: 'TWO02' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
        });
        it('window function access', function () {
            var templateStr = '<div>${getName()}${info.id}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'TestName01' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: 'TestName02' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
        });
        it('JSON Array Input With IF Condition', function () {
            var templateStr = '<div>${if(name=="one")}${info.id}${/if}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: '01' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: '' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
        });
        it('JSON Array Input With else IF Condition', function () {
            var templateStr = '<div>${if(name=="one")}${id}${else if(name=="two")}${id}${/if}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: '02' }));
            expect(outDOM(template.compile(templateStr), [{ name: 'two', id: '02' }])).toEqual(result);
        });
        it('JSON Array Input With IF ELSE Condition', function () {
            var templateStr = '<div>${if(name=="one")}${info.id}${else}${name}${/if}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: '01' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: 'two' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
        });
        it('JSON Array Input With Multiple IF Condition', function () {
            var templateStr = '<div>${if(name=="one" && info.id != "01")}${info.id}${/if}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: '' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: '' }));
            expect(outDOM(template.compile(templateStr), dsJSONArray)).toEqual(result);
        });
        it('JSON Array Input With For Condition', function () {
            var templateStr = '<div>${for(item of items)}${item} <br/> ${/for}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'AR Item1 <br/> AR Item2 <br/> ' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: 'AR Item1 <br/> AR Item2 <br/> ' }));
            expect(outDOM(template.compile(templateStr), dsSubArray)).toEqual(result);
        });
        it('JSON Array Input With For Condition item index', function () {
            var templateStr = '<div>${for(item of items)}${itemIndex},${/for}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: '0,1,' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: '0,1,' }));
            expect(outDOM(template.compile(templateStr), dsSubArray)).toEqual(result);
        });
        it('JSON Array Input With IF and FOR Condition', function () {
            var templateStr = '<div>${if(name=="one")}${for(item of items)}${item} <br/> ${/for}${/if}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'AR Item1 <br/> AR Item2 <br/> ' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: '' }));
            expect(outDOM(template.compile(templateStr), dsSubArray)).toEqual(result);
        });
        it('JSON Array Input With FOR and IF Condition', function () {
            var templateStr = '<div>${for(item of items)}${if(item == "AR Item1")}${item}${/if}${/for}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'AR Item1' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: 'AR Item1' }));
            expect(outDOM(template.compile(templateStr), dsSubArray)).toEqual(result);
        });
        it('JSON Array Input With Nesting two false Condition', function () {
            var templateStr = '<div>${if(name=="two")}${if(info.id != "02")}${info.id}${/if}${/if}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: '' }));
            result.push((0, dom_1.createElement)('div', { innerHTML: '' }));
            expect(outDOM(template.compile(templateStr), dsJSONSubArray)).toEqual(result);
        });
        it('Template string pass with double slash with special character', function () {
            var data = { "Quickbrain\\Models\\AllowedListValue#id": 123456 };
            var getDOMString = template.compile('<div>${Quickbrain\\Models\\AllowedListValue#id}</div>');
            var output = getDOMString(data);
            expect(output).toEqual("<div>123456</div>");
        });
        it('Template string pass with double slash', function () {
            var data = { "Quickbrain\\Models\\AllowedListValue": 2468 };
            var getDOMString = template.compile('<div>${Quickbrain\\Models\\AllowedListValue}</div>');
            var output = getDOMString(data);
            expect(output).toEqual("<div>2468</div>");
        });
        it('multiple string pass in the template engine', function () {
            var data = { name: 'Aston Martin', val: 'hi' };
            var getDOMString = template.compile('<div>${name,val}</div>');
            var output = getDOMString(data);
            expect(output).toEqual("<div>Aston Martinhi</div>");
        });
        it('single string pass in the template engine', function () {
            var data = { name: 'Aston Martin', val: 'hi' };
            var getDOMString = template.compile('<div>${name}</div>');
            var output = getDOMString(data);
            expect(output).toEqual("<div>Aston Martin</div>");
        });
        it('string pass with out data attribute in the window function', function () {
            window.translate = function (str) {
                return str.toUpperCase();
            };
            var data = { name: 'Aston Martin', val: 'hi' };
            var getDOMString = template.compile('<div>${translate(name,val)}</div>');
            var output = getDOMString(data);
            expect(output).toEqual("<div>ASTON MARTIN</div>");
        });
        it('empty string pass in the window function', function () {
            window.translate = function () {
                var str = "hello";
                return str.toUpperCase();
            };
            var data = { name: 'Aston Martin', val: 'hi' };
            var getDOMString = template.compile('<div>${translate()}</div>');
            var output = getDOMString(data);
            expect(output).toEqual("<div>HELLO</div>");
        });
        it('string pass with data attribute  in the  window function', function () {
            window.translate = function (str) {
                return str.toUpperCase();
            };
            var data = { name: 'Aston Martin', val: 'hi' };
            var getDOMString = template.compile('<div>${translate(data.name,data.val)}</div>');
            var output = getDOMString(data);
            expect(output).toEqual("<div>ASTON MARTIN</div>");
        });
        it('string pass with window variable  in the  window function', function () {
            window.translate = function (str, lstname, last) {
                return (str + lstname + last).toUpperCase();
            };
            window.custom = 'MARTIN';
            var data = { name: 'Aston', val: 'hi' };
            var getDOMString = template.compile('<div>${translate(data.name,data.val,window.custom)}</div>');
            var output = getDOMString(data);
            expect(output).toEqual("<div>ASTONHIMARTIN</div>");
        });
        it('JSON Array Input with IF Condition which has window function', function () {
            var templateStr = '${if(window.check(IDPRATICA))}<div>true</div>${else}<div>false</div>${/if}';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'true' }));
            expect(outDOM(template.compile(templateStr), arrayOfObj)).toEqual(result);
        });
        it('JSON Array Input With IF Condition with window function which has special character', function () {
            var templateStr = '${if(window.check(@DRNT))}<div>true</div>${else}<div>false</div>${/if}';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'true' }));
            expect(outDOM(template.compile(templateStr), arrayOfObj)).toEqual(result);
        });
        it('JSON Array Input With IF Condition with window function which has array of value within object', function () {
            var templateStr = '${if(window.check(Giorni[0].IDSTATO))}<div>true</div>${else}<div>false</div>${/if}';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'false' }));
            expect(outDOM(template.compile(templateStr), arrayOfObj)).toEqual(result);
        });
        it('JSON Array Input With IF Condition with window function which has special character with array of value within object', function () {
            var templateStr = '${if(window.check(@Prior[0].IDTAG))}<div>true</div>${else}<div>false</div>${/if}';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'true' }));
            expect(outDOM(template.compile(templateStr), arrayOfObj)).toEqual(result);
        });
        it('JSON Array Input with window function which has special character', function () {
            var templateStr = '<div>${window.check(@DRNT)}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'true' }));
            expect(outDOM(template.compile(templateStr), arrayOfObj)).toEqual(result);
        });
        it('JSON Array Input With window function which has array of value within object', function () {
            var templateStr = '<div>${window.check(Giorni[0].IDSTATO)}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'false' }));
            expect(outDOM(template.compile(templateStr), arrayOfObj)).toEqual(result);
        });
        it('JSON Array Input With window function which has special character with array of value within object', function () {
            var templateStr = '<div>${window.check(@Prior[0].IDTAG)}</div>';
            var result = [];
            result.push((0, dom_1.createElement)('div', { innerHTML: 'true' }));
            expect(outDOM(template.compile(templateStr), arrayOfObj)).toEqual(result);
        });
    });
});
//# sourceMappingURL=template.spec.js.map