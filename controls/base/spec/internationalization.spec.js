define(["require", "exports", "../src/internationalization", "./intl/date-parser.spec", "./intl/date-formatter.spec", "../src/intl/intl-base", "../src/util"], function (require, exports, internationalization_1, date_parser_spec_1, date_formatter_spec_1, intl_base_1, util_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Internationalization', function () {
        beforeAll(function () {
            (0, internationalization_1.setCulture)('en-US');
        });
        describe('Date Fromatting without local culture set', function () {
            var dateIntl = new internationalization_1.Internationalization();
            var date = new Date('11/17/2016');
            it('datefromatting using the getdateFormat', function () {
                var dateformatter = dateIntl.getDateFormat({ skeleton: 'long', type: 'date' });
                expect(dateformatter(date)).toBe('November 17, 2016');
            });
            it('Internationalization with isalmaic calendar formatting', function () {
                var tIntl = new internationalization_1.Internationalization('en');
                var iFormatter = tIntl.formatDate(new Date('1/1/2015'), { skeleton: 'short', calendar: 'islamic' });
                expect(iFormatter).toBe('3/10/1436 AH');
            });
            it('datefromatting using the formatDate', function () {
                var result = dateIntl.formatDate(date, { skeleton: 'Gy' });
                expect(result).toBe('2016 AD');
            });
            it('datefromatting using the formatDate with no options', function () {
                dateIntl.formatDate(new Date(), { format: 'WW' });
                var result = dateIntl.formatDate(date);
                expect(result).toBe('11/17/16');
            });
            it('dateformatter by changing culture using "setCulture" methos', function () {
                (0, internationalization_1.setCulture)('ja');
                var result = dateIntl.formatDate(date, { skeleton: 'yMMMEd' });
                expect(result).toBe('2016年11月17日(木)');
            });
            afterAll(function () {
                (0, internationalization_1.setCulture)('en-US');
            });
        });
        describe('Blazor Date Fromatting', function () {
            beforeAll(function () {
                (0, util_1.enableBlazorMode)();
                (0, internationalization_1.setCulture)('en-US');
            });
            var intl = new internationalization_1.Internationalization();
            var date = new Date('11/17/2016');
            it('short date', function () {
                expect(intl.getDatePattern({ format: 'd', type: 'date', isServerRendered: true })).toBe('M/d/y');
            });
            it('long date', function () {
                expect(intl.getDatePattern({ format: 'D', type: 'date', isServerRendered: true })).toBe('EEEE, MMMM d, y');
            });
            it('short time', function () {
                expect(intl.getDatePattern({ format: 't', type: 'time', isServerRendered: true })).toBe('h:mm a');
            });
            it('long time', function () {
                expect(intl.getDatePattern({ skeleton: 'T', type: 'time', isServerRendered: true }, true)).
                    toBe('h:m:s AM/PM');
            });
            it('short dateTime', function () {
                expect(intl.getDatePattern({ skeleton: 'g', type: 'dateTime', isServerRendered: true }, true)).toBe('m/d/yyyy h:mm AM/PM');
            });
            it('medium dateTime', function () {
                expect(intl.getDatePattern({ skeleton: 'f', type: 'dateTime', isServerRendered: true }, true)).toBe('dddd, mmmm d, yyyy h:mm AM/PM');
            });
            it('long dateTime', function () {
                expect(intl.getDatePattern({ format: 'F', type: 'dateTime', isServerRendered: true }, true)).
                    toBe('dddd, mmmm d, yyyy h:mm:s AM/PM');
            });
            it('datefromatting using the getdateFormat: D', function () {
                var dateformatter = intl.getDateFormat({ format: 'D', type: 'date', isServerRendered: true });
                expect(dateformatter(date)).toBe('Thursday, November 17, 2016');
            });
            it('datefromatting using the getdateFormat: d', function () {
                var dateformatter = intl.getDateFormat({ format: 'd', isServerRendered: true });
                expect(dateformatter(date)).toBe('11/17/2016');
            });
            it('datefromatting using the getdateFormat: f', function () {
                var dateformatter = intl.getDateFormat({ format: 'f', isServerRendered: true });
                expect(dateformatter(date)).toBe('Thursday, November 17, 2016 12:00 AM');
            });
            // it('datefromatting using the getdateFormat: F', () => {
            //    let dateformatter: Function = intl.getDateFormat({ format: 'F', isServerRendered:true });
            //    expect(dateformatter(date)).toBe('November 17, 2016 at 12:00:00 AM GMT+5');
            // });
            it('datefromatting using the getdateFormat: g', function () {
                var dateformatter = intl.getDateFormat({ format: 'g', isServerRendered: true });
                expect(dateformatter(date)).toBe('11/17/2016 12:00 AM');
            });
            it('datefromatting using the getdateFormat: t', function () {
                var dateformatter = intl.getDateFormat({ format: 't', isServerRendered: true });
                expect(dateformatter(date)).toBe('12:00 AM');
            });
            it('datefromatting using the getdateFormat: t', function () {
                var dateformatter = intl.getDateParser({ format: 'd', isServerRendered: true });
                var output = dateformatter('12/11/2019');
                expect(output.getDate()).toBe(11);
            });
            it('check invalid culture returns default date format value', function () {
                expect(intl_base_1.IntlBase.compareBlazorDateFormats({ skeleton: 'd' }, 'test').format).toBe('M/d/y');
            });
            it('Added other culture mapper returns the proper value', function () {
                (0, util_1.extend)(intl_base_1.blazorCultureFormats, { 'ja': { 'd': 'y' } });
                var jInt = new internationalization_1.Internationalization('ja');
                expect(jInt.formatDate(date, { skeleton: 'd', isServerRendered: true })).toBe('2016');
            });
            // it('datefromatting using the getdateFormat: T', () => {
            //    let dateformatter: Function = intl.getDateFormat({ format: 'T' });
            //    expect(dateformatter(date)).toBe('12:00:00 AM GMT+5');
            // });     
            afterAll(function () {
                (0, util_1.disableBlazorMode)();
                (0, internationalization_1.setCulture)('en-US');
            });
        });
        describe('Number Fromatting with local culture set', function () {
            var numIntl = new internationalization_1.Internationalization('ja');
            it('numberformatter using the getNumberFormatter and currency code set in option', function () {
                var numberformatter = numIntl.getNumberFormat({ format: 'C2', currency: 'JPY' });
                expect(numberformatter(123134)).toBe('￥123,134.00');
            });
            it('numberformatter using the getNumberFormatter and using global default currency code', function () {
                var numberformatter = numIntl.getNumberFormat({ format: 'C2' });
                expect(numberformatter(123134)).toBe('$123,134.00');
            });
            it('numberfromatting using the formatNumber #1', function () {
                var result = numIntl.formatNumber(2341123.23, { format: 'p2' });
                expect(result).toBe('234,112,323.00%');
            });
            it('numberfromatting using the formatNumber #2', function () {
                var result = numIntl.formatNumber(-2341123, { format: 'e' });
                expect(result).toBe('-2.341123E+6');
            });
            it('numberfromatting using the formatNumber #3', function () {
                var result = numIntl.formatNumber(0.002341123, { format: 'e' });
                expect(result).toBe('2.341123E-3');
            });
            it('numberfromatting using the formatNumber #4', function () {
                var result = numIntl.formatNumber(-2341123, { format: '0;N/A' });
                expect(result).toBe('N/A');
            });
            it('numberfromatting using the formatNumber with no options', function () {
                var result = numIntl.formatNumber(2341123.234);
                expect(result).toBe('2,341,123.234');
            });
            it('Number formatter with rtl language set locale for instance', function () {
                numIntl.culture = 'ar-QA';
                var result = numIntl.formatNumber(2345634.342534, { format: 'n' });
                expect(result).toBe('٢٬٣٤٥٬٦٣٤٫٣٤٣');
            });
            it('Number formatter by changing culture using "setCulture" method and currency using the "setCurrencyCode"', function () {
                numIntl.culture = undefined;
                (0, internationalization_1.setCulture)('en');
                (0, internationalization_1.setCurrencyCode)('EUR');
                var result = numIntl.formatNumber(23412312.2212123, {
                    format: 'C', maximumFractionDigits: 5, minimumFractionDigits: 2
                });
                expect(result).toBe('€23,412,312.22121');
            });
            afterAll(function () {
                (0, internationalization_1.setCulture)('en-US');
                (0, internationalization_1.setCurrencyCode)('USD');
            });
        });
        describe('Date Parser', function () {
            var dParseIntl = new internationalization_1.Internationalization();
            var parseDate = new Date();
            it('using getDateparser function', function () {
                var parser = dParseIntl.getDateParser({ skeleton: 'yMMMM' });
                var result = parser(dParseIntl.formatDate(parseDate, { skeleton: 'yMMMM' }));
                result.setDate(parseDate.getDate());
                expect((0, date_parser_spec_1.monthDayMatch)(result, parseDate)).toBeTruthy;
            });
            it('Internationalization with isalmaic calendar parsing', function () {
                var tIntl = new internationalization_1.Internationalization('en');
                var iFormatter = tIntl.parseDate('Tuesday, Safar 19, 1437 AH', { skeleton: 'full', calendar: 'islamic' });
                expect(tIntl.formatDate(iFormatter, { format: 'd/M/y' })).toBe('1/12/2015');
            });
            it('using parse date and default value', function () {
                var ip = dParseIntl.formatDate(parseDate, { type: 'date', skeleton: 'short' });
                var result = dParseIntl.parseDate(ip);
                expect((0, date_parser_spec_1.monthDayMatch)(result, parseDate));
            });
            it('Case insensitive date parser support for uppercase', function () {
                var result = dParseIntl.parseDate('12/DEC/20', { format: 'dd/MMM/yy' });
                expect(dParseIntl.formatDate(result)).toBe('12/12/20');
            });
            it('Case insensitive date parser support for lowercase', function () {
                var result = dParseIntl.parseDate('12/dec/20', { format: 'dd/MMM/yy' });
                expect(dParseIntl.formatDate(result)).toBe('12/12/20');
            });
        });
        describe('Number  Parser', function () {
            var nParseIntl = new internationalization_1.Internationalization();
            var parseDate = new Date();
            it('using getNumberParser function', function () {
                var parser = nParseIntl.getNumberParser({ format: 'P' });
                var result = parser(nParseIntl.formatNumber(12345.23, { format: 'p2' }));
                expect(result).toBe(12345.23);
            });
            it('using parse number function', function () {
                var result = nParseIntl.parseNumber(nParseIntl.formatNumber(12345.23, { format: 'N', minimumFractionDigits: 5 }));
                expect(result).toBe(12345.23);
            });
        });
        describe('getNumericObject', function () {
            it('checkNumericObject for invalid culture returns default culture', function () {
                (0, internationalization_1.getNumberDependable)('fe', 'USD');
                expect((0, internationalization_1.getNumericObject)('fe')).toEqual({
                    decimal: '.', exponential: 'E', group: ',', infinity: '∞', list: ';', maximumFraction: 3, minimumFraction: 0,
                    minusSign: '-', nan: 'NaN', perMille: '‰', percentSign: '%', plusSign: '+', superscriptingExponent: '×',
                    timeSeparator: ':', dateSeparator: '/'
                });
            });
            it('checkNumericObject for "ar-QA" culture', function () {
                expect((0, internationalization_1.getNumericObject)('ar-QA')).toEqual({
                    decimal: '٫', group: '٬', list: '؛', percentSign: '٪؜', plusSign: '؜+', minusSign: '؜-',
                    exponential: 'اس', superscriptingExponent: '×', perMille: '؉', infinity: '∞',
                    nan: 'ليس رقم', timeSeparator: ':', minimumFraction: 0, maximumFraction: 3, dateSeparator: '/'
                });
            });
        });
        describe('getDateSeparator check', function () {
            it('empty dateObject', function () {
                expect(intl_base_1.IntlBase.getDateSeparator({})).toBe('/');
            });
            it('undefined parameter', function () {
                expect(intl_base_1.IntlBase.getDateSeparator(undefined)).toBe('/');
            });
        });
        describe('getDateTimePattern', function () {
            var intl = new internationalization_1.Internationalization();
            it('short date', function () {
                expect(intl.getDatePattern({ skeleton: 'short', type: 'date' })).toBe('M/d/yy');
            });
            it('long date', function () {
                expect(intl.getDatePattern({ skeleton: 'long', type: 'date' })).toBe('MMMM d, y');
            });
            it('full date', function () {
                expect(intl.getDatePattern({ skeleton: 'full', type: 'date' })).toBe('EEEE, MMMM d, y');
            });
            it('short time', function () {
                expect(intl.getDatePattern({ skeleton: 'short', type: 'time' })).toBe('h:mm a');
            });
            it('medium time', function () {
                expect(intl.getDatePattern({ skeleton: 'medium', type: 'time' })).toBe('h:mm:ss a');
            });
            it('short date xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'short', type: 'date' }, true)).toBe('m/d/yy');
            });
            it('medium date xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'medium', type: 'date' }, true)).toBe('mmm d, yyyy');
            });
            it('long date xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'long', type: 'date' }, true)).toBe('mmmm d, yyyy');
            });
            it('full date xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'full', type: 'date' }, true)).toBe('dddd, mmmm d, yyyy');
            });
            it('short time xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'short', type: 'time' }, true)).toBe('h:mm AM/PM');
            });
            it('medium time xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'medium', type: 'time' }, true)).toBe('h:mm:ss AM/PM');
            });
            it('long time xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'long', type: 'time' }, true)).
                    toBe('h:mm:ss AM/PM "GMT' + (0, date_formatter_spec_1.getTimeZoneString)(new Date(), true) + '"');
            });
            it('full time xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'full', type: 'time' }, true)).
                    toBe('h:mm:ss AM/PM "GMT' + (0, date_formatter_spec_1.getTimeZoneString)(new Date()) + '"');
            });
            it('short dateTime xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'short', type: 'dateTime' }, true)).toBe('m/d/yy, h:mm AM/PM');
            });
            it('medium dateTime xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'medium', type: 'dateTime' }, true)).toBe('mmm d, yyyy, h:mm:ss AM/PM');
            });
            it('long dateTime xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'long', type: 'dateTime' }, true)).
                    toBe('mmmm d, yyyy "at" h:mm:ss AM/PM "GMT' + (0, date_formatter_spec_1.getTimeZoneString)(new Date(), true) + '"');
            });
            it('full dateTime xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'full', type: 'dateTime' }, true)).
                    toBe('dddd, mmmm d, yyyy "at" h:mm:ss AM/PM "GMT' + (0, date_formatter_spec_1.getTimeZoneString)(new Date()) + '"');
            });
            it('d xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'd' }, true)).toBe('d');
            });
            it('E xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'E' }, true)).toBe('ddd');
            });
            it('Ed xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'Ed' }, true)).toBe('d ddd');
            });
            it('Ehm xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'Ehm' }, true)).toBe('ddd h:mm AM/PM');
            });
            it('EHm xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'EHm' }, true)).toBe('ddd hh:mm');
            });
            it('Ehms xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'Ehms' }, true)).toBe('ddd h:mm:ss AM/PM');
            });
            it('EHms xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'EHms' }, true)).toBe('ddd hh:mm:ss');
            });
            it('Gy xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'Gy' }, true)).toBe('yyyy');
            });
            it('GyMMM xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'GyMMM' }, true)).toBe('mmm yyyy');
            });
            it('GyMMMd xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'GyMMMd' }, true)).toBe('mmm d, yyyy');
            });
            it('GyMMMEd xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'GyMMMEd' }, true)).toBe('ddd, mmm d, yyyy');
            });
            it('h xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'h' }, true)).toBe('h AM/PM');
            });
            it('H xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'H' }, true)).toBe('hh');
            });
            it('hm xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'hm' }, true)).toBe('h:mm AM/PM');
            });
            it('Hm xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'Hm' }, true)).toBe('hh:mm');
            });
            it('hms xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'hms' }, true)).toBe('h:mm:ss AM/PM');
            });
            it('Hms xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'Hms' }, true)).toBe('hh:mm:ss');
            });
            it('M xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'M' }, true)).toBe('m');
            });
            it('Md xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'Md' }, true)).toBe('m/d');
            });
            it('MEd xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'MEd' }, true)).toBe('ddd, m/d');
            });
            it('MMM xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'MMM' }, true)).toBe('mmm');
            });
            it('MMMEd xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'MMMEd' }, true)).toBe('ddd, mmm d');
            });
            it('MMMd xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'MMMd' }, true)).toBe('mmm d');
            });
            it('ms xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'ms' }, true)).toBe('mm:ss');
            });
            it('y xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'y' }, true)).toBe('yyyy');
            });
            it('yM xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'yM' }, true)).toBe('m/yyyy');
            });
            it('yMd xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'yMd' }, true)).toBe('m/d/yyyy');
            });
            it('yMEd xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'yMEd' }, true)).toBe('ddd, m/d/yyyy');
            });
            it('yMMM xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'yMMM' }, true)).toBe('mmm yyyy');
            });
            it('yMMMMd xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'yMMMd' }, true)).toBe('mmm d, yyyy');
            });
            it('yMMMEd xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'yMMMEd' }, true)).toBe('ddd, mmm d, yyyy');
            });
            it('yMMM xls format', function () {
                expect(intl.getDatePattern({ skeleton: 'yMMM' }, true)).toBe('mmm yyyy');
            });
        });
        describe('getNumberPattern', function () {
            var intl = new internationalization_1.Internationalization();
            it('default', function () {
                expect(intl.getNumberPattern({})).toBe('###0');
            });
            it('N format', function () {
                expect(intl.getNumberPattern({ format: 'N' })).toBe('###0');
            });
            it('N format use Grouping', function () {
                expect(intl.getNumberPattern({ format: 'N', useGrouping: true })).toBe('###,##0');
            });
            it('C format', function () {
                expect(intl.getNumberPattern({ format: 'C' })).toBe('$###0.00');
            });
            it('C1 format', function () {
                expect(intl.getNumberPattern({ format: 'C1' })).toBe('$###0.0');
            });
            it('C2 format', function () {
                expect(intl.getNumberPattern({ format: 'C2' })).toBe('$###0.00');
            });
            it('C2 format with maximum Fraction 4', function () {
                expect(intl.getNumberPattern({ format: 'C2', maximumFractionDigits: 4 })).toBe('$###0.00');
            });
            it('A format', function () {
                expect(intl.getNumberPattern({ format: 'A' })).toBe('$###0.00;($###0.00)');
            });
            it('A3 format', function () {
                expect(intl.getNumberPattern({ format: 'A3' })).toBe('$###0.000;($###0.000)');
            });
        });
        describe('First Day of the Week', function () {
            var intl = new internationalization_1.Internationalization();
            var weekData = {
                "supplemental": {
                    "weekData": {
                        "firstDay": {
                            "AD": "mon",
                            "AE": "sat",
                            "GB-alt-variant": "sun",
                            "ZW": "sun"
                        }
                    }
                }
            };
            (0, internationalization_1.loadCldr)(weekData);
            it('en culture', function () {
                (0, internationalization_1.setCulture)('en');
                expect(intl.getFirstDayOfWeek()).toBe(0);
            });
            it('en-Us culture', function () {
                (0, internationalization_1.setCulture)('en-Us');
                expect(intl.getFirstDayOfWeek()).toBe(0);
            });
            it('en-AE culture', function () {
                (0, internationalization_1.setCulture)('en-Ae');
                expect(intl.getFirstDayOfWeek()).toBe(6);
            });
            it('en-ZS culture data not available', function () {
                (0, internationalization_1.setCulture)('en-ZS');
                expect(intl.getFirstDayOfWeek()).toBe(0);
            });
            it('en-GB-alt-variant culture data not available', function () {
                (0, internationalization_1.setCulture)('en-Gb-alt-variant');
                expect(intl.getFirstDayOfWeek()).toBe(0);
            });
            it('ar culture', function () {
                (0, internationalization_1.setCulture)('ar');
                expect(intl.getFirstDayOfWeek()).toBe(0);
            });
        });
        describe('getDefaultDateObject returns default dateObject properly', function () {
            /* tslint:disable:quotemark */
            // tslint:disable-next-line:max-func-body-length
            it('', function () {
                expect(JSON.stringify((0, internationalization_1.getDefaultDateObject)())).toBe(JSON.stringify({
                    'months': {
                        'stand-alone': {
                            'abbreviated': {
                                '1': 'Jan',
                                '2': 'Feb',
                                '3': 'Mar',
                                '4': 'Apr',
                                '5': 'May',
                                '6': 'Jun',
                                '7': 'Jul',
                                '8': 'Aug',
                                '9': 'Sep',
                                '10': 'Oct',
                                '11': 'Nov',
                                '12': 'Dec'
                            },
                            'narrow': {
                                '1': 'J',
                                '2': 'F',
                                '3': 'M',
                                '4': 'A',
                                '5': 'M',
                                '6': 'J',
                                '7': 'J',
                                '8': 'A',
                                '9': 'S',
                                '10': 'O',
                                '11': 'N',
                                '12': 'D'
                            },
                            'wide': {
                                '1': 'January',
                                '2': 'February',
                                '3': 'March',
                                '4': 'April',
                                '5': 'May',
                                '6': 'June',
                                '7': 'July',
                                '8': 'August',
                                '9': 'September',
                                '10': 'October',
                                '11': 'November',
                                '12': 'December'
                            }
                        }
                    },
                    "days": {
                        "stand-alone": {
                            "abbreviated": {
                                "sun": "Sun",
                                "mon": "Mon",
                                "tue": "Tue",
                                "wed": "Wed",
                                "thu": "Thu",
                                "fri": "Fri",
                                "sat": "Sat"
                            },
                            "narrow": {
                                "sun": "S",
                                "mon": "M",
                                "tue": "T",
                                "wed": "W",
                                "thu": "T",
                                "fri": "F",
                                "sat": "S"
                            },
                            "short": {
                                "sun": "Su",
                                "mon": "Mo",
                                "tue": "Tu",
                                "wed": "We",
                                "thu": "Th",
                                "fri": "Fr",
                                "sat": "Sa"
                            },
                            "wide": {
                                "sun": "Sunday",
                                "mon": "Monday",
                                "tue": "Tuesday",
                                "wed": "Wednesday",
                                "thu": "Thursday",
                                "fri": "Friday",
                                "sat": "Saturday"
                            }
                        }
                    },
                    "dayPeriods": {
                        "format": {
                            "wide": {
                                "am": "AM",
                                "pm": "PM"
                            }
                        }
                    },
                    'eras': {
                        'eraNames': {
                            '0': 'Before Christ',
                            '0-alt-variant': 'Before Common Era',
                            '1': 'Anno Domini',
                            "1-alt-variant": "Common Era"
                        },
                        'eraAbbr': {
                            '0': 'BC',
                            '0-alt-variant': 'BCE',
                            '1': 'AD',
                            '1-alt-variant': 'CE'
                        },
                        'eraNarrow': {
                            '0': 'B',
                            '0-alt-variant': 'BCE',
                            '1': 'A',
                            '1-alt-variant': 'CE'
                        }
                    },
                    'dateFormats': {
                        'full': 'EEEE, MMMM d, y',
                        'long': 'MMMM d, y',
                        'medium': 'MMM d, y',
                        'short': 'M/d/yy'
                    },
                    'timeFormats': {
                        'full': 'h:mm:ss a zzzz',
                        'long': 'h:mm:ss a z',
                        'medium': 'h:mm:ss a',
                        'short': 'h:mm a'
                    },
                    'dateTimeFormats': {
                        'full': "{1} 'at' {0}",
                        'long': "{1} 'at' {0}",
                        'medium': '{1}, {0}',
                        'short': '{1}, {0}',
                        'availableFormats': {
                            'd': 'd',
                            'E': 'ccc',
                            'Ed': 'd E',
                            'Ehm': 'E h:mm a',
                            'EHm': 'E HH:mm',
                            'Ehms': 'E h:mm:ss a',
                            'EHms': 'E HH:mm:ss',
                            'Gy': 'y G',
                            'GyMMM': 'MMM y G',
                            'GyMMMd': 'MMM d, y G',
                            'GyMMMEd': 'E, MMM d, y G',
                            'h': 'h a',
                            'H': 'HH',
                            'hm': 'h:mm a',
                            'Hm': 'HH:mm',
                            'hms': 'h:mm:ss a',
                            'Hms': 'HH:mm:ss',
                            'hmsv': 'h:mm:ss a v',
                            'Hmsv': 'HH:mm:ss v',
                            'hmv': 'h:mm a v',
                            'Hmv': 'HH:mm v',
                            'M': 'L',
                            'Md': 'M/d',
                            'MEd': 'E, M/d',
                            'MMM': 'LLL',
                            'MMMd': 'MMM d',
                            'MMMEd': 'E, MMM d',
                            'MMMMd': 'MMMM d',
                            'ms': 'mm:ss',
                            'y': 'y',
                            'yM': 'M/y',
                            'yMd': 'M/d/y',
                            'yMEd': 'E, M/d/y',
                            'yMMM': 'MMM y',
                            'yMMMd': 'MMM d, y',
                            'yMMMEd': 'E, MMM d, y',
                            'yMMMM': 'MMMM y',
                        },
                    }
                }));
            });
        });
        describe('Cr-EJ2-10356 - Date parser returns invalid output instead of null value', function () {
            it('Without special characters', function () {
                var intl = new internationalization_1.Internationalization();
                intl.parseDate('12', { format: 'WW' });
                var res = intl.parseDate('12122015', { skeleton: 'yMd' });
                expect(res).toBe(null);
            });
            it('Wit special characters', function () {
                var intl = new internationalization_1.Internationalization();
                var res = intl.parseDate('12/122015', { skeleton: 'yMd' });
                expect(res).toBe(null);
            });
        });
        describe('Blazor Internationalization with server data', function () {
            it('Check Number Formatting format N2', function () {
                (0, util_1.enableBlazorMode)();
                var intl = new internationalization_1.Internationalization();
                var res = intl.formatNumber(12122, { format: 'N2' });
                (0, util_1.disableBlazorMode)();
                expect(res).toBe('12,122.00');
            });
            it('Check Number Formatting format C2', function () {
                (0, util_1.enableBlazorMode)();
                var intl = new internationalization_1.Internationalization();
                var res = intl.formatNumber(12122, { format: 'C2' });
                (0, util_1.disableBlazorMode)();
                expect(res).toBe('$12,122.00');
            });
            it('Check Number Formatting format C2', function () {
                (0, util_1.enableBlazorMode)();
                var intl = new internationalization_1.Internationalization();
                var res = intl.formatNumber(-12122, { format: 'C2', currency: 'CNY' });
                intl.parseNumber(res, { format: 'C2', currency: 'CNY' });
                (0, util_1.disableBlazorMode)();
                debugger;
                expect(res).toBe('(¥12,122.00)');
            });
            it('Check Number Parsing  C2', function () {
                (0, util_1.enableBlazorMode)();
                var intl = new internationalization_1.Internationalization();
                var res = intl.parseNumber('($12,122.00)', { format: 'C2' });
                (0, util_1.disableBlazorMode)();
                expect(res).toBe(-12122);
            });
            it('datefromatting ', function () {
                (0, util_1.enableBlazorMode)();
                var date = new Date('11/17/2016');
                var intl = new internationalization_1.Internationalization();
                var dateformatter = intl.formatDate(date, { format: "EEEE, MMMM d, y" });
                (0, util_1.disableBlazorMode)();
                expect(dateformatter).toBe('Thursday, November 17, 2016');
            });
            it('dateParser ', function () {
                (0, util_1.enableBlazorMode)();
                var date = new Date('11/17/2016');
                var intl = new internationalization_1.Internationalization();
                var dateformatter = intl.parseDate('Thursday, November 17, 2016', { format: "EEEE, MMMM d, y" });
                (0, util_1.disableBlazorMode)();
                expect(intl.formatDate(date, { format: "EEEE, MMMM d, y" })).toBe('Thursday, November 17, 2016');
            });
        });
        /* tslint:enable:quotemark */
    });
});
//# sourceMappingURL=internationalization.spec.js.map