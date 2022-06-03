define(["require", "exports", "./intl/date-formatter", "./intl/number-formatter", "./intl/date-parser", "./intl/number-parser", "./intl/intl-base", "./util", "./observer"], function (require, exports, date_formatter_1, number_formatter_1, date_parser_1, number_parser_1, intl_base_1, util_1, observer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getDefaultDateObject = exports.getNumberDependable = exports.getNumericObject = exports.enableRtl = exports.loadCldr = exports.setCurrencyCode = exports.setCulture = exports.Internationalization = exports.defaultCurrencyCode = exports.defaultCulture = exports.cldrData = exports.rightToLeft = exports.onIntlChange = void 0;
    /**
     * Specifies the observer used for external change detection.
     */
    exports.onIntlChange = new observer_1.Observer();
    /**
     * Specifies the default rtl status for EJ2 components.
     */
    exports.rightToLeft = false;
    /**
     * Specifies the CLDR data loaded for internationalization functionalities.
     *
     * @private
     */
    exports.cldrData = {};
    /**
     * Specifies the default culture value to be considered.
     *
     * @private
     */
    exports.defaultCulture = 'en-US';
    /**
     * Specifies default currency code to be considered
     *
     * @private
     */
    exports.defaultCurrencyCode = 'USD';
    var mapper = ['numericObject', 'dateObject'];
    /**
     * Internationalization class provides support to parse and format the number and date object to the desired format.
     * ```typescript
     * // To set the culture globally
     * setCulture('en-GB');
     *
     * // To set currency code globally
     * setCurrencyCode('EUR');
     *
     * //Load cldr data
     * loadCldr(gregorainData);
     * loadCldr(timeZoneData);
     * loadCldr(numbersData);
     * loadCldr(numberSystemData);
     *
     * // To use formatter in component side
     * let Intl:Internationalization = new Internationalization();
     *
     * // Date formatting
     * let dateFormatter: Function = Intl.getDateFormat({skeleton:'long',type:'dateTime'});
     * dateFormatter(new Date('11/2/2016'));
     * dateFormatter(new Date('25/2/2030'));
     * Intl.formatDate(new Date(),{skeleton:'E'});
     *
     * //Number formatting
     * let numberFormatter: Function = Intl.getNumberFormat({skeleton:'C5'})
     * numberFormatter(24563334);
     * Intl.formatNumber(123123,{skeleton:'p2'});
     *
     * // Date parser
     * let dateParser: Function = Intl.getDateParser({skeleton:'short',type:'time'});
     * dateParser('10:30 PM');
     * Intl.parseDate('10',{skeleton:'H'});
     * ```
     */
    var Internationalization = /** @class */ (function () {
        function Internationalization(cultureName) {
            if (cultureName) {
                this.culture = cultureName;
            }
        }
        /**
         * Returns the format function for given options.
         *
         * @param {DateFormatOptions} options - Specifies the format options in which the format function will return.
         * @returns {Function} ?
         */
        Internationalization.prototype.getDateFormat = function (options) {
            return date_formatter_1.DateFormat.dateFormat(this.getCulture(), options || { type: 'date', skeleton: 'short' }, exports.cldrData);
        };
        /**
         * Returns the format function for given options.
         *
         * @param {NumberFormatOptions} options - Specifies the format options in which the format function will return.
         * @returns {Function} ?
         */
        Internationalization.prototype.getNumberFormat = function (options) {
            if (options && !options.currency) {
                options.currency = exports.defaultCurrencyCode;
            }
            if ((0, util_1.isBlazor)() && options && !options.format) {
                options.minimumFractionDigits = 0;
            }
            return number_formatter_1.NumberFormat.numberFormatter(this.getCulture(), options || {}, exports.cldrData);
        };
        /**
         * Returns the parser function for given options.
         *
         * @param {DateFormatOptions} options - Specifies the format options in which the parser function will return.
         * @returns {Function} ?
         */
        Internationalization.prototype.getDateParser = function (options) {
            return date_parser_1.DateParser.dateParser(this.getCulture(), options || { skeleton: 'short', type: 'date' }, exports.cldrData);
        };
        /**
         * Returns the parser function for given options.
         *
         * @param {NumberFormatOptions} options - Specifies the format options in which the parser function will return.
         * @returns {Function} ?
         */
        Internationalization.prototype.getNumberParser = function (options) {
            if ((0, util_1.isBlazor)() && options && !options.format) {
                options.minimumFractionDigits = 0;
            }
            return number_parser_1.NumberParser.numberParser(this.getCulture(), options || { format: 'N' }, exports.cldrData);
        };
        /**
         * Returns the formatted string based on format options.
         *
         * @param {number} value - Specifies the number to format.
         * @param {NumberFormatOptions} option - Specifies the format options in which the number will be formatted.
         * @returns {string} ?
         */
        Internationalization.prototype.formatNumber = function (value, option) {
            return this.getNumberFormat(option)(value);
        };
        /**
         * Returns the formatted date string based on format options.
         *
         * @param {Date} value - Specifies the number to format.
         * @param {DateFormatOptions} option - Specifies the format options in which the number will be formatted.
         * @returns {string} ?
         */
        Internationalization.prototype.formatDate = function (value, option) {
            return this.getDateFormat(option)(value);
        };
        /**
         * Returns the date object for given date string and options.
         *
         * @param {string} value - Specifies the string to parse.
         * @param {DateFormatOptions} option - Specifies the parse options in which the date string will be parsed.
         * @returns {Date} ?
         */
        Internationalization.prototype.parseDate = function (value, option) {
            return this.getDateParser(option)(value);
        };
        /**
         * Returns the number object from the given string value and options.
         *
         * @param {string} value - Specifies the string to parse.
         * @param {NumberFormatOptions} option - Specifies the parse options in which the  string number  will be parsed.
         * @returns {number} ?
         */
        Internationalization.prototype.parseNumber = function (value, option) {
            return this.getNumberParser(option)(value);
        };
        /**
         * Returns Native Date Time Pattern
         *
         * @param {DateFormatOptions} option - Specifies the parse options for resultant date time pattern.
         * @param {boolean} isExcelFormat - Specifies format value to be converted to excel pattern.
         * @returns {string} ?
         * @private
         */
        Internationalization.prototype.getDatePattern = function (option, isExcelFormat) {
            return intl_base_1.IntlBase.getActualDateTimeFormat(this.getCulture(), option, exports.cldrData, isExcelFormat);
        };
        /**
         * Returns Native Number Pattern
         *
         * @param {NumberFormatOptions} option - Specifies the parse options for resultant number pattern.
         * @param {boolean} isExcel ?
         * @returns {string} ?
         * @private
         */
        Internationalization.prototype.getNumberPattern = function (option, isExcel) {
            return intl_base_1.IntlBase.getActualNumberFormat(this.getCulture(), option, exports.cldrData, isExcel);
        };
        /**
         * Returns the First Day of the Week
         *
         * @returns {number} ?
         */
        Internationalization.prototype.getFirstDayOfWeek = function () {
            return intl_base_1.IntlBase.getWeekData(this.getCulture(), exports.cldrData);
        };
        /**
         * Returns the culture
         *
         * @returns {string} ?
         */
        Internationalization.prototype.getCulture = function () {
            return this.culture || exports.defaultCulture;
        };
        return Internationalization;
    }());
    exports.Internationalization = Internationalization;
    /**
     * Set the default culture to all EJ2 components
     *
     * @param {string} cultureName - Specifies the culture name to be set as default culture.
     * @returns {void} ?
     */
    function setCulture(cultureName) {
        exports.defaultCulture = cultureName;
        exports.onIntlChange.notify('notifyExternalChange', { 'locale': exports.defaultCulture });
    }
    exports.setCulture = setCulture;
    /**
     * Set the default currency code to all EJ2 components
     *
     * @param {string} currencyCode Specifies the culture name to be set as default culture.
     * @returns {void} ?
     */
    function setCurrencyCode(currencyCode) {
        exports.defaultCurrencyCode = currencyCode;
        exports.onIntlChange.notify('notifyExternalChange', { 'currencyCode': exports.defaultCurrencyCode });
    }
    exports.setCurrencyCode = setCurrencyCode;
    /**
     * Load the CLDR data into context
     *
     * @param {Object[]} data Specifies the CLDR data's to be used for formatting and parser.
     * @returns {void} ?
     */
    function loadCldr() {
        var data = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
        }
        for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
            var obj = data_1[_a];
            (0, util_1.extend)(exports.cldrData, obj, {}, true);
        }
    }
    exports.loadCldr = loadCldr;
    /**
     * To enable or disable RTL functionality for all components globally.
     *
     * @param {boolean} status - Optional argument Specifies the status value to enable or disable rtl option.
     * @returns {void} ?
     */
    function enableRtl(status) {
        if (status === void 0) { status = true; }
        exports.rightToLeft = status;
        exports.onIntlChange.notify('notifyExternalChange', { enableRtl: exports.rightToLeft });
    }
    exports.enableRtl = enableRtl;
    /**
     * To get the numeric CLDR object for given culture
     *
     * @param {string} locale - Specifies the locale for which numericObject to be returned.
     * @param {string} type ?
     * @returns {Object} ?
     * @ignore
     * @private
     */
    function getNumericObject(locale, type) {
        // eslint-disable-next-line
        var numObject = intl_base_1.IntlBase.getDependables(exports.cldrData, locale, '', true)[mapper[0]];
        // eslint-disable-next-line
        var dateObject = intl_base_1.IntlBase.getDependables(exports.cldrData, locale, '')[mapper[1]];
        var numSystem = (0, util_1.getValue)('defaultNumberingSystem', numObject);
        var symbPattern = (0, util_1.isBlazor)() ? (0, util_1.getValue)('numberSymbols', numObject) : (0, util_1.getValue)('symbols-numberSystem-' + numSystem, numObject);
        var pattern = intl_base_1.IntlBase.getSymbolPattern(type || 'decimal', numSystem, numObject, false);
        return (0, util_1.extend)(symbPattern, intl_base_1.IntlBase.getFormatData(pattern, true, '', true), { 'dateSeparator': intl_base_1.IntlBase.getDateSeparator(dateObject) });
    }
    exports.getNumericObject = getNumericObject;
    /**
     * To get the numeric CLDR  number base object for given culture
     *
     * @param {string} locale - Specifies the locale for which numericObject to be returned.
     * @param {string} currency - Specifies the currency for which numericObject to be returned.
     * @returns {string} ?
     * @ignore
     * @private
     */
    function getNumberDependable(locale, currency) {
        // eslint-disable-next-line
        var numObject = intl_base_1.IntlBase.getDependables(exports.cldrData, locale, '', true);
        // eslint-disable-next-line
        return intl_base_1.IntlBase.getCurrencySymbol(numObject.numericObject, currency);
    }
    exports.getNumberDependable = getNumberDependable;
    /**
     * To get the default date CLDR object.
     *
     * @param {string} mode ?
     * @returns {Object} ?
     * @ignore
     * @private
     */
    function getDefaultDateObject(mode) {
        // eslint-disable-next-line
        return intl_base_1.IntlBase.getDependables(exports.cldrData, '', mode, false)[mapper[1]];
    }
    exports.getDefaultDateObject = getDefaultDateObject;
});
//# sourceMappingURL=internationalization.js.map