define(["require", "exports", "./parser-base", "./intl-base", "../util", "../hijri-parser", "../util"], function (require, exports, parser_base_1, intl_base_1, util_1, hijri_parser_1, util_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DateFormat = exports.datePartMatcher = exports.basicPatterns = void 0;
    var abbreviateRegexGlobal = /\/MMMMM|MMMM|MMM|a|LLLL|LLL|EEEEE|EEEE|E|K|cccc|ccc|WW|W|G+|z+/gi;
    var standalone = 'stand-alone';
    var weekdayKey = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    exports.basicPatterns = ['short', 'medium', 'long', 'full'];
    var timeSetter = {
        m: 'getMinutes',
        h: 'getHours',
        H: 'getHours',
        s: 'getSeconds',
        d: 'getDate',
        f: 'getMilliseconds'
    };
    exports.datePartMatcher = {
        'M': 'month',
        'd': 'day',
        'E': 'weekday',
        'c': 'weekday',
        'y': 'year',
        'm': 'minute',
        'h': 'hour',
        'H': 'hour',
        's': 'second',
        'L': 'month',
        'a': 'designator',
        'z': 'timeZone',
        'Z': 'timeZone',
        'G': 'era',
        'f': 'milliseconds'
    };
    var timeSeparator = 'timeSeparator';
    /* tslint:disable no-any */
    /**
     * Date Format is a framework provides support for date formatting.
     *
     * @private
     */
    var DateFormat = /** @class */ (function () {
        function DateFormat() {
        }
        /**
         * Returns the formatter function for given skeleton.
         *
         * @param {string} culture -  Specifies the culture name to be which formatting.
         * @param {DateFormatOptions} option - Specific the format in which date  will format.
         * @param {Object} cldr - Specifies the global cldr data collection.
         * @returns {Function} ?
         */
        DateFormat.dateFormat = function (culture, option, cldr) {
            var _this = this;
            var dependable = intl_base_1.IntlBase.getDependables(cldr, culture, option.calendar);
            var numObject = (0, util_1.getValue)('parserObject.numbers', dependable);
            var dateObject = dependable.dateObject;
            var formatOptions = { isIslamic: intl_base_1.IntlBase.islamicRegex.test(option.calendar) };
            if ((0, util_1.isBlazor)() && option.isServerRendered) {
                option = intl_base_1.IntlBase.compareBlazorDateFormats(option, culture);
            }
            var resPattern = option.format ||
                intl_base_1.IntlBase.getResultantPattern(option.skeleton, dependable.dateObject, option.type, false, (0, util_1.isBlazor)() ? culture : '');
            formatOptions.dateSeperator = (0, util_1.isBlazor)() ? (0, util_1.getValue)('dateSeperator', dateObject) : intl_base_1.IntlBase.getDateSeparator(dependable.dateObject);
            if ((0, util_1.isUndefined)(resPattern)) {
                (0, util_1.throwError)('Format options or type given must be invalid');
            }
            else {
                resPattern = intl_base_1.IntlBase.ConvertDateToWeekFormat(resPattern);
                if ((0, util_1.isBlazor)()) {
                    resPattern = resPattern.replace(/tt/, 'a');
                }
                formatOptions.pattern = resPattern;
                formatOptions.numMapper = (0, util_1.isBlazor)() ?
                    (0, util_2.extend)({}, numObject) : parser_base_1.ParserBase.getNumberMapper(dependable.parserObject, parser_base_1.ParserBase.getNumberingSystem(cldr));
                var patternMatch = resPattern.match(abbreviateRegexGlobal) || [];
                for (var _i = 0, patternMatch_1 = patternMatch; _i < patternMatch_1.length; _i++) {
                    var str = patternMatch_1[_i];
                    var len = str.length;
                    var char = str[0];
                    if (char === 'K') {
                        char = 'h';
                    }
                    switch (char) {
                        case 'E':
                        case 'c':
                            if ((0, util_1.isBlazor)()) {
                                // eslint-disable-next-line
                                formatOptions.weekday = (0, util_1.getValue)('days.' + intl_base_1.IntlBase.monthIndex[len], dateObject);
                            }
                            else {
                                // eslint-disable-next-line
                                formatOptions.weekday = dependable.dateObject[intl_base_1.IntlBase.days][standalone][intl_base_1.IntlBase.monthIndex[len]];
                            }
                            break;
                        case 'M':
                        case 'L':
                            if ((0, util_1.isBlazor)()) {
                                // eslint-disable-next-line
                                formatOptions.month = (0, util_1.getValue)('months.' + intl_base_1.IntlBase.monthIndex[len], dateObject);
                            }
                            else {
                                // eslint-disable-next-line
                                formatOptions.month = dependable.dateObject[intl_base_1.IntlBase.month][standalone][intl_base_1.IntlBase.monthIndex[len]];
                            }
                            break;
                        case 'a':
                            formatOptions.designator = (0, util_1.isBlazor)() ?
                                (0, util_1.getValue)('dayPeriods', dateObject) : (0, util_1.getValue)('dayPeriods.format.wide', dateObject);
                            break;
                        case 'G':
                            // eslint-disable-next-line
                            var eText = (len <= 3) ? 'eraAbbr' : (len === 4) ? 'eraNames' : 'eraNarrow';
                            formatOptions.era = (0, util_1.isBlazor)() ? (0, util_1.getValue)('eras', dateObject) : (0, util_1.getValue)('eras.' + eText, dependable.dateObject);
                            break;
                        case 'z':
                            formatOptions.timeZone = (0, util_1.getValue)('dates.timeZoneNames', dependable.parserObject);
                            break;
                    }
                }
            }
            return function (value) {
                if (isNaN(value.getDate())) {
                    return null;
                }
                return _this.intDateFormatter(value, formatOptions);
            };
        };
        /**
         * Returns formatted date string based on options passed.
         *
         * @param {Date} value ?
         * @param {FormatOptions} options ?
         * @returns {string} ?
         */
        DateFormat.intDateFormatter = function (value, options) {
            var pattern = options.pattern;
            var ret = '';
            var matches = pattern.match(intl_base_1.IntlBase.dateParseRegex);
            var dObject = this.getCurrentDateValue(value, options.isIslamic);
            for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
                var match = matches_1[_i];
                var length_1 = match.length;
                var char = match[0];
                if (char === 'K') {
                    char = 'h';
                }
                var curval = void 0;
                var curvalstr = '';
                var isNumber = void 0;
                var processNumber = void 0;
                var curstr = '';
                switch (char) {
                    case 'M':
                    case 'L':
                        curval = dObject.month;
                        if (length_1 > 2) {
                            // eslint-disable-next-line
                            ret += options.month[curval];
                        }
                        else {
                            isNumber = true;
                        }
                        break;
                    case 'E':
                    case 'c':
                        // eslint-disable-next-line
                        ret += options.weekday[weekdayKey[value.getDay()]];
                        break;
                    case 'H':
                    case 'h':
                    case 'm':
                    case 's':
                    case 'd':
                    case 'f':
                        isNumber = true;
                        if (char === 'd') {
                            curval = dObject.date;
                        }
                        else if (char === 'f') {
                            isNumber = false;
                            processNumber = true;
                            // eslint-disable-next-line
                            curvalstr = value[timeSetter[char]]().toString();
                            curvalstr = curvalstr.substring(0, length_1);
                            var curlength = curvalstr.length;
                            if (length_1 !== curlength) {
                                if (length_1 > 3) {
                                    continue;
                                }
                                for (var i = 0; i < length_1 - curlength; i++) {
                                    curvalstr = '0' + curvalstr.toString();
                                }
                            }
                            curstr += curvalstr;
                        }
                        else {
                            // eslint-disable-next-line
                            curval = value[timeSetter[char]]();
                        }
                        if (char === 'h') {
                            curval = curval % 12 || 12;
                        }
                        break;
                    case 'y':
                        processNumber = true;
                        curstr += dObject.year;
                        if (length_1 === 2) {
                            curstr = curstr.substr(curstr.length - 2);
                        }
                        break;
                    case 'a':
                        // eslint-disable-next-line
                        var desig = value.getHours() < 12 ? 'am' : 'pm';
                        // eslint-disable-next-line
                        ret += options.designator[desig];
                        break;
                    case 'G':
                        // eslint-disable-next-line
                        var dec = value.getFullYear() < 0 ? 0 : 1;
                        // eslint-disable-next-line
                        var retu = options.era[dec];
                        if ((0, util_2.isNullOrUndefined)(retu)) {
                            // eslint-disable-next-line
                            retu = options.era[dec ? 0 : 1];
                        }
                        ret += retu || '';
                        break;
                    case '\'':
                        ret += (match === '\'\'') ? '\'' : match.replace(/'/g, '');
                        break;
                    case 'z':
                        // eslint-disable-next-line
                        var timezone = value.getTimezoneOffset();
                        // eslint-disable-next-line
                        var pattern_1 = (length_1 < 4) ? '+H;-H' : options.timeZone.hourFormat;
                        pattern_1 = pattern_1.replace(/:/g, options.numMapper.timeSeparator);
                        if (timezone === 0) {
                            ret += options.timeZone.gmtZeroFormat;
                        }
                        else {
                            processNumber = true;
                            curstr = this.getTimeZoneValue(timezone, pattern_1);
                        }
                        curstr = options.timeZone.gmtFormat.replace(/\{0\}/, curstr);
                        break;
                    case ':':
                        // eslint-disable-next-line
                        ret += options.numMapper.numberSymbols[timeSeparator];
                        break;
                    case '/':
                        ret += options.dateSeperator;
                        break;
                    case 'W':
                        isNumber = true;
                        curval = intl_base_1.IntlBase.getWeekOfYear(value);
                        break;
                    default:
                        ret += match;
                }
                if (isNumber) {
                    processNumber = true;
                    curstr = this.checkTwodigitNumber(curval, length_1);
                }
                if (processNumber) {
                    ret += parser_base_1.ParserBase.convertValueParts(curstr, intl_base_1.IntlBase.latnParseRegex, options.numMapper.mapper);
                }
            }
            return ret;
        };
        DateFormat.getCurrentDateValue = function (value, isIslamic) {
            if (isIslamic) {
                return hijri_parser_1.HijriParser.getHijriDate(value);
            }
            return { year: value.getFullYear(), month: value.getMonth() + 1, date: value.getDate() };
        };
        /**
         * Returns two digit numbers for given value and length
         *
         * @param {number} val ?
         * @param {number} len ?
         * @returns {string} ?
         */
        DateFormat.checkTwodigitNumber = function (val, len) {
            var ret = val + '';
            if (len === 2 && ret.length !== 2) {
                return '0' + ret;
            }
            return ret;
        };
        /**
         * Returns the value of the Time Zone.
         *
         * @param {number} tVal ?
         * @param {string} pattern ?
         * @returns {string} ?
         * @private
         */
        DateFormat.getTimeZoneValue = function (tVal, pattern) {
            var _this = this;
            var splt = pattern.split(';');
            var curPattern = splt[tVal > 0 ? 1 : 0];
            var no = Math.abs(tVal);
            return curPattern = curPattern.replace(/HH?|mm/g, function (str) {
                var len = str.length;
                var ishour = str.indexOf('H') !== -1;
                return _this.checkTwodigitNumber(Math.floor(ishour ? (no / 60) : (no % 60)), len);
            });
        };
        return DateFormat;
    }());
    exports.DateFormat = DateFormat;
});
//# sourceMappingURL=date-formatter.js.map