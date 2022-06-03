define(["require", "exports", "../../src/intl/number-parser", "../../src/intl/number-formatter", "../../src/internationalization", "../../src/util", "../../src/intl/intl-base"], function (require, exports, number_parser_1, number_formatter_1, internationalization_1, util_1, intl_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var nCultures = ['en', 'ar-QA', 'ja'];
    var str = ['P', 'N', 'C', 'A'];
    var strMatcher = { P: 'percent', N: 'decimal', C: 'currency' };
    function getParsedNumber(culture, option, d) {
        var fString = getNumberString(culture, option, d);
        var val = number_parser_1.NumberParser.numberParser(culture, option, internationalization_1.cldrData)(fString);
        return val;
    }
    function getNumberString(culture, option, d) {
        var curCode = { 'en': 'USD', 'ar-QA': 'QAR', 'ja': 'JPY' };
        var ioption = (0, util_1.extend)({}, option, { currency: curCode[culture] });
        var val = number_formatter_1.NumberFormat.numberFormatter(culture, ioption, internationalization_1.cldrData)(d);
        return val;
    }
    /**
     * Spec for number parser
     */
    var type;
    var isja;
    var numParser = new number_parser_1.NumberParser();
    var intValue = 1243141241;
    var decValue = 99312.34;
    var decValue1 = 99312.3;
    describe('numberParser', function () {
        var _loop_1 = function (cul) {
            var _loop_2 = function (s) {
                type = strMatcher[s];
                describe('Parse ' + type + ' type value in culture- ' + cul, function () {
                    it('check integer value without decimal points', function () {
                        var result = getParsedNumber(cul, { format: s }, intValue);
                        expect(result).toBe(intValue);
                    });
                    it('check integer value without decimal points negative Number', function () {
                        var result = getParsedNumber(cul, { format: s }, -intValue);
                        expect(result).toBe(-intValue);
                    });
                    it('check decimal value', function () {
                        var result = getParsedNumber(cul, { format: s }, decValue);
                        expect(result).toBe(decValue);
                    });
                    it('check decimal value with negative Number', function () {
                        var result = getParsedNumber(cul, { format: s }, -decValue);
                        expect(result).toBe(-decValue);
                    });
                });
            };
            for (var _a = 0, str_1 = str; _a < str_1.length; _a++) {
                var s = str_1[_a];
                _loop_2(s);
            }
            describe('Parse for custom number formatting in culture: ' + cul, function () {
                it('integer without decimal', function () {
                    var result = getParsedNumber(cul, { format: '###,0' }, intValue);
                    expect(result).toBe(intValue);
                });
                it('decimal value with two decimal places', function () {
                    var result = getParsedNumber(cul, { format: '0.##' }, decValue);
                    expect(result).toBe(decValue);
                });
                it('decimal value with one decimal place', function () {
                    var result = getParsedNumber(cul, { format: '##0.#' }, decValue);
                    expect(result).toBe(decValue1);
                });
                it('percent type integer value', function () {
                    var result = getParsedNumber(cul, { format: '### %' }, intValue);
                    expect(result).toBe(intValue);
                });
                it('percent symbol in string not type percent', function () {
                    var result = getParsedNumber(cul, { format: '### \'%\' ' }, intValue);
                    expect(result).toBe(intValue);
                });
                it('minus sign in string but not negative value', function () {
                    var result = getParsedNumber(cul, { format: ' \'-\'##0 ' }, intValue);
                    expect(result).toBe(intValue);
                });
                it('negative integer value', function () {
                    var result = getParsedNumber(cul, { format: '###' }, -intValue);
                    expect(result).toBe(-intValue);
                });
                it('percent in negative format', function () {
                    var result = getParsedNumber(cul, { format: '###;###%' }, -intValue);
                    expect(result).toBe(-intValue);
                });
                it('percent in positive format', function () {
                    var result = getParsedNumber(cul, { format: '##%;##' }, -intValue);
                    expect(result).toBe(-intValue);
                });
                it('percent in positive format', function () {
                    var result = getParsedNumber(cul, { format: '##%;##' }, intValue);
                    expect(result).toBe(intValue);
                });
                it('fraction value one decimal place in negative value', function () {
                    var result = getParsedNumber(cul, { format: '##.#%;##.#' }, -decValue);
                    expect(result).toBe(-decValue1);
                });
                it('currency value', function () {
                    var result = getParsedNumber(cul, { format: '$ ###' }, intValue);
                    expect(result).toBe(intValue);
                });
                it('', function () {
                    var result = getParsedNumber(cul, { format: '$#.#' }, decValue);
                    expect(result).toBe(decValue1);
                });
            });
        };
        for (var _i = 0, nCultures_1 = nCultures; _i < nCultures_1.length; _i++) {
            var cul = nCultures_1[_i];
            _loop_1(cul);
        }
        describe('Accounting type parsing', function () {
            it('negative number  accounting type for culture en', function () {
                var result = getParsedNumber('en', { format: 'A' }, -231231.22);
                expect(result).toBe(-231231.22);
            });
            it('negative number accounting type for culture ar-QA ', function () {
                var result = getParsedNumber('ar-QA', { format: 'A' }, -1231231.54);
                expect(result).toBe(-1231231.54);
            });
            it('positive number accounting type', function () {
                var result = getParsedNumber('en', { format: 'A' }, 231231.22);
                expect(result).toBe(231231.22);
            });
        });
        describe('Empty skeleton format converts to default format', function () {
            it('', function () {
                var result = getParsedNumber('en', { format: '' }, 231231);
                expect(result).toBe(231231);
            });
        });
        describe('Invalid skeleton format throws error', function () {
            it('', function () {
                expect(function () { number_parser_1.NumberParser.numberParser('en', { format: 'D' }, internationalization_1.cldrData); }).toBeUndefined;
            });
        });
        describe('Invalid number return NaN', function () {
            it('', function () {
                var result = number_parser_1.NumberParser.numberParser('en', { format: 'N' }, internationalization_1.cldrData)('123,34.22.22');
                expect(result).toBeNaN();
            });
        });
        describe('Numeric value given with decimal points parsed properly', function () {
            it('', function () {
                var result = number_parser_1.NumberParser.numberParser('en', { format: 'N' }, internationalization_1.cldrData)('.22');
                expect(result).toBe(0.22);
            });
        });
        describe('Infinity value parsing returns null', function () {
            it('', function () {
                var result = number_parser_1.NumberParser.numberParser('en', { format: 'N' }, internationalization_1.cldrData)('∞');
                expect(result).toBe(Infinity);
            });
        });
        describe('fraction values parsing', function () {
            it('skeleton "N3"', function () {
                var result = number_parser_1.NumberParser.numberParser('en', { format: 'N3' }, internationalization_1.cldrData)('123.12345');
                expect(result).toBe(123.123);
            });
            it('skeleton "P2"', function () {
                var result = number_parser_1.NumberParser.numberParser('en', { format: 'P2' }, internationalization_1.cldrData)('2671.6789');
                expect(result).toBe(26.72);
            });
        });
        describe('exponential  value parsing', function () {
            it('with "e" prefix ', function () {
                var result = number_parser_1.NumberParser.numberParser('en', { format: 'N' }, internationalization_1.cldrData)('2.443433247197184e+34');
                expect(result).toBe(2.443433247197184e+34);
            });
            it('with "E" prefix ', function () {
                var result = number_parser_1.NumberParser.numberParser('en', { format: 'P2' }, internationalization_1.cldrData)('2.443433247197184E+34');
                expect(result).toBe(2.443433247197184e+32);
            });
        });
        describe('get Number Format function', function () {
            it('default', function () {
                var result = intl_base_1.IntlBase.getActualNumberFormat('en', {});
                expect(result).toBe('###0');
            });
            it('N format', function () {
                var result = intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'N' });
                expect(result).toBe('###0');
            });
            it('N format group', function () {
                var result = intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'N', useGrouping: true });
                expect(result).toBe('###,##0');
            });
            it('N format minInt 3', function () {
                var result = intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'N', minimumIntegerDigits: 3, useGrouping: true });
                expect(result).toBe('000');
            });
            it('N2 format', function () {
                var result = intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'N2' });
                expect(result).toBe('###0.00');
            });
            it('N2 format minInt 4 useGroup', function () {
                var result = intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'N2', minimumIntegerDigits: 4, useGrouping: true });
                expect(result).toBe('##0,000.00');
            });
            it('N3 format', function () {
                var result = intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'N3' });
                expect(result).toBe('###0.000');
            });
            it('N format Maximum Fraction 5', function () {
                var result = intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'N', minimumFractionDigits: 2, maximumFractionDigits: 5 });
                expect(result).toBe('###0.00###');
            });
            it('N format minFraction 3', function () {
                var result = intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'N', minimumFractionDigits: 3 });
                expect(result).toBe('###0.000');
            });
            it('N format minInt 7 grouping', function () {
                var result = intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'N', minimumIntegerDigits: 7, useGrouping: true });
                expect(result).toBe('##0,000,000');
            });
            it('N1 format max fraction 3', function () {
                expect(intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'N1', maximumFractionDigits: 3 })).toBe('###0.0');
            });
            it('N format max frac 4', function () {
                expect(intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'N', maximumFractionDigits: 4 })).toBe('###0.####');
            });
            it('N4 format', function () {
                var result = intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'N4' });
                expect(result).toBe('###0.0000');
            });
            it('C format', function () {
                expect(intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'C' })).toBe('$###0.00');
            });
            it('C2 format', function () {
                var result = intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'C2', currency: 'USD' }, internationalization_1.cldrData);
                expect(result).toBe('$###0.00');
            });
            it('C2 format with de culture', function () {
                var result = intl_base_1.IntlBase.getActualNumberFormat('de', { format: 'C2', currency: 'USD' }, internationalization_1.cldrData);
                expect(result).toBe('###0,00 $');
            });
            it('C2 format with de culture and EUR code', function () {
                var result = intl_base_1.IntlBase.getActualNumberFormat('de', { format: 'C2', currency: 'EUR' }, internationalization_1.cldrData);
                expect(result).toBe('###0,00 €');
            });
            it('C2 format currency $', function () {
                var result = intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'C2', currency: '$' });
                expect(result).toBe('$###0.00');
            });
            it('C2 format max fraction 4', function () {
                expect(intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'C2', maximumFractionDigits: 4 })).toBe('$###0.00');
            });
            it('P2 format', function () {
                var result = intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'P2' });
                expect(result).toBe('###0.00 %');
            });
            it('P3 format', function () {
                var result = intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'P3' });
                expect(result).toBe('###0.000 %');
            });
            it('P3 format minInt 5 grouping', function () {
                var result = intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'P3', minimumIntegerDigits: 5, useGrouping: true });
                var r = number_formatter_1.NumberFormat.numberFormatter('en', { format: 'C' }, internationalization_1.cldrData)(0);
                expect(result).toBe('#00,000.000 %');
            });
            it('A format', function () {
                expect(intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'A' })).toBe('$###0.00;($###0.00)');
            });
            it('A1 format', function () {
                expect(intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'A1' })).toBe('$###0.0;($###0.0)');
            });
            it('A1 format max fraction 4', function () {
                expect(intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'A1', maximumFractionDigits: 4 })).toBe('$###0.0;($###0.0)');
            });
            it('A3 format', function () {
                var result = intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'A3' });
                expect(result).toBe('$###0.000;($###0.000)');
            });
            it('A5 format', function () {
                var result = intl_base_1.IntlBase.getActualNumberFormat('en', { format: 'A5' });
                expect(result).toBe('$###0.00000;($###0.00000)');
            });
            it('custom format \'Hi\'###.0#', function () {
                var result = intl_base_1.IntlBase.getActualNumberFormat('en', { format: '\'Hi\' ###.0#' });
                expect(result).toBe('"Hi" ###.0#');
            });
        });
    });
});
//# sourceMappingURL=number-parser.spec.js.map