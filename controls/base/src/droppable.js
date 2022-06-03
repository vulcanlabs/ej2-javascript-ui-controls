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
define(["require", "exports", "./base", "./browser", "./dom", "./notify-property-change", "./event-handler", "./util"], function (require, exports, base_1, browser_1, dom_1, notify_property_change_1, event_handler_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Droppable = void 0;
    /**
     * Droppable Module provides support to enable droppable functionality in Dom Elements.
     * ```html
     * <div id='drop'>Droppable</div>
     * <script>
     * let ele:HTMLElement = document.getElementById('drop');
     * var drag:Droppable = new Droppable(ele,{
     *     accept:'.drop',
     *     drop: function(e) {
     *      //drop handler code.
     *     }
     * });
     * </script>
     * ```
     */
    var Droppable = /** @class */ (function (_super) {
        __extends(Droppable, _super);
        function Droppable(element, options) {
            var _this = _super.call(this, options, element) || this;
            _this.mouseOver = false;
            _this.dragData = {};
            _this.dragStopCalled = false;
            _this.bind();
            return _this;
        }
        Droppable.prototype.bind = function () {
            this.wireEvents();
        };
        Droppable.prototype.wireEvents = function () {
            event_handler_1.EventHandler.add(this.element, browser_1.Browser.touchEndEvent, this.intDrop, this);
        };
        // triggers when property changed
        // eslint-disable-next-line
        Droppable.prototype.onPropertyChanged = function (newProp, oldProp) {
            //No Code to handle
        };
        Droppable.prototype.getModuleName = function () {
            return 'droppable';
        };
        Droppable.prototype.intOver = function (event, element) {
            if (!this.mouseOver) {
                var drag = this.dragData[this.scope];
                this.trigger('over', { event: event, target: element, dragData: drag });
                this.mouseOver = true;
            }
        };
        Droppable.prototype.intOut = function (event, element) {
            if (this.mouseOver) {
                this.trigger('out', { evt: event, target: element });
                this.mouseOver = false;
            }
        };
        Droppable.prototype.intDrop = function (evt, element) {
            if (!this.dragStopCalled) {
                return;
            }
            else {
                this.dragStopCalled = false;
            }
            var accept = true;
            var drag = this.dragData[this.scope];
            var isDrag = drag ? (drag.helper && (0, dom_1.isVisible)(drag.helper)) : false;
            var area;
            if (isDrag) {
                area = this.isDropArea(evt, drag.helper, element);
                if (this.accept) {
                    accept = (0, dom_1.matches)(drag.helper, this.accept);
                }
            }
            if (isDrag && this.drop && area.canDrop && accept) {
                this.trigger('drop', { event: evt, target: area.target, droppedElement: drag.helper, dragData: drag });
            }
            this.mouseOver = false;
        };
        Droppable.prototype.isDropArea = function (evt, helper, element) {
            var area = { canDrop: true, target: element || evt.target };
            var isTouch = evt.type === 'touchend';
            if (isTouch || area.target === helper) {
                helper.style.display = 'none';
                var coord = isTouch ? (evt.changedTouches[0]) : evt;
                var ele = document.elementFromPoint(coord.clientX, coord.clientY);
                area.canDrop = false;
                area.canDrop = (0, util_1.compareElementParent)(ele, this.element);
                if (area.canDrop) {
                    area.target = ele;
                }
                helper.style.display = '';
            }
            return area;
        };
        Droppable.prototype.destroy = function () {
            event_handler_1.EventHandler.remove(this.element, browser_1.Browser.touchEndEvent, this.intDrop);
            _super.prototype.destroy.call(this);
        };
        __decorate([
            (0, notify_property_change_1.Property)()
        ], Droppable.prototype, "accept", void 0);
        __decorate([
            (0, notify_property_change_1.Property)('default')
        ], Droppable.prototype, "scope", void 0);
        __decorate([
            (0, notify_property_change_1.Event)()
        ], Droppable.prototype, "drop", void 0);
        __decorate([
            (0, notify_property_change_1.Event)()
        ], Droppable.prototype, "over", void 0);
        __decorate([
            (0, notify_property_change_1.Event)()
        ], Droppable.prototype, "out", void 0);
        Droppable = __decorate([
            notify_property_change_1.NotifyPropertyChanges
        ], Droppable);
        return Droppable;
    }(base_1.Base));
    exports.Droppable = Droppable;
});
//# sourceMappingURL=droppable.js.map