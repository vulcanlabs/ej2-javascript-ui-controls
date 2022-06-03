define(["require", "exports", "../src/sanitize-helper", "../src/dom"], function (require, exports, sanitize_helper_1, dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Sanitize Html Helper', function () {
        var SanitizeInstance = new sanitize_helper_1.SanitizeHtmlHelper();
        var innerHTML = "<div>\n    <div id=\"inline-event\" onmouseover='javascript:alert(1)'></div>\n    <script>alert('hi')</script>\n    <style> </style>\n    <img src=\"javascript:alert('XSS Image');\"/>\n    <iframe src=\"http://evil.com/xss.html\"></iframe>\n    <input type=\"image\" src=\"javascript:alert('XSS Image');\"/>\n    <link rel=\"stylesheet\" href=\"javascript:alert('XSS CSS');\"/>\n    <div id=\"background\" style=\"background-image: url(javascript:alert('XSS Background'))\">BackGround Image</div>\n    <div id=\"expression\" style=\"width: expression(alert('XSS'));\">Expression</div>\n    <object type=\"text/x-scriptlet\" data=\"http://hacker.com/xss.html\">\n    </object>\n    </div>\n    ";
        var noCode = "There is no XSS code to attack";
        describe('XSS Attack Code while component initial rendering : ', function () {
            var value = sanitize_helper_1.SanitizeHtmlHelper.sanitize(innerHTML);
            var htmlObject = document.createElement('div');
            htmlObject.innerHTML = value;
            it('check the script element', function () {
                expect(htmlObject.querySelectorAll('script').length).toBe(0);
            });
            it('check the style element', function () {
                expect(htmlObject.querySelectorAll('style').length).toBe(0);
            });
            it('check the iframe element while src set as wrong', function () {
                expect(htmlObject.querySelectorAll('iframe').length).toBe(0);
            });
            it('check the image element while src set as wrong', function () {
                expect(htmlObject.querySelectorAll('img').length).toBe(0);
            });
            it('check the link element while href set as wrong', function () {
                expect(htmlObject.querySelectorAll('link').length).toBe(0);
            });
            it('check the object element while attribute set as type="text/x-scriptlet"', function () {
                expect(htmlObject.querySelectorAll('object').length).toBe(0);
            });
            it('check the input element while set the type="image" and srce as wrong', function () {
                expect(htmlObject.querySelectorAll('input').length).toBe(0);
            });
            it('check the div element attribute while background image style set as wrong', function () {
                expect(htmlObject.querySelector('#background').hasAttribute('style')).toBe(false);
                expect(htmlObject.querySelector('#expression').hasAttribute('style')).toBe(false);
            });
            it('check the div element attribute while inline event bind', function () {
                expect(htmlObject.querySelector('#inline-event').hasAttribute('onmouseover')).toBe(false);
            });
            afterAll(function () {
                (0, dom_1.detach)(htmlObject);
            });
        });
        describe('XSS Attack with no Code  : ', function () {
            var newValue = sanitize_helper_1.SanitizeHtmlHelper.sanitize(noCode);
            var htmlObject = document.createElement('div');
            htmlObject.innerHTML = newValue;
            it('check the script element', function () {
                expect(htmlObject.querySelectorAll('script').length).toBe(0);
            });
            it('check the style element', function () {
                expect(htmlObject.querySelectorAll('style').length).toBe(0);
            });
            it('check the iframe element while src set as wrong', function () {
                expect(htmlObject.querySelectorAll('iframe').length).toBe(0);
            });
            it('check the image element while src set as wrong', function () {
                expect(htmlObject.querySelectorAll('img').length).toBe(0);
            });
            it('check the link element while href set as wrong', function () {
                expect(htmlObject.querySelectorAll('link').length).toBe(0);
            });
            it('check the object element while attribute set as type="text/x-scriptlet"', function () {
                expect(htmlObject.querySelectorAll('object').length).toBe(0);
            });
            it('check the input element while set the type="image" and srce as wrong', function () {
                expect(htmlObject.querySelectorAll('input').length).toBe(0);
            });
            afterAll(function () {
                (0, dom_1.detach)(htmlObject);
            });
        });
    });
});
//# sourceMappingURL=santize-helper.spec.js.map