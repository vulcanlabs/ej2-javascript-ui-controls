define(["require", "exports", "./template", "./dom", "./util"], function (require, exports, template_1, dom_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getTemplateEngine = exports.setTemplateEngine = exports.resetBlazorTemplate = exports.updateBlazorTemplate = exports.compile = exports.getRandomId = exports.blazorTemplates = void 0;
    var HAS_ROW = /^[\n\r.]+<tr|^<tr/;
    var HAS_SVG = /^[\n\r.]+<svg|^<path|^<g/;
    exports.blazorTemplates = {};
    /**
     *
     * @returns {string} ?
     */
    function getRandomId() {
        return '-' + Math.random().toString(36).substr(2, 5);
    }
    exports.getRandomId = getRandomId;
    /**
     * Compile the template string into template function.
     *
     * @param {string} templateString - The template string which is going to convert.
     * @param {Object} helper - Helper functions as an object.
     * @param {boolean} ignorePrefix ?
     * @returns {NodeList} ?
     * @private
     */
    // eslint-disable-next-line
    function compile(templateString, helper, ignorePrefix) {
        var compiler = engineObj.compile(templateString, helper, ignorePrefix);
        // eslint-disable-next-line
        return function (data, component, propName, templateId, isStringTemplate, index, element, root) {
            var result = compiler(data, component, propName, element, root);
            var blazorTemplateId = 'BlazorTemplateId';
            if ((0, util_1.isBlazor)() && !isStringTemplate) {
                var randomId = getRandomId();
                var blazorId = templateId + randomId;
                if (!exports.blazorTemplates[templateId]) {
                    exports.blazorTemplates[templateId] = [];
                }
                if (!(0, util_1.isNullOrUndefined)(index)) {
                    var keys = Object.keys(exports.blazorTemplates[templateId][index]);
                    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                        var key = keys_1[_i];
                        if (key !== blazorTemplateId && data[key]) {
                            exports.blazorTemplates[templateId][index][key] = data[key];
                        }
                        if (key === blazorTemplateId) {
                            blazorId = exports.blazorTemplates[templateId][index][key];
                        }
                    }
                }
                else {
                    data[blazorTemplateId] = blazorId;
                    exports.blazorTemplates[templateId].push(data);
                }
                // eslint-disable-next-line
                return propName === 'rowTemplate' ? [(0, dom_1.createElement)('tr', { id: blazorId, className: 'e-blazor-template' })] :
                    // eslint-disable-next-line
                    [(0, dom_1.createElement)('div', { id: blazorId, className: 'e-blazor-template' })];
            }
            if (typeof result === 'string') {
                if (HAS_SVG.test(result)) {
                    var ele = (0, dom_1.createElement)('svg', { innerHTML: result });
                    return ele.childNodes;
                }
                else {
                    var ele = (0, dom_1.createElement)((HAS_ROW.test(result) ? 'table' : 'div'), { innerHTML: result });
                    return ele.childNodes;
                }
            }
            else {
                return result;
            }
        };
    }
    exports.compile = compile;
    /**
     *
     * @param {string} templateId ?
     * @param {string} templateName ?
     * @param {string} comp ?
     * @param {boolean} isEmpty ?
     * @param {Function} callBack ?
     * @returns {void} ?
     */
    function updateBlazorTemplate(templateId, templateName, comp, isEmpty, callBack) {
        if ((0, util_1.isBlazor)()) {
            var ejsIntrop = 'sfBlazor';
            window[ejsIntrop].updateTemplate(templateName, exports.blazorTemplates[templateId], templateId, comp, callBack);
            if (isEmpty !== false) {
                exports.blazorTemplates[templateId] = [];
            }
        }
    }
    exports.updateBlazorTemplate = updateBlazorTemplate;
    /**
     *
     * @param {string} templateId ?
     * @param {string} templateName ?
     * @param {number} index ?
     * @returns {void} ?
     */
    function resetBlazorTemplate(templateId, templateName, index) {
        var templateDiv = document.getElementById(templateId);
        if (templateDiv) {
            // eslint-disable-next-line
            var innerTemplates = templateDiv.getElementsByClassName('blazor-inner-template');
            for (var i = 0; i < innerTemplates.length; i++) {
                var tempId = ' ';
                if (!(0, util_1.isNullOrUndefined)(index)) {
                    tempId = innerTemplates[index].getAttribute('data-templateId');
                }
                else {
                    tempId = innerTemplates[i].getAttribute('data-templateId');
                }
                var tempElement = document.getElementById(tempId);
                if (tempElement) {
                    var length_1 = tempElement.childNodes.length;
                    for (var j = 0; j < length_1; j++) {
                        if (!(0, util_1.isNullOrUndefined)(index)) {
                            innerTemplates[index].appendChild(tempElement.childNodes[0]);
                            i = innerTemplates.length;
                        }
                        else {
                            innerTemplates[i].appendChild(tempElement.childNodes[0]);
                        }
                    }
                }
            }
        }
    }
    exports.resetBlazorTemplate = resetBlazorTemplate;
    /**
     * Set your custom template engine for template rendering.
     *
     * @param  {ITemplateEngine} classObj - Class object for custom template.
     * @returns {void} ?
     * @private
     */
    function setTemplateEngine(classObj) {
        engineObj.compile = classObj.compile;
    }
    exports.setTemplateEngine = setTemplateEngine;
    /**
     * Get current template engine for template rendering
     *
     * @returns {string} ?
     * @private
     */
    function getTemplateEngine() {
        return engineObj.compile;
    }
    exports.getTemplateEngine = getTemplateEngine;
    //Default Engine Class
    var Engine = /** @class */ (function () {
        function Engine() {
        }
        // eslint-disable-next-line
        Engine.prototype.compile = function (templateString, helper, ignorePrefix) {
            if (helper === void 0) { helper = {}; }
            return (0, template_1.compile)(templateString, helper);
        };
        return Engine;
    }());
    var engineObj = { compile: new Engine().compile };
});
//# sourceMappingURL=template-engine.js.map