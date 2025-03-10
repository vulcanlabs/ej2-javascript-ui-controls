import { FormulasErrorsStrings, CommonErrors, IBasicFormula, getSkeletonVal } from '../common/index';
import { Calculate, getAlphalabel, CalcSheetFamilyItem } from '../base/index';
import { isNullOrUndefined, getValue, Internationalization } from '@syncfusion/ej2-base';
import { DataUtil } from '@syncfusion/ej2-data';

/**
 * Represents the basic formulas module.
 */
export class BasicFormulas {
    private parent: Calculate;
    public formulas: IBasicFormula[] = [
        { formulaName: 'SUM', category: 'Math & Trig', description: 'Sums individual values, cell references or ranges.' },
        {
            formulaName: 'SUMIFS', category: 'Math & Trig',
            description: 'Sums the cells specified by a given set of conditionsor criteria.'
        },
        {
            formulaName: 'SUMPRODUCT', category: 'Math & Trig',
            description: 'Returns sum of the product of given ranges of arrays.'
        },
        { formulaName: 'ABS', category: 'Math & Trig', description: 'Returns the absolute value of a number.' },
        { formulaName: 'RAND', category: 'Math & Trig', description: 'Return a random number between 0 and 1.' },
        { formulaName: 'FLOOR', category: 'Math & Trig', description: 'Returns the round a number down to the nearest integer.' },
        { formulaName: 'CEILING', category: 'Math & Trig', description: 'Returns a number rounded up to a multiple of another number.' },
        {
            formulaName: 'SUMIF', category: 'Math & Trig',
            description: 'It will sum up cells that meet the given criteria.'
        },
        {
            formulaName: 'PRODUCT', category: 'Math & Trig',
            description: 'Multiplies all the numbers given as arguments and returns the product.'
        },
        {
            formulaName: 'AVERAGE', category: 'Statistical',
            description: 'The sum of the numbers divided by how many numbers are being averaged.'
        },
        {
            formulaName: 'AVERAGEIF', category: 'Statistical',
            description: 'Computes the average of the numbers in a range that meet the supplied criteria.'
        },
        {
            formulaName: 'COUNT', category: 'Statistical',
            description: 'Counts the numbers in the list of arguments, exclude text entries.'
        },
        { formulaName: 'COUNTA', category: 'Statistical', description: 'Counts the non-empty values in the list of arguments.' },
        {
            formulaName: 'COUNTIF', category: 'Statistical',
            description: 'Counts the number of cells in a range that meet a specified condition.'
        },
        {
            formulaName: 'COUNTIFS', category: 'Statistical',
            description: 'Counts the number of times each cells in all the ranges that meet the specific conditions.'
        },
        {
            formulaName: 'AVERAGEA', category: 'Statistical',
            description: 'Calculates the average of values in the list of arguments.Arguments can be numbers, names, arrays or references.'
        },
        {
            formulaName: 'AVERAGEIFS', category: 'Statistical',
            description: 'Conditionally returns the average of the contents of cells for the set of ranges.'
        },
        {
            formulaName: 'MIN', category: 'Statistical',
            description: 'Returns the smaller number in set of arguments.'
        },
        { formulaName: 'MAX', category: 'Statistical', description: 'Returns the largest number in set of arguments.' },
        { formulaName: 'DATE', category: 'Date', description: 'Returns the date, given the year, month and day of the month.' },
        { formulaName: 'DAY', category: 'Date', description: 'Returns the day of a given date.' },
        { formulaName: 'TODAY', category: 'Date', description: 'Returns the current date as date value.' },
        { formulaName: 'DAYS', category: 'Date', description: 'Returns the number of days between two dates.' },
        { formulaName: 'WEEKDAY', category: 'Date', description: 'Returns the day of the week corresponding to a date.' },
        {
            formulaName: 'IF', category: 'Logical',
            description: 'Returns one value if a logical expression is TRUE and another if it is FALSE'
        },
        {
            formulaName: 'AND', category: 'Logical',
            description: 'Returns TRUE if all the arguments are considered TRUE, and FALSE otherwise.'
        },
        {
            formulaName: 'IFS', category: 'Logical',
            description: 'Checks multiple conditions and returns a value corresponding to the first TRUE result.'
        },
        {
            formulaName: 'IFERROR', category: 'Logical',
            description: 'Returns a value you specify if a formula evaluates to an error; otherwise, it returns the result of the formula.'
        },
        {
            formulaName: 'CHOOSE', category: 'Lookup & Reference',
            description: 'Returns a value from a list, given an index number.'
        },
        {
            formulaName: 'INDEX', category: 'Lookup & Reference',
            description: 'Returns a value from a table, given a row and column number.'
        },
        { formulaName: 'FIND', category: 'Text', description: 'Returns the position of a string of text within another string.' },
        { formulaName: 'CONCATENATE', category: 'Text', description: ' Used to join two or more strings together.' },
        { formulaName: 'CONCAT', category: 'Text', description: 'Concatenates a list or range of text strings.' },
        { formulaName: 'SUBTOTAL', category: 'Lookup & Reference', description: 'Returns a subtotal in a list or database.' },
        { formulaName: 'RADIANS', category: 'Math & Trig', description: 'Converts degrees to radians.' },
        {
            formulaName: 'OR', category: 'Logical',
            description: 'Returns TRUE if any arguments considered TRUE, and all the arguments are FALSE it will return FALSE.'
        },
        {
            formulaName: 'MATCH', category: 'Lookup & Reference',
            description: 'Returns the relative position of an checked item in range that matches a specified value in a specified order'
        },
        {
            formulaName: 'RANDBETWEEN', category: 'Math & Trig', description: 'Returns an integer random number in a specified range.'
        },
        {
            formulaName: 'SLOPE', category: 'Statistical',
            description: 'Returns the slope of the line from linear regression of the data points.'
        },
        {
            formulaName: 'INTERCEPT', category: 'Statistical',
            description: 'Calculates the point of the Y-intercept line via linear regression.'
        },
        {
            formulaName: 'UNIQUE', category: 'Lookup & Reference',
            description: 'Returns a unique values from a range or array.'
        },
        {
            formulaName: 'ROUNDUP', category: 'Math & Trig', description: 'Rounds a number away from zero.'
        },
        {
            formulaName: 'INT', category: 'Math & Trig', description: 'Returns a number to the nearest integer.'
        },
        {
            formulaName: 'LN', category: 'Math & Trig', description: 'Returns the natural logarithm of a number.'
        },
        {
            formulaName: 'ISNUMBER', category: 'Information', description: 'Returns TRUE, if the argument is number and FALSE otherwise.'
        },
        {
            formulaName: 'ROUND', category: 'Math & Trig', description: 'Rounds a number to a specified number of digits.'
        },
        {
            formulaName: 'LOG', category: 'Math & Trig', description: 'Returns the logarithm of a number to the base that you specify.'
        },
        {
            formulaName: 'POWER', category: 'Math & Trig', description: 'Returns the result of a number raised to power.'
        },
        {
            formulaName: 'TRUNC', category: 'Math & Trig',
            description: 'Returns the truncated value of a number to a specified number of decimal places.'
        },
        {
            formulaName: 'EXP', category: 'Math & Trig', description: 'Returns e raised to the power of the given number.'
        },
        {
            formulaName: 'GEOMEAN', category: 'Statistical',
            description: 'Returns the geometric mean of an array or range of positive data.'
        },
        { formulaName: 'TEXT', category: 'Lookup & Reference', description: 'Converts a value to text in specified number format.' },
        { formulaName: 'SORT', category: 'Lookup & Reference', description: 'Sorts a range of an array.' },
        { formulaName: 'T', category: 'Text', description: 'Checks whether a value is text or not and returns the text.' },
        { formulaName: 'EXACT', category: 'Text', description: 'Checks whether a two text strings are exactly same and returns TRUE or FALSE.' },
        { formulaName: 'LEN', category: 'Text', description: 'Returns a number of characters in a given string.' },
        { formulaName: 'MOD', category: 'Math & Trig', description: 'Returns a remainder after a number is divided by divisor.' },
        { formulaName: 'ODD', category: 'Math & Trig', description: 'Rounds a positive number up and negative number down to the nearest odd integer.' },
        { formulaName: 'PI', category: 'Math & Trig', description: 'Returns the value of pi.' },
        { formulaName: 'COUNTBLANK', category: 'Statistical', description: 'Returns the number of empty cells in a specified range of cells.' },
        { formulaName: 'EVEN', category: 'Math & Trig', description: 'Rounds a positive number up and negative number down to the nearest even integer.' },
        { formulaName: 'FACT', category: 'Math & Trig', description: 'Returns the factorial of a number.' },
        { formulaName: 'DECIMAL', category: 'Math & Trig', description: 'Converts a text representation of a number in a given base into a decimal number.' },
        { formulaName: 'DEGREES', category: 'Math & Trig', description: 'Converts radians to degrees.' },
        { formulaName: 'ADDRESS', category: 'Lookup & Reference', description: 'Returns a cell reference as text, given specified row and column numbers.' },
        { formulaName: 'TIME', category: 'Date & Time', description: 'Converts hours, minutes, seconds to the time formatted text.' },
        { formulaName: 'CHAR', category: 'Text', description: 'Returns the character from the specified number.' },
        { formulaName: 'CODE', category: 'Text', description: 'Returns the numeric code for the first character in a given string.' },
        { formulaName: 'DOLLAR', category: 'Text', description: 'Converts the number to currency formatted text.' },
        { formulaName: 'SMALL', category: 'Statistical', description: 'Returns the k-th smallest value in a given array.' },
        { formulaName: 'LARGE', category: 'Statistical', description: 'Returns the k-th largest value in a given array.' },
        { formulaName: 'MEDIAN', category: 'Statistical', description: 'Returns the median of the given set of numbers.' },
        { formulaName: 'EDATE', category: 'Date & Time', description: 'Returns a date with given number of months before or after the specified date.' },
        { formulaName: 'DATEVALUE', category: 'Date & Time', description: 'Converts a date string into date value.' },
        { formulaName: 'HOUR', category: 'Date & Time', description: 'Returns the number of hours in a specified time string.' },
        { formulaName: 'MINUTE', category: 'Date & Time', description: 'Returns the number of minutes in a specified time string.' },
        { formulaName: 'SECOND', category: 'Date & Time', description: 'Returns the number of seconds in a specified time string.' },
        { formulaName: 'NOW', category: 'Date & Time', description: 'Returns the current date and time.' },
        { formulaName: 'MONTH', category: 'Date & Time', description: 'Returns the number of months in a specified date string.' },
        { formulaName: 'PROPER', category: 'Text', description: 'Converts a text to proper case; first letter to uppercase and other letters to lowercase.' }
    ];
    private isConcat: boolean = false;
    constructor(parent?: Calculate) {
        this.parent = parent;
        this.init();
    }

    private init(): void {
        let fn: Function;
        for (let i: number = 0; i < this.formulas.length; i++) {
            fn = getValue('Compute' + this.formulas[i].formulaName, this).bind(this);
            this.addFormulaCollection(
                this.formulas[i].formulaName.toUpperCase(), fn, this.formulas[i].category, this.formulas[i].description);
        }
    }

    private addFormulaCollection(
        formulaName: string, functionName: Function, formulaCategory: string, description: string): void {
        this.parent.libraryFormulas = {
            fName: formulaName, handler: functionName as Function, category: formulaCategory,
            description: description
        };
    }

    /**
     * @hidden
     * @param {string[]} args - specify the args
     * @returns {string | number} - Comput sum value
     */
    public ComputeSUM(...args: string[]): string | number {
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        let sum: number = 0;
        let val: string;
        let orgValue: number | string;
        if (!isNullOrUndefined(args)) {
            const argArr: string[] = args;
            for (let i: number = 0; i < argArr.length; i++) {
                const argValue: string = argArr[i].toString();
                if (argValue.indexOf(':') > -1 && this.parent.isCellReference(argValue)) {
                    const cellCollection: string[] | string = this.parent.getCellCollection(argValue.split(this.parent.tic).join(''));
                    for (let j: number = 0; j < cellCollection.length; j++) {
                        val = this.parent.getValueFromArg(cellCollection[j]);
                        if (this.parent.getErrorStrings().indexOf(val) > -1) {
                            return val;
                        }
                        if (isNullOrUndefined(val[0]) || isNaN(this.parent.parseFloat(val))) {
                            continue;
                        }
                        sum = sum + this.parent.parseFloat(val);
                    }
                } else {
                    if (argArr[i].split(this.parent.tic).join('') === this.parent.trueValue) {
                        argArr[i] = '1';
                    }
                    if (argArr[i].split(this.parent.tic).join('') === this.parent.falseValue) {
                        argArr[i] = '0';
                    }
                    orgValue = this.parent.getValueFromArg(argArr[i].split(this.parent.tic).join(''));
                    if (this.parent.getErrorStrings().indexOf(orgValue) > -1) {
                        return orgValue;
                    }
                    if (isNullOrUndefined(orgValue) || isNaN(this.parent.parseFloat(orgValue))) {
                        continue;
                    }
                    if (orgValue.length > 0) {
                        sum = sum + this.parent.parseFloat(orgValue + '');
                    }
                }
            }
        }
        return sum.toString().indexOf('.') > - 1 ? sum.toFixed(2) : sum;
    }

    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string | number} - Compute the Integer.
     */
    public ComputeINT(...args: string[]): string | number {
        let str: string; let num: number; let index: number;
        if (!isNullOrUndefined(args) && args.length !== 1 || args[0] === '') {
            str = this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        if (args[0] !== '' && args.length === 1) {
            str = args[0];
            index = str.indexOf('"');
            str = str.indexOf('"') > -1 ? str.replace('"', '') : str;
            str = str.indexOf('"') > -1 ? str.replace('"', '') : str;
            str = this.parent.getValueFromArg(str);
            str = str.toUpperCase() === 'TRUE' ? '1' : (str === 'FALSE' ? '0' : str);
            num = this.parent.parseFloat(str);
            num = Math.floor(num);
        }
        if (isNaN(num)) {
            str = index > -1 ? this.parent.getErrorStrings()[CommonErrors.value] : this.parent.getErrorStrings()[CommonErrors.name];
        }
        return num ? num : str;
    }

    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {Date | string} - Compute the Today.
     */
    public ComputeTODAY(...args: string[]): Date | string {
        let str: string;
        if (args && args[0] !== '') {
            str = this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        } else {
            const dt: Date = new Date(Date.now());
            if ((this.parent.parentObject as { getModuleName: Function }).getModuleName() === 'spreadsheet') {
                str = (this.parent.parentObject as { dateToInt: Function }).dateToInt(dt);
                if ((this.parent.parser as unknown as { storedStringText: string }).storedStringText.toUpperCase().indexOf('TODAY') === 0) {
                    (this.parent.parentObject as { setDateFormat: Function }).setDateFormat((this.parent as unknown as { getSheetId: Function }).getSheetId(this.parent.grid),
                        this.parent.rowIndex(this.parent.cell) - 1, this.parent.colIndex(this.parent.cell) - 1);
                }
            } else {
                str = dt.getFullYear() + '/' + this.parent.calculateDate((dt.getMonth() + 1).toString()) + '/'
                    + this.parent.calculateDate(dt.getDate().toString());
            }
        }
        return str;
    }

    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {number} - Compute the day from the date.
     */
    public ComputeWEEKDAY(...args: string[]): number | string {
        let day: number | string;
        if (args[0] === '') {
            day = this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        } else {
            const date: string = this.parent.getValueFromArg(args[0]);
            day = Math.ceil(Number(date)) % 7 || 7;
        }
        return day;
    }

    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string} - Compute to the Proper casing.
     */
    public ComputePROPER(...args: string[]): string {
        let str: string;
        if (args && args[0] === '' || args.length !== 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        } else {
            const arg1: string = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
            if (arg1 === this.parent.getErrorStrings()[CommonErrors.name]) {
                return this.parent.getErrorStrings()[CommonErrors.name];
            }
            const splitArgs1: string[] = arg1.toLowerCase().split(' ');
            for (let i: number = 0; i < splitArgs1.length; i++) {
                if (splitArgs1[i][0]) {
                    for (let j: number = 0; j < splitArgs1[i].length; j++) {
                        if (splitArgs1[i].charCodeAt(j) >= 97 && splitArgs1[i].charCodeAt(j) <= 122) {
                            splitArgs1[i] = splitArgs1[i].replace(splitArgs1[i][j], splitArgs1[i][j].toUpperCase());
                            break;
                        }
                    }
                }
            }
            str = splitArgs1.join(' ');
            if (str.indexOf('-') > 0) {
                const splitArgs2: string[] = str.split('-');
                for (let i: number = 0; i < splitArgs2.length; i++) {
                    if (splitArgs2[i][0]) {
                        for (let j: number = 0; j < splitArgs2[i].length; j++) {
                            if (splitArgs2[i].charCodeAt(j) >= 97 && splitArgs2[i].charCodeAt(j) <= 122) {
                                splitArgs2[i] = splitArgs2[i].replace(splitArgs2[i][j], splitArgs2[i][j].toUpperCase());
                                break;
                            }
                        }
                    }
                }
                str = splitArgs2.join('-');
            }
            if (str.indexOf(',') > 0) {
                const splitArgs3: string[] = str.split(',');
                for (let i: number = 0; i < splitArgs3.length; i++) {
                    if (splitArgs3[i][0]) {
                        for (let j: number = 0; j < splitArgs3[i].length; j++) {
                            if (splitArgs3[i].charCodeAt(j) >= 97 && splitArgs3[i].charCodeAt(j) <= 122) {
                                splitArgs3[i] = splitArgs3[i].replace(splitArgs3[i][j], splitArgs3[i][j].toUpperCase());
                                break;
                            }
                        }
                    }
                }
                str = splitArgs3.join(',');
            }
        }
        return str;
    }

    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string | number} - Compute the Sum product.
     */
    public ComputeSUMPRODUCT(...args: string[]): string | number {
        let sum: number = 0; let count: number = 0; let index: number;
        let mulValues: number[] = null;
        const ranges: string[] = args;
        for (let k: number = 0; k < ranges.length; ++k) {
            const range: string = ranges[k];
            if (!range.startsWith(this.parent.tic) && this.parent.isCellReference(range)) {
                let i: number = range.indexOf(':');
                const startRow: number = this.parent.rowIndex(range.substr(0, i));
                const endRow: number = this.parent.rowIndex(range.substr(i + 1));
                if (!(startRow !== -1 || endRow === -1) === (startRow === -1 || endRow !== -1)) {
                    return this.parent.getErrorStrings()[CommonErrors.name];
                }
                const col1: number = this.parent.colIndex(range.substr(0, i));
                const col2: number = this.parent.colIndex(range.substr(i + 1));
                if (mulValues === null) {
                    count = (endRow - startRow + 1) * (col2 - col1 + 1);
                    mulValues = [];
                    for (i = 0; i < count; ++i) {
                        mulValues[i] = 1; //To create required index.
                    }
                }
                i = 0;
                for (let row: number = startRow; row <= endRow; ++row) {
                    for (let col: number = col1; col <= col2; ++col) {
                        const cellRef: string = this.getSheetReference(range) + this.parent.convertAlpha(col) + (row);
                        const result: string = this.parent.getValueFromArg(cellRef);
                        if (!isNaN(parseFloat(result))) {
                            //To return #VALUE! error when array dimensions are mismatched.
                            if (isNaN(mulValues[i])) {
                                return this.parent.getErrorStrings()[CommonErrors.name];
                            }
                            mulValues[i] = mulValues[i] * parseFloat(result);
                        } else {
                            mulValues[i] = 0;
                        }
                        i++;
                    }
                }
            } else {
                const s1: string = this.parent.getValueFromArg(range);
                index = s1.indexOf('"');
                if (this.parent.getErrorStrings().indexOf(s1) > -1) {
                    return s1;
                } else if (index > -1) {
                    return 0;
                } else {
                    return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
                }
            }
        }
        for (let i: number = 0; i < count; ++i) {
            sum += mulValues[i];
        }
        return sum;
    }

    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string | number} - Compute the Roundup.
     */
    public ComputeROUNDUP(...args: string[]): string | number {
        let str: string; let num: number; let arg1: string; let arg2: string; let index: number;
        const len: number = args.length;
        if (!isNullOrUndefined(args) && len > 2) {
            str = this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        if (len === 1 && args[0] !== '') {
            index = args[0].indexOf('"');
            arg1 = args[0].indexOf('"') > -1 ? args[0].replace('"', '') : args[0];
            arg1 = arg1.indexOf('"') > -1 ? arg1.replace('"', '') : arg1;
            arg1 = arg1.toUpperCase() === 'TRUE' ? '1' : (arg1 === 'FALSE' ? '0' : arg1);
            arg1 = this.parent.getValueFromArg(arg1);
            num = this.parent.parseFloat(arg1);
            if (num > 0) {
                num += .4999999999; // To round the number, we using this value.
            } else if (num < 0) {
                num -= .4999999999;
            }
            num = this.parent.parseFloat(num.toFixed(0));
            str = num.toString();
        } else if (len === 2 && args[0] !== '' && args[1] !== '') {
            index = args[0].indexOf('"') > -1 ? args[0].indexOf('"') : (args[1].indexOf('"') > -1 ? args[1].indexOf('"') : -1);
            arg1 = args[0].indexOf('"') > -1 ? args[0].replace('"', '') : args[0];
            arg1 = arg1.indexOf('"') > -1 ? arg1.replace('"', '') : arg1;
            arg2 = args[1].indexOf('"') > -1 ? args[1].replace('"', '') : args[1];
            arg2 = arg2.indexOf('"') > -1 ? arg2.replace('"', '') : arg2;
            arg1 = arg1.toUpperCase() === 'TRUE' ? '1' : (arg1 === 'FALSE' ? '0' : arg1);
            arg2 = arg2.toUpperCase() === 'TRUE' ? '1' : (arg2 === 'FALSE' ? '0' : arg2);
            arg1 = this.parent.getValueFromArg(arg1);
            arg2 = this.parent.getValueFromArg(arg2);
            const digits: number = Math.ceil(this.parent.parseFloat(arg2));
            num = this.parent.parseFloat(arg1);
            if (digits > 0) {
                if (num > 0) {
                    num += .4999999999 / Math.pow(10, digits);
                } else if (num < 0) {
                    num -= .4999999999 / Math.pow(10, digits);
                }
                num = this.parent.parseFloat(num.toFixed(digits));
                str = num.toFixed(digits);
                if (isNaN(num)) {
                    if (digits.toString().indexOf('"') > - 1) {
                        str = this.parent.getErrorStrings()[CommonErrors.value];
                    } else {
                        str = this.parent.getErrorStrings()[CommonErrors.name];
                    }
                }
            } else {
                if (num > 0) {
                    num = (num / Math.pow(10, -digits)) + .49999;
                } else if (num < 0) {
                    num = (num / Math.pow(10, -digits)) - .49999;
                }
                num = this.parent.parseFloat(num.toFixed(0)) * Math.pow(10, -digits);
                str = num.toString();
                if (isNaN(num)) {
                    str = (digits.toString().indexOf('"') > - 1) ? this.parent.getErrorStrings()[CommonErrors.value] :
                        str = this.parent.getErrorStrings()[CommonErrors.name];
                }
            }
        } else {
            str = index > - 1 ? this.parent.getErrorStrings()[CommonErrors.value] :
                this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        return str;
    }
    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {number | string} - Compute the count.
     */
    public ComputeCOUNT(...args: string[]): number | string {
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        const argArr: string[] = args;
        let argVal: string | number;
        let cellColl: string[] | string;
        let result: number = 0;
        let cellValue: string;
        for (let i: number = 0; i < argArr.length; i++) {
            argVal = argArr[i];
            if (argVal.indexOf(':') > -1 && this.parent.isCellReference(argVal)) {
                cellColl = this.parent.getCellCollection(argVal.split(this.parent.tic).join(''));
                for (let j: number = 0; j < cellColl.length; j++) {
                    cellValue = this.parent.getValueFromArg(cellColl[j]);
                    if (!isNaN(this.parent.parseFloat(cellValue))) {
                        if (argVal.length > 0 && argVal !== '' && argVal !== ' ') {
                            result++;
                        }
                    }
                }
            } else {
                argVal = argVal.split(this.parent.tic).join('');
                if (!isNaN(this.parent.parseFloat(this.parent.getValueFromArg(argVal)))) {
                    if (argVal.length > 0 && argVal !== '' && argVal !== ' ') {
                        result++;
                    }
                }
            }
        }
        return result;
    }

    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {Date | string} - Compute the Date.
     */
    public ComputeDATE(...args: string[]): Date | string {
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        const argArr: string[] = args;
        if (argArr.length !== 3) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        for (let i: number = 0; i < argArr.length; ++i) {
            argArr[i] = this.parent.getValueFromArg(argArr[i]);
        }
        argArr[0] = (argArr[0].split(this.parent.tic).join('') === 'TRUE') ? '1' : (argArr[0].split(this.parent.tic).join('') === 'FALSE') ? '0' : argArr[0];
        argArr[1] = (argArr[1].split(this.parent.tic).join('') === 'TRUE') ? '1' : (argArr[1].split(this.parent.tic).join('') === 'FALSE') ? '0' : argArr[1];
        argArr[2] = (argArr[2].split(this.parent.tic).join('') === 'TRUE') ? '1' : (argArr[2].split(this.parent.tic).join('') === 'FALSE') ? '0' : argArr[2];
        /* eslint-enable */
        let year: number = this.parent.parseFloat(argArr[0].split(this.parent.tic).join(''));
        let month: number = this.parent.parseFloat(argArr[1].split(this.parent.tic).join(''));
        const day: number = this.parent.parseFloat(argArr[2].split(this.parent.tic).join(''));
        let days: number = 0;
        if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
            if (year < 0) {
                return this.parent.getErrorStrings()[CommonErrors.num].toString();
            }
            while (month > 12) {
                month -= 12;
                year++;
            }
            days = this.parent.getSerialDateFromDate(year, month, day);
        } else {
            return this.parent.getErrorStrings()[CommonErrors.value].toString();
        }
        if (days === 0) {
            return this.parent.getErrorStrings()[CommonErrors.num].toString();
        }
        const date: Date = this.parent.fromOADate(days);
        if (date.toString() !== 'Invalid Date') {
            return date.getFullYear() + '/' + this.parent.calculateDate((date.getMonth() + 1).toString()) + '/' + this.parent.calculateDate(date.getDate().toString());
        }
        return days.toString();
    }

    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {number | string} - Compute the ceiling.
     */
    public ComputeFLOOR(...args: string[]): number | string {
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        const argArr: string[] = args;
        const argCount: number = argArr.length;
        const splitArg: string = argArr[1].split(this.parent.tic).join('');
        const argValue: number[] = [];
        let fnum: number;
        let significance: number;
        if (argCount !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        argValue.push(fnum = this.parent.parseFloat(this.parent.getValueFromArg(argArr[0].split(this.parent.tic).join(''))));
        argArr[1] = (splitArg === this.parent.trueValue) ? '1' : (splitArg === this.parent.falseValue) ? '0' : argArr[1];
        argValue.push(significance = this.parent.parseFloat(this.parent.getValueFromArg(argArr[1].split(this.parent.tic).join(''))));
        if (fnum > 0 && significance < 0) {
            return this.parent.getErrorStrings()[CommonErrors.num];
        }
        if (fnum > 0 && significance === 0) {
            return this.parent.getErrorStrings()[CommonErrors.divzero];
        }
        for (let i: number = 0; i < argArr.length; i++) {
            if (argArr[i].indexOf(this.parent.tic) > -1) {
                return this.parent.getErrorStrings()[CommonErrors.value];
            }
        }
        if (isNaN(fnum)) {
            return this.parent.getErrorStrings()[CommonErrors.name];
        }
        return Math.floor(fnum / significance) * significance;
    }

    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {number | string} - Compute the ceiling.
     */
    public ComputeCEILING(...args: string[]): number | string {
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        const argArr: string[] = args;
        const orgValue: number[] = [];
        const argCount: number = argArr.length;
        const splitArg: string = argArr[1].split(this.parent.tic).join('');
        let cnum: number;
        let significance: number;
        if (argCount !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        orgValue.push(cnum = this.parent.parseFloat(this.parent.getValueFromArg(argArr[0].split(this.parent.tic).join(''))));
        argArr[1] = (splitArg === this.parent.trueValue) ? '1' : (splitArg === this.parent.falseValue) ? '0' : argArr[1];
        orgValue.push(significance = this.parent.parseFloat(this.parent.getValueFromArg(argArr[1].split(this.parent.tic).join(''))));
        if (cnum > 0 && significance < 0) {
            return this.parent.getErrorStrings()[CommonErrors.num];
        }
        for (let i: number = 0; i < argArr.length; i++) {
            if (argArr[i].indexOf(this.parent.tic) > -1) {
                return this.parent.getErrorStrings()[CommonErrors.value];
            }
        }
        if (isNaN(cnum)) {
            return this.parent.getErrorStrings()[CommonErrors.name];
        }
        if (significance === 0) {
            return 0;
        }
        return Math.ceil(cnum / significance) * significance;
    }

    /**
     * @hidden
     * @param {string[]} serialNumber - specify the serialNumber.
     * @returns {number | string} - Compute the DAY.
     */
    public ComputeDAY(...serialNumber: string[]): number | string {
        const date: string[] = serialNumber;
        let result: number | string;
        if (isNullOrUndefined(date) || (date.length === 1 && date[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        if (date.length > 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        const dateVal: string = this.parent.getValueFromArg(date[0].split(this.parent.tic).join(''));
        if (!isNaN(this.parent.parseFloat(dateVal))) {
            return this.parent.getErrorStrings()[CommonErrors.name];
        }
        // else {
        //     dateVal = dateVal;
        // }
        result = this.parent.parseDate(dateVal);
        if (Object.prototype.toString.call(result) === '[object Date]') {
            /* eslint-disable-next-line */
            result = (result as any).getDate();
        }
        return result;
    }

    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string | number} - Compute the IF value.
     */
    public ComputeIF(...args: string[]): string | number {
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        if (this.parent.getErrorStrings().indexOf(args[0]) > 0) {
            return args[0];
        }
        const argArr: string[] = args; let skipTick: boolean;
        if (argArr.length === 4 && argArr[3] === 'nestedFormulaTrue') { skipTick = true; argArr.pop(); }
        let condition: string;
        let result: string;
        if (argArr.length > 3 || argArr.length === 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        } else if (argArr.length <= 3) {
            condition = this.parent.getValueFromArg(argArr[0]);
            if (this.parent.getErrorStrings().indexOf(condition) > -1) {
                return condition;
            }
            if (condition === this.parent.trueValue || this.parent.parseFloat(condition) > 0 || this.parent.parseFloat(condition) < 0) {
                result = this.parent.getValueFromArg(argArr[1]);
            } else if (condition === this.parent.falseValue || this.parent.parseFloat(condition) === 0) {
                if (isNullOrUndefined(argArr[2])) {
                    return this.parent.falseValue;
                }
                result = this.parent.getValueFromArg(argArr[2]);
            } else {
                return this.parent.formulaErrorStrings[FormulasErrorsStrings.requires_3_args];
            }
        }
        if (!skipTick && result.indexOf(this.parent.tic) > -1) {
            return result.split(this.parent.tic).join('');
        } else {
            return result;
        }
    }

    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {number | string} - Compute the IFERROR value.
     */
    public ComputeIFERROR(...args: string[]): number | string {
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        const argArr: string[] = args;
        let condition: string;
        if (argArr.length !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        condition = this.parent.getValueFromArg(argArr[0]);
        if (condition === this.parent.trueValue || condition === this.parent.falseValue) {
            return condition;
        }
        if (condition[0] === this.parent.arithMarker) {
            condition = condition.replace(this.parent.arithMarker, ' ');
        }
        condition = this.parent.getValueFromArg(condition).toUpperCase().split(this.parent.tic).join('');
        if (condition[0] === '#' || condition.indexOf('Infinity') > -1 || this.parent.getErrorStrings().indexOf(condition) > -1) {
            return this.parent.getValueFromArg(argArr[1]).split(this.parent.tic).join('');
        } else {
            return condition;
        }
    }

    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string | number} - Compute the PRODUCT value.
     */
    public ComputePRODUCT(...range: string[]): string | number {
        if (isNullOrUndefined(range) || (range.length === 1 && range[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        let product: number = 1;
        let val: string;
        let orgValue: string;
        let argsHit: boolean = true;
        let parseVal: number;
        if (!isNullOrUndefined(range)) {
            const argArr: string[] = range;
            for (let i: number = 0; i < argArr.length; i++) {
                const rangevalue: string = argArr[i];
                if (rangevalue.indexOf(':') > -1 && this.parent.isCellReference(rangevalue)) {
                    const cellCollection: string[] | string = this.parent.getCellCollection(rangevalue);
                    for (let j: number = 0; j < cellCollection.length; j++) {
                        val = this.parent.getValueFromArg(cellCollection[j].split(this.parent.tic).join(''));
                        if (this.parent.getErrorStrings().indexOf(val) > -1) {
                            return val;
                        }
                        val = (val.split(this.parent.tic).join('') === 'TRUE') ? '1' :
                            (val.split(this.parent.tic).join('') === 'FALSE') ? '0' : val;
                        parseVal = this.parent.parseFloat(val);
                        if (!isNaN(parseVal)) {
                            if (val.length > 0) {
                                product = product * parseVal;
                                argsHit = false;
                            }
                        }
                    }
                } else {
                    orgValue = this.parent.getValueFromArg(argArr[i].split(this.parent.tic).join(''));
                    if (this.parent.getErrorStrings().indexOf(orgValue) > -1) {
                        return orgValue;
                    }
                    orgValue = (orgValue.split(this.parent.tic).join('') === 'TRUE') ? '1' :
                        (orgValue.split(this.parent.tic).join('') === 'FALSE') ? '0' : orgValue;
                    parseVal = this.parent.parseFloat(orgValue);
                    if (!isNaN(parseVal)) {
                        if (orgValue.length > 0) {
                            product = product * parseVal;
                            argsHit = false;
                        }
                    }
                    if (this.parent.getErrorStrings().indexOf(orgValue) > -1) {
                        return orgValue;
                    }
                }
            }
        }
        return argsHit ? '0' : product.toString();
    }

    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string | number} - Compute the Choose value.
     */
    public ComputeDAYS(...range: string[]): number | string {
        let result: number | string;
        if (isNullOrUndefined(range) && (range.length === 1 && range[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        if (range.length !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        const argsArr: string[] = range;
        if (argsArr[0].split(this.parent.tic).join('') === this.parent.trueValue) {
            argsArr[0] = '1';
        }
        if (argsArr[0].split(this.parent.tic).join('') === this.parent.falseValue) {
            argsArr[0] = '0';
        }
        let endDate: string = this.parent.getValueFromArg(argsArr[0].split(this.parent.tic).join(''));
        let startDate: string = this.parent.getValueFromArg(argsArr[1].split(this.parent.tic).join(''));
        startDate = (startDate === '' || startDate == null) ? new Date(Date.parse('1899-12-31')).toDateString() : startDate;
        endDate = (endDate === '' || endDate == null) ? new Date(Date.parse('1899-12-31')).toDateString() : endDate;
        if (endDate[0] === '#') {
            return endDate;
        }
        if (startDate[0] === '#') {
            return startDate;
        }
        const d1: string | Date = this.parent.intToDate(endDate);
        const d2: string | Date = this.parent.intToDate(startDate);
        if (d1.toString()[0] === '#') {
            return d1.toString();
        }
        if (d2.toString()[0] === '#') {
            return d2.toString();
        }
        if (Object.prototype.toString.call(d1) === '[object Date]' && Object.prototype.toString.call(d2) === '[object Date]') {
            /* eslint-disable-next-line */
            result = Math.ceil((d1 as any).getTime() - (d2 as any).getTime()) / (1000 * 3600 * 24);
        } else {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        return Math.round(result);
    }

    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {number | string} - Compute the unique.
     */
    public ComputeUNIQUE(...args: string[]): number | string {
        const argArr: string[] = args; let result: string;
        if (isNullOrUndefined(args) || args[0] === '' || argArr.length > 3) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        const byCol: string = argArr[1] ? argArr[1].toUpperCase() : 'FALSE';
        const exactlyOne: string = argArr[2] ? argArr[2].toUpperCase() : 'FALSE';
        const uniqueCollection: string[] = [];
        let actCell: string = this.parent.actCell;
        if (argArr[0].indexOf(':') > -1) {
            if (isNullOrUndefined(argArr[0].match(/[0-9]/))) {
                const splitArray: string[] = argArr[0].split(':');
                argArr[0] = splitArray[0] + '1' + ':' + splitArray[1] + (this.parent.spreadSheetUsedRange[0] + 1);
            } else if (isNullOrUndefined(argArr[0].toUpperCase().match(/[A-Z]/))) {
                const splitArray: string[] = argArr[0].split(':');
                argArr[0] = 'A' + splitArray[0] + ':' + getAlphalabel(this.parent.spreadSheetUsedRange[1] + 1) + splitArray[1];
            }
            const rangeSplit: string[] = argArr[0].split(':');
            if (this.parent.isCellReference(rangeSplit[0]) && this.parent.isCellReference(rangeSplit[1])) {
                const collection: string[] = this.parent.dependencyCollection;
                for (let i: number = 0; i < collection.length; i++) {
                    if (collection[i].split(':')[0] === argArr[0].split(':')[0]) {
                        this.clearDependency(collection[i]);
                    }
                }
                if (this.parent.dependencyCollection.indexOf(argArr[0]) === -1) {
                    this.parent.dependencyCollection.push(argArr[0]);
                } else { this.clearDependency(argArr[0]); }
                const j: number = argArr[0].indexOf(':'); let swap: number;
                let rowIdx: number = this.parent.rowIndex(this.parent.substring(argArr[0], 0, j));
                let colIdx: number = this.parent.colIndex(this.parent.substring(argArr[0], 0, j));
                let endRowIdx: number = this.parent.rowIndex(this.parent.substring(argArr[0], j + 1, j + argArr[0].length - j - 1));
                let endColIdx: number = this.parent.colIndex(this.parent.substring(argArr[0], j + 1, j + argArr[0].length - j - 1));
                if (rowIdx > endRowIdx) {
                    swap = endRowIdx; endRowIdx = rowIdx; rowIdx = swap;
                }
                if (colIdx > endColIdx) {
                    swap = endColIdx; endColIdx = colIdx; colIdx = swap;
                }
                let sheetIndex: string | number = '';
                if (argArr[0].indexOf('!') === 0) {
                    sheetIndex = argArr[0].substring(0, argArr[0].replace('!', '').indexOf('!') + 2);
                }
                argArr[0] = sheetIndex + getAlphalabel(colIdx) + rowIdx + ':' + getAlphalabel(endColIdx) + endRowIdx;

                const cellRange: string | string[] = this.parent.getCellCollection(argArr[0]);
                const colDiff: number = endColIdx - colIdx; const cellValues: string[] = [];
                for (let i: number = 0; i < cellRange.length; i++) {
                    cellValues.push(cellRange[i]);
                }
                if (byCol === 'FALSE') {
                    if (colDiff === 0) {
                        for (let i: number = 0; i < cellValues.length; i++) {
                            let val: string = this.parent.getValueFromArg(cellValues[i]);
                            val = val === '' ? '0' : val;
                            uniqueCollection.push(val);
                        }
                    } else {
                        let temp: string = ''; let diff: number = colDiff;
                        for (let i: number = 0; i < cellValues.length; i++) {
                            if (i === cellValues.length - 1) {
                                let val: string = this.parent.getValueFromArg(cellValues[i]);
                                val = val === '' ? '0' : val;
                                temp = temp + val + '+';
                                uniqueCollection.push(temp.substring(0, temp.length - 1));
                            }
                            if (i <= diff) {
                                let val: string = this.parent.getValueFromArg(cellValues[i]);
                                val = val === '' ? '0' : val;
                                temp = temp + val + '+';
                            } else {
                                uniqueCollection.push(temp.substring(0, temp.length - 1));
                                diff = colDiff + i;
                                let val: string = this.parent.getValueFromArg(cellValues[i]);
                                val = val === '' ? '0' : val;
                                temp = val + '+';
                            }
                        }
                    }
                } else {
                    let temp: string = ''; const diff: number = colDiff + 1; const rowDiff: number = endRowIdx - rowIdx;
                    for (let i: number = 0; i < diff; i++) {
                        for (let j: number = 0; j <= rowDiff; j++) {
                            let val: string = this.parent.getValueFromArg(cellValues[j * diff + i]);
                            val = val === '' ? '0' : val;
                            temp = temp + val + '+';
                        }
                        uniqueCollection.push(temp.substring(0, temp.length - 1));
                        temp = '';
                    }
                }
                let tmp: string[] = []; const tmp2: string[] = [];
                for (let i: number = 0; i < uniqueCollection.length; i++) {
                    if (tmp.indexOf(uniqueCollection[i]) === -1) {
                        tmp.push(uniqueCollection[i]);
                    } else {
                        tmp2.push(uniqueCollection[i]);
                    }
                }
                if (exactlyOne === 'TRUE') {
                    const exactOne: string[] = [];
                    for (let i: number = 0; i < tmp.length; i++) {
                        if (tmp2.indexOf(tmp[i]) === -1) {
                            exactOne.push(tmp[i]);
                        }
                    }
                    tmp = exactOne;
                }
                actCell = actCell.indexOf('!') > - 1 ? actCell.split('!')[1] : actCell;
                let actRowIdx: number = this.parent.rowIndex(actCell);
                let actColIdx: number = this.parent.colIndex(actCell);
                if (this.parent.dependencyLevel === 0) {
                    let isSpill: boolean = false;
                    if (byCol === 'FALSE') {
                        for (let i: number = actRowIdx, diff: number = tmp.length + actRowIdx; i < diff; i++) {
                            const splitValue: string[] = tmp[0].split('+');
                            for (let j: number = actColIdx, diff2: number = splitValue.length + actColIdx; j < diff2; j++) {
                                if (i === diff - 1 && j === diff2 - 1 &&
                                    this.parent.uniqueRange.indexOf(this.parent.actCell + ':' + getAlphalabel(j) + i) === - 1) {
                                    this.parent.uniqueRange.push(this.parent.actCell + ':' + getAlphalabel(j) + i);
                                }
                                if (this.checkSpill(j, i)) {
                                    isSpill = true;
                                }
                            }
                        }
                    } else {
                        for (let i: number = actColIdx, diff: number = tmp.length + actColIdx; i < diff; i++) {
                            const splitValue: string[] = tmp[0].split('+');
                            for (let j: number = actRowIdx, diff2: number = splitValue.length + actRowIdx; j < diff2; j++) {
                                if (i === diff - 1 && j === diff2 - 1 &&
                                    this.parent.uniqueRange.indexOf(this.parent.actCell + ':' + getAlphalabel(i) + j) === - 1) {
                                    this.parent.uniqueRange.push(this.parent.actCell + ':' + getAlphalabel(i) + j);
                                }
                                if (this.checkSpill(i, j)) {
                                    isSpill = true;
                                }
                            }
                        }
                    }
                    if (isSpill) {
                        return this.parent.formulaErrorStrings[FormulasErrorsStrings.spill];
                    }
                } else if (this.parent.dependencyLevel > 0 &&
                    this.parent.getValueFromArg(getAlphalabel(actColIdx) + actRowIdx, true).indexOf('#SPILL!') > - 1) {
                    return this.parent.formulaErrorStrings[FormulasErrorsStrings.spill];
                }
                if (byCol === 'FALSE') {
                    const calcFamily: CalcSheetFamilyItem = this.parent.getSheetFamilyItem(this.parent.grid);
                    let token: string = ''; let cellTxt: string;
                    if (calcFamily.sheetNameToParentObject !== null && calcFamily.sheetNameToParentObject.size > 0) {
                        token = calcFamily.parentObjectToToken.get(this.parent.grid);
                        cellTxt = token + actCell;
                    }
                    for (let i: number = 0; i < tmp.length; i++) {
                        const splitValue: string[] = tmp[i].split('+');
                        if (i > 0) {
                            actRowIdx++;
                            actColIdx = this.parent.colIndex(actCell);
                        }
                        for (let j: number = 0; j < splitValue.length; j++) {
                            this.setValueRefresh(splitValue[j], actRowIdx, actColIdx, actCell);
                            if (i > 0 || j > 0) {
                                this.parent.refresh(token + getAlphalabel(actColIdx) + actRowIdx.toString(), cellTxt);
                            }
                            if (splitValue[j + 1]) {
                                actColIdx++;
                            }
                        }
                    }
                    result = tmp[0].split('+')[0];
                } else {
                    for (let i: number = 0; i < tmp.length; i++) {
                        const splitValue: string[] = tmp[i].split('+');
                        for (let i: number = 0; i < splitValue.length; i++) {
                            this.setValueRefresh(splitValue[i], actRowIdx, actColIdx, actCell);
                            if (splitValue[i + 1]) {
                                actRowIdx++;
                            } else {
                                actColIdx++;
                                actRowIdx = this.parent.rowIndex(actCell);
                            }
                        }
                    }
                    result = tmp[0].split('+')[0];
                }
            }
        } else if (this.parent.isCellReference(argArr[0])) {
            if (this.parent.dependencyCollection.indexOf(argArr[0]) === -1) {
                this.parent.dependencyCollection.push(argArr[0]);
            } else { this.clearDependency(argArr[0]); }
            result = this.parent.getValueFromArg(argArr[0]);
        }
        return result;
    }

    private setValueRefresh(splitValue: string, rowIdx: number, colIdx: number, actCell: string): void {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this.parent.parentObject as any).setValueRowCol(this.parent.getSheetID(this.parent.grid) + 1,
        splitValue, rowIdx, colIdx);
    }

    private checkSpill(i: number, j: number): boolean {
        let spill: boolean = false;
        const value: string = this.parent.getValueFromArg(getAlphalabel(i) + j, true);
        const formulaAddress: string = '!' + this.parent.getSheetID(this.parent.grid) + '!' + getAlphalabel(i) + j;
        let formulaString: string;
        if (this.parent.getFormulaInfoTable().get(formulaAddress)) {
            formulaString = this.parent.getFormulaInfoTable().get(formulaAddress).formulaText;
        }
        if (value && (value.indexOf('UNIQUE') < 0 ||
            (formulaString && !formulaString.toUpperCase().includes('UNIQUE'))) &&
            value !== this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments]) {
            spill = true;
        }
        return spill;
    }

    public clearDependency(value: string): void {
        let actCell: string = this.parent.actCell;
        actCell = actCell.indexOf('!') > - 1 ? actCell.split('!')[1] : actCell;
        const actRowIdx: number = this.parent.rowIndex(actCell);
        const actColIdx: number = this.parent.colIndex(actCell);
        const j: number = value.indexOf(':');
        const rowIndex: number = this.parent.rowIndex(this.parent.substring(value, 0, j));
        const colIndex: number = this.parent.colIndex(this.parent.substring(value, 0, j));
        const eRowIdx: number = this.parent.rowIndex(this.parent.substring(value, j + 1, j + value.length - j - 1));
        const eColIdx: number = this.parent.colIndex(this.parent.substring(value, j + 1, j + value.length - j - 1));
        const rowDiff: number = eRowIdx - rowIndex + actRowIdx; const colDiff: number = eColIdx - colIndex + actColIdx;
        const formulaText: string = this.parent.getFormulaInfoTable().get('!' + this.parent.getSheetID(this.parent.grid) + '!' + actCell) ?
            this.parent.getFormulaInfoTable().get('!' + this.parent.getSheetID(this.parent.grid) + '!' + actCell).getFormulaText() : '';
        for (let i: number = actRowIdx; i <= rowDiff; i++) {
            for (let j: number = actColIdx; j <= colDiff; j++) {
                if (this.parent.dependencyLevel > 0 || formulaText.indexOf('UNIQUE') > - 1) {
                    if (this.parent.getValueFromArg('!' + this.parent.getSheetID(this.parent.grid) + '!' +
                        getAlphalabel(actColIdx) + actRowIdx, true).indexOf('#SPILL!') > - 1) {
                        return;
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (this.parent.parentObject as any).setValueRowCol(this.parent.getSheetID(this.parent.grid) + 1, '', i, j);
                    this.parent.refresh('!' + this.parent.getSheetID(this.parent.grid) + '!' + getAlphalabel(j) + i, actCell);
                    this.parent.actCell = actCell;
                }
            }
        }
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string} - Compute the text or null value.
     */
    public ComputeT(...args: string[]): string {
        let result: string = '';
        if (isNullOrUndefined(args) || args.length !== 1 || args[0] === '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        let value: string = args[0];
        value = value.indexOf(':') > - 1 ? value.split(':')[0] : value;
        value = this.parent.getValueFromArg(value);
        const letters: RegExp = /^[0-9.]+$/;
        if (value.match(letters) === null && value.toUpperCase() !== 'TRUE' && value.toUpperCase() !== 'FALSE') {
            result = value;
        }
        return result;
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the hours.
     */
    public ComputeHOUR(...args: string[]): number | string  {
        if (args.length !== 1 || isNullOrUndefined(args)) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        if (args[0] === '') {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        if (!this.parent.isCellReference(args[0]) && args[0].indexOf(this.parent.tic) === - 1) {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        let cellVal: string = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
        cellVal = this.parent.intToTime(cellVal);
        let date: Date = new Date(Date.parse(cellVal));
        const hValue: number = parseInt(cellVal, 10);
        if (hValue < 0) {
            return this.parent.getErrorStrings()[CommonErrors.num];
        }
        if (date.toString() === 'Invalid Date') {
            const argVal: string = (new Date(Date.now())).toLocaleDateString() + ' ' + cellVal;
            date = new Date(Date.parse(argVal));
        }
        if (date.toString() === 'Invalid Date') {
            date = this.parent.fromOADate(parseInt(cellVal, 10));
        }
        if (date.toString() === 'Invalid Date') {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        return date.getHours();
    }

    /**
     * @hidden
     * @param {string} argArr - specify the args.
     * @returns {string | boolean} - Compute the hours.
     */
    public ComputeMINUTE(...argArr: string[]): number | string  {
        if (argArr.length !== 1 || isNullOrUndefined(argArr)) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        if (argArr[0] === '') {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        if (!this.parent.isCellReference(argArr[0]) && argArr[0].indexOf(this.parent.tic) === - 1) {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        let cellVal: string = this.parent.getValueFromArg(argArr[0]).split(this.parent.tic).join('');
        cellVal = this.parent.intToTime(cellVal);
        let dateVal: Date = new Date(Date.parse(cellVal));
        const MValue: number = parseInt(cellVal, 10);
        if (MValue < 0) {
            return this.parent.getErrorStrings()[CommonErrors.num];
        }
        if (dateVal.toString() === 'Invalid Date') {
            const argVal: string = (new Date(Date.now())).toLocaleDateString() + ' ' + cellVal;
            dateVal = new Date(Date.parse(argVal));
        }
        if (dateVal.toString() === 'Invalid Date') {
            dateVal = this.parent.fromOADate(parseInt(cellVal, 10));
        }
        if (dateVal.toString() === 'Invalid Date') {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        return dateVal.getMinutes();
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the hours.
     */
    public ComputeSECOND(...args: string[]): number | string  {
        if (args.length !== 1 || isNullOrUndefined(args)) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        if (!this.parent.isCellReference(args[0]) && args[0].indexOf(this.parent.tic) === - 1) {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        if (args[0] === '') {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        let cellVal: string = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
        cellVal = this.parent.intToTime(cellVal);
        let dateValue: Date = new Date(Date.parse(cellVal));
        const sValue: number = parseInt(cellVal, 10);
        if (sValue < 0) {
            return this.parent.getErrorStrings()[CommonErrors.num];
        }
        if (dateValue.toString() === 'Invalid Date') {
            const argVal: string = (new Date(Date.now())).toLocaleDateString() + ' ' + cellVal;
            dateValue = new Date(Date.parse(argVal));
        }
        if (dateValue.toString() === 'Invalid Date') {
            dateValue = this.parent.fromOADate(parseInt(cellVal, 10));
        }
        if (dateValue.toString() === 'Invalid Date') {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        return dateValue.getSeconds();
    }
    /**
     * @hidden
     * @param {string} argsVal - specify the args.
     * @returns {string | boolean} - Compute the months.
     */
    public ComputeMONTH(...argsVal: string[]): number | string {
        if (argsVal[0] === '') {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        if (argsVal.length !== 1 || isNullOrUndefined(argsVal)) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        if (!this.parent.isCellReference(argsVal[0]) && argsVal[0].indexOf(this.parent.tic) === - 1) {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        const format: string = this.spreadsheetFormat(argsVal[0]);
        const displayText: string = this.spreadsheetDisplayText(argsVal[0]);
        const cellVal: string = this.parent.getValueFromArg(argsVal[0]).split(this.parent.tic).join('');
        const dateValue: number = this.parseDouble(cellVal);
        let month: number = 0;
        let date: Date  = new Date(Date.parse(cellVal));
        if (!isNaN(dateValue) && date.getFullYear() > 9999) {
            date = this.parent.fromOADate(dateValue);
        }
        const mValue: number = parseInt(cellVal, 10);
        if (mValue < 0) {
            return this.parent.getErrorStrings()[CommonErrors.num];
        }
        if (mValue === 0 && cellVal !== format && format.indexOf('h:mm') > - 1) {
            date = this.parent.fromOADate(parseInt(displayText, 10));
        }
        if (date.toString() === 'Invalid Date') {
            date = this.parent.fromOADate(parseInt(cellVal, 10));
        }
        if (date.toString() === 'Invalid Date') {
            return this.parent.getErrorStrings()[CommonErrors.value];
        } else if (date.toString() !== 'Invalid Date') {
            month = date.getMonth() + 1;
        }
        return month.toString();
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string } - Compute the time and date value.
     */
    public ComputeNOW(...args: string[]): string {
        if (args.length !== 1 || args[0] !== '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        const date: Date = new Date(Date.now());
        const intl: Internationalization = new Internationalization();
        const dFormatter: Function = intl.getDateFormat({ format: 'M/d/yyyy h:mm a' });
        return dFormatter(date);
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the exact value or not.
     */
    public ComputeEXACT(...args: string[]): string | boolean {
        let result: boolean = false;
        if (isNullOrUndefined(args) || args.length !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        const value2: string = this.parent.getValueFromArg(args[1]).split(this.parent.tic).join('');
        const value1: string = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
        if (value1 === value2) {
            result = true;
        }
        return result;
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the exact value or not.
     */
    public ComputeLEN(...args: string[]): string | number  {
        if (isNullOrUndefined(args) || args.length !== 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        } else if (args[0] === '') {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        const value: string = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
        if (value === '#NAME?') { return this.parent.getErrorStrings()[CommonErrors.name]; }
        return value.length;
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the remainder from the given numbers.
     */
    public ComputeMOD(...args: string[]): string | number  {
        if (isNullOrUndefined(args) || args.length !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        const value1: string = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
        const value2: string = this.parent.getValueFromArg(args[1]).split(this.parent.tic).join('');
        if (value2 === '' || value2 === '0') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.div];
        } else if (value1 === '' || value1 === '0') {
            return '0';
        } else if (value1 === '#NAME?' || value2 === '#NAME?') {
            return this.parent.getErrorStrings()[CommonErrors.name];
        } else if (value1.toUpperCase().match(/[A-Z]/) || value2.toUpperCase().match(/[A-Z]/)) {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        let result: number = parseFloat(value1.replace('-', '')) % parseFloat(value2);
        if (parseFloat(value2) < 0) { result = result * - 1; }
        if (isNaN(result)) { return this.parent.getErrorStrings()[CommonErrors.name]; }
        return result;
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the next odd number.
     */
    public ComputeODD(...args: string[]): string | number  {
        if (args[0] === '') {
            return this.parent.getErrorStrings()[CommonErrors.value];
        } else if (isNullOrUndefined(args) || args.length !== 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        let val: string = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
        if (val === '#NAME?') {
            return this.parent.getErrorStrings()[CommonErrors.name];
        } else if (val === '') {
            val = '0';
        } else if (val.toUpperCase().match(/[A-Z]/)) {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        let result: number = Math.ceil(parseInt(val, 10));
        const isOne: boolean = result === 0;
        result = result % 2 === 0 ? (result > 0 ? result + 1 : result - 1) : result;
        if (Math.ceil(parseInt(val, 10)) % 2 !== 0) {
            if (parseInt(val, 10) > 0 && parseFloat(val) > parseInt(val, 10)) {
                result = result + 2;
            } else if (parseInt(val, 10) < 0 && parseFloat(val) < parseInt(val, 10)) {
                result = result - 2;
            }
        }
        if (isNaN(result)) { return this.parent.getErrorStrings()[CommonErrors.name]; }
        return isOne ? 1 : result;
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the next even number.
     */
    public ComputeEVEN(...args: string[]): string | number  {
        if (isNullOrUndefined(args) || args.length !== 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        } else if (args[0] === '') {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        let value1: string = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
        if (value1 === '#NAME?') {
            return this.parent.getErrorStrings()[CommonErrors.name];
        } else if (value1 === '') {
            value1 = '0';
        } else if (value1.toUpperCase().match(/[A-Z]/)) {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        let result: string | number = Math.ceil(parseFloat(value1));
        result = result % 2 === 0 ? result : (result > 0 ? result + 1 : result - 1);
        if (Math.ceil(parseFloat(value1)) % 2 === 0) {
            if (parseInt(value1, 10) > 0 && parseFloat(value1) > parseInt(value1, 10)) {
                result = result + 2;
            } else if (parseInt(value1, 10) < 0 && parseFloat(value1) < parseInt(value1, 10)) {
                result = result - 2;
            }
        }
        if (isNaN(result)) { return this.parent.getErrorStrings()[CommonErrors.name]; }
        return result;
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the value of pi.
     */
    public ComputePI(...args: string[]): string | number  {
        let result: string | number;
        if (args && args[0] !== '') {
            result = this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        } else {
            result = Math.PI;
        }
        return result;
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the median value.
     */
    public ComputeMEDIAN(...args: string[]): string | number  {
        let value1: number;
        if (isNullOrUndefined(args) || args[0] === '' || args.length !== 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        const cellCollection: string[] | string = this.parent.getCellCollection(args[0]);
        let num: number[] = [];
        for (let a: number = 0; a < cellCollection.length; a++) {
            num.push(parseInt(this.parent.getValueFromArg(cellCollection[a]).split(this.parent.tic).join(''), 10));
        }
        num = num.sort((n1: number, n2: number) => n1 - n2);
        const len: number = num.length;
        for (let j: number = 0; j < len; j++) {
            if (isNaN(num[j])) {
                num.splice(j, 1);
                j--;
                if (num.length === 0) {
                    break;
                }
            }
        }
        if (num.length % 2 !== 0 && num[parseInt((num.length / 2).toString(), 10)]) {
            value1 = num[parseInt((num.length / 2).toString(), 10)];
        } else if (!isNaN(num[num.length / 2]) && !isNaN(num[num.length / 2 - 1])) {
            value1 = (num[num.length / 2] + num[num.length / 2 - 1]) / 2;
        } else {
            return this.parent.getErrorStrings()[CommonErrors.num];
        }
        return value1;
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the edate value.
     */
    public ComputeEDATE(...args: string[]): Date | string  {
        let date: Date; let mValue: string | number;
        if (args.length !== 2 || isNullOrUndefined(args)) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        } else if (args[0] === '') {
            return this.parent.getErrorStrings()[CommonErrors.value];
        } else {
            const dValue: string = this.parent.getValueFromArg(args[0]);
            mValue = this.parent.getValueFromArg(args[1]);
            mValue = parseInt(mValue, 10);
            if (isNaN(mValue)) {
                return this.parent.getErrorStrings()[CommonErrors.num];
            }
            date  = (isNaN(parseInt(dValue, 10))) ? new Date(Date.parse(dValue)) : this.parent.fromOADate(parseInt(dValue, 10));
            if (isNullOrUndefined(this.parent.isDate(date))) { return this.parent.getErrorStrings()[CommonErrors.value]; }
        }
        return new Date(date.setMonth(date.getMonth() + mValue)).toLocaleDateString();
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the date value.
     */
    public ComputeDATEVALUE(...args: string[]): Date | string  {
        let date: Date; let dValue: string;
        if (args.length !== 1 || isNullOrUndefined(args)) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        } else if (args[0] === '' || this.parent.isCellReference(args[0])) {
            return this.parent.getErrorStrings()[CommonErrors.value];
        } else {
            if (args[0].indexOf(this.parent.tic) === - 1) { return this.parent.getErrorStrings()[CommonErrors.value]; }
            dValue = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
            date  = (isNaN(parseInt(dValue, 10))) ? new Date(Date.parse(dValue)) : this.parent.fromOADate(parseInt(dValue, 10));
            if (isNullOrUndefined(this.parent.isDate(date)) || parseInt(dValue, 10).toString().length !== 5) {
                return this.parent.getErrorStrings()[CommonErrors.value];
            }
            if (this.parent.isDate(dValue) && this.parent.isDate(dValue).getFullYear().toString().length !== 4) {
                return this.parent.getErrorStrings()[CommonErrors.value];
            }
        }
        return parseFloat(dValue).toFixed(0).toString();
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the count blank value.
     */
    public ComputeCOUNTBLANK(...args: string[]): string | number  {
        let result: number = 0;
        if (args.length !== 1 || isNullOrUndefined(args) || !this.parent.isCellReference(args[0])) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        } else if (args[0] === '') {
            return this.parent.getErrorStrings()[CommonErrors.value];
        } else {
            const cellRange: string | string[] = this.parent.getCellCollection(args[0]);
            for (let i: number = 0; i < cellRange.length; i++) {
                if (this.parent.getValueFromArg(cellRange[i]) === '') {
                    result++;
                }
            }
        }
        return result;
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the factorial value.
     */
    public ComputeFACT(...args: string[]): string | number  {
        let fact: number = 1;
        if (isNullOrUndefined(args) || args.length !== 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        } else if (args[0] === '') {
            return this.parent.getErrorStrings()[CommonErrors.value];
        } else {
            const value: number = parseInt(this.parent.getValueFromArg(args[0]).split(this.parent.tic).join(''), 10);
            if (this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('').toUpperCase().match(/[A-Z]/)) {
                return this.parent.getErrorStrings()[CommonErrors.value];
            }
            if (value < 0) { return this.parent.getErrorStrings()[CommonErrors.num]; }
            for (let i: number = 1; i <= value; i++) {
                fact = fact * i;
            }
        }
        return fact;
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the decimal value.
     */
    public ComputeDECIMAL(...args: string[]): string | number  {
        let value: number;
        if (isNullOrUndefined(args) || args.length !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        } else {
            const val: string = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
            const val1: string = this.parent.getValueFromArg(args[1]).split(this.parent.tic).join('');
            if (val === '' && val1 !== '') {
                return 0;
            } else if (val !== '' && val1 === '') {
                return this.parent.getErrorStrings()[CommonErrors.value];
            }
            if (isNaN(parseInt(val1, 10))) {
                return this.parent.getErrorStrings()[CommonErrors.value];
            }
            value = parseInt(val, parseInt(val1, 10));
        }
        return isNaN(value) ? this.parent.getErrorStrings()[CommonErrors.name] : value;
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the degrees value.
     */
    public ComputeDEGREES(...args: string[]): string | number  {
        let value: number;
        if (isNullOrUndefined(args) || args.length !== 1 || args[0] === '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        } else {
            const pi: number = Math.PI;
            const val: string = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
            if (val.toUpperCase().match(/[A-Z]/)) {
                return this.parent.getErrorStrings()[CommonErrors.value];
            }
            if (isNaN(parseInt(val, 10))) {
                return this.parent.getErrorStrings()[CommonErrors.value];
            }
            value = parseFloat(val) * (180 / pi);
        }
        return parseInt(value.toString(), 10);
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the cell address.
     */
    public ComputeADDRESS(...args: string[]): string | number  {
        let value: string;
        if (isNullOrUndefined(args) || args.length > 5 || args[0] === '' || args[1] === '' || args.length < 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        args[2] = args[2] ? args[2] : '1';
        args[3] = args[3] ? args[3] : 'TRUE';
        let rowIndex: string = this.parent.getValueFromArg(args[0]);
        let colIndex: string = this.parent.getValueFromArg(args[1]);
        let absIndex: string = this.parent.getValueFromArg(args[2]);
        let refStyle: string = this.parent.getValueFromArg(args[3]);

        absIndex = absIndex.split(this.parent.tic).join('');
        refStyle = refStyle.split(this.parent.tic).join('');
        rowIndex = rowIndex.split(this.parent.tic).join('');
        colIndex = colIndex.split(this.parent.tic).join('');
        if (parseInt(rowIndex, 10) <= 0 || parseInt(colIndex, 10) <= 0) {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        if (rowIndex.toUpperCase().match(/[A-Z]/) || colIndex.toUpperCase().match(/[A-Z]/) || absIndex.toUpperCase().match(/[A-Z]/)) {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        if (refStyle === 'TRUE' || refStyle === '1') {
            if (absIndex === '1') {
                value = '$' + getAlphalabel(parseInt(colIndex, 10)) + '$' + parseInt(rowIndex, 10);
            } else if (absIndex === '2') {
                value = getAlphalabel(parseInt(colIndex, 10)) + '$' + parseInt(rowIndex, 10);
            } else if (absIndex === '3') {
                value = '$' + getAlphalabel(parseInt(colIndex, 10)) + parseInt(rowIndex, 10);
            } else if (absIndex === '4') {
                value = getAlphalabel(parseInt(colIndex, 10)) + parseInt(rowIndex, 10);
            }
        } else if (refStyle === 'FALSE' || refStyle === '0') {
            if (absIndex === '1') {
                value = 'R' + parseInt(rowIndex, 10) + 'C' + parseInt(colIndex, 10);
            } else if (absIndex === '2') {
                value = 'R' + parseInt(rowIndex, 10) + 'C[' + parseInt(colIndex, 10) + ']';
            } else if (absIndex === '3') {
                value = 'R[' + parseInt(rowIndex, 10) + ']C' + parseInt(colIndex, 10);
            } else if (absIndex === '4') {
                value = 'R[' + parseInt(rowIndex, 10) + ']C[' + parseInt(colIndex, 10) + ']';
            }
        }
        const err: string[] = ['TRUE', 'FALSE', '1', '0'];
        if (err.indexOf(refStyle) === - 1) {
            return this.parent.getErrorStrings()[CommonErrors.name];
        }
        if (!isNullOrUndefined(args[4]) && args[4] !== '') {
            const val: string = this.parent.getValueFromArg(args[4]).split(this.parent.tic).join('');
            if (val === '#NAME?') {
                return this.parent.getErrorStrings()[CommonErrors.name];
            }
            value = val + '!' + value;
        }
        return value;
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the time.
     */
    public ComputeTIME(...args: string[]): string | number  {
        if (isNullOrUndefined(args) || args.length !== 3 || args[0] === '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        let hours: string | number = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
        let minutes: string | number = this.parent.getValueFromArg(args[1]).split(this.parent.tic).join('');
        let seconds: string | number = this.parent.getValueFromArg(args[2]).split(this.parent.tic).join('');
        if (hours === '#NAME?' || minutes === '#NAME?' || seconds === '#NAME?') {
            return this.parent.getErrorStrings()[CommonErrors.name];
        }
        hours = parseInt(hours, 10);
        minutes = parseInt(minutes, 10);
        seconds = parseInt(seconds, 10);
        if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
            return this.parent.getErrorStrings()[CommonErrors.name];
        }
        if (hours.toString().toUpperCase().match(/[A-Z]/) || minutes.toString().toUpperCase().match(/[A-Z]/) ||
        seconds.toString().toUpperCase().match(/[A-Z]/)) {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        if (hours > 32767 || minutes > 32767 || seconds > 32767) {
            return this.parent.getErrorStrings()[CommonErrors.num];
        }
        const value: Date = new Date(1900, 0, 1, hours, minutes, seconds);

        const hh: string | number = value.getHours();
        let m: string | number = value.getMinutes();
        // let s: string | number = value.getSeconds();
        let dd: string = 'AM';
        let h: string | number = hh;
        if (h >= 12) {
            h = hh - 12;
            dd = 'PM';
        }
        if (h === 0) {
            h = 12;
        }
        m = m < 10 ? '0' + m : m;
        // s = s < 10 ? '0' + s : s;
        h = h < 10 ? '0' + h : h;
        return h + ':' + m + ' ' + dd;
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the char value.
     */
    public ComputeCHAR(...args: string[]): string | number  {
        let value: string;
        if (isNullOrUndefined(args) || args.length !== 1 || args[0] === '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        const val: string = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
        if (val === '#NAME?') {
            return this.parent.getErrorStrings()[CommonErrors.name];
        }
        if (val.toUpperCase().match(/^[0-9]+$/)) {
            const char: number = parseInt(val, 10);
            if (char > 255 || char <= 0) {
                return this.parent.getErrorStrings()[CommonErrors.value];
            }
            value = String.fromCharCode(char);
        } else {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        return value;
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the code value.
     */
    public ComputeCODE(...args: string[]): string | number  {
        let val: number;
        if (isNullOrUndefined(args) || args.length !== 1 || args[0] === '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        const value: string = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
        if (value === '#NAME?') {
            return this.parent.getErrorStrings()[CommonErrors.name];
        }
        if (value !== '') {
            val = value.charCodeAt(0);
        } else {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        return val;
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the currency value.
     */
    public ComputeDOLLAR(...args: string[]): string | number  {
        let value: string;
        if (args.length === 1) {
            args.push("2");
        }
        if (isNullOrUndefined(args) || args.length !== 2 || args[0] === '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        let val: string = this.parent.getValueFromArg(args[0]).split(this.parent.tic).join('');
        let val2: string = this.parent.getValueFromArg(args[1]).split(this.parent.tic).join('');
        val = val === '' ? '0' : val;
        val2 = val2 === '' ? '0' : val2;
        if (val === '#NAME?') { return this.parent.getErrorStrings()[CommonErrors.name]; }
        if (val.toUpperCase().match(/^[0-9.]+$/) && val2.toUpperCase().match(/^[0-9.]+$/)) {
            const intl: Internationalization = new Internationalization();
            const decimalCount: number = parseInt(val2, 10);
            let decimalValue: string = "";
            for (let decimalIdx: number = 1; decimalIdx <= decimalCount; decimalIdx++) {
                decimalValue += "0";
            }
            value = intl.formatNumber(parseFloat(parseFloat(val).toFixed(parseInt(val2, 10))), { format: '$#,##.' + decimalValue });
        } else {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        return value;
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the k-th smallest value.
     */
    public ComputeSMALL(...args: string[]): string | number  {
        let value1: number;
        if (isNullOrUndefined(args) || args[0] === '' || args.length !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        const cellCollection: string[] | string = this.parent.getCellCollection(args[0]);
        let numArray: number[] = [];
        for (let j: number = 0; j < cellCollection.length; j++) {
            numArray.push(parseFloat(this.parent.getValueFromArg(cellCollection[j]).split(this.parent.tic).join('')));
        }
        numArray = numArray.sort((n1: number, n2: number) => n1 - n2);
        const len: number = numArray.length;
        for (let k: number = 0; k < len; k++) {
            if ((isNaN(numArray[k]))) {
                numArray.splice(k, 1);
                k--;
                if (numArray.length === 0) {
                    break;
                }
            }
        }
        let val1: string | number = this.parent.getValueFromArg(args[1]).split(this.parent.tic).join('');
        if (val1 === '#NAME?') {
            return this.parent.getErrorStrings()[CommonErrors.name];
        }
        val1 = parseInt(val1, 10);
        if (val1.toString().toUpperCase().match(/^[0-9]+$/) && numArray[val1 - 1]
        && numArray[val1 - 1].toString().toUpperCase().match(/^[-.0-9]+$/) && val1 !== 0) {
            value1 = numArray[val1 - 1];
        } else if (isNullOrUndefined(numArray[val1 - 1])) {
            return this.parent.getErrorStrings()[CommonErrors.num];
        } else {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        return value1;
    }

    /**
     * @hidden
     * @param {string} args - specify the args.
     * @returns {string | boolean} - Compute the k-th largest value.
     */
    public ComputeLARGE(...args: string[]): string | number  {
        let value: number;
        if (isNullOrUndefined(args) || args.length !== 2 || args[0] === '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        const cellCollection: string[] | string = this.parent.getCellCollection(args[0]);
        let numArr: number[] = [];
        for (let i: number = 0; i < cellCollection.length; i++) {
            numArr.push(parseFloat(this.parent.getValueFromArg(cellCollection[i]).split(this.parent.tic).join('')));
        }
        numArr = numArr.sort((n1: number, n2: number) => n2 - n1);
        const length: number = numArr.length;
        for (let k: number = 0; k < length; k++) {
            if ((isNaN(numArr[k]))) {
                numArr.splice(k, 1);
                k--;
                if (numArr.length === 0) {
                    break;
                }
            }
        }
        let val: string | number = this.parent.getValueFromArg(args[1]).split(this.parent.tic).join('');
        if (val === '#NAME?') {
            return this.parent.getErrorStrings()[CommonErrors.name];
        }
        val = parseInt(val, 10);
        if (val.toString().toUpperCase().match(/^[0-9]+$/) && numArr[val - 1] &&
        numArr[val - 1].toString().toUpperCase().match(/^[-.0-9]+$/) && val !== 0) {
            value = numArr[val - 1];
        } else if (isNullOrUndefined(numArr[val - 1])) {
            return this.parent.getErrorStrings()[CommonErrors.num];
        } else {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        return value;
    }

    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string | number} - Compute the Choose value.
     */
    public ComputeCHOOSE(...args: string[]): string | number {
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        if (args.length < 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        const argsArr: string[] = args;
        if (argsArr[0].indexOf(':') > -1 && this.parent.isCellReference(argsArr[0])) {
            const cellCollection: string[] | string = this.parent.getCellCollection(argsArr[0]);
            if (cellCollection.length === 1) {
                argsArr[0] = cellCollection[0];
            } else {
                return this.parent.getErrorStrings()[CommonErrors.value];
            }
        }
        const cond: string = this.parent.getValueFromArg(argsArr[0]);
        if (this.parent.getErrorStrings().indexOf(cond) > -1) {
            return cond;
        }
        let indexNum: number = this.parent.parseFloat(this.parent.getValueFromArg(argsArr[0].split(this.parent.tic).join('')));
        if (indexNum < 1) {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        indexNum = Math.floor(indexNum);
        let result: string | number;
        if (isNullOrUndefined(argsArr[indexNum])) {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        result = argsArr[indexNum];
        if (result === '') {
            result = '0';
        }
        if (result.indexOf(':') > -1 && this.parent.isCellReference(result)) {
            const cellCollection: string[] | string = this.parent.getCellCollection(argsArr[0].split(this.parent.tic).join(''));
            if (cellCollection.length === 1) {
                argsArr[0] = cellCollection[0];
            } else {
                return this.parent.getErrorStrings()[CommonErrors.value];
            }
        }
        return this.parent.getValueFromArg(result).split(this.parent.tic).join('');
    }

    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string | number} - Compute the SUMIF value.
     */
    public ComputeSUMIF(...range: string[]): string | number {
        const argArr: string[] = range;
        if (argArr[0].indexOf(':') < 0 && !this.parent.isCellReference(argArr[0]) ||
            (argArr[2] && argArr[2].indexOf(':') < 0 && !this.parent.isCellReference(argArr[2]))) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.improper_formula];
        }
        if (argArr.length > 3 || argArr.length < 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        const result: number[] | string = this.parent.computeSumIfAndAvgIf(range);
        if (typeof result === 'string' && (this.parent.formulaErrorStrings.indexOf(result)
            || this.parent.getErrorStrings().indexOf(result))) {
            return result;
        }
        return result[0];
    }

    /**
     * @hidden
     * @param {string[]} absValue - specify the absValue.
     * @returns {string | number} - Compute the AVERAGE value.
     */
    public ComputeABS(...absValue: string[]): string | number {
        const argArr: string[] = absValue;
        let cellvalue: string = '';
        let absVal: number;
        if (absValue.length === 0 || absValue.length > 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        if (argArr[0].toString().split(this.parent.tic).join('').trim() === '' || argArr[0].indexOf(this.parent.tic) > -1) {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        if (this.parent.isCellReference(argArr[0])) {
            cellvalue = this.parent.getValueFromArg(argArr[0]);
            if (cellvalue === '') {
                return this.parent.getErrorStrings()[CommonErrors.name];
            }
            absVal = this.parent.parseFloat(cellvalue);
            if (isNaN(absVal)) {
                return this.parent.getErrorStrings()[CommonErrors.value];
            }
        } else {
            absVal = this.parent.parseFloat(argArr[0]);
            if (isNaN(absVal)) {
                return this.parent.getErrorStrings()[CommonErrors.name];
            }
        }
        return Math.abs(absVal);
    }

    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {string} - Compute the AVERAGE value.
     */
    public ComputeAVERAGE(...args: string[]): string {
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        const argArr: string[] = args;
        for (let i: number = 0; i < argArr.length; i++) {
            if (argArr[i].indexOf(':') > -1) {
                if (argArr[i].indexOf(this.parent.tic) > -1) {
                    return this.parent.getErrorStrings()[CommonErrors.value];
                }
            }
        }
        return this.parent.calculateAvg(argArr);
    }

    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string | number} - Compute the AVERAGEIF value.
     */
    public ComputeAVERAGEIF(...range: string[]): string | number {
        const argList: string[] = range;
        if (argList[0].indexOf(':') < 0 && !this.parent.isCellReference(argList[0])) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.improper_formula];
        }
        const resultVal: number[] | string = this.parent.computeSumIfAndAvgIf(range);
        if (typeof resultVal === 'string' && (this.parent.formulaErrorStrings.indexOf(resultVal)
            || this.parent.getErrorStrings().indexOf(resultVal))) {
            return resultVal;
        }
        return this.parent.parseFloat(resultVal[0]) / this.parent.parseFloat(resultVal[1]);
    }

    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string} - Compute the CONCATENATE value.
     */
    public ComputeCONCATENATE(...range: string[]): string {
        if (isNullOrUndefined(range) || (range.length === 1 && range[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.invalid_arguments];
        }
        const argsList: string[] = range;
        let result: string = '';
        let tempStr: string = '';
        for (let i: number = 0; i < argsList.length; i++) {
            if (argsList[i].indexOf(':') > -1 && this.parent.isCellReference(argsList[i])) {
                if (this.isConcat) {
                    const cells: string[] | string = this.parent.getCellCollection(argsList[i]);
                    for (let i: number = 0; i < cells.length; i++) {
                        tempStr = this.parent.getValueFromArg(cells[i]);
                        result = result + tempStr;
                    }
                } else {
                    return this.parent.getErrorStrings()[CommonErrors.value];
                }
            } else {
                if (argsList.length === 1 && argsList[0].indexOf(this.parent.tic) < 0) {
                    return this.parent.getErrorStrings()[CommonErrors.name];
                } else {
                    tempStr = this.parent.getValueFromArg(argsList[i]);
                    result = result + tempStr;
                }
            }

            if (this.parent.getErrorStrings().indexOf(tempStr) > -1) {
                return tempStr;
            }
        }
        return result.split(this.parent.tic).join('');
    }

    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string} - Compute the CONCAT value.
     */
    public ComputeCONCAT(...range: string[]): string {
        this.isConcat = true;
        return this.ComputeCONCATENATE(...range);
    }

    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string | number} - Compute the MAX value.
     */
    public ComputeMAX(...args: string[]): string {
        return this.parent.computeMinMax(args, 'max');
    }

    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string} - Compute the MIN value.
     */
    public ComputeMIN(...args: string[]): string {
        return this.parent.computeMinMax(args, 'min');
    }

    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string} - Compute the RAND value.
     */
    public ComputeRAND(...args: string[]): string {
        if (args.length === 1 && args[0] === '') {
            args.length = 0;
        }
        if (args.length > 0) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        return Math.random().toString();
    }

    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string} - Compute the AND value.
     */
    public ComputeAND(...args: string[]): string {
        return this.parent.computeAndOr(args, 'and');
    }

    /**
     * @hidden
     * @param {string[]} args - specify the args.
     * @returns {string} - Compute the OR value.
     */
    public ComputeOR(...args: string[]): string {
        return this.parent.computeAndOr(args, 'or');
    }

    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {string | number} - Compute the find value.
     */
    public ComputeFIND(...args: string[]): string | number {
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        const argsList: string[] = args;
        if (argsList.length > 3) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        const findText: string = this.parent.removeTics(this.parent.getValueFromArg(argsList[0]));
        const withinText: string = this.parent.removeTics(this.parent.getValueFromArg(argsList[1]));
        if (this.parent.getErrorStrings().indexOf(findText) > -1 || this.parent.getErrorStrings().indexOf(withinText) > -1) {
            return this.parent.getErrorStrings()[CommonErrors.name];
        }
        let startNum: number | string = 1;
        if (argsList.length === 3) {
            startNum = this.parent.removeTics(this.parent.getValueFromArg(argsList[2]));
            if (this.parent.getErrorStrings().indexOf(startNum) > -1) {
                return startNum;
            }
            startNum = this.parent.parseFloat(startNum);
            if (isNaN(startNum)) {
                startNum = 1;
            }
        }
        if (startNum <= 0 || startNum > withinText.length) {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        const loc: number = withinText.indexOf(findText, startNum - 1);
        if (loc < 0) {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        return (Number(loc) + Number(1)).toString();
    }

    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string | number} - Compute the index.
     */
    public ComputeINDEX(...range: string[]): string | number {
        const argArr: string[] = range;
        const argCount: number = argArr.length;
        if (isNullOrUndefined(range) || (argArr.length === 1 && argArr[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        if (argCount > 3) {
            return this.parent.getErrorStrings()[CommonErrors.ref];
        }
        let rangeValue: string = '';
        const rangeArr: string[] | string = [];
        if (argCount > 2) {
            for (let i: number = 0; i < argCount; i++) {
                if (this.parent.isCellReference(argArr[i]) && argArr[i].indexOf(':') < 0) {
                    return this.parent.getErrorStrings()[CommonErrors.ref];
                }
                if (this.parent.isCellReference(argArr[i])) {
                    rangeArr[i] = argArr[i];
                }
            }
        }
        rangeValue = argArr[0];
        argArr[1] = argArr[1] === '' ? '1' : argArr[1];
        argArr[1] = this.parent.getValueFromArg(argArr[1]);
        if (this.parent.getErrorStrings().indexOf(argArr[1]) > -1) {
            return argArr[1];
        }
        if (!isNullOrUndefined(argArr[2])) {
            argArr[2] = argArr[2] === '' ? '1' : argArr[2];
            argArr[2] = this.parent.getValueFromArg(argArr[2]);
            if (this.parent.getErrorStrings().indexOf(argArr[2]) > -1) {
                return argArr[2];
            }
            if (argArr[2] === '0') {
                return this.parent.getErrorStrings()[CommonErrors.value];
            }
        }
        let row: number = parseFloat(argArr[1]);
        row = !isNaN(row) ? row : -1;
        let col: number = parseFloat(argArr[2] ? argArr[2] : '1');
        col = !isNaN(col) ? col : -1;
        if (row === -1 || col === -1) {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        const i: number = argArr[0].indexOf(':');
        const startRow: number = this.parent.rowIndex(rangeValue.substring(0, i));
        const endRow: number = this.parent.rowIndex(rangeValue.substring(i + 1));
        const startCol: number = this.parent.colIndex(rangeValue.substring(0, i));
        const endCol: number = this.parent.colIndex(rangeValue.substring(i + 1));
        if (row > endRow - startRow + 1 || col > endCol - startCol + 1) {
            return this.parent.getErrorStrings()[CommonErrors.ref];
        }
        row = startRow + row - 1;
        col = startCol + col - 1;
        const cellRef: string = this.getSheetReference(rangeValue) + this.parent.convertAlpha(col) + row;
        const result: string = this.parent.getValueFromArg(cellRef);
        if (result === '') {
            return 0;
        }
        return result;
    }

    private getSheetReference(range: string): string {
        return range.indexOf(this.parent.sheetToken) === 0 && range.lastIndexOf(this.parent.sheetToken) > range.indexOf(
            this.parent.sheetToken) ? range.substring(0, range.lastIndexOf(this.parent.sheetToken) + 1) : '';
    }

    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string | number} - Compute the if.
     */
    public ComputeIFS(...range: string[]): string | number {
        const argArr: string[] = range;
        if (isNullOrUndefined(range) || (argArr.length === 1 && argArr[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        let condition: string = '';
        let result: string = '';
        for (let i: number = 0; i < argArr.length; i++) {
            condition = this.parent.getValueFromArg(argArr[i]);
            if (condition !== this.parent.trueValue && condition !== this.parent.falseValue) {
                return this.parent.getErrorStrings()[CommonErrors.value];
            }
            if (condition === this.parent.trueValue) {
                if (argArr[i + 1].indexOf(this.parent.arithMarker) > -1) {
                    return this.parent.trueValue;
                }
                if (this.parent.isCellReference(argArr[i + 1].split(this.parent.tic).join(''))) {
                    result = this.parent.getValueFromArg(argArr[i + 1]);
                } else {
                    result = (argArr[i + 1].indexOf(this.parent.tic) > -1) ? argArr[i + 1].split(this.parent.tic).join('') :
                        this.parent.getErrorStrings()[CommonErrors.name];
                }
                i = i + 1;
                return result;
            } else if (condition === this.parent.falseValue) {
                i = i + 1;
            }
        }
        return this.parent.getErrorStrings()[CommonErrors.na];
    }

    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {number | string} - Compute the count.
     */
    public ComputeCOUNTA(...args: string[]): number | string {
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        const argArr: string[] = args;
        let cellColl: string[] | string;
        let result: number = 0;
        let cellValue: string;
        for (let i: number = 0; i < argArr.length; i++) {
            if (argArr[i].indexOf(':') > -1 && this.parent.isCellReference(argArr[i])) {
                cellColl = this.parent.getCellCollection(argArr[i].split(this.parent.tic).join(''));
                for (let j: number = 0; j < cellColl.length; j++) {
                    cellValue = this.parent.getValueFromArg(cellColl[j]);
                    if (cellValue.length > 0) {
                        result++;
                    }
                }
            } else {
                const cellValue: string = this.parent.getValueFromArg(argArr[i].split(this.parent.tic).join(''));
                if (cellValue.length > 0) {
                    result++;
                }
            }
        }
        return result;
    }

    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {number | string} - Compute the average.
     */
    public ComputeAVERAGEA(...args: string[]): number | string {
        if (isNullOrUndefined(args) || (args.length === 1 && args[0] === '')) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        const argArrs: string[] = args;
        let cellCol: string[] | string;
        let result: number = 0;
        let cellValue: string | number;
        let length: number = 0;
        let parseValue: string | number;
        for (let k: number = 0; k < argArrs.length; k++) {
            if (argArrs[k].indexOf(':') > -1 && this.parent.isCellReference(argArrs[k])) {
                cellCol = this.parent.getCellCollection(argArrs[k].split(this.parent.tic).join(''));
                for (let j: number = 0; j < cellCol.length; j++) {
                    cellValue = this.parent.getValueFromArg(cellCol[j]);
                    if (cellValue.toUpperCase() === this.parent.trueValue) {
                        cellValue = '1';
                    } else if (cellValue.toUpperCase() === this.parent.falseValue || cellValue === '') {
                        cellValue = '0';
                    } else if (this.parent.getErrorStrings().indexOf(cellValue) > -1) {
                        return cellValue;
                    } else if (cellValue.length > 0) {
                        parseValue = parseFloat(cellValue);
                        cellValue = !isNaN(parseValue) ? parseValue : 0;
                        result = result + cellValue;
                        length = length + 1;
                    }
                }
                length = cellCol.length;
            } else {
                if (argArrs[k] === this.parent.trueValue) {
                    argArrs[k] = '1';
                }
                if (argArrs[k] === this.parent.falseValue || argArrs[k] === '') {
                    argArrs[k] = '0';
                }
                cellValue = this.parent.getValueFromArg(argArrs[k].split(this.parent.tic).join(''));
                if (this.parent.getErrorStrings().indexOf(cellValue) > -1) {
                    return cellValue;
                }
                if (cellValue.length > 0) {
                    parseValue = parseFloat(cellValue);
                    cellValue = !isNaN(parseValue) ? parseValue : 0;
                    result = result + cellValue;
                    length = length + 1;
                }
            }
            if (length === 0) {
                return this.parent.getErrorStrings()[CommonErrors.divzero];
            }
        }
        return result / length;
    }

    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {number | string} - Compute the count if.
     */
    public ComputeSORT(...args: string[]): number | string {
        const argArr: string[] = args; let result: string | number;
        if (isNullOrUndefined(args) || args[0] === '' || argArr.length > 4) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        argArr[1] = argArr[1] ? argArr[1] : '1';
        argArr[2] = argArr[2] ? argArr[2] : '1'; // 1 = Ascending, -1 = Descending. Default is ascending order.
        const order: string = argArr[2] === '1' ? 'Ascending' : 'Descending';
        argArr[3] = argArr[3] ? argArr[3].toUpperCase() : 'FALSE'; // Default is FALSE = sort by column or row
        argArr[0] = argArr[0].split('$').join('');
        let cellCollection: string | string[]; const valueCollection: string[] = [];
        if (argArr[0].indexOf(':') > -1) {
            const rangeSplit: string[] = argArr[0].split(':');
            if (this.parent.isCellReference(rangeSplit[0]) && this.parent.isCellReference(rangeSplit[1])) {
                const j: number = argArr[0].indexOf(':'); let swap: number;
                let rowIdx: number = this.parent.rowIndex(this.parent.substring(argArr[0], 0, j));
                let colIdx: number = this.parent.colIndex(this.parent.substring(argArr[0], 0, j));
                let eRowIdx: number = this.parent.rowIndex(this.parent.substring(argArr[0], j + 1, j + argArr[0].length - j - 1));
                let eColIdx: number = this.parent.colIndex(this.parent.substring(argArr[0], j + 1, j + argArr[0].length - j - 1));
                if (rowIdx > eRowIdx) {
                    swap = eRowIdx; eRowIdx = rowIdx; rowIdx = swap;
                }
                if (colIdx > eColIdx) {
                    swap = eColIdx; eColIdx = colIdx; colIdx = swap;
                }
                argArr[2] = this.parent.getValueFromArg(argArr[2]);
                if (argArr[2] !== '1') {
                    if (argArr[2] !== '-1') {
                        return this.parent.getErrorStrings()[CommonErrors.value];
                    }
                }
                if (!isNaN(this.parseDouble(argArr[1])) && this.parseDouble(argArr[1]) < 1) {
                    return this.parent.getErrorStrings()[CommonErrors.value];
                }
                if (argArr[3].toUpperCase() !== this.parent.trueValue) {
                    if (argArr[3].toUpperCase() !== this.parent.falseValue) {
                        return this.parent.getErrorStrings()[CommonErrors.value];
                    }
                }
                let sheetIdx: string | number = '';
                if (argArr[0].indexOf('!') === 0) {
                    sheetIdx = argArr[0]; sheetIdx = sheetIdx.replace('!', ''); sheetIdx = sheetIdx.indexOf('!');
                    sheetIdx = argArr[0].substring(0, sheetIdx + 2);
                }
                argArr[0] = sheetIdx + getAlphalabel(colIdx) + rowIdx + ':' + getAlphalabel(eColIdx) + eRowIdx;
                cellCollection = this.parent.getCellCollection(argArr[0]);
                for (let i: number = 0; i < cellCollection.length; i++) {
                    valueCollection.push(this.parent.getValueFromArg(cellCollection[i]));
                }
                const colSort: (string | number)[] = [];
                const totalColumn: number = eColIdx - colIdx + 1;
                if (argArr[3] === 'TRUE') {
                    for (let i: number = 0; i < totalColumn; i++) {
                        if (valueCollection[i + ((this.parseDouble(argArr[1]) - 1) * totalColumn)]) {
                            colSort.push(isNaN(this.parseDouble(valueCollection[i + ((this.parseDouble(argArr[1]) - 1) * totalColumn)])) ?
                                valueCollection[i + ((this.parseDouble(argArr[1]) - 1) * totalColumn)] :
                                this.parseDouble(valueCollection[i + ((this.parseDouble(argArr[1]) - 1) * totalColumn)]));
                        }
                    }
                }
                if (argArr[3] === 'FALSE') {
                    for (let i: number = 0; i < valueCollection.length; i++) {
                        if (valueCollection[i * totalColumn + this.parseDouble(argArr[1]) - 1]) {
                            colSort.push(isNaN(this.parseDouble(valueCollection[i * totalColumn + this.parseDouble(argArr[1]) - 1])) ?
                                valueCollection[i * totalColumn + this.parseDouble(argArr[1]) - 1] :
                                this.parseDouble(valueCollection[i * totalColumn + this.parseDouble(argArr[1]) - 1]));
                        }
                    }
                }
                const sortedVal: object[] = DataUtil.sort(colSort, null, DataUtil.fnSort(order)); const id: number[] = [];
                for (let a: number = 0; a < sortedVal.length; a++) {
                    for (let b: number = 0; b < colSort.length; b++) {
                        if (JSON.stringify(sortedVal[a]) === JSON.stringify(colSort[b])) {
                            if (id.indexOf(b) === - 1) { id.push(b); }
                        }
                    }
                }
                if (argArr[3] === 'TRUE') {
                    for (let startRow: number = rowIdx, rowInc: number = 0; startRow <= eRowIdx; startRow++, rowInc++) {
                        for (let a: number = 0, colInc: number = 0; a < id.length; a++, colInc++) {
                            const cellValue: string = this.parent.getValueFromArg(sheetIdx + getAlphalabel(id[a] + colIdx) + startRow);
                            let activeCell: string = this.parent.actCell;
                            activeCell = activeCell.indexOf('!') > - 1 ? activeCell.split('!')[1] : activeCell;
                            const actRowIdx: number = this.parent.rowIndex(activeCell);
                            const actColIdx: number = this.parent.colIndex(activeCell);
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (this.parent.parentObject as any).setValueRowCol(this.parent.getSheetID(this.parent.grid) + 1,
                                                                             cellValue, actRowIdx + rowInc, actColIdx + colInc);
                        }
                    }
                    result = this.parent.getValueFromArg(sheetIdx + getAlphalabel(id[0] + colIdx) + rowIdx);
                }
                if (argArr[3] === 'FALSE') {
                    for (let a: number = 0, rowInc: number = 0; a < id.length; a++, rowInc++) {
                        for (let startCol: number = colIdx, colInc: number = 0; startCol <= eColIdx; startCol++, colInc++) {
                            const value: string = this.parent.getValueFromArg(sheetIdx + getAlphalabel(startCol) + (id[a] + rowIdx));
                            let activeCell: string = this.parent.actCell;
                            activeCell = activeCell.indexOf('!') > - 1 ? activeCell.split('!')[1] : activeCell;
                            const actColIdx: number = this.parent.colIndex(activeCell);
                            const actRowIdx: number = this.parent.rowIndex(activeCell);
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (this.parent.parentObject as any).setValueRowCol(this.parent.getSheetID(this.parent.grid) + 1,
                                                                             value, actRowIdx + rowInc, actColIdx + colInc);
                        }
                    }
                    result = this.parent.getValueFromArg(sheetIdx + getAlphalabel(colIdx) + (id[0] + rowIdx));
                }
            }
        }
        return result;
    }

    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {number | string} - Compute the count if.
     */
    public ComputeCOUNTIF(...args: string[]): number | string {
        const argArr: string[] = args;
        if (isNullOrUndefined(args) || args[0] === '' || argArr.length !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        let cellColl: string[] | string;
        let result: number = 0;
        let cellValue: string;
        const stack: string[] = [];
        let op: string = 'equal';
        let condition: string = argArr[1].split(this.parent.tic).join('');
        if (condition.startsWith('<=')) {
            op = 'lessEq';
            condition = condition.substring(2);
        } else if (condition.startsWith('>=')) {
            op = 'greaterEq';
            condition = condition.substring(2);
        } else if (condition.startsWith('<>')) {
            op = 'notEq';
            condition = condition.substring(2);
        } else if (condition.startsWith('<')) {
            op = 'less';
            condition = condition.substring(1);
        } else if (condition.startsWith('>')) {
            op = 'greater';
            condition = condition.substring(1);
        } else if (condition.startsWith('=')) {
            op = 'equal';
            condition = condition.substring(1);
        }
        if (argArr[0].indexOf(':') > -1 && this.parent.isCellReference(argArr[0])) {
            cellColl = this.parent.getCellCollection(argArr[0].split(this.parent.tic).join(''));
            for (let j: number = 0; j < cellColl.length; j++) {
                cellValue = this.parent.getValueFromArg(cellColl[j]);
                if (condition.indexOf('*') > -1 || condition.indexOf('?') > -1) {
                    cellValue = this.parent.findWildCardValue(condition, cellValue);
                }
                stack.push(cellValue);
                stack.push(condition);
                if (this.parent.processLogical(stack, op) === this.parent.trueValue) {
                    result++;
                }
            }
        }
        return result;
    }

    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string | number} - Compute the sum if.
     */
    public ComputeSUMIFS(...range: string[]): string | number {
        const sum: string | number = this.parent.computeIfsFormulas(range, this.parent.falseValue);
        return sum;
    }

    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {string | number} - Compute the Text.
     */
    public ComputeTEXT(...args: string[]): string | number {
        let checkArgs: string; const argsLength: number = args.length;
        for (let i: number = 0; i < argsLength; i++) {
            if (isNullOrUndefined(checkArgs)) {
                checkArgs = args[i];
            } else {
                checkArgs = checkArgs + ',' + args[i];
            }
        }
        const splitIndex: number = checkArgs.indexOf(',');
        const frtArg: string = checkArgs.slice(0, splitIndex);
        const scndArg: string = checkArgs.slice(checkArgs.indexOf('"') + 1, checkArgs.length);
        const checkScndArg: number = scndArg.indexOf('"');
        if ( splitIndex > -1 && checkScndArg !== scndArg.length - 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        let s1: string = frtArg;
        let s2: string = scndArg.slice(0, scndArg.length - 1);
        let dTime: Date | number = new Date(1900, 0, 1, 0, 0, 0);
        const checkString: string = s1 + ',' + s2;
        const intl: Internationalization = new Internationalization();
        if (this.parent.getErrorStrings().indexOf(checkString) > -1) {
            return checkString;
        }
        s1 = this.parent.getValueFromArg(s1);
        s2 = s2.split(this.parent.tic).join('');
        if (s2 === '') {
            return '';
        }
        if (s1 === '' && (s2.length > 0 && (s2.toUpperCase().indexOf('M') > -1 || s2.toUpperCase().indexOf('D') > -1
            || s2.toUpperCase().indexOf('Y') > -1 || s2.toUpperCase().indexOf('S') > -1 || s2.toUpperCase().indexOf('T') > -1)
            || s2.toUpperCase().indexOf('H') > -1)) {
            s1 = dTime.toString();
        }
        let d: number = this.parseDouble(s1);
        if (isNaN(d) && this.parent.isDate(new Date(s1)) !== null) {
            d = this.parent.toOADate(new Date(s1));
        }
        dTime = Date.parse(s1.split(this.parent.tic).join(''));
        if (!isNaN(d) || !isNaN(dTime)) {
            if (s2[0] === '[') {
                return this.parent.tic + s1 + this.parent.tic;
            }
            if (s2.length > 0 && (s2.toUpperCase().indexOf('M') > -1 || s2.toUpperCase().indexOf('D') > -1
                || s2.toUpperCase().indexOf('Y') > -1 || s2.toUpperCase().indexOf('S') > -1 || s2.toUpperCase().indexOf('T') > -1)
                || s2.toUpperCase().indexOf('H') > -1) {
                s2 = s2.split('Y').join('y').split('D').join('d').split('H').join('h');
                s2 = s2.split('S').join('s').split('m').join('M').split('AM/PM').join('tt');
                const formatChar: string[] = s2.split('');
                let isH: boolean = false; let isMFound: boolean = false;
                let i: number = 0;
                // let mcount: number = 0;
                let lastCharIndex: number = 0; let totalCharforM: number = 0;
                for (i = 0; i < formatChar.length; ) {
                    const c: string = formatChar[i];
                    if (c === 's' && formatChar[lastCharIndex] === 'M') {
                        formatChar[lastCharIndex] = 'm';
                        if (formatChar[lastCharIndex - 1] === 'M') {
                            formatChar[lastCharIndex - 1] = 'm';
                        }
                    }
                    if (this.parent.isChar(c)) {
                        lastCharIndex = i;
                        if (c === 'M') {
                            // mcount++;
                            totalCharforM++;
                        }
                    } else if (totalCharforM > 1) {
                        totalCharforM++;
                    }
                    if (c === 'M' && isH) {
                        formatChar[i] = 'm';
                        isMFound = true;
                    }
                    if (c === 'h') {
                        isH = true;
                    } else if (this.parent.isChar(c) && c !== 'M' && c !== 'h' && !isMFound) {
                        isH = false;
                        isMFound = false;
                    }
                    i++;
                }
                s2 = String(formatChar);
                s2 = s2.split(',').join('').split('\n').join(' ');
                let dt: Date | number = this.parent.fromOADate(d);
                if (d === 0) {
                    dt = dTime;
                }
                const getSkeleton: string = getSkeletonVal(s2);
                if (getSkeleton === '') {
                    return this.parent.getErrorStrings()[CommonErrors.name];
                }
                const dFormatter: Function = intl.getDateFormat({ skeleton: getSkeleton, type: 'date' });
                const formattedString: string = dFormatter(new Date(dt.toString()));
                s1 = formattedString;
            } else {
                s1 = intl.formatNumber(d, { format: s2 });
            }
        }
        return s1;
    }

    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {number | string} - Compute the count if.
     */
    public ComputeCOUNTIFS(...args: string[]): number | string {
        const sum: string | number = this.parent.computeIfsFormulas(args, this.parent.trueValue);
        return sum;
    }

    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {number | string} - Compute the Average if.
     */
    public ComputeAVERAGEIFS(...args: string[]): number | string {
        const sum: string | number = this.parent.computeIfsFormulas(args, this.parent.falseValue, this.parent.trueValue);
        return sum;
    }

    /**
     * @hidden
     * @param {string[]} args - specify the range.
     * @returns {string | number} - Compute the Match.
     */
    public ComputeMATCH(...args: string[]): string | number {
        const argArr: string[] = args;
        if (isNullOrUndefined(argArr) || (argArr.length === 1 && argArr[0] === '') || argArr.length < 2 || argArr.length > 3) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        let cellColl: string[] | string;
        const cellValue: string[] = [];
        let lookupVal: string = argArr[0].split(this.parent.tic).join('');
        if (this.parent.isCellReference(lookupVal)) {
            lookupVal = this.parent.getValueFromArg(lookupVal);
        }
        if (!lookupVal.toString().length) { return this.parent.getErrorStrings()[CommonErrors.na]; }
        argArr[2] = isNullOrUndefined(argArr[2]) ? '1' : argArr[2].split(this.parent.tic).join('');
        if (argArr[2].split(this.parent.tic).join('') === this.parent.trueValue) {
            argArr[2] = '1';
        }
        if (argArr[2].split(this.parent.tic).join('') === this.parent.falseValue) {
            argArr[2] = '0';
        }
        const matchType: number = parseFloat(argArr[2]);
        if (matchType !== -1 && matchType !== 0 && matchType !== 1) {
            return this.parent.getErrorStrings()[CommonErrors.na];
        }
        let index: number = 0;
        let indexVal: string = '';
        if (argArr[1].indexOf(':') > -1 || this.parent.isCellReference(argArr[1])) {
            cellColl = this.parent.getCellCollection(argArr[1].split(this.parent.tic).join(''));
            for (let j: number = 0; j < cellColl.length; j++) {
                cellValue[j] = this.parent.getValueFromArg(cellColl[j]).split(this.parent.tic).join('');
            }
            for (let i: number = 0; i < cellValue.length; i++) {
                if (!cellValue[i].toString().length) { continue; }
                if (matchType === 1) {
                    if (lookupVal === cellValue[i]) {
                        return i + 1;
                    } else if (lookupVal > cellValue[i]) {
                        if (!indexVal) {
                            index = i + 1;
                            indexVal = cellValue[i];
                        } else if (cellValue[i] > indexVal) {
                            index = i + 1;
                            indexVal = cellValue[i];
                        }
                    }
                } else if (matchType === 0) {
                    if (lookupVal.indexOf('*') > -1 || lookupVal.indexOf('?') > -1) {
                        cellValue[i] = this.parent.findWildCardValue(lookupVal, cellValue[i]);
                    }
                    if (lookupVal === cellValue[i]) {
                        return i + 1;
                    }
                    if (this.parent.parseFloat(lookupVal) === this.parent.parseFloat(cellValue[i])) {
                        return i + 1;
                    }
                } else if (matchType === -1) {
                    if (lookupVal === cellValue[i]) {
                        return i + 1;
                    } else if (lookupVal < cellValue[i]) {
                        if (!indexVal) {
                            index = i + 1;
                            indexVal = cellValue[i];
                        } else if (cellValue[i] < indexVal) {
                            index = i + 1;
                            indexVal = cellValue[i];
                        }
                    }
                }
            }
        }
        return index ? index : this.parent.getErrorStrings()[CommonErrors.na];
    }

    // /**
    //  * @hidden
    //  * @param {string[]} range - specify the range.
    //  * @returns {string | number} - Compute the lookup value.
    //  */
    // public ComputeLOOKUP(...range: string[]): string | number {
    //     const argArr: string[] = range;
    //     let result: string = '';
    //     if (isNullOrUndefined(argArr) || (argArr.length === 1 && argArr[0] === '') || argArr.length < 2 || argArr.length > 3) {
    //         return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
    //     }
    //     result = this.parent.computeLookup(argArr);
    //     return result;
    // }

    // /**
    //  * @hidden
    //  * @param {string[]} range - specify the range.
    //  * @returns {string | number} - Compute the vlookup value.
    //  */
    // public ComputeVLOOKUP(...range: string[]): string | number {
    //     const argArr: string[] = range;
    //     let result: string = '';
    //     if (isNullOrUndefined(argArr) || (argArr.length === 1 && argArr[0] === '') || argArr.length < 3 || argArr.length > 4) {
    //         return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
    //     }
    //     result = this.parent.computeVLookup(argArr);
    //     return result;
    // }

    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string | number} - Compute the sub total value.
     */
    public ComputeSUBTOTAL(...range: string[]): string | number {
        const argArr: string[] = range;
        let result: string | number = '';
        if (argArr.length < 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        const formula: number = this.parent.parseFloat(this.parent.getValueFromArg(argArr[0].split(this.parent.tic).join('')));
        // if (isNaN(formula)) {
        //     this.parent.getErrorStrings()[CommonErrors.value];
        // }
        // if ((formula < 1 || formula > 11) && (formula < 101 || formula > 111)) {
        //     this.parent.getErrorStrings()[CommonErrors.value];
        // }
        const cellRef: string[] = argArr.slice(1, argArr.length);
        switch (formula) {
        case 1:
        case 101:
            result = this.ComputeAVERAGE(...cellRef);
            break;
        case 2:
        case 102:
            result = this.ComputeCOUNT(...cellRef);
            break;
        case 3:
        case 103:
            result = this.ComputeCOUNTA(...cellRef);
            break;
        case 4:
        case 104:
            result = this.ComputeMAX(...cellRef);
            break;
        case 5:
        case 105:
            result = this.ComputeMIN(...cellRef);
            break;
        case 6:
        case 106:
            result = this.ComputePRODUCT(...cellRef);
            break;
        case 7:
        case 107:
            result = this.ComputeDAY(...cellRef);
            break;
        case 8:
        case 108:
            result = this.ComputeCONCAT(...cellRef);
            break;
        case 9:
        case 109:
            result = this.ComputeSUM(...cellRef);
            break;
        case 10:
        case 110:
            result = this.ComputeAVERAGEA(...cellRef);
            break;
        case 11:
        case 111:
            result = this.ComputeABS(...cellRef);
            break;
        default:
            result = this.parent.getErrorStrings()[CommonErrors.value];
            break;
        }
        return result;
    }

    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string | number} - Compute the Radians value.
     */
    public ComputeRADIANS(...range: string[]): string | number {
        const argArr: string[] = range;
        let result: number;
        if (argArr[0] === '' || argArr.length > 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        if (argArr[0].indexOf(':') > -1 || argArr[0].split(this.parent.tic).join('') === '') {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        const val: string = argArr[0].split(this.parent.tic).join('');
        argArr[0] = isNaN(this.parent.parseFloat(val)) ? argArr[0] : val;
        const cellvalue: string = this.parent.getValueFromArg(argArr[0]);
        const radVal: number = this.parent.parseFloat(cellvalue);
        if (!isNaN(radVal)) {
            result = Math.PI * (radVal) / 180;
        } else {
            if (cellvalue.indexOf(this.parent.tic) > -1) {
                return this.parent.getErrorStrings()[CommonErrors.value];
            } else {
                return this.parent.getErrorStrings()[CommonErrors.name];
            }
        }
        return result;
    }

    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string | number} - Compute the random between value.
     */
    public ComputeRANDBETWEEN(...range: string[]): string | number {
        const argsLength: number = range.length;
        let min: number;
        let max: number;
        let argVal: number;
        if (argsLength !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        for (let i: number = 0; i < argsLength; i++) {
            if (range[i] === '') {
                return this.parent.getErrorStrings()[CommonErrors.na];
            }
            if (range[i].indexOf(this.parent.tic) > -1) {
                if (isNaN(parseFloat(range[i].split(this.parent.tic).join('')))) {
                    return this.parent.getErrorStrings()[CommonErrors.value];
                } else {
                    range[i] = range[i].split(this.parent.tic).join('');
                }
            }
            argVal = parseFloat(this.parent.getValueFromArg(range[i]));
            if (!this.parent.isCellReference(range[i])) {
                if (isNaN(argVal)) {
                    return this.parent.getErrorStrings()[CommonErrors.name];
                }
                if (i === 0)
                {
                    min = argVal;
                } else {
                    max = argVal;
                }
            } else {
                argVal = this.parent.getValueFromArg(range[i]) === '' ? 0 : argVal;
                if (i === 0)
                {
                    min = argVal;
                } else {
                    max = argVal;
                }
                if (min === 0 && max === 0) {
                    return '0';
                }
                if (isNaN(argVal)) {
                    return this.parent.getErrorStrings()[CommonErrors.value];
                }
            }
        }
        if (max < min) {
            return this.parent.getErrorStrings()[CommonErrors.num];
        }
        if (min === 0) {
            return Math.floor(Math.random() * (max - (min - 1))) + min;
        } else {
            return max - min === 1 ? Math.round((Math.random() * (max - min)) + min) : Math.floor(Math.random() * (max - (min - 1))) + min;
        }
    }

    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string | number} - Compute the slope value.
     */
    public ComputeSLOPE(...range: string[]): string | number {
        const argArr: string[] = range;
        if (argArr.length !== 2 || argArr[0] === '') {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        const xPointsRange: string | string[] = this.parent.getCellCollection(argArr[1].split(this.parent.tic).join(''));
        const yPointsRange: string | string[] = this.parent.getCellCollection(argArr[0].split(this.parent.tic).join(''));
        if (yPointsRange.length !== xPointsRange.length) {
            return this.parent.getErrorStrings()[CommonErrors.na];
        }
        const yPoints: string[] = this.getDataCollection(yPointsRange);
        const xPoints: string[] = this.getDataCollection(xPointsRange);
        if (xPoints.indexOf('#NAME?') > -1 || yPoints.indexOf('#NAME?') > -1) {
            return this.parent.getErrorStrings()[CommonErrors.name];
        }
        let sumXY: number = 0;
        let sumX2: number = 0;
        let sumX: number = 0;
        let sumY: number = 0;
        for (let i: number = 0, len: number = xPoints.length; i < len; ++i) {
            if (Number(xPoints[i]).toString() !== 'NaN' && Number(yPoints[i]).toString() !== 'NaN') {
                sumXY += Number(xPoints[i]) * Number(yPoints[i]);
                sumX += Number(xPoints[i]);
                sumY += Number(yPoints[i]);
                sumX2 += Number(xPoints[i]) * Number(xPoints[i]);
            }
        }
        // if ((sumXY - sumX * sumY) === 0 || (sumX2 - sumX * sumX) === 0) {
        //     this.parent.getErrorStrings()[CommonErrors.divzero];
        // }
        const result: string = ((sumXY - sumX * sumY / xPoints.length) / (sumX2 - sumX * sumX / xPoints.length)).toString();
        if (result === 'NaN') {
            return this.parent.getErrorStrings()[CommonErrors.divzero];
        }
        return result;
    }

    /**
     * @hidden
     * @param {string[]} range - specify the range.
     * @returns {string | number} - Compute the intercept.
     */
    public ComputeINTERCEPT(...range: string[]): string | number {
        const argArr: string[] = range;
        if (argArr[0] === '' || argArr.length !== 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        const yValuesRange: string | string[] = this.parent.getCellCollection(argArr[0].split(this.parent.tic).join(''));
        const xValuesRange: string | string[] = this.parent.getCellCollection(argArr[1].split(this.parent.tic).join(''));
        if (yValuesRange.length !== xValuesRange.length) {
            return this.parent.getErrorStrings()[CommonErrors.na];
        }
        const xValues: string[] = this.getDataCollection(xValuesRange);
        const yValues: string[] = this.getDataCollection(yValuesRange);
        if (xValues.indexOf('#NAME?') > -1 || yValues.indexOf('#NAME?') > -1) {
            return this.parent.getErrorStrings()[CommonErrors.name];
        }
        let sumX: number = 0;
        let sumY: number = 0;
        for (let i: number = 0, len: number = xValues.length; i < len; ++i) {
            sumX += Number(xValues[i]);
            sumY += Number(yValues[i]);
        }
        sumX = sumX / xValues.length;
        sumY = sumY / xValues.length;
        let sumXY: number = 0;
        let sumX2: number = 0;
        let diff: number;
        for (let i: number = 0, len: number = xValues.length; i < len; ++i) {
            diff = Number(xValues[i]) - sumX;
            sumXY += diff * (Number(yValues[i]) - sumY);
            sumX2 += diff * diff;
        }
        const result: string = (sumY - sumXY / sumX2 * sumX).toString();
        // if ((sumY - sumXY) === 0 || (sumX2 * sumX) === 0) {
        //     this.parent.getErrorStrings()[CommonErrors.divzero];
        // }
        if (result === 'NaN') {
            return this.parent.getErrorStrings()[CommonErrors.divzero];
        }
        return result;
    }

    /**
     * @hidden
     * @param {string[]} logValue - specify the log value.
     * @returns {string | number} - Compute the value.
     */
    public ComputeLN(...logValue: string[]): string | number {
        const argArr: string[] = logValue;
        let cellvalue: string = '';
        let logVal: number;
        let orgValue: number | string;
        if (logValue.length === 0 || logValue.length > 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        if (this.parent.isCellReference(argArr[0])) {
            cellvalue = this.parent.getValueFromArg(argArr[0]);
            logVal = this.parent.parseFloat(cellvalue);
            if (logVal <= 0 || cellvalue === '') {
                return this.parent.getErrorStrings()[CommonErrors.num];
            }
            if (isNaN(logVal)) {
                return this.parent.getErrorStrings()[CommonErrors.value];
            }
        } else {
            orgValue = this.parent.getValueFromArg(argArr[0].split(this.parent.tic).join(''));
            logVal = this.parent.parseFloat(orgValue);
            if (logVal <= 0 || logVal.toString() === '') {
                return this.parent.getErrorStrings()[CommonErrors.num];
            }
            if (isNaN(logVal)) {
                return this.parent.getErrorStrings()[CommonErrors.value];
            }
        }
        return Math.log(logVal);
    }

    /**
     * @hidden
     * @param {string[]} logValue - specify the log value.
     * @returns {boolean | string} - Compute the Isnumber value.
     */
    public ComputeISNUMBER(...logValue: string[]): boolean | string {
        const argArr: string[] = logValue;
        if (logValue.length === 0 || logValue.length > 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        const orgValue: number | string = (this.parent.isCellReference(argArr[0])) ? this.parent.getValueFromArg(argArr[0]) :
            this.parent.getValueFromArg(argArr[0].split(this.parent.tic).join(''));
        if (orgValue.toString() === '') { return false; }
        const logVal: number = this.parent.parseFloat(orgValue);
        return !isNaN(logVal) ? true : false;
    }

    /**
     * @hidden
     * @param {string[]} logValue - specify the log value.
     * @returns {number | string} - Compute the round value.
     */
    public ComputeROUND(...logValue: string[]): number | string {
        const argArr: string[] = logValue;
        let orgValue: number | string;
        let x: number = 0;
        let digits: number = 0;
        let round: number | string;
        let numStr: string | number;
        let digStr: string | number;
        let mult: number;
        if (logValue.length === 0 || logValue.length > 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        if (logValue.length === 1) {
            orgValue = (argArr[0].split(this.parent.tic).join('') === 'TRUE')
                ? '1'
                : (argArr[0].split(this.parent.tic).join('') === 'FALSE')
                    ? '0'
                    : argArr[0];
            return Math.round(this.parent.parseFloat(orgValue)).toString();
        }
        numStr = this.parent.getValueFromArg(argArr[0]);
        digStr = (argArr[1].split(this.parent.tic).join('')) === '' ? '0' :
            this.parent.getValueFromArg(argArr[1].split(this.parent.tic).join(''));
        numStr = (numStr.split(this.parent.tic).join('') === 'TRUE')
            ? '1'
            : (numStr.split(this.parent.tic).join('') === 'FALSE')
                ? '0' : numStr;
        digStr = (digStr.split(this.parent.tic).join('') === 'TRUE') ? '1'
            : (digStr.split(this.parent.tic).join('') === 'FALSE')
                ? '0' : digStr;
        if (numStr !== '' && digStr !== '') {
            x = this.parent.parseFloat(numStr);
            digits = this.parent.parseFloat(digStr);
            if (!isNaN(digits) && !isNaN(x) && digits > 0) {
                round = x.toFixed(digits);
            } else {
                mult = Math.pow(10, -digits);
                round = Math.round(x / mult) * mult;
            }
        }
        return round.toString();
    }

    /**
     * @hidden
     * @param {string[]} logValue - specify the log value.
     * @returns {boolean | string} - Compute the power value.
     */
    public ComputePOWER(...logValue: string[]): boolean | string {
        const argArr: string[] = logValue;
        let power: string | number;
        let orgNumValue: number | string;
        let orgPowValue: number | string;
        if (logValue.length === 0 || logValue.length > 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        orgNumValue = this.parent.getValueFromArg(argArr[0]);
        orgPowValue = this.parent.getValueFromArg(argArr[1]);
        orgNumValue = (orgNumValue.split(this.parent.tic).join('') === 'TRUE') ? '1' :
            (orgNumValue.split(this.parent.tic).join('') === 'FALSE') ? '0' : orgNumValue;
        orgPowValue = (orgPowValue.split(this.parent.tic).join('') === 'TRUE') ? '1' :
            (orgPowValue.split(this.parent.tic).join('') === 'FALSE') ? '0' : orgPowValue;
        const logNumValue: number | string = this.parent.parseFloat(orgNumValue);
        const logPowValue: number | string = this.parent.parseFloat(orgPowValue);
        if (!isNaN(logNumValue) && !isNaN(logPowValue)) {
            if (logNumValue === 0 && logPowValue < 0) {
                return this.parent.getErrorStrings()[CommonErrors.divzero];
            }
            if (logNumValue === 0 && logPowValue === 0) {
                return this.parent.getErrorStrings()[CommonErrors.num];
            }
            power = Math.pow(logNumValue, logPowValue);
        } else {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
        return power.toString();
    }

    /**
     * @hidden
     * @param {string[]} logValue - specify the log value.
     * @returns {number | string} - Compute the log value.
     */
    public ComputeLOG(...logValue: string[]): number | string {
        const argArr: string[] = logValue;
        let orgNumValue: number | string;
        let orgBaseValue: number | string;
        if (logValue.length === 0 || logValue.length > 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        orgNumValue = this.parent.getValueFromArg(argArr[0]);
        orgBaseValue = (logValue.length === 2) ? this.parent.getValueFromArg(argArr[1]) : '10';
        if ((orgNumValue === '' || orgNumValue === null) || (orgBaseValue === '' || orgBaseValue === null)) {
            return this.parent.getErrorStrings()[CommonErrors.num];
        }
        orgNumValue = (orgNumValue.split(this.parent.tic).join('') === 'TRUE') ? '1' :
            (orgNumValue.split(this.parent.tic).join('') === 'FALSE') ? '0' : orgNumValue;
        orgBaseValue = (orgBaseValue.split(this.parent.tic).join('') === 'TRUE') ? '1' :
            (orgBaseValue.split(this.parent.tic).join('') === 'FALSE') ? '0' : orgBaseValue;
        const logNumValue: number | string = this.parent.parseFloat(orgNumValue);
        const logBaseValue: number | string = this.parent.parseFloat(orgBaseValue);
        if (logNumValue <= 0 || logBaseValue <= 0) {
            return this.parent.getErrorStrings()[CommonErrors.num];
        }
        if (logBaseValue === 1) {
            return this.parent.getErrorStrings()[CommonErrors.divzero];
        }
        if (!isNaN(logNumValue) && !isNaN(logBaseValue)) {
            return ((Math.log(logNumValue) / Math.LN10) / (Math.log(logBaseValue) / Math.LN10)).toString();
        } else {
            return this.parent.getErrorStrings()[CommonErrors.value];
        }
    }
    /**
     * @hidden
     * @param {string[]} logValue - specify the log value.
     * @returns {boolean | string} - Compute the trunc value.
     */
    public ComputeTRUNC(...logValue: string[]): boolean | string {
        const argArr: string[] = logValue;
        let orgNumValue: number | string;
        let orgDigitValue: number | string = 0;
        if (logValue.length === 0 || logValue.length > 2) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        if (logValue.length === 2) {
            orgDigitValue = this.parent.getValueFromArg(argArr[1]);
            orgDigitValue = (orgDigitValue.split(this.parent.tic).join('') === 'TRUE') ? '1' :
                (orgDigitValue.split(this.parent.tic).join('') === 'FALSE') ? '0' : orgDigitValue;
            orgDigitValue = this.parent.parseFloat(orgDigitValue);
        }
        orgNumValue = this.parent.getValueFromArg(argArr[0]);
        orgNumValue = (orgNumValue.split(this.parent.tic).join('') === 'TRUE') ? '1' :
            (orgNumValue.split(this.parent.tic).join('') === 'FALSE') ? '0' : orgNumValue;
        const logNumValue: number | string = this.parent.parseFloat(orgNumValue.split(this.parent.tic).join(''));
        if (isNaN(logNumValue) || isNaN(orgDigitValue)) {
            return (argArr[0] === this.parent.tic || this.parent.isCellReference(argArr[0]) || (argArr[1] === this.parent.tic
                || this.parent.isCellReference(argArr[1]))) ? this.parent.getErrorStrings()[CommonErrors.value]
                : this.parent.getErrorStrings()[CommonErrors.name];
        }
        const normalizer: number | string = Math.pow(10, orgDigitValue);
        const logDigitValue: number | string = (logNumValue < 0) ? -1 : 1;
        return (logDigitValue * Math.floor(normalizer * Math.abs(logNumValue)) / normalizer).toString();
    }
    /**
     * @hidden
     * @param {string[]} logValue - specify the log value.
     * @returns {boolean | string} - Compute the expression.
     */
    public ComputeEXP(...logValue: string[]): boolean | string {
        const argArr: string[] = logValue;
        let orgNumValue: number | string;
        if (logValue.length === 0 || logValue.length > 1) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        orgNumValue = this.parent.getValueFromArg(argArr[0]);
        orgNumValue = (orgNumValue.split(this.parent.tic).join('') === 'TRUE') ? '1' :
            (orgNumValue.split(this.parent.tic).join('') === 'FALSE') ? '0' : orgNumValue;
        if (orgNumValue === '') {
            orgNumValue = '0';
        }
        const logNumValue: number | string = this.parent.parseFloat(orgNumValue);
        if (logNumValue > 709) {
            return this.parent.getErrorStrings()[CommonErrors.num];
        }
        if (isNaN(logNumValue)) {
            return (argArr[0] === this.parent.tic || this.parent.isCellReference(argArr[0])) ?
                this.parent.getErrorStrings()[CommonErrors.value]
                : this.parent.getErrorStrings()[CommonErrors.name];
        }
        return Math.exp(logNumValue).toString();
    }
    /**
     * @hidden
     * @param {string[]} logValue - specify the log value
     * @returns {boolean | string} - compute the value.
     */
    public ComputeGEOMEAN(...logValue: string[]): boolean | string {
        const argArr: string[] = logValue;
        let sum: number | string = 1;
        let count: number | string = 0;
        let cellVal: number | string = 0;
        let dev: number | string;
        let r: number;
        let s: number;
        let cell: string[] | string;
        if (logValue.length === 0) {
            return this.parent.formulaErrorStrings[FormulasErrorsStrings.wrong_number_arguments];
        }
        for (r = 0; r < argArr.length; r++) {
            if (argArr[r].indexOf(':') > -1) {
                if (argArr[0] === this.parent.tic) {
                    return this.parent.getErrorStrings()[CommonErrors.value];
                }
                cell = this.parent.getCellCollection(argArr[r].split(this.parent.tic).join(''));
                for (s = 0; s < cell.length; s++) {
                    cellVal = this.parent.getValueFromArg(cell[s]);
                    cellVal = (cellVal.split(this.parent.tic).join('') === 'TRUE') ? '1' :
                        (cellVal.split(this.parent.tic).join('') === 'FALSE') ? '0' : cellVal;
                    dev = this.parent.parseFloat(cellVal);
                    if (dev <= 0) {
                        return this.parent.getErrorStrings()[CommonErrors.num];
                    } else if (!isNaN(dev)) {
                        count++;
                        sum = sum * dev;
                    }
                }
            } else {

                cellVal = this.parent.getValueFromArg(argArr[r]);
                if (cellVal.length > 0) {
                    cellVal = (cellVal.split(this.parent.tic).join('') === 'TRUE') ? '1' :
                        (cellVal.split(this.parent.tic).join('') === 'FALSE') ? '0' : cellVal;
                    if (!this.parent.isCellReference(argArr[r])) {
                        if (isNaN(this.parent.parseFloat(cellVal))) {
                            return this.parent.getErrorStrings()[CommonErrors.name];
                        }
                    }
                    dev = this.parent.parseFloat(cellVal);
                    if (dev <= 0) {
                        return this.parent.getErrorStrings()[CommonErrors.num];
                    } else if (!isNaN(dev)) {
                        count++;
                        sum = sum * dev;
                    }
                }
            }
        }
        if (count > 0) {
            sum = Math.pow(sum, 1 / count);
        }
        return sum.toString();
    }
    private getDataCollection(cells: string[] | string): string[] {
        const cellsData: string[] = [];
        for (let i: number = 0, len: number = cells.length; i < len; i++) {
            cellsData.push(this.parent.getValueFromArg(cells[i]));
        }
        return cellsData;
    }
    /**
     * @hidden
     * @param {string} value - specify the value
     * @returns {number} - Returns parse double value.
     */
    private parseDouble(value: string): number {
        const val: number = this.parent.parseFloat(value.toString());
        return !isNaN(val) ? val : NaN;
    }
    /**
     * @hidden
     * @param {string} value - specify the value
     * @returns {string} - Returns spreadsheet display text.
     */
    private spreadsheetDisplayText(value: string): string {
        // eslint-disable-next-line
        if (this.parent.parentObject && (this.parent.parentObject as any).element && (this.parent.parentObject as any).element.classList.contains('e-spreadsheet') && this.parent.isCellReference(value)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const indexes: { startIdx: number, endIdx: number, isCol: boolean } = (this.parent.parentObject as any).getIndexes(value);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value = (this.parent.parentObject as any).getDisplayText((this.parent.parentObject as any).
                getActiveSheet().rows[indexes.startIdx].cells[indexes.endIdx]);
        }
        return value;
    }

    /**
     * @hidden
     * @param {string} value - specify the value
     * @returns {string} - Returns spreadsheet format.
     */
    private spreadsheetFormat(value: string): string {
        // eslint-disable-next-line
        if (this.parent.parentObject && (this.parent.parentObject as any).element && (this.parent.parentObject as any).element.classList.contains('e-spreadsheet') && this.parent.isCellReference(value)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const index: { startIdx: number, endIdx: number, isCol: boolean } = (this.parent.parentObject as any).getIndexes(value);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value = (this.parent.parentObject as any).getActiveSheet().rows[index.startIdx].cells[index.endIdx].format;
        }
        return value;
    }
    protected getModuleName(): string {
        return 'basic-formulas';
    }
}
