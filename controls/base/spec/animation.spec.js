define(["require", "exports", "../src/dom", "../src/event-handler", "../src/browser", "../src/animation"], function (require, exports, dom_1, event_handler_1, browser_1, animation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Animation specification
     */
    var edgeUa = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240';
    var animeObj = new animation_1.Animation({});
    var modifiedObj = new animation_1.Animation({
        name: 'FadeOut', duration: 100, timingFunction: 'easeIn', delay: 1
    });
    var element1 = (0, dom_1.createElement)('div', { id: 'anime1' });
    var element2 = (0, dom_1.createElement)('div', { id: 'anime2' });
    //Cover onPropertyChanged function
    animeObj.onPropertyChanged({}, {});
    describe('Animation # ', function () {
        it('initialize animation object # ', function () {
            expect(animeObj instanceof animation_1.Animation).toEqual(true);
        });
        it('check default name # ', function () {
            expect(animeObj.name).toEqual('FadeIn');
        });
        it('check default duration # ', function () {
            expect(animeObj.duration).toEqual(400);
        });
        it('check default timingFunction # ', function () {
            expect(animeObj.timingFunction).toEqual('ease');
        });
        it('check default timingFunction value # ', function () {
            expect(animeObj.easing[animeObj.timingFunction]).toEqual('cubic-bezier(0.250, 0.100, 0.250, 1.000)');
        });
        it('check default delay # ', function () {
            expect(animeObj.delay).toEqual(0);
        });
        it('check modified name # ', function () {
            expect(modifiedObj.name).toEqual('FadeOut');
        });
        it('check modified duration # ', function () {
            expect(modifiedObj.duration).toEqual(100);
        });
        it('check modified timingFunction # ', function () {
            expect(modifiedObj.timingFunction).toEqual('easeIn');
        });
        it('check modified delay # ', function () {
            expect(modifiedObj.delay).toEqual(1);
        });
        it('check modified animation options with default animation options # ', function () {
            expect(modifiedObj).not.toEqual(animeObj);
        });
        it('check module name # ', function () {
            expect(animeObj.getModuleName()).toEqual('animation');
        });
        it('check notify property change # ', function () {
            modifiedObj.timingFunction = 'cubic-bezier(.29,0,.55,1)';
            expect(modifiedObj.timingFunction).toEqual('cubic-bezier(.29,0,.55,1)');
        });
        it('animate method without options # ', function (done) {
            var animationObj = new animation_1.Animation({});
            animationObj.end = function (model) {
                expect(model.element).toEqual(element1);
                done();
            };
            animationObj.animate(element1);
        });
        describe('animate method with id # ', function () {
            var animeOption = null;
            beforeEach(function (done) {
                document.body.appendChild(element1);
                animeObj.animate('#anime1', {
                    timingFunction: 'easeIn', end: function (args) {
                        animeOption = args;
                        done();
                    }
                });
            });
            it('testing callback option # ', function () {
                (0, dom_1.select)('#anime1').remove();
                expect(animeOption).not.toBeNull();
            });
        });
        describe('animate method with element # ', function () {
            var animeOption = null;
            beforeEach(function (done) {
                modifiedObj.animate(element1, {
                    end: function (args) {
                        animeOption = args;
                        done();
                    }
                });
            });
            it('testing callback option # ', function () {
                expect(animeOption).not.toBeNull();
            });
        });
        describe('animate method with failure # ', function () {
            var error = null;
            beforeEach(function (done) {
                var raf = window.requestAnimationFrame;
                window.requestAnimationFrame = undefined;
                modifiedObj.animate(element2, {
                    fail: function (e) {
                        window.requestAnimationFrame = raf;
                        error = e;
                        done();
                    }
                });
            });
            it('testing promise catch # ', function () {
                expect(error).not.toBeNull();
            });
        });
        describe('animate method with progress # ', function () {
            var animeOption = null;
            beforeEach(function (done) {
                modifiedObj.animate(element2, {
                    progress: function (args) {
                        animeOption = args;
                        done();
                    }
                });
            });
            it('expected animation object # ', function () {
                expect(animeOption).not.toBeNull();
            });
            afterAll(function () {
                modifiedObj.destroy();
            });
        });
        describe('EJ2-499: delay time is greater than duration time # ', function () {
            var animeOption = null;
            beforeEach(function (done) {
                animeObj.animate(element1, {
                    delay: 1000, duration: 100,
                    progress: function (args) {
                        if (args.timeStamp > args.duration / 2) {
                            animeOption = args;
                            done();
                        }
                    }
                });
            });
            it('testing delay time is greater than duration time with animate method # ', function () {
                expect(animeOption).not.toBeNull();
            });
        });
        describe('EJ2-594: animation for svg elements in IE browser # ', function () {
            var animeAttr = null;
            var element = (0, dom_1.createElement)('div', { id: 'anime' });
            describe('testing e-animate attribute # ', function () {
                beforeEach(function (done) {
                    animeObj.animate(element, {
                        progress: function (args) {
                            if (args.timeStamp > (args.delay + args.duration) / 2) {
                                animeAttr = args.element.getAttribute('e-animate');
                                done();
                            }
                        }
                    });
                });
                it('progress event # ', function () {
                    expect(animeAttr).toEqual('true');
                });
            });
            describe('testing e-animate attribute # ', function () {
                beforeEach(function (done) {
                    animeObj.animate(element1, {
                        end: function (args) {
                            animeAttr = args.element.getAttribute('e-animate');
                            done();
                        }
                    });
                });
                it('animation end # ', function () {
                    expect(animeAttr).toEqual(null);
                });
            });
            describe('EJ2-940: animate method with begin and animation end on last frame # ', function () {
                var animeOption = null;
                beforeEach(function (done) {
                    modifiedObj.animate(element2, {
                        begin: function (args) {
                            animeOption = args;
                            done();
                        }
                    });
                });
                it('expected animation object # ', function () {
                    expect(animeOption).not.toBeNull();
                });
                afterAll(function () {
                    modifiedObj.destroy();
                });
            });
        });
        describe('stop animation at inprogress # ', function () {
            describe('with element # ', function () {
                var element = (0, dom_1.createElement)('div', { id: 'anime' });
                var animationId = null;
                beforeEach(function (done) {
                    animeObj.animate(element, {
                        progress: function (args) {
                            animationId = args.element.getAttribute('e-animation-id');
                            animation_1.Animation.stop(args.element);
                            done();
                        }
                    });
                });
                it('expected animation id # ', function () {
                    expect(animationId).not.toBeNull();
                });
            });
            describe('with model # ', function () {
                var element = (0, dom_1.createElement)('div', { id: 'anime' });
                var timeStamp = null;
                beforeEach(function (done) {
                    animeObj.animate(element, {
                        duration: 600,
                        progress: function (args) {
                            if (args.timeStamp > 300) {
                                animation_1.Animation.stop(args.element, args);
                            }
                        },
                        end: function (args) {
                            timeStamp = args.timeStamp;
                            done();
                        }
                    });
                });
                it('expected timestamp with less than actual duration # ', function () {
                    expect(timeStamp < 400).toEqual(true);
                });
            });
            it('with out animate method # ', function () {
                var element = (0, dom_1.createElement)('div', {
                    id: 'anime',
                    attrs: { 'e-animate': 'true' }
                });
                animation_1.Animation.stop(element);
                expect(element.getAttribute('e-animate')).toBeNull();
            });
        });
    });
    /* Improved RippleEffect method specs */
    (0, animation_1.enableRipple)(false);
    var rippleEffectElement = (0, dom_1.createElement)('div', { id: 'ripple' });
    var rippleEffectFn = (0, animation_1.rippleEffect)(rippleEffectElement);
    describe('Ripple Effect # ', function () {
        describe('without enableRipple #', function () {
            var rippleEffectElement = (0, dom_1.createElement)('div', { id: 'ripple' });
            (0, animation_1.rippleEffect)(rippleEffectElement);
            beforeAll(function () {
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: rippleEffectElement });
            });
            it('test e-ripple attribute on ripple element', function () {
                expect(rippleEffectElement.getAttribute('data-ripple')).toEqual(null);
                expect(rippleEffectElement.getElementsByClassName('e-ripple-element').length).toEqual(0);
            });
        });
        describe('enable Ripple value is False #', function () {
            var rippleEffectElement = (0, dom_1.createElement)('div', { id: 'ripple' });
            (0, animation_1.enableRipple)(false);
            (0, animation_1.rippleEffect)(rippleEffectElement);
            beforeAll(function () {
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: rippleEffectElement });
            });
            it('test e-ripple attribute on ripple element', function () {
                expect(rippleEffectElement.getAttribute('data-ripple')).toEqual(null);
                expect(rippleEffectElement.getElementsByClassName('e-ripple-element').length).toEqual(0);
            });
        });
        describe('enable Ripple value is True # ', function () {
            (0, animation_1.enableRipple)(true);
            (0, animation_1.rippleEffect)(rippleEffectElement);
            beforeEach(function () {
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: rippleEffectElement });
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mouseleave', { target: rippleEffectElement });
            });
            it('test  e-ripple attribute on selector element', function () {
                expect(rippleEffectElement.getAttribute('data-ripple')).not.toEqual(null);
            });
        });
        describe('enable Ripple value is False and selector is Vaild Selector #', function () {
            var rippleEffectElement = (0, dom_1.createElement)('div', { id: '#ripple' });
            rippleEffectElement.appendChild((0, dom_1.createElement)('div', { className: 'apply', styles: 'width: 100px; height: 100px;' }));
            document.body.appendChild(rippleEffectElement);
            (0, animation_1.enableRipple)(false);
            (0, animation_1.rippleEffect)(rippleEffectElement, { selector: '.apply' });
            describe('check ripple effect on valid selector # ', function () {
                var apply = document.getElementsByClassName('apply')[0];
                beforeEach(function () {
                    event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: apply });
                });
                it('test e-ripple attribute on selector element', function () {
                    expect(apply.className.indexOf('e-ripple')).toEqual(-1);
                    expect(apply.getElementsByClassName('e-ripple-element').length).toEqual(0);
                });
            });
            afterAll(function () {
                document.body.removeChild(rippleEffectElement);
            });
        });
        describe('enable Ripple value is False and selector is In-Vaild Selector #', function () {
            var rippleEffectElement = (0, dom_1.createElement)('div', { id: '#ripple' });
            rippleEffectElement.appendChild((0, dom_1.createElement)('div', { className: 'ignore', styles: 'width: 100px; height: 100px;' }));
            document.body.appendChild(rippleEffectElement);
            (0, animation_1.enableRipple)(false);
            (0, animation_1.rippleEffect)(rippleEffectElement, { selector: '.apply' });
            describe('check ripple effect on invalid selector # ', function () {
                var ignore = document.getElementsByClassName('ignore')[0];
                beforeEach(function () {
                    event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: ignore });
                });
                it('test e-ripple attribute on selector element', function () {
                    expect(ignore.className.indexOf('e-ripple')).toEqual(-1);
                    expect(ignore.getElementsByClassName('e-ripple-element').length).toEqual(0);
                });
            });
            afterAll(function () {
                document.body.removeChild(rippleEffectElement);
            });
        });
        describe('enable Ripple value is True and selector is Vaild Selector #', function () {
            var rippleEffectElement = (0, dom_1.createElement)('div', { id: '#ripple' });
            rippleEffectElement.appendChild((0, dom_1.createElement)('div', { className: 'apply', styles: 'width: 100px; height: 100px;' }));
            document.body.appendChild(rippleEffectElement);
            (0, animation_1.enableRipple)(true);
            (0, animation_1.rippleEffect)(rippleEffectElement, { selector: '.apply' });
            describe('check ripple effect on valid selector # ', function () {
                var apply = document.getElementsByClassName('apply')[0];
                beforeEach(function () {
                    event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: apply });
                    event_handler_1.EventHandler.trigger(rippleEffectElement, 'mouseup', { target: apply });
                });
                it('test e-ripple attribute on selector element', function () {
                    expect(apply.className.indexOf('e-ripple')).not.toEqual(-1);
                    expect(apply.getElementsByClassName('e-ripple-element').length).not.toEqual(0);
                });
            });
            afterAll(function () {
                document.body.removeChild(rippleEffectElement);
            });
        });
        describe('enable Ripple value is True and selector is In-Vaild Selector #', function () {
            var rippleEffectElement1 = (0, dom_1.createElement)('div', { id: '#ripple' });
            rippleEffectElement1.appendChild((0, dom_1.createElement)('div', { className: 'ignore1', styles: 'width: 100px; height: 100px;' }));
            document.body.appendChild(rippleEffectElement1);
            describe('check ripple effect on invalid selector # ', function () {
                var ignore1 = document.getElementsByClassName('ignore1')[0];
                (0, animation_1.enableRipple)(true);
                var rippleEffectFn1 = (0, animation_1.rippleEffect)(rippleEffectElement1, { selector: '.apply' });
                beforeEach(function () {
                    rippleEffectFn1();
                    event_handler_1.EventHandler.trigger(rippleEffectElement1, 'mousedown', { target: ignore1 });
                });
                it('test e-ripple attribute on selector element', function () {
                    expect(ignore1.className.indexOf('e-ripple')).toEqual(-1);
                    expect(ignore1.getElementsByClassName('e-ripple-element').length).toEqual(0);
                });
            });
            afterAll(function () {
                document.body.removeChild(rippleEffectElement1);
            });
        });
        describe('enable Ripple value is False and selector is Vaild Selector  and Ripple flag True#', function () {
            var rippleEffectElement = (0, dom_1.createElement)('div', { id: '#ripple' });
            rippleEffectElement.appendChild((0, dom_1.createElement)('div', { className: 'apply', styles: 'width: 100px; height: 100px;' }));
            document.body.appendChild(rippleEffectElement);
            (0, animation_1.enableRipple)(false);
            (0, animation_1.rippleEffect)(rippleEffectElement, { selector: '.apply', rippleFlag: true });
            describe('check ripple effect on valid selector # ', function () {
                var apply = document.getElementsByClassName('apply')[0];
                beforeEach(function () {
                    event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: apply });
                    event_handler_1.EventHandler.trigger(rippleEffectElement, 'mouseup', { target: apply });
                });
                it('test e-ripple attribute on selector element', function () {
                    expect(apply.className.indexOf('e-ripple')).not.toEqual(-1);
                    expect(apply.getElementsByClassName('e-ripple-element').length).not.toEqual(0);
                });
            });
            afterAll(function () {
                document.body.removeChild(rippleEffectElement);
            });
        });
        describe('enable Ripple value is False and selector is Vaild Selector  and Ripple flag false #', function () {
            var rippleEffectElement = (0, dom_1.createElement)('div', { id: '#ripple' });
            rippleEffectElement.appendChild((0, dom_1.createElement)('div', { className: 'apply1', styles: 'width: 100px; height: 100px;' }));
            document.body.appendChild(rippleEffectElement);
            (0, animation_1.enableRipple)(false);
            (0, animation_1.rippleEffect)(rippleEffectElement, { selector: '.apply1', rippleFlag: false });
            describe('check ripple effect on valid selector # ', function () {
                var apply1 = document.getElementsByClassName('apply1')[0];
                beforeEach(function () {
                    event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: apply1 });
                });
                it('test e-ripple attribute on selector element', function () {
                    expect(apply1.className.indexOf('e-ripple')).toEqual(-1);
                    expect(apply1.getElementsByClassName('e-ripple-element').length).toEqual(0);
                });
            });
        });
        describe('enable Ripple value is False and selector is inVaild Selector  and Ripple flag true #', function () {
            var rippleEffectElement = (0, dom_1.createElement)('div', { id: '#ripple' });
            rippleEffectElement.appendChild((0, dom_1.createElement)('div', { className: 'ignore2', styles: 'width: 100px; height: 100px;' }));
            document.body.appendChild(rippleEffectElement);
            (0, animation_1.enableRipple)(false);
            var rippleEffectFn1 = (0, animation_1.rippleEffect)(rippleEffectElement, { selector: '.apply1', rippleFlag: true });
            describe('check ripple effect on invalid selector # ', function () {
                var ignore2 = document.getElementsByClassName('ignore2')[0];
                beforeEach(function () {
                    rippleEffectFn1();
                    event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: ignore2 });
                });
                it('test e-ripple attribute on selector element', function () {
                    expect(ignore2.className.indexOf('e-ripple')).toEqual(-1);
                    expect(ignore2.getElementsByClassName('e-ripple-element').length).toEqual(0);
                });
            });
            afterAll(function () {
                document.body.removeChild(rippleEffectElement);
            });
        });
        describe('enable Ripple value is False and selector is inVaild Selector  and Ripple flag false #', function () {
            var rippleEffectElement = (0, dom_1.createElement)('div', { id: '#ripple' });
            document.body.appendChild(rippleEffectElement);
            rippleEffectElement.appendChild((0, dom_1.createElement)('div', { className: 'ignore3', styles: 'width: 100px; height: 100px;' }));
            (0, animation_1.enableRipple)(false);
            (0, animation_1.rippleEffect)(rippleEffectElement, { selector: '.apply', rippleFlag: false });
            describe('check ripple effect on invalid selector # ', function () {
                var ignore3 = document.getElementsByClassName('ignore3')[0];
                beforeEach(function () {
                    event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: ignore3 });
                });
                it('test e-ripple attribute on selector element', function () {
                    expect(ignore3.className.indexOf('e-ripple')).toEqual(-1);
                    expect(ignore3.getElementsByClassName('e-ripple-element').length).toEqual(0);
                });
            });
            afterAll(function () {
                document.body.removeChild(rippleEffectElement);
            });
        });
        describe('enable Ripple value is true and selector is Vaild Selector  and Ripple flag True#', function () {
            var rippleEffectElement = (0, dom_1.createElement)('div', { id: '#ripple' });
            rippleEffectElement.appendChild((0, dom_1.createElement)('div', { className: 'apply', styles: 'width: 100px; height: 100px;' }));
            document.body.appendChild(rippleEffectElement);
            (0, animation_1.enableRipple)(true);
            (0, animation_1.rippleEffect)(rippleEffectElement, { selector: '.apply', rippleFlag: true });
            describe('check ripple effect on valid selector # ', function () {
                var apply = document.getElementsByClassName('apply')[0];
                beforeEach(function () {
                    event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: apply });
                    event_handler_1.EventHandler.trigger(rippleEffectElement, 'mouseup', { target: apply });
                });
                it('test e-ripple attribute on selector element', function () {
                    expect(apply.className.indexOf('e-ripple')).not.toEqual(-1);
                    expect(apply.getElementsByClassName('e-ripple-element').length).not.toEqual(0);
                });
            });
            afterAll(function () {
                document.body.removeChild(rippleEffectElement);
            });
        });
        describe('enable Ripple value is true and selector is Vaild Selector  and Ripple flag false #', function () {
            var rippleEffectElement = (0, dom_1.createElement)('div', { id: '#ripple' });
            rippleEffectElement.appendChild((0, dom_1.createElement)('div', { className: 'apply2', styles: 'width: 100px; height: 100px;' }));
            document.body.appendChild(rippleEffectElement);
            (0, animation_1.enableRipple)(true);
            (0, animation_1.rippleEffect)(rippleEffectElement, { selector: '.apply2', rippleFlag: false });
            describe('check ripple effect on valid selector # ', function () {
                var apply2 = document.getElementsByClassName('apply2')[0];
                beforeEach(function () {
                    event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: apply2 });
                });
                it('test e-ripple attribute on selector element', function () {
                    expect(apply2.className.indexOf('e-ripple')).toEqual(-1);
                    expect(apply2.getElementsByClassName('e-ripple-element').length).toEqual(0);
                });
            });
            afterAll(function () {
                document.body.removeChild(rippleEffectElement);
            });
        });
        describe('enable Ripple value is true and selector is inVaild Selector  and Ripple flag true #', function () {
            var rippleEffectElement = (0, dom_1.createElement)('div', { id: '#ripple' });
            rippleEffectElement.appendChild((0, dom_1.createElement)('div', { className: 'ignore6', styles: 'width: 100px; height: 100px;' }));
            document.body.appendChild(rippleEffectElement);
            (0, animation_1.enableRipple)(true);
            var rippleEffectFn1 = (0, animation_1.rippleEffect)(rippleEffectElement, { selector: '.apply', rippleFlag: true });
            describe('check ripple effect on invalid selector # ', function () {
                var ignore6 = document.getElementsByClassName('ignore6')[0];
                beforeEach(function () {
                    rippleEffectFn1();
                    event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: ignore6 });
                });
                it('test e-ripple attribute on selector element', function () {
                    expect(ignore6.className.indexOf('e-ripple')).toEqual(-1);
                    expect(ignore6.getElementsByClassName('e-ripple-element').length).toEqual(0);
                });
            });
            afterAll(function () {
                document.body.removeChild(rippleEffectElement);
            });
        });
        describe('enable Ripple value is true and selector is inVaild Selector  and Ripple flag false #', function () {
            var rippleEffectElement = (0, dom_1.createElement)('div', { id: '#ripple' });
            rippleEffectElement.appendChild((0, dom_1.createElement)('div', { className: 'ignore5', styles: 'width: 100px; height: 100px;' }));
            document.body.appendChild(rippleEffectElement);
            (0, animation_1.enableRipple)(true);
            (0, animation_1.rippleEffect)(rippleEffectElement, { selector: '.apply', rippleFlag: false });
            describe('check ripple effect on invalid selector # ', function () {
                var ignore5 = document.getElementsByClassName('ignore5')[0];
                beforeEach(function () {
                    event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: ignore5 });
                });
                it('test e-ripple attribute on selector element', function () {
                    expect(ignore5.className.indexOf('e-ripple')).toEqual(-1);
                    expect(ignore5.getElementsByClassName('e-ripple-element').length).toEqual(0);
                });
            });
            afterAll(function () {
                document.body.removeChild(rippleEffectElement);
            });
        });
        describe('enable Ripple value is true and selector is Null  and Ripple flag true #', function () {
            var rippleEffectElement = (0, dom_1.createElement)('div', { id: '#ripple' });
            (0, animation_1.enableRipple)(true);
            (0, animation_1.rippleEffect)(rippleEffectElement, { rippleFlag: true });
            beforeEach(function () {
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: rippleEffectElement });
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mouseleave', { target: rippleEffectElement });
            });
            it('test  e-ripple attribute on selector element ', function () {
                expect(rippleEffectElement.getAttribute('data-ripple')).not.toEqual(null);
            });
        });
        describe('enable Ripple value is false  and selector is Null  and Ripple flag false #', function () {
            var rippleEffectElement = (0, dom_1.createElement)('div', { id: '#ripple' });
            (0, animation_1.enableRipple)(false);
            (0, animation_1.rippleEffect)(rippleEffectElement, { rippleFlag: false });
            beforeEach(function () {
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: rippleEffectElement });
            });
            it('test  e-ripple attribute on selector element ', function () {
                expect(rippleEffectElement.getAttribute('data-ripple')).toEqual(null);
                expect(rippleEffectElement.getElementsByClassName('e-ripple-element').length).toEqual(0);
            });
        });
        describe('enable Ripple value is false and selector is Null  and Ripple flag true #', function () {
            var rippleEffectElement = (0, dom_1.createElement)('div', { id: '#ripple' });
            (0, animation_1.enableRipple)(false);
            (0, animation_1.rippleEffect)(rippleEffectElement, { rippleFlag: true });
            beforeEach(function () {
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: rippleEffectElement });
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mouseleave', { target: rippleEffectElement });
            });
            it('test  e-ripple attribute on selector element ', function () {
                expect(rippleEffectElement.getAttribute('data-ripple')).not.toEqual(null);
            });
        });
        describe('enable Ripple value is true  and selector is Null  and Ripple flag false #', function () {
            var rippleEffectElement = (0, dom_1.createElement)('div', { id: '#ripple' });
            (0, animation_1.enableRipple)(true);
            (0, animation_1.rippleEffect)(rippleEffectElement, { rippleFlag: false });
            beforeEach(function () {
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: rippleEffectElement });
            });
            it('test  e-ripple attribute on selector element ', function () {
                expect(rippleEffectElement.getAttribute('data-ripple')).toEqual(null);
                expect(rippleEffectElement.getElementsByClassName('e-ripple-element').length).toEqual(0);
            });
        });
        describe('check ripple animation # ', function () {
            beforeAll(function () {
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: rippleEffectElement });
            });
            it('test e-ripple attribute on ripple element', function () {
                expect(rippleEffectElement.getAttribute('data-ripple')).not.toEqual(null);
                expect(rippleEffectElement.getElementsByClassName('e-ripple-element').length).not.toEqual(0);
            });
        });
        describe('check ripple animation with multiple mousedown # ', function () {
            beforeAll(function () {
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: rippleEffectElement });
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mouseup', { target: rippleEffectElement });
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: rippleEffectElement });
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mouseup', { target: rippleEffectElement });
            });
            it('test e-ripple attribute on ripple element', function () {
                expect(rippleEffectElement.getAttribute('data-ripple')).not.toEqual(null);
            });
        });
        describe('check ripple effect after destroy # ', function () {
            var rippleEffectElement1 = (0, dom_1.createElement)('div');
            var rippleEffectFn1 = (0, animation_1.rippleEffect)(rippleEffectElement1);
            beforeAll(function (done) {
                event_handler_1.EventHandler.trigger(rippleEffectElement1, 'mousedown', { target: rippleEffectElement1 });
                event_handler_1.EventHandler.trigger(rippleEffectElement1, 'mouseup', { target: rippleEffectElement1 });
                setTimeout(function () {
                    rippleEffectFn1();
                    done();
                }, 500);
            });
            it('test e-ripple attribute on ripple element', function () {
                expect(rippleEffectElement1.getAttribute('data-ripple')).toEqual(null);
                expect(rippleEffectElement1.getElementsByClassName('e-ripple-element').length).toEqual(0);
            });
        });
        describe('test ripple effect on edge browser', function () {
            var rippleEffectElement2 = (0, dom_1.createElement)('div', { id: 'ripple' });
            var rippleEffectFn2 = (0, animation_1.rippleEffect)(rippleEffectElement);
            var apply = document.getElementsByClassName('ignore')[0];
            beforeAll(function () {
                browser_1.Browser.userAgent = edgeUa;
                event_handler_1.EventHandler.trigger(rippleEffectElement2, 'touchmove', { target: rippleEffectElement2 });
            });
            it('test e-ripple attribute on ripple element', function (done) {
                setTimeout(function () {
                    expect(rippleEffectElement2.className.indexOf('e-ripple')).toEqual(-1);
                    expect(apply.getElementsByClassName('e-ripple-element').length).toEqual(0);
                    done();
                }, 400);
            });
            afterAll(function () {
                document.body.removeChild(rippleEffectElement2);
            });
        });
        describe('ripple effect with ignore option', function () {
            var rippleEffectElement = (0, dom_1.createElement)('div', { id: 'rippleEffect' });
            var rippleEffectFn = (0, animation_1.rippleEffect)(rippleEffectElement, { ignore: '.ignoreEffect' });
            rippleEffectElement.appendChild((0, dom_1.createElement)('div', { className: 'ignoreEffect', styles: 'width: 100px; height: 100px;' }));
            document.body.appendChild(rippleEffectElement);
            var ignore = document.getElementsByClassName('ignoreEffect')[0];
            beforeAll(function () {
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: ignore });
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mouseup', { target: ignore });
            });
            it('test ripple effect on ignoreed element', function () {
                expect(ignore.className.indexOf('e-ripple')).toEqual(-1);
                expect(ignore.getElementsByClassName('e-ripple-element').length).toEqual(0);
            });
            afterAll(function () {
                document.body.removeChild(rippleEffectElement);
            });
        });
        describe('ripple effect with center ripple option', function () {
            var rippleEffectElement = (0, dom_1.createElement)('div', { id: 'rippleEffect' });
            var rippleEffectFn = (0, animation_1.rippleEffect)(rippleEffectElement, { isCenterRipple: true });
            document.body.appendChild(rippleEffectElement);
            beforeAll(function () {
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: rippleEffectElement });
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mouseup', { target: rippleEffectElement });
            });
            it('test ripple effect on ignoreed element', function () {
                expect(rippleEffectElement.className.indexOf('e-ripple')).not.toEqual(-1);
                expect(rippleEffectElement.getElementsByClassName('e-ripple-element').length).not.toEqual(0);
            });
            afterAll(function () {
                document.body.removeChild(rippleEffectElement);
            });
        });
        describe('ripple effect with ripple duration option', function () {
            var rippleEffectElement = (0, dom_1.createElement)('div', { id: 'rippleEffect' });
            var rippleEffectFn = (0, animation_1.rippleEffect)(rippleEffectElement, { duration: 100 });
            document.body.appendChild(rippleEffectElement);
            beforeAll(function () {
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: rippleEffectElement });
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mouseup', { target: rippleEffectElement });
            });
            it('test ripple effect on ignoreed element', function () {
                expect(rippleEffectElement.className.indexOf('e-ripple')).not.toEqual(-1);
                expect(rippleEffectElement.getElementsByClassName('e-ripple-element').length).not.toEqual(0);
            });
            afterAll(function () {
                document.body.removeChild(rippleEffectElement);
            });
        });
        describe('ripple effect with ripple callback option', function () {
            var eventArgs = null;
            var rippleEffectElement = (0, dom_1.createElement)('div', { id: 'rippleEffect' });
            (0, animation_1.rippleEffect)(rippleEffectElement, { duration: 100 }, function (e) {
                eventArgs = e;
            });
            document.body.appendChild(rippleEffectElement);
            beforeAll(function () {
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mousedown', { target: rippleEffectElement });
                event_handler_1.EventHandler.trigger(rippleEffectElement, 'mouseup', { target: rippleEffectElement });
            });
            it('test ripple effect on ignoreed element', function (done) {
                setTimeout(function () {
                    expect(eventArgs).not.toEqual(null);
                    done();
                }, 100);
            });
            afterAll(function () {
                document.body.removeChild(rippleEffectElement);
            });
        });
        afterAll(function () {
            document.body.removeChild(rippleEffectElement);
        });
    });
});
//# sourceMappingURL=animation.spec.js.map