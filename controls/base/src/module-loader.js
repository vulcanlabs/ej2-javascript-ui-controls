define(["require", "exports", "./util"], function (require, exports, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ModuleLoader = void 0;
    var MODULE_SUFFIX = 'Module';
    var ModuleLoader = /** @class */ (function () {
        function ModuleLoader(parent) {
            this.loadedModules = [];
            this.parent = parent;
        }
        /**
         * Inject required modules in component library
         *
         * @returns {void} ?
         * @param {ModuleDeclaration[]} requiredModules - Array of modules to be required
         * @param {Function[]} moduleList - Array of modules to be injected from sample side
         */
        ModuleLoader.prototype.inject = function (requiredModules, moduleList) {
            var reqLength = requiredModules.length;
            if (reqLength === 0) {
                this.clean();
                return;
            }
            if (this.loadedModules.length) {
                this.clearUnusedModule(requiredModules);
            }
            for (var i = 0; i < reqLength; i++) {
                var modl = requiredModules[i];
                for (var _i = 0, moduleList_1 = moduleList; _i < moduleList_1.length; _i++) {
                    var module = moduleList_1[_i];
                    var modName = modl.member;
                    if (module.prototype.getModuleName() === modl.member && !this.isModuleLoaded(modName)) {
                        var moduleObject = (0, util_1.createInstance)(module, modl.args);
                        var memberName = this.getMemberName(modName);
                        if (modl.isProperty) {
                            (0, util_1.setValue)(memberName, module, this.parent);
                        }
                        else {
                            (0, util_1.setValue)(memberName, moduleObject, this.parent);
                        }
                        var loadedModule = modl;
                        loadedModule.member = memberName;
                        this.loadedModules.push(loadedModule);
                    }
                }
            }
        };
        /**
         * To remove the created object while destroying the control
         *
         * @returns {void}
         */
        ModuleLoader.prototype.clean = function () {
            for (var _i = 0, _a = this.loadedModules; _i < _a.length; _i++) {
                var modules = _a[_i];
                if (!modules.isProperty) {
                    (0, util_1.getValue)(modules.member, this.parent).destroy();
                }
            }
            this.loadedModules = [];
        };
        /**
         * Removes all unused modules
         *
         * @param {ModuleDeclaration[]} moduleList ?
         * @returns {void} ?
         */
        ModuleLoader.prototype.clearUnusedModule = function (moduleList) {
            var _this = this;
            var usedModules = moduleList.map(function (arg) { return _this.getMemberName(arg.member); });
            var removableModule = this.loadedModules.filter(function (module) {
                return usedModules.indexOf(module.member) === -1;
            });
            for (var _i = 0, removableModule_1 = removableModule; _i < removableModule_1.length; _i++) {
                var mod = removableModule_1[_i];
                if (!mod.isProperty) {
                    (0, util_1.getValue)(mod.member, this.parent).destroy();
                }
                this.loadedModules.splice(this.loadedModules.indexOf(mod), 1);
                (0, util_1.deleteObject)(this.parent, mod.member);
            }
        };
        /**
         * To get the name of the member.
         *
         * @param {string} name ?
         * @returns {string} ?
         */
        ModuleLoader.prototype.getMemberName = function (name) {
            return name[0].toLowerCase() + name.substring(1) + MODULE_SUFFIX;
        };
        /**
         * Returns boolean based on whether the module specified is loaded or not
         *
         * @param {string} modName ?
         * @returns {boolean} ?
         */
        ModuleLoader.prototype.isModuleLoaded = function (modName) {
            for (var _i = 0, _a = this.loadedModules; _i < _a.length; _i++) {
                var mod = _a[_i];
                if (mod.member === this.getMemberName(modName)) {
                    return true;
                }
            }
            return false;
        };
        return ModuleLoader;
    }());
    exports.ModuleLoader = ModuleLoader;
});
//# sourceMappingURL=module-loader.js.map