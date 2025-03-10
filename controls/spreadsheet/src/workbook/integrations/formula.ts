import { Workbook, getSheetName, getSheet, SheetModel, RowModel, CellModel, getSheetIndexFromId } from '../base/index';
import { getSingleSelectedRange, getCell, getSheetIndex } from '../base/index';
import { workbookFormulaOperation, getColumnHeaderText, aggregateComputation, AggregateArgs, clearFormulaDependentCells, formulaInValidation } from '../common/index';
import { Calculate, ValueChangedArgs, CalcSheetFamilyItem, FormulaInfo, CommonErrors, getAlphalabel } from '../../calculate/index';
import { IFormulaColl } from '../../calculate/common/interface';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { DefineNameModel, getCellAddress, getFormattedCellObject, isNumber, checkIsFormula, removeUniquecol, checkUniqueRange } from '../common/index';
import { getRangeAddress, InsertDeleteEventArgs, getRangeFromAddress, isCellReference, refreshInsertDelete, getUpdatedFormulaOnInsertDelete } from '../common/index';
import { getUniqueRange, DefineName, selectionComplete, DefinedNameEventArgs, getRangeIndexes, InvalidFormula } from '../common/index';


/**
 * @hidden
 * The `WorkbookFormula` module is used to handle the formula operation in Workbook.
 */
export class WorkbookFormula {
    private parent: Workbook;
    private calcID: number;
    public uniqueOBracket: string = String.fromCharCode(129);
    public uniqueCBracket: string = String.fromCharCode(130);
    public uniqueCSeparator: string = String.fromCharCode(131);
    public uniqueCOperator: string = String.fromCharCode(132);
    public uniquePOperator: string = String.fromCharCode(133);
    public uniqueSOperator: string = String.fromCharCode(134);
    public uniqueMOperator: string = String.fromCharCode(135);
    public uniqueDOperator: string = String.fromCharCode(136);
    public uniqueModOperator: string = String.fromCharCode(137);
    public uniqueConcateOperator: string = String.fromCharCode(138);
    public uniqueEqualOperator: string = String.fromCharCode(139);
    public uniqueExpOperator: string = String.fromCharCode(140);
    public uniqueGTOperator: string = String.fromCharCode(141);
    public uniqueLTOperator: string = String.fromCharCode(142);
    public calculateInstance: Calculate;
    private sheetInfo: { visibleName: string, sheet: string, index: number }[] = [];
    /**
     * Constructor for formula module in Workbook.
     *
     * @param {Workbook} workbook - Specifies the workbook.
     * @private
     */
    constructor(workbook: Workbook) {
        this.parent = workbook;
        this.init();
    }

    private init(): void {
        this.addEventListener();
        this.initCalculate();
        this.registerSheet();
    }

    /**
     * To destroy the formula module.
     *
     * @returns {void}
     * @hidden
     */
    public destroy(): void {
        this.removeEventListener();
        this.calculateInstance.dispose();
        this.calculateInstance = null;
        this.parent = null;
    }

    private addEventListener(): void {
        this.parent.on(workbookFormulaOperation, this.performFormulaOperation, this);
        this.parent.on(aggregateComputation, this.aggregateComputation, this);
        this.parent.on(getUniqueRange, this.getUniqueRange, this);
        this.parent.on(removeUniquecol, this.removeUniquecol, this);
        this.parent.on(clearFormulaDependentCells, this.clearFormulaDependentCells, this);
        this.parent.on(formulaInValidation, this.formulaInValidation, this);
        this.parent.on(refreshInsertDelete, this.refreshInsertDelete, this);
        this.parent.on(getUpdatedFormulaOnInsertDelete, this.getUpdatedFormulaOnInsertDelete, this);
    }

    private removeEventListener(): void {
        if (!this.parent.isDestroyed) {
            this.parent.off(workbookFormulaOperation, this.performFormulaOperation);
            this.parent.off(aggregateComputation, this.aggregateComputation);
            this.parent.off(getUniqueRange, this.getUniqueRange);
            this.parent.off(removeUniquecol, this.removeUniquecol);
            this.parent.off(clearFormulaDependentCells, this.clearFormulaDependentCells);
            this.parent.off(formulaInValidation, this.formulaInValidation);
            this.parent.off(refreshInsertDelete, this.refreshInsertDelete);
            this.parent.off(getUpdatedFormulaOnInsertDelete, this.getUpdatedFormulaOnInsertDelete);
        }
    }

    /**
     * Get the module name.
     *
     * @returns {string} - Get the module name.
     * @private
     */
    public getModuleName(): string {
        return 'workbookFormula';
    }

    private initCalculate(): void {
        this.calculateInstance = new Calculate(this.parent);
        this.calcID = this.calculateInstance.createSheetFamilyID();
        this.calculateInstance.setTreatEmptyStringAsZero(true);
        this.calculateInstance.grid = this.parent.getActiveSheet().id.toString();
    }

    private clearFormulaDependentCells(args: { [key: string]: string | boolean }): void {
        if (args.isOpen as boolean) {
            this.calculateInstance.getDependentCells().clear();
            this.calculateInstance.getFormulaInfoTable().clear();
            return;
        }
        let cellRef: string = args.cellRef as string;
        cellRef = cellRef.split(':')[0];
        cellRef = '!' + this.parent.activeSheetIndex + '!' + cellRef;
        this.calculateInstance.clearFormulaDependentCells(cellRef);
    }

    private formulaInValidation(args: InvalidFormula): void {
        const col: IFormulaColl = this.calculateInstance.getLibraryFormulas().get(args.value);
        args.skip = isNullOrUndefined(col);
    }
    private performFormulaOperation(args: { [key: string]: Object }): void {
        const action: string = <string>args.action;
        const formulas: Map<string, IFormulaColl> = this.calculateInstance.getLibraryFormulas();
        const formulaInfo: IFormulaColl[] = (Array.from(formulas.values()));
        let collection: string[];
        switch (action) {
        case 'getLibraryFormulas':
            args.formulaCollection = Array.from(formulas.keys());
            break;
        case 'getFormulaCategory':
            collection = ['All'];
            for (let i: number = 1; i < Array.from(formulas.values()).length; i++) {
                if (collection.indexOf(formulaInfo[i].category) < 0) {
                    collection.push(formulaInfo[i].category);
                }
            }
            args.categoryCollection = collection; break;
        case 'dropDownSelectFormulas':
            for (let i: number = 0; i < Array.from(formulas.values()).length; i++) {
                if (args.selectCategory === formulaInfo[i].category) {
                    args.formulaCollection[i] = Array.from(formulas.keys())[i];
                }
            }
            break;
        case 'getFormulaDescription':
            for (let i: number = 0; i < Array.from(formulas.values()).length; i++) {
                if (args.selectedList === Array.from(formulas.keys())[i]) {
                    args.description = formulaInfo[i].description;
                }
            }
            break;
        case 'registerSheet':
            this.registerSheet(<number>args.sheetIndex, <number>args.sheetCount);
            if (args.isImport) {
                this.updateSheetInfo();
            }
            break;
        case 'unRegisterSheet':
            this.unRegisterSheet(<number>args.sheetIndex, <number>args.sheetCount, <boolean>args.propertyChange); break;
        case 'initSheetInfo':
            this.updateSheetInfo(); break;
        case 'refreshCalculate':
            if (<boolean>args.isFormula) {
                args.value = this.autoCorrectFormula(
                    <string>args.value, <number>args.rowIndex, <number>args.colIndex, <number>args.sheetIndex);
                if (<boolean>args.isClipboard && args.value.toString().toUpperCase().includes('UNIQUE')) {
                    this.parent.sheets[<number>args.sheetIndex].rows[<number>args.rowIndex].cells[<number>args.colIndex].value = '';
                }
            }
            this.refreshCalculate(
                <number>args.rowIndex, <number>args.colIndex, <string>args.value,
                <boolean>args.isFormula, <number>args.sheetIndex, <boolean>args.isRefreshing
            );
            args.value = args.value ? args.value.toString().split('-*').join('-').split('/*').join('/').split('*/').
                join('*').split('-/').join('-').split('*+').join('*').split('+*').join('+') : args.value;
            break;
        case 'getArgumentSeparator':
            args.argumentSeparator = this.calculateInstance.getParseArgumentSeparator();
            break;
        case 'addDefinedName':
            args.isAdded = this.addDefinedName(<DefineNameModel>args.definedName, false, <number>args.index, <boolean>args.isEventTrigger);
            break;
        case 'removeDefinedName':
            args.isRemoved = this.removeDefinedName(<string>args.definedName, <string>args.scope, <boolean>args.isEventTrigger);
            break;
        case 'initiateDefinedNames':
            this.initiateDefinedNames();
            break;
        case 'renameUpdation':
            this.renameUpdation(<string>args.value, <string>args.pName);
            break;
        case 'addSheet':
            this.sheetInfo.push({ visibleName: <string>args.visibleName, sheet: <string>args.sheetName, index: <number>args.sheetId });
            break;
        case 'getSheetInfo':
            args.sheetInfo = this.sheetInfo;
            break;
        case 'deleteSheetTab':
            for (let i: number = 0; i < this.sheetInfo.length; i++) {
                if (this.sheetInfo[i].index === <number>args.sheetId) {
                    const sheetName: string = this.sheetInfo[i].sheet; this.sheetInfo.splice(i, 1);
                    const id: string = args.sheetId.toString();
                    this.sheetDeletion(sheetName, id);
                    this.calculateInstance.unregisterGridAsSheet(id, id);
                    break;
                }
            }
            break;
        case 'getReferenceError':
            args.refError = this.referenceError(); break;
        case 'getAlpha':
            args.col = getAlphalabel(<number>args.col);
            break;
        case 'addCustomFunction':
            this.addCustomFunction(<string | Function>args.functionHandler, <string>args.functionName);
            break;
        case 'computeExpression':
            args.calcValue = this.calculateInstance.computeExpression(<string>args.formula);
            break;
        case 'registerGridInCalc':
            this.calculateInstance.grid = <string>args.sheetID; break;
        case 'checkFormulaAdded':
            // eslint-disable-next-line no-case-declarations
            const family: CalcSheetFamilyItem = this.calculateInstance.getSheetFamilyItem(args.sheetId);
            if (family.isSheetMember && !isNullOrUndefined(family.parentObjectToToken)) {
                args.address = family.parentObjectToToken.get(args.sheetId) + args.address;
            }
            args.added = this.calculateInstance.getFormulaInfoTable().has(<string>args.address);
            break;
        }
    }
    private referenceError(): string {
        return this.calculateInstance.getErrorStrings()[CommonErrors.ref];
    }
    private getSheetInfo(): { visibleName: string, sheet: string }[] {
        return this.sheetInfo;
    }
    private addCustomFunction(functionHandler: string | Function, functionName: string): void {
        this.calculateInstance.defineFunction(functionName, functionHandler);
    }
    private updateSheetInfo(): void {
        this.sheetInfo = [];
        this.parent.sheets.forEach((sheet: SheetModel) => {
            this.sheetInfo.push({ visibleName: sheet.name, sheet: 'Sheet' + sheet.id, index: sheet.id });
        });
    }

    private sheetDeletion(delSheetName: string, sheetId: string): void {
        const dependentCell: Map<string, string[]> = this.calculateInstance.getDependentCells();
        let fInfo: FormulaInfo; let formulaVal: string; let rowId: number; let colId: number; let token: string;
        const family: CalcSheetFamilyItem = this.calculateInstance.getSheetFamilyItem(sheetId);
        dependentCell.forEach((dependentCellRefs: string[], cellRef: string) => {
            dependentCellRefs.forEach((dependentCellRef: string): void => {
                fInfo = this.calculateInstance.getFormulaInfoTable().get(dependentCellRef);
                if (!isNullOrUndefined(fInfo)) {
                    formulaVal = fInfo.formulaText;
                    if (formulaVal.toUpperCase().indexOf(delSheetName.toUpperCase()) > -1) {
                        formulaVal = formulaVal.toUpperCase().split(delSheetName.toUpperCase() +
                            this.calculateInstance.sheetToken).join(this.referenceError());
                        rowId = this.calculateInstance.rowIndex(dependentCellRef);
                        colId = this.calculateInstance.colIndex(dependentCellRef);
                        token = dependentCellRef.slice(0, dependentCellRef.lastIndexOf(this.calculateInstance.sheetToken) + 1);
                        this.updateDataContainer(
                            [rowId - 1, colId - 1], { value: formulaVal, visible: false, sheetId: family.tokenToParentObject.has(token) ?
                                Number(family.tokenToParentObject.get(token)) : parseInt(dependentCellRef.split('!')[1], 10) + 1 });
                        this.calculateInstance.refresh(fInfo.getParsedFormula());
                    }
                }
                token = cellRef.slice(0, cellRef.lastIndexOf(this.calculateInstance.sheetToken) + 1);
                if (sheetId === (family.tokenToParentObject.has(token) ? family.tokenToParentObject.get(token) :
                    cellRef.split('!')[1])) {
                    this.calculateInstance.getFormulaInfoTable().delete(cellRef);
                    this.calculateInstance.clearFormulaDependentCells(cellRef);
                }
            });
        });
    }

    private renameUpdation(name: string, pName: string): void {
        let sheet: SheetModel; let cell: CellModel; const uPName: string = pName.toUpperCase();
        const escapeRegx: RegExp = new RegExp('[!@#$%^&()+=\';,.{}|\\":<>~_-]', 'g');
        const exp: string = '(?=[\'!])(?=[^"]*(?:"[^"]*"[^"]*)*$)';
        const regx: RegExp = new RegExp(pName.replace(escapeRegx, '\\$&') + exp, 'gi');
        this.sheetInfo.forEach((info: { visibleName: string }, index: number): void => {
            sheet = this.parent.sheets[index];
            for (let i: number = 0, rowLen: number = sheet.usedRange.rowIndex; i <= rowLen; i++) {
                for (let j: number = 0, colLen: number = sheet.usedRange.colIndex; j <= colLen; j++) {
                    cell = getCell(i, j, sheet, false, true);
                    if (cell.formula && checkIsFormula(cell.formula) && cell.formula.toUpperCase().includes(uPName) &&
                        cell.formula.match(regx)) {
                        cell.formula = cell.formula.replace(regx, name);
                    }
                }
            }
            if (info.visibleName === pName) { info.visibleName = name; }
        });
    }

    private updateDataContainer(indexes: number[], data: { value: string, sheetId: number, visible?: boolean }): void {
        let sheet: SheetModel; let rowData: RowModel; let colObj: CellModel;
        for (let i: number = 0, len: number = this.parent.sheets.length; i < len; i++) {
            if (this.parent.sheets[i].id === data.sheetId) {
                sheet = this.parent.sheets[i];
                if (indexes[0] in sheet.rows) {
                    rowData = sheet.rows[indexes[0]];
                    if (indexes[1] in rowData.cells) {
                        colObj = rowData.cells[indexes[1]];
                        colObj.formula = data.value;
                        if (data.visible) {
                            if (i === this.parent.activeSheetIndex && sheet.activeCell === getCellAddress(indexes[0], indexes[1])) {
                                this.parent.notify(selectionComplete, {});
                            }
                        } else {
                            colObj.value = this.referenceError();
                        }
                    } else {
                        rowData.cells[indexes[1]] = colObj = {};
                    }
                } else {
                    rowData = sheet.rows[indexes[0]] = {};
                    rowData[indexes[1]] = colObj = {};
                }
                break;
            }
        }
    }

    private parseSheetRef(value: string): string {
        let regx: RegExp;
        // eslint-disable-next-line no-useless-escape
        const escapeRegx: RegExp = new RegExp('[!@#$%^&()+=\';,.{}|\":<>~_-]', 'g');
        let i: number = 0;
        const sheetCount: number = this.parent.sheets.length;
        const temp: number[] = [];
        temp.length = 0;
        let regxTemp: RegExp; let searchIdx: number; let idx: number; let valSearchIdx: number; let regxVisible: RegExp;
        const sheetInfo: { visibleName: string, sheet: string }[] = this.getSheetInfo();
        const exp: string = '(?=[\'!])(?=[^"]*(?:"[^"]*"[^"]*)*$)';
        for (i = 0; i < sheetCount; i++) {
            if (sheetInfo[i].sheet !== sheetInfo[i].visibleName) {
                regx = new RegExp(sheetInfo[i].visibleName.replace(escapeRegx, '\\$&') + exp, 'gi');
                idx = i;
                if (value.match(regx)) {
                    for (let j: number = i + 1; j < sheetCount; j++) {
                        regxTemp = new RegExp(sheetInfo[j].visibleName.replace(escapeRegx, '\\$&') + exp, 'gi');
                        searchIdx = value.search(regxTemp); valSearchIdx = value.search(regx);
                        if (searchIdx > -1 && (searchIdx < valSearchIdx || (searchIdx === valSearchIdx && sheetInfo[j].visibleName.length >
                            sheetInfo[i].visibleName.length))) {
                            regxVisible = new RegExp('Sheet', 'gi');
                            if (sheetInfo[j].visibleName.search(regxVisible) !== 0) {
                                regx = regxTemp; idx = j;
                            }
                        }
                    }
                    value = value.replace(regx, idx + '/');
                    temp.push(idx);
                }
            }
        }
        i = 0;
        while (i < temp.length) {
            regx = new RegExp(temp[i] + '/' + exp, 'gi');
            value = value.replace(regx, sheetInfo[temp[i]].sheet);
            i++;
        }
        return value;
    }

    private registerSheet(sheetIndex: number = 0, sheetCount: number = this.parent.sheets.length): void {
        let id: string;
        while (sheetIndex < sheetCount) {
            id = getSheet(this.parent, sheetIndex).id + '';
            this.calculateInstance.registerGridAsSheet(id, id, this.calcID);
            sheetIndex++;
        }
    }

    private unRegisterSheet(
        sheetIndex: number = 0, sheetCount: number = this.parent.sheets.length, propertyChange?: boolean): void {
        let id: string;
        this.calculateInstance.tokenCount = 0;
        if (propertyChange) {
            this.calculateInstance.unregisterGridAsSheet(id, id, propertyChange);
        } else {
            while (sheetIndex < sheetCount) {
                id = getSheet(this.parent, sheetIndex).id + '';
                this.calculateInstance.unregisterGridAsSheet(id, id);
                sheetIndex++;
            }
        }
    }

    private getUniqueRange(args: { [key: string]: string[] }): void {
        args.range = this.calculateInstance.uniqueRange;
    }

    private removeUniquecol(): void {
        const sheet: SheetModel = this.parent.getActiveSheet();
        for (let i: number = 0; i < this.calculateInstance.uniqueRange.length; i++) {
            const uniqRngAddress: string[] = this.calculateInstance.uniqueRange[i].split(':')[0].split('!');
            if (uniqRngAddress[0] === sheet.name && uniqRngAddress[1] === sheet.activeCell ) {
                const range: number[] = getRangeIndexes(this.calculateInstance.uniqueRange[i]);
                this.calculateInstance.uniqueRange.splice(i, 1);
                for (let j: number = range[0]; j <= range[2]; j++) {
                    for (let k: number = range[1]; k <= range[3]; k++) {
                        const cell: CellModel = getCell(j, k, this.parent.getActiveSheet());
                        cell.formula = '';
                        this.parent.updateCell({ value: '', formula: ''}, getRangeAddress([j, k]));
                    }
                }
            }
        }
    }
    private refreshCalculate(
        rowIdx: number, colIdx: number, value: string, isFormula: boolean, sheetIdx: number, isRefreshing: boolean): void {
        const sheet: SheetModel = isNullOrUndefined(sheetIdx) ? this.parent.getActiveSheet() : getSheet(this.parent, sheetIdx);
        let sheetId: string = sheet.id + '';
        const sheetName: string = sheet.name;
        if (isFormula) {
            value = this.parseSheetRef(value);
            const cellArgs: ValueChangedArgs = new ValueChangedArgs(rowIdx + 1, colIdx + 1, value);
            const usedRange: number[] = [sheet.usedRange.rowIndex, sheet.usedRange.colIndex];
            this.calculateInstance.valueChanged(sheetId, cellArgs, true, usedRange, isRefreshing, sheetName);
            const referenceCollection: string[] = this.calculateInstance.randCollection;
            if (this.calculateInstance.isRandomVal === true) {
                let rowId: number;
                let colId: number;
                let refValue: string = '';
                if (this.calculateInstance.randomValues.size > 1 && this.calculateInstance.randomValues.size ===
                    referenceCollection.length) {
                    for (let i: number = 0; i < this.calculateInstance.randomValues.size; i++) {
                        rowId = this.calculateInstance.rowIndex(referenceCollection[i]);
                        colId = this.calculateInstance.colIndex(referenceCollection[i]);
                        refValue = this.calculateInstance.randomValues.get(referenceCollection[i]);
                        sheetId = (parseFloat(this.calculateInstance.getSheetToken(
                            referenceCollection[i]).split(this.calculateInstance.sheetToken).join('')) + 1).toString();
                        const tempArgs: ValueChangedArgs = new ValueChangedArgs(rowId, colId, refValue);
                        this.calculateInstance.valueChanged(sheetId, tempArgs, true);
                    }
                }
            }
        } else {
            const family: CalcSheetFamilyItem = this.calculateInstance.getSheetFamilyItem(sheetId);
            let cellRef: string = getColumnHeaderText(colIdx + 1) + (rowIdx + 1);
            if (family.isSheetMember && !isNullOrUndefined(family.parentObjectToToken)) {
                cellRef = family.parentObjectToToken.get(sheetId) + cellRef;
            }
            if (this.calculateInstance.getFormulaInfoTable().has(cellRef)) {
                this.calculateInstance.getFormulaInfoTable().delete(cellRef);
                this.calculateInstance.clearFormulaDependentCells(cellRef);
            }
            this.calculateInstance.getComputedValue().clear();
            this.calculateInstance.refresh(cellRef);
            this.calculateInstance.refreshRandValues(cellRef);
        }
        this.calculateInstance.cell = '';
        const updatedCell: CellModel = getCell(rowIdx, colIdx, this.parent.getActiveSheet());
        if (value && value.toString().toUpperCase().startsWith('=DOLLAR(') &&
            updatedCell && updatedCell.value && updatedCell.value.startsWith('$')) {
            this.dollarFormulaDecimalHandler(updatedCell);
        }
        if (updatedCell && value && value.toString().toUpperCase().indexOf('=SUM(') === 0) {
            const errorStrings: string[] = ['#N/A', '#VALUE!', '#REF!', '#DIV/0!', '#NUM!', '#NAME?', '#NULL!', 'invalid arguments'];
            const val: string = value.toString().toUpperCase().replace('=SUM', '').replace('(', '').replace(')', '').split(':')[0];
            if (isCellReference(val)) {
                const index: number[] = getRangeIndexes(val);
                const fCell: CellModel = getCell(index[0], index[1], this.parent.getActiveSheet());
                if (fCell && fCell.value && fCell.format &&
                    errorStrings.indexOf(updatedCell.value) < 0 && errorStrings.indexOf(fCell.value) < 0) {
                    updatedCell.format = fCell.format;
                }
            }
        }
    }

    private dollarFormulaDecimalHandler(updatedCell: CellModel) {
        const decimalCount: number = updatedCell.value.split('.')[1].length;
        let decimalValue: string = "";
        for (let decimalIdx: number = 1; decimalIdx <= decimalCount; decimalIdx++) {
            decimalValue += "0";
        }
        updatedCell.format = '$#,##.' + decimalValue;
    }

    private autoCorrectFormula(formula: string, rowIdx: number, colIdx: number, sheetIdx: number): string {
        if (!isNullOrUndefined(formula)) {
            formula = formula.toString();
            if (formula.split('(').length === 2 && formula.indexOf(')') < 0) {
                formula += ')';
            }
            let isEqual: boolean;
            if (formula.indexOf('=') === 0) {
                formula = formula.slice(1); isEqual = true;
            }
            const lessEq: RegExpMatchArray = formula.match(/</g);
            const greaterEq: RegExpMatchArray = formula.match(/>/g);
            const equal: RegExpMatchArray = formula.match(/=/g);
            if (lessEq) {
                let lessOp: string = '';
                for (let i: number = 0; i < lessEq.length; i++) {
                    lessOp = lessOp + lessEq[i];
                }
                formula = formula.replace(lessOp, '<');
            }
            if (greaterEq) {
                let greaterOp: string = '';
                for (let j: number = 0; j < greaterEq.length; j++) {
                    greaterOp = greaterOp + greaterEq[j];
                }
                formula = formula.replace(greaterOp, '>');
            }
            if (equal) {
                let equalOp: string = '';
                for (let c: number = 0; c < equal.length; c++) {
                    equalOp = equalOp + equal[c];
                }
                formula = formula.split(equalOp).join('=');
            }
            formula = isEqual ? '=' + formula : formula;
            if (lessEq || greaterEq || equal) {
                getCell(
                    rowIdx, colIdx, isNullOrUndefined(sheetIdx) ? this.parent.getActiveSheet() : getSheet(
                        this.parent, sheetIdx)).formula = formula;
            }
        }
        return formula;
    }

    private initiateDefinedNames(): void {
        const definedNames: DefineNameModel[] = this.parent.definedNames;
        let i: number = 0;

        while (i < definedNames.length) {
            const definedname: DefineNameModel = definedNames[i];
            const refersTo: string = this.parseSheetRef(definedname.refersTo);
            let range: string = getRangeFromAddress(refersTo);
            let cellRef: boolean = false;
            const isLink: boolean = refersTo.indexOf('http:') > -1 ? true : (refersTo.indexOf('https:') > -1 ? true : false);
            range = range.split('$').join('');
            range = range.split('=').join('');
            if (range.indexOf(':') > -1) {
                const rangeSplit: string[] = range.split(':');
                if (isCellReference(rangeSplit[0]) && isCellReference(rangeSplit[1])) {
                    cellRef = true;
                }
            } else if (range.indexOf(':') < 0) {
                if (isCellReference(range)) {
                    cellRef = true;
                }
            }
            if (isLink) {
                cellRef = false;
            }
            if (cellRef) {
                this.addDefinedName(definedname, true, undefined, true);
            } else {
                this.removeDefinedName(definedname.name, definedname.scope, true);
                i--;
            }
            i++;
        }
    }

    /**
     * @hidden
     * Used to add defined name to workbook.
     *
     * @param {DefineNameModel} definedName - Define named range.
     * @param {boolean} isValidate - Specify the boolean value.
     * @param {number} index - Define named index.
     * @param {boolean} isEventTrigger - Specify the boolean value.
     * @returns {boolean} - Used to add defined name to workbook.
     */
    private addDefinedName(definedName: DefineNameModel, isValidate: boolean, index?: number, isEventTrigger?: boolean): boolean {
        if (index === undefined || index < -1) { index = this.parent.definedNames.length; }
        let isAdded: boolean = true;
        let sheetIdx: number;
        let name: string = definedName.name;
        if (definedName.refersTo.indexOf('!') < 0) {
            let sheetName: string = getSheetName(this.parent);
            sheetName = sheetName.indexOf(' ') !== -1 ? '\'' + sheetName + '\'' : sheetName;
            definedName.refersTo = sheetName + '!' + ((definedName.refersTo.indexOf('=') < 0) ?
                definedName.refersTo : definedName.refersTo.split('=')[1]);
        }
        const visibleRefersTo: string = definedName.refersTo;
        const refersTo: string = this.parseSheetRef(definedName.refersTo);
        if (definedName.scope) {
            sheetIdx = getSheetIndex(this.parent, definedName.scope);
            if (sheetIdx > -1) {
                name = getSheetName(this.parent, sheetIdx) + '!' + name;
            }
        } else {
            definedName.scope = '';
        }
        if (!definedName.comment) { definedName.comment = ''; }
        //need to extend once internal sheet value changes done.
        if (!isValidate && this.checkIsNameExist(definedName.name, definedName.scope)) {
            isAdded = false;
        } else {
            this.calculateInstance.addNamedRange(name, refersTo[0] === '=' ? refersTo.substr(1) : refersTo);
            if (refersTo[0] !== '=') {
                definedName.refersTo = '=' + visibleRefersTo;
            }
            if (this.parent.definedNames.indexOf(definedName) < 0) {
                this.parent.definedNames.splice(index, 0, definedName);
            }
        }
        const eventArgs: DefinedNameEventArgs = { name: definedName.name, scope: definedName.scope, comment: definedName.comment,
            refersTo: definedName.refersTo, cancel: false };
        if (!isEventTrigger) {
            this.parent.notify('actionComplete', { eventArgs: eventArgs, action: 'addDefinedName' });
        }
        return isAdded;
    }

    /**
     * @hidden
     * Used to remove defined name from workbook.
     *
     * @param {string} name - Specifies the defined name.
     * @param {string} scope - Specifies the scope of the define name.
     * @param {boolean} isEventTrigger - Specify the boolean value.
     * @returns {boolean} - To Return the bool value.
     */
    private removeDefinedName(name: string, scope: string, isEventTrigger?: boolean): boolean {
        let isRemoved: boolean = false;
        const index: number = this.getIndexFromNameColl(name, scope);
        if (index > -1) {
            let calcName: string = name;
            if (scope) {
                const sheetIdx: number = getSheetIndex(this.parent, scope);
                if (sheetIdx) {
                    calcName = getSheetName(this.parent, sheetIdx) + '!' + name;
                }
            }
            this.calculateInstance.removeNamedRange(calcName);
            this.parent.definedNames.splice(index, 1);
            if (!isEventTrigger) {
                const eventArgs: DefinedNameEventArgs = { name: name, scope: scope, cancel: false };
                this.parent.notify('actionComplete', { eventArgs: eventArgs, action: 'removeDefinedName' });
            }
            isRemoved = true;
        }
        return isRemoved;
    }

    private checkIsNameExist(name: string, sheetName?: string): boolean {
        const isExist: boolean = this.parent.definedNames.some((key: DefineNameModel) => {
            return key.name === name && (sheetName ? key.scope === sheetName : key.scope === '');
        });
        return isExist;
    }

    private getIndexFromNameColl(definedName: string, scope: string = ''): number {
        let index: number = -1;
        this.parent.definedNames.filter((name: DefineNameModel, idx: number) => {
            if (name.name === definedName && name.scope === scope) {
                index = idx;
            }
        });
        return index;
    }

    private toFixed(value: string): string {
        const num: number = Number(value);
        if (Math.round(num) !== num) { value = num.toFixed(2); }
        return value;
    }

    private aggregateComputation(args: AggregateArgs): void {
        const sheet: SheetModel = this.parent.getActiveSheet();
        let range: string = getSingleSelectedRange(sheet);
        const indexes: number[] = getRangeIndexes(range.split(':')[1]);
        if (indexes[0] + 1 === sheet.rowCount && indexes[1] + 1 === sheet.colCount) {
            range = `A1:${getCellAddress(sheet.usedRange.rowIndex, sheet.usedRange.colIndex)}`;
        }
        let calcValue: string; let i: number;
        const cellCol: string | string[] = this.calculateInstance.getCellCollection(range);
        for (i = 0; i < cellCol.length; i++) {
            calcValue = this.calculateInstance.getValueFromArg(cellCol[i]);
            if (isNumber(calcValue)) {
                args.countOnly = false;
                break;
            }
        }
        args.Count = this.calculateInstance.getFunction('COUNTA')(range);
        if (!args.Count || args.countOnly) {
            return;
        }
        const formulaVal: string[] = ['SUM', 'AVERAGE', 'MIN', 'MAX'];
        const formatedValues: string[] = [];
        const index: number[] = getRangeIndexes(sheet.activeCell);
        const cell: CellModel = getCell(index[0], index[1], sheet, false, true);
        for (i = 0; i < 4; i++) {
            calcValue = this.toFixed(this.calculateInstance.getFunction(formulaVal[i])(range));
            if (cell.format) {
                const eventArgs: { [key: string]: string | number | boolean | CellModel } = { formattedText: calcValue, value: calcValue,
                    format: cell.format, cell: { value: calcValue, format: cell.format }, onLoad: true };
                this.parent.notify(getFormattedCellObject, eventArgs);
                calcValue = eventArgs.formattedText as string;
            }
            formatedValues.push(calcValue);
        }
        args.Sum = formatedValues[0]; args.Avg = formatedValues[1];
        args.Min = formatedValues[2]; args.Max = formatedValues[3];
    }

    private refreshInsertDelete(args: InsertDeleteEventArgs): void {
        const formulaDependentCells: Map<string, Map<string, string>> = this.calculateInstance.getDependentFormulaCells();
        let cell: CellModel;
        const sheetIndex: number = getSheetIndexFromId(this.parent, args.sheet.id);
        this.parent.sheets.forEach((sheet: SheetModel, index: number): void => {
            for (let i: number = 0, rowLen: number = sheet.usedRange.rowIndex; i <= rowLen; i++) {
                for (let j: number = 0, colLen: number = sheet.usedRange.colIndex; j <= colLen; j++) {
                    cell = getCell(i, j, sheet, false, true);
                    if (cell.formula && checkIsFormula(cell.formula)) {
                        if (index === sheetIndex) {
                            if (args.isInsert || !(args.modelType === 'Row' ? i >= args.startIndex && i <= args.endIndex :
                                j >= args.startIndex && j <= args.endIndex)) {
                                this.updateFormula(args, cell, i, j);
                            }
                        } else if (cell.formula.includes(args.sheet.name)) {
                            this.updateFormula(args, cell, i, j, true);
                        }
                    }
                }
            }
        });
        formulaDependentCells.clear();
        this.calculateInstance.getDependentCells().clear();
        this.calculateInstance.getFormulaInfoTable().clear();
        this.refreshNamedRange(args);
    }

    private getUpdatedFormulaOnInsertDelete(args: { insertDeleteArgs: InsertDeleteEventArgs, cell: CellModel, row: number, col: number }): void {
        this.updateFormula(args.insertDeleteArgs, args.cell, args.row, args.col);
    }

    private updateFormula(args: InsertDeleteEventArgs, cell: CellModel, row: number, col: number, otherSheet?: boolean): void {
        let ref: string; let pVal: string; let index: number[]; let updated: boolean;
        if (cell.formula && cell.formula.includes('UNIQUE')) {
            this.clearUniqueRange(row, col, args.sheet);
        }
        const getAddress: () => string = (): string => {
            return index[0] === index[2] && index[1] === index[3] ? getCellAddress(index[0], index[1]) : getRangeAddress(index);
        };
        const formulaArr: string[] = this.parseFormula(cell.formula, true);
        for (let i: number = 0; i < formulaArr.length; i++) {
            ref = formulaArr[i].trim().replace(/[$]/g, '');
            if (this.calculateInstance.isCellReference(ref)) {
                pVal = i && formulaArr[i - 1].trim();
                if (pVal && pVal[pVal.length - 1] === '!') {
                    pVal = pVal.replace(/['!]/g, '');
                    if (pVal !== args.sheet.name) {
                        continue;
                    }
                } else if (otherSheet) {
                    continue;
                }
                index = getRangeIndexes(ref);
                updated = this.parent.updateRangeOnInsertDelete(args, index);
                if (updated) {
                    formulaArr[i] = index[2] < index[0] || index[3] < index[1] ? this.calculateInstance.getErrorStrings()[CommonErrors.ref]
                        : getAddress();
                }
            }
        }
        const newFormula: string = '=' + formulaArr.join('');
        if (cell.formula !== newFormula) {
            cell.formula = newFormula;
            cell.value = null;
        }
    }

    private clearUniqueRange(row: number, col: number, sheet: SheetModel): void {
        const uniqueArgs: { cellIdx: number[], isUnique: boolean, uniqueRange: string } =
        { cellIdx: [row, col, row, col], isUnique: false, uniqueRange: '' };
        this.parent.notify(checkUniqueRange, uniqueArgs);
        const range: number[] = getRangeIndexes(uniqueArgs.uniqueRange);
        for (let i: number = range[0]; i <= range[2]; i++) {
            for (let j: number = range[1]; j <= range[3]; j++) {
                delete getCell(i, j, sheet, false, true).value;
            }
        }
    }

    private parseFormula(formula: string, rangeRef?: boolean): string[] {
        let temp: string;
        let str: string | number;
        let i: number = 0;
        const arr: string[] = [];
        let formulaVal: string[] | string = [];
        formulaVal = this.markSpecialChar(formula.replace('=', ''), rangeRef);
        formulaVal = rangeRef ? formulaVal.split(/\(|\)|=|\^|>|<|,|\+|-|\*|\/|%|&/g) :
            formulaVal.split(/\(|\)|=|\^|>|<|,|:|\+|-|\*|\/|%|&/g);
        const len: number = formulaVal.length;
        while (i < len) {
            temp = formulaVal[i];
            if (!temp) {
                i++;
                continue;
            }
            if (temp.length === 1) {
                arr.push(this.isUniqueChar(temp) ? this.getUniqueCharVal(temp) : temp);
            } else {
                str = temp[0];
                if (temp.indexOf('!') > 0) {
                    if (this.isUniqueChar(str)) {
                        arr.push(this.getUniqueCharVal(str));
                        temp = temp.substr(1);
                    }
                    str = temp.indexOf('!') + 1;
                    arr.push(temp.substr(0, str));
                    arr.push(temp.substr(str));
                } else if (this.isUniqueChar(str)) {
                    arr.push(this.getUniqueCharVal(str));
                    arr.push(temp.substr(1));
                } else {
                    arr.push(temp);
                }
            }
            i++;
        }
        return arr;
    }

    private getUniqueCharVal(formula: string): string {
        switch (formula) {
        case this.uniqueOBracket:
            return '(';
        case this.uniqueCBracket:
            return ')';
        case this.uniqueCSeparator:
            return ',';
        case this.uniqueCOperator:
            return ':';
        case this.uniquePOperator:
            return '+';
        case this.uniqueSOperator:
            return '-';
        case this.uniqueMOperator:
            return '*';
        case this.uniqueDOperator:
            return '/';
        case this.uniqueModOperator:
            return '%';
        case this.uniqueConcateOperator:
            return '&';
        case this.uniqueEqualOperator:
            return '=';
        case this.uniqueExpOperator:
            return '^';
        case this.uniqueGTOperator:
            return '>';
        case this.uniqueLTOperator:
            return '<';
        }
        return '';
    }

    private isUniqueChar(formula: string | number): boolean {
        const code: number = (formula as string).charCodeAt(formula as number);
        return code >= 129 && code <= 142;
    }

    private markSpecialChar(formula: string, rangeRef?: boolean): string {
        formula = formula.replace(/\(/g, '(' + this.uniqueOBracket).replace(/\)/g, ')' + this.uniqueCBracket);
        if (rangeRef) {
            formula = formula.replace(/,/g, ',' + this.uniqueCSeparator);
        } else {
            formula = formula.replace(/,/g, ',' + this.uniqueCSeparator).replace(/:/g, ':' + this.uniqueCOperator);
        }
        formula = formula.replace(/\+/g, '+' + this.uniquePOperator).replace(/-/g, '-' + this.uniqueSOperator);
        formula = formula.replace(/\*/g, '*' + this.uniqueMOperator).replace(/\//g, '/' + this.uniqueDOperator);
        formula = formula.replace(/&/g, '&' + this.uniqueConcateOperator);
        formula = formula.replace(/=/g, '=' + this.uniqueEqualOperator);
        formula = formula.replace(/\^/g, '^' + this.uniqueExpOperator);
        formula = formula.replace(/>/g, '>' + this.uniqueGTOperator).replace(/</g, '<' + this.uniqueLTOperator);
        return formula.replace(/%/g, '%' + this.uniqueModOperator);
    }

    private refreshNamedRange(args: InsertDeleteEventArgs): void {
        if (args.definedNames && args.definedNames.length) {
            args.definedNames.forEach((definedName: DefineNameModel): void => {
                this.parent.removeDefinedName(definedName.name, definedName.scope);
                this.parent.addDefinedName(definedName);
            });
            return;
        }
        const len: number = this.parent.definedNames.length;
        if (!len) { return; }
        const definedNames: DefineNameModel[] = Object.assign({}, this.parent.definedNames);
        let range: number[]; let sheetName: string; let splitedRef: string[]; let definedName: DefineNameModel; let updated: boolean;
        for (let i: number = 0; i < len; i++) {
            definedName = definedNames[i]; splitedRef = definedName.refersTo.split('!'); sheetName = splitedRef[0].split('=')[1];
            if (sheetName !== args.sheet.name) { continue; }
            range = getRangeIndexes(splitedRef[1]);
            updated = this.parent.updateRangeOnInsertDelete(args, range);
            if (args.isInsert) {
                this.updateDefinedNames(definedName, sheetName, range, updated);
            } else {
                if (args.modelType === 'Row') {
                    this.updateDefinedNames(definedName, sheetName, range, updated, [range[0], range[2]], args);
                } else if (args.modelType === 'Column') {
                    this.updateDefinedNames(definedName, sheetName, range, updated, [range[1], range[3]], args);
                }
            }
        }
    }

    private updateDefinedNames(
        definedName: DefineNameModel, sheetName: string, range: number[], changed: boolean, idx?: number[],
        args?: InsertDeleteEventArgs): void {
        if (!changed) { return; }
        const index: number = this.parent.definedNames.indexOf(definedName);
        const eventArgs: { [key: string]: Object } = {
            action: 'removeDefinedName',
            isRemoved: false,
            definedName: definedName.name,
            scope: definedName.scope,
            isEventTrigger: true
        };
        this.parent.notify(workbookFormulaOperation, eventArgs);
        if (idx) {
            let oldDefinedName: DefineNameModel = { name: definedName.name, comment: definedName.comment, refersTo: definedName.refersTo,
                scope: definedName.scope };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            oldDefinedName = new DefineName(this.parent as any, 'definedNames', oldDefinedName, true);
            if (args.definedNames) {
                args.definedNames.push(oldDefinedName);
            } else {
                args.definedNames = [oldDefinedName];
            }
            if (idx[1] < idx[0]) { return; }
        }
        definedName.refersTo = sheetName + '!' + getRangeAddress(range);
        this.parent.notify(workbookFormulaOperation, { action: 'addDefinedName', definedName: definedName, isAdded: false, index: index, isEventTrigger: true });
        const refreshArgs: DefinedNameEventArgs = { name: definedName.name, scope: definedName.scope, comment: definedName.comment,
            refersTo: definedName.refersTo, cancel: false };
        this.parent.notify('actionComplete', { eventArgs: refreshArgs, action: 'refreshNamedRange' });
    }
}
