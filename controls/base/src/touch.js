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
define(["require", "exports", "./util", "./notify-property-change", "./browser", "./base", "./child-property", "./event-handler"], function (require, exports, util_1, notify_property_change_1, browser_1, base_1, child_property_1, event_handler_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Touch = exports.SwipeSettings = void 0;
    /**
     * SwipeSettings is a framework module that provides support to handle swipe event like swipe up, swipe right, etc..,
     */
    var SwipeSettings = /** @class */ (function (_super) {
        __extends(SwipeSettings, _super);
        function SwipeSettings() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        __decorate([
            (0, notify_property_change_1.Property)(50)
        ], SwipeSettings.prototype, "swipeThresholdDistance", void 0);
        return SwipeSettings;
    }(child_property_1.ChildProperty));
    exports.SwipeSettings = SwipeSettings;
    var swipeRegex = /(Up|Down)/;
    /**
     * Touch class provides support to handle the touch event like tap, double tap, tap hold, etc..,
     * ```typescript
     *    let node: HTMLElement;
     * let touchObj: Touch = new Touch({
     *    element: node,
     *    tap: function (e) {
     *        // tap handler function code
     *    }
     *    tapHold: function (e) {
     *        // tap hold handler function code
     *    }
     *    scroll: function (e) {
     *        // scroll handler function code
     *    }
     *    swipe: function (e) {
     *        // swipe handler function code
     *    }
     * });
     * ```
     */
    var Touch = /** @class */ (function (_super) {
        __extends(Touch, _super);
        /* End-Properties */
        function Touch(element, options) {
            var _this = _super.call(this, options, element) || this;
            _this.touchAction = true;
            _this.tapCount = 0;
            /**
             *
             * @param {MouseEventArgs | TouchEventArgs} evt ?
             * @returns {void} ?
             */
            _this.startEvent = function (evt) {
                if (_this.touchAction === true) {
                    var point = _this.updateChangeTouches(evt);
                    if (evt.changedTouches !== undefined) {
                        _this.touchAction = false;
                    }
                    _this.isTouchMoved = false;
                    _this.movedDirection = '';
                    _this.startPoint = _this.lastMovedPoint = { clientX: point.clientX, clientY: point.clientY };
                    _this.startEventData = point;
                    _this.hScrollLocked = _this.vScrollLocked = false;
                    _this.tStampStart = Date.now();
                    _this.timeOutTapHold = setTimeout(function () { _this.tapHoldEvent(evt); }, _this.tapHoldThreshold);
                    event_handler_1.EventHandler.add(_this.element, browser_1.Browser.touchMoveEvent, _this.moveEvent, _this);
                    event_handler_1.EventHandler.add(_this.element, browser_1.Browser.touchEndEvent, _this.endEvent, _this);
                    event_handler_1.EventHandler.add(_this.element, browser_1.Browser.touchCancelEvent, _this.cancelEvent, _this);
                }
            };
            /**
             *
             * @param {MouseEventArgs | TouchEventArgs} evt ?
             * @returns {void} ?
             */
            _this.moveEvent = function (evt) {
                var point = _this.updateChangeTouches(evt);
                _this.movedPoint = point;
                _this.isTouchMoved = !(point.clientX === _this.startPoint.clientX && point.clientY === _this.startPoint.clientY);
                var eScrollArgs = {};
                if (_this.isTouchMoved) {
                    clearTimeout(_this.timeOutTapHold);
                    _this.calcScrollPoints(evt);
                    var scrollArg = {
                        startEvents: _this.startEventData,
                        originalEvent: evt, startX: _this.startPoint.clientX,
                        startY: _this.startPoint.clientY, distanceX: _this.distanceX,
                        distanceY: _this.distanceY, scrollDirection: _this.scrollDirection,
                        velocity: _this.getVelocity(point)
                    };
                    eScrollArgs = (0, util_1.extend)(eScrollArgs, {}, scrollArg);
                    _this.trigger('scroll', eScrollArgs);
                    _this.lastMovedPoint = { clientX: point.clientX, clientY: point.clientY };
                }
            };
            /**
             *
             * @param {MouseEventArgs | TouchEventArgs} evt ?
             * @returns {void} ?
             */
            _this.cancelEvent = function (evt) {
                clearTimeout(_this.timeOutTapHold);
                clearTimeout(_this.timeOutTap);
                _this.tapCount = 0;
                _this.swipeFn(evt);
                event_handler_1.EventHandler.remove(_this.element, browser_1.Browser.touchCancelEvent, _this.cancelEvent);
            };
            /**
             *
             * @param {MouseEventArgs | TouchEventArgs} evt ?
             * @returns {void} ?
             */
            _this.endEvent = function (evt) {
                _this.swipeFn(evt);
                if (!_this.isTouchMoved) {
                    if (typeof _this.tap === 'function') {
                        _this.trigger('tap', { originalEvent: evt, tapCount: ++_this.tapCount });
                        _this.timeOutTap = setTimeout(function () {
                            _this.tapCount = 0;
                        }, _this.tapThreshold);
                    }
                }
                _this.modeclear();
            };
            /**
             *
             * @param {MouseEventArgs | TouchEventArgs} evt ?
             * @returns {void} ?
             */
            _this.swipeFn = function (evt) {
                clearTimeout(_this.timeOutTapHold);
                clearTimeout(_this.timeOutTap);
                var point = _this.updateChangeTouches(evt);
                var diffX = point.clientX - _this.startPoint.clientX;
                var diffY = point.clientY - _this.startPoint.clientY;
                diffX = Math.floor(diffX < 0 ? -1 * diffX : diffX);
                diffY = Math.floor(diffY < 0 ? -1 * diffY : diffX);
                _this.isTouchMoved = diffX > 1 || diffY > 1;
                _this.endPoint = point;
                _this.calcPoints(evt);
                var swipeArgs = {
                    originalEvent: evt,
                    startEvents: _this.startEventData,
                    startX: _this.startPoint.clientX,
                    startY: _this.startPoint.clientY,
                    distanceX: _this.distanceX, distanceY: _this.distanceY, swipeDirection: _this.movedDirection,
                    velocity: _this.getVelocity(point)
                };
                if (_this.isTouchMoved) {
                    var eSwipeArgs = void 0;
                    var tDistance = _this.swipeSettings.swipeThresholdDistance;
                    // eslint-disable-next-line
                    eSwipeArgs = (0, util_1.extend)(eSwipeArgs, _this.defaultArgs, swipeArgs);
                    var canTrigger = false;
                    var ele = _this.element;
                    var scrollBool = _this.isScrollable(ele);
                    var moved = swipeRegex.test(_this.movedDirection);
                    if ((tDistance < _this.distanceX && !moved) || (tDistance < _this.distanceY && moved)) {
                        if (!scrollBool) {
                            canTrigger = true;
                        }
                        else {
                            canTrigger = _this.checkSwipe(ele, moved);
                        }
                    }
                    if (canTrigger) {
                        _this.trigger('swipe', eSwipeArgs);
                    }
                }
                _this.modeclear();
            };
            _this.modeclear = function () {
                _this.modeClear = setTimeout(function () {
                    _this.touchAction = true;
                }, (typeof _this.tap !== 'function' ? 0 : 20));
                _this.lastTapTime = new Date().getTime();
                event_handler_1.EventHandler.remove(_this.element, browser_1.Browser.touchMoveEvent, _this.moveEvent);
                event_handler_1.EventHandler.remove(_this.element, browser_1.Browser.touchEndEvent, _this.endEvent);
                event_handler_1.EventHandler.remove(_this.element, browser_1.Browser.touchCancelEvent, _this.cancelEvent);
            };
            _this.bind();
            return _this;
        }
        // triggers when property changed
        /**
         *
         * @private
         * @param {TouchModel} newProp ?
         * @param {TouchModel} oldProp ?
         * @returns {void} ?
         */
        // eslint-disable-next-line
        Touch.prototype.onPropertyChanged = function (newProp, oldProp) {
            //No Code to handle
        };
        Touch.prototype.bind = function () {
            this.wireEvents();
            if (browser_1.Browser.isIE) {
                this.element.classList.add('e-block-touch');
            }
        };
        /**
         * To destroy the touch instance.
         *
         * @returns {void}
         */
        Touch.prototype.destroy = function () {
            this.unwireEvents();
            _super.prototype.destroy.call(this);
        };
        // Need to changes the event binding once we updated the event handler.
        Touch.prototype.wireEvents = function () {
            event_handler_1.EventHandler.add(this.element, browser_1.Browser.touchStartEvent, this.startEvent, this);
        };
        Touch.prototype.unwireEvents = function () {
            event_handler_1.EventHandler.remove(this.element, browser_1.Browser.touchStartEvent, this.startEvent);
        };
        /**
         * Returns module name as touch
         *
         * @returns {string} ?
         * @private
         */
        Touch.prototype.getModuleName = function () {
            return 'touch';
        };
        /**
         * Returns if the HTML element is Scrollable.
         *
         * @param {HTMLElement} element - HTML Element to check if Scrollable.
         * @returns {boolean} ?
         */
        Touch.prototype.isScrollable = function (element) {
            var eleStyle = getComputedStyle(element);
            var style = eleStyle.overflow + eleStyle.overflowX + eleStyle.overflowY;
            if ((/(auto|scroll)/).test(style)) {
                return true;
            }
            return false;
        };
        /**
         *
         * @param {MouseEventArgs | TouchEventArgs} evt ?
         * @returns {void} ?
         */
        Touch.prototype.tapHoldEvent = function (evt) {
            this.tapCount = 0;
            this.touchAction = true;
            var eTapArgs;
            event_handler_1.EventHandler.remove(this.element, browser_1.Browser.touchMoveEvent, this.moveEvent);
            event_handler_1.EventHandler.remove(this.element, browser_1.Browser.touchEndEvent, this.endEvent);
            // eslint-disable-next-line
            eTapArgs = { originalEvent: evt };
            this.trigger('tapHold', eTapArgs);
            event_handler_1.EventHandler.remove(this.element, browser_1.Browser.touchCancelEvent, this.cancelEvent);
        };
        Touch.prototype.calcPoints = function (evt) {
            var point = this.updateChangeTouches(evt);
            this.defaultArgs = { originalEvent: evt };
            this.distanceX = Math.abs((Math.abs(point.clientX) - Math.abs(this.startPoint.clientX)));
            this.distanceY = Math.abs((Math.abs(point.clientY) - Math.abs(this.startPoint.clientY)));
            if (this.distanceX > this.distanceY) {
                this.movedDirection = (point.clientX > this.startPoint.clientX) ? 'Right' : 'Left';
            }
            else {
                this.movedDirection = (point.clientY < this.startPoint.clientY) ? 'Up' : 'Down';
            }
        };
        Touch.prototype.calcScrollPoints = function (evt) {
            var point = this.updateChangeTouches(evt);
            this.defaultArgs = { originalEvent: evt };
            this.distanceX = Math.abs((Math.abs(point.clientX) - Math.abs(this.lastMovedPoint.clientX)));
            this.distanceY = Math.abs((Math.abs(point.clientY) - Math.abs(this.lastMovedPoint.clientY)));
            if ((this.distanceX > this.distanceY || this.hScrollLocked === true) && this.vScrollLocked === false) {
                this.scrollDirection = (point.clientX > this.lastMovedPoint.clientX) ? 'Right' : 'Left';
                this.hScrollLocked = true;
            }
            else {
                this.scrollDirection = (point.clientY < this.lastMovedPoint.clientY) ? 'Up' : 'Down';
                this.vScrollLocked = true;
            }
        };
        Touch.prototype.getVelocity = function (pnt) {
            var newX = pnt.clientX;
            var newY = pnt.clientY;
            var newT = Date.now();
            var xDist = newX - this.startPoint.clientX;
            var yDist = newY - this.startPoint.clientX;
            var interval = newT - this.tStampStart;
            return Math.sqrt(xDist * xDist + yDist * yDist) / interval;
        };
        // eslint-disable-next-line
        Touch.prototype.checkSwipe = function (ele, flag) {
            var keys = ['scroll', 'offset'];
            var temp = flag ? ['Height', 'Top'] : ['Width', 'Left'];
            if ((ele[keys[0] + temp[0]] <= ele[keys[1] + temp[0]])) {
                return true;
            }
            return (ele[keys[0] + temp[1]] === 0) ||
                (ele[keys[1] + temp[0]] + ele[keys[0] + temp[1]] >= ele[keys[0] + temp[0]]);
        };
        Touch.prototype.updateChangeTouches = function (evt) {
            var point = evt.changedTouches && evt.changedTouches.length !== 0 ? evt.changedTouches[0] : evt;
            return point;
        };
        __decorate([
            (0, notify_property_change_1.Event)()
        ], Touch.prototype, "tap", void 0);
        __decorate([
            (0, notify_property_change_1.Event)()
        ], Touch.prototype, "tapHold", void 0);
        __decorate([
            (0, notify_property_change_1.Event)()
        ], Touch.prototype, "swipe", void 0);
        __decorate([
            (0, notify_property_change_1.Event)()
        ], Touch.prototype, "scroll", void 0);
        __decorate([
            (0, notify_property_change_1.Property)(350)
        ], Touch.prototype, "tapThreshold", void 0);
        __decorate([
            (0, notify_property_change_1.Property)(750)
        ], Touch.prototype, "tapHoldThreshold", void 0);
        __decorate([
            (0, notify_property_change_1.Complex)({}, SwipeSettings)
        ], Touch.prototype, "swipeSettings", void 0);
        Touch = __decorate([
            notify_property_change_1.NotifyPropertyChanges
        ], Touch);
        return Touch;
    }(base_1.Base));
    exports.Touch = Touch;
});
//# sourceMappingURL=touch.js.map