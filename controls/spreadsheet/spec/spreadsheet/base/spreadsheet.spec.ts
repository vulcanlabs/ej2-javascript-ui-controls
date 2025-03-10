/**
 *  Spreadsheet base spec
 */
import { SpreadsheetModel, Spreadsheet, BasicModule } from '../../../src/spreadsheet/index';
import { SpreadsheetHelper } from '../util/spreadsheethelper.spec';
import { defaultData, productData } from '../util/datasource.spec';
import '../../../node_modules/es6-promise/dist/es6-promise';
import { CellModel, getModel, SheetModel, RowModel, BeforeCellUpdateArgs, getRangeIndexes, getCell } from '../../../src/workbook/index';
import { EmitType, setCurrencyCode, L10n } from '@syncfusion/ej2-base';

Spreadsheet.Inject(BasicModule);

describe('Spreadsheet base module ->', () => {
    let helper: SpreadsheetHelper;
    let model: SpreadsheetModel;

    beforeAll(() => {
        helper = new SpreadsheetHelper('spreadsheet');
    });

    describe('Render checking ->', () => {

        afterEach(() => {
            helper.invoke('destroy');
        });

        it('Local data bind testing', (done: Function) => {
            let dataBound: EmitType<Object> = () => {
                setTimeout(() => {
                    let sheets: SheetModel[] = helper.getInstance().sheets;
                    expect(sheets.length).toBe(1);
                    expect(sheets[0].rows.length).toBe(11);
                    expect(sheets[0].rows[0].cells.length).toBe(8);
                    done();
                }, 30);
            };
            model = {
                sheets: [{
                    ranges: [{ dataSource: defaultData }]
                }],
                dataBound: dataBound
            };
            helper.initializeSpreadsheet(model);
        });

        it('Cell data bind testing', (done: Function) => {
            let dataBound: EmitType<Object> = () => {
                setTimeout(() => {
                    helper.invoke('getData', ['Sheet1!D1']).then((values: Map<string, CellModel>) => {
                        expect(values.get('D1').value).toEqual('10.1');
                    });
                    helper.invoke('getData', ['Sheet1!G1']).then((values: Map<string, CellModel>) => {
                        expect(values.get('G1').value.toString()).toBe('30');
                        expect(values.get('G1').formula).toEqual('=SUM(10,20)');
                        done();
                    });
                }, 30);
            };
            model = {
                sheets: [{
                    rows: [
                        {
                            index: 0,
                            cells: [
                                { value: 'JavaScript' },
                                { value: '10' },
                                { value: '100' },
                                { value: '10.1' },
                                { index: 5, value: 'SUM' },
                                { formula: '=SUM(10,20)' },
                                { formula: '=SUM(B1,10)' },
                                { formula: '=SUM(20,B1)' },
                                { formula: '=SUM(B1,C1,D1)' },
                                { formula: '=SUM(B1:B5, 50)' },
                                { formula: '=SUM(Sheet1!C2, 10)' },
                                { formula: '=SUM(Sheet2!C1, 10)' },
                                { formula: '=SUM(Sheet2!C5, 10)' }
                            ]
                        },
                        {
                            index: 1,
                            cells: [
                                { value: 'Angular' },
                                { value: '20' },
                                { value: '200' },
                                { value: '20.2' }
                            ]
                        },
                        {
                            index: 2,
                            cells: [
                                { value: 'React' },
                                { value: '30' },
                                { value: '300' },
                                { value: '30.3' }
                            ]
                        },
                        {
                            index: 3,
                            cells: [
                                { value: 'Vue' },
                                { value: '40' },
                                { value: '400' },
                                { value: '40.4' }
                            ]
                        },
                        {
                            index: 4,
                            cells: [
                                { value: 'Asp.Net Core' },
                                { value: '50' },
                                { value: '500' },
                                { value: '50.5' }
                            ]
                        }
                    ],
                    columns: [
                        { width: 120 }
                    ]
                },
                {
                    rows: [
                        {
                            index: 0,
                            cells: [
                                { value: 'JavaScript' },
                                { value: '10' },
                                { value: '100' },
                                { value: '10.1' },
                                { index: 5, value: 'SUM' },
                                { formula: '=SUM(10,20)' },
                                { formula: '=SUM(B1,10)' },
                                { formula: '=SUM(20,B1)' },
                                { formula: '=SUM(B1,C1,D1)' },
                                { formula: '=SUM(B1:B5, 50)' },
                                { formula: '=SUM(Sheet2!C2, 10)' },
                                { formula: '=SUM(Sheet1!C1, 10)' },
                                { formula: '=SUM(Sheet1!C5, 10)' }
                            ]
                        },
                        {
                            index: 1,
                            cells: [
                                { value: 'Angular' },
                                { value: '20' },
                                { value: '200' },
                                { value: '20.2' }
                            ]
                        },
                        {
                            index: 2,
                            cells: [
                                { value: 'React' },
                                { value: '30' },
                                { value: '300' },
                                { value: '30.3' }
                            ]
                        },
                        {
                            index: 3,
                            cells: [
                                { value: 'Vue' },
                                { value: '40' },
                                { value: '400' },
                                { value: '40.4' }
                            ]
                        },
                        {
                            index: 4,
                            cells: [
                                { value: 'Asp.Net Core' },
                                { value: '50' },
                                { value: '500' },
                                { value: '50.5' }
                            ]
                        }
                    ],
                    columns: [
                        { width: 120 }
                    ]
                }],
                dataBound: dataBound
            };
            helper.initializeSpreadsheet(model);
        });

        it('Column width testing', (done: Function) => {
            let dataBound: EmitType<Object> = () => {
                setTimeout(() => {
                    let td: HTMLTableCellElement = helper.invoke('getCell', [0, 0]);
                    expect(getComputedStyle(td).width).toBe('130px');
                    td = helper.invoke('getCell', [0, 1]);
                    expect(getComputedStyle(td).width).toBe('92px');
                    td = helper.invoke('getCell', [0, 2]);
                    expect(getComputedStyle(td).width).toBe('96px');
                    done();
                }, 30);
            };
            model = {
                sheets: [{
                    ranges: [{ dataSource: defaultData }],
                    columns: [
                        {
                            width: 130
                        },
                        {
                            width: 92
                        },
                        {
                            width: 96
                        }
                    ]
                }],
                dataBound: dataBound
            };
            helper.initializeSpreadsheet(model);
        });

        it('Defined names testing', (done: Function) => {
            let dataBound: EmitType<Object> = () => {
                setTimeout(() => {
                    let nameBoxElem: HTMLElement = helper.getElementFromSpreadsheet('.e-name-box .e-ddl-icon');
                    helper.triggerMouseAction('mousedown', null, nameBoxElem, nameBoxElem);
                    nameBoxElem.click();
                    setTimeout(() => {
                        helper.click('#spreadsheet_name_box_popup .e-item-focus');
                        setTimeout(() => {
                            expect(helper.getInstance().sheets[0].selectedRange).toEqual('B1:B1');
                            done();
                        }, 20);
                    }, 20);
                }, 30);
            };
            model = {
                sheets: [{
                    ranges: [{ dataSource: defaultData }],
                    columns: [
                        {
                            width: 130
                        },
                        {
                            width: 92
                        },
                        {
                            width: 96
                        }
                    ]
                },
                {
                    ranges: [{ dataSource: defaultData }]
                }
                ],
                definedNames: [
                    { name: 'value', refersTo: '=Sheet1!B1' },
                    { name: 'Range', refersTo: '=Sheet1!B1:B5' },
                    { name: 'Cross_Range', refersTo: '=Sheet2!C5:C10' },
                ],
                dataBound: dataBound
            };
            helper.initializeSpreadsheet(model);
        });

    });

    describe('UI interaction checking ->', () => {

        afterEach(() => {
            helper.invoke('destroy');
        });

        it('Column scrolling testing', (done: Function) => {
            let dataBound: EmitType<Object> = () => {
                setTimeout(() => {
                    //As of now, checked for code coverage.
                    helper.getContentElement().scroll(1500, 0);
                    setTimeout(() => {
                        helper.getContentElement().scroll(15000, 0);
                        setTimeout(() => {
                            done();
                        }, 10);
                    }, 10);
                }, 30);
            };
            model = {
                sheets: [{
                    ranges: [{ dataSource: defaultData }]
                }],
                dataBound: dataBound
            };
            helper.initializeSpreadsheet(model);
        });

        it('Row scrolling testing', (done: Function) => {
            let dataBound: EmitType<Object> = () => {
                setTimeout(() => {
                    //As of now, checked for code coverage.
                    helper.getContentElement().scroll(0, 400);
                    setTimeout(() => {
                        helper.getContentElement().scroll(0, 5000);
                        setTimeout(() => {
                            done();
                        }, 10);
                    }, 10);
                }, 30);
            };
            model = {
                sheets: [{
                    ranges: [{ dataSource: defaultData }]
                }],
                dataBound: dataBound
            };
            helper.initializeSpreadsheet(model);
        });

        // it('Non-virtual mode -> Column scrolling testing', (done: Function) => {
        //     let dataBound: EmitType<Object> = () => {
        //         setTimeout(() => {
        //             //As of now, checked for code coverage.
        //             helper.getContentElement().scroll(1500, 0);
        //             setTimeout(() => {
        //                 done();
        //             }, 10);
        //         }, 30);
        //     };
        //     model = {
        //         sheets: [{
        //             ranges: [{ dataSource: defaultData }]
        //         }],
        //         scrollSettings: {
        //             enableVirtualization: false
        //         },
        //         dataBound: dataBound
        //     };
        //     helper.initializeSpreadsheet(model);
        // });

        // it('Non-virtual mode -> Row scrolling testing', (done: Function) => {
        //     let dataBound: EmitType<Object> = () => {
        //         setTimeout(() => {
        //             //As of now, checked for code coverage.
        //             helper.getContentElement().scroll(0, 1500);
        //             setTimeout(() => {
        //                 done();
        //             }, 10);
        //         }, 30);
        //     };
        //     model = {
        //         sheets: [{
        //             ranges: [{ dataSource: defaultData }]
        //         }],
        //         scrollSettings: {
        //             enableVirtualization: false
        //         },
        //         dataBound: dataBound
        //     };
        //     helper.initializeSpreadsheet(model);
        // });
    });

    describe('Property checking ->', () => {

        afterEach(() => {
            helper.invoke('destroy');
        });

        it('cssClass testing', (done: Function) => {
            model = {
                cssClass: 'e-custom'
            };
            helper.initializeSpreadsheet(model);
            expect(helper.hasClass('e-custom')).toBeTruthy();
            done();
        });

    });

    describe('OnProperty change checking ->', () => {
        beforeAll((done: Function) => {
            model = {
                sheets: [
                    {
                        ranges: [{ dataSource: defaultData }]
                    },
                    {
                        ranges: [{ dataSource: productData }]
                    }
                ]
            };
            helper.initializeSpreadsheet(model, done);
        });

        afterAll(() => {
            helper.invoke('destroy');
        });

        it('enableRtl testing', (done: Function) => {
            expect(helper.hasClass('e-rtl', helper.getSheetPanelElement())).toBeFalsy();
            helper.setModel('enableRtl', true);
            expect(helper.hasClass('e-rtl', helper.getSheetPanelElement())).toBeTruthy();
            // helper.setModel('enableRtl', false);
            // expect(helper.hasClass('e-rtl', helper.getSheetPanelElement())).toBeFalsy();
            done();
        });

        it('cssClass testing', (done: Function) => {
            helper.setModel('cssClass', 'e-custom e-custom1');
            expect(helper.hasClass('e-custom')).toBeTruthy();
            expect(helper.hasClass('e-custom1')).toBeTruthy();
            helper.setModel('cssClass', '');
            expect(helper.hasClass('e-custom')).toBeFalsy();
            expect(helper.hasClass('e-custom1')).toBeFalsy();
            done();
        });

        it('activeSheetIndex testing', (done: Function) => {
            helper.setModel('activeSheetIndex', 1);
            helper.eventHandler('dataBound', (args: EmitType<Object>) => {
                setTimeout(() => {
                    if (helper.getModel('activeSheetIndex') === 0) {
                        helper.eventHandler('dataBound', null);
                        done();
                    } else {
                        expect(helper.getModel('activeSheetIndex')).toBe(1);
                        let td: HTMLTableCellElement = helper.invoke('getCell', [0, 0]);
                        expect(td.textContent).toBe('ProductID');
                        helper.setModel('activeSheetIndex', 0);
                    }
                }, 30);
            });
        });

        it('width testing', (done: Function) => {
            helper.setModel('width', 1000);
            expect(helper.getElement().style.width).toBe('1000px');
            done();
        });

        it('height testing', (done: Function) => {
            helper.setModel('height', 500);
            expect(helper.getElement().style.height).toBe('500px');
            done();
        });

    });

    describe('Methods checking ->', () => {

        beforeAll((done: Function) => {
            model = {
                sheets: [
                    {
                        ranges: [{ dataSource: defaultData }]
                    }, {}
                ]
            };
            helper.initializeSpreadsheet(model, done);
        });

        afterAll(() => {
            helper.invoke('destroy');
        });

        it('getCell testing', (done: Function) => {
            let td: HTMLTableCellElement = helper.invoke('getCell', [10, 10]);
            expect(helper.hasClass('e-cell', td)).toBeTruthy();
            expect(td.getAttribute('aria-colindex')).toEqual('11');
            done();
        });

        it('getRow testing', (done: Function) => {
            let tr: HTMLTableRowElement = helper.invoke('getRow', [10]);
            expect(helper.hasClass('e-row', tr)).toBeTruthy();
            expect(tr.getAttribute('aria-rowindex')).toEqual('11');
            done();
        });

        //Checked for code coverage.
        it('resize testing', (done: Function) => {
            document.body.style.height = '120%';
            helper.invoke('resize');
            done();
        });

        it('showSpinner testing', (done: Function) => {
            let spinnerElem: HTMLElement = helper.getSpinnerElement();
            helper.invoke('showSpinner');
            expect(helper.hasClass('e-spin-show', spinnerElem)).toBeTruthy();
            done();
        });

        it('hideSpinner testing', (done: Function) => {
            let spinnerElem: HTMLElement = helper.getSpinnerElement();
            helper.invoke('hideSpinner');
            expect(helper.hasClass('e-spin-hide', spinnerElem)).toBeTruthy();
            done();
        });

        it('goTo testing', (done: Function) => {
            // let content: HTMLElement = helper.getContentElement();
            // let rhdr: HTMLElement = helper.getRowHeaderElement();
            // let chdr: HTMLElement = helper.getColHeaderElement();
            helper.invoke('goTo', ['Z100']);
            setTimeout(() => {
                // expect(content.querySelector('tr[aria-rowindex="100"]')).toBeDefined();
                // expect(helper.getInstance().sheets[0].topLeftCell).toEqual('Z100');
                // expect(content.scrollTop).toEqual(1980);
                // expect(rhdr.scrollTop).toEqual(1980);
                // expect(content.scrollLeft).toEqual(1600);
                // expect(chdr.scrollLeft).toEqual(1600);
                helper.invoke('goTo', ['A1']);
                // setTimeout(() => {
                //     expect(content.querySelector('tr[aria-rowindex="1"]')).toBeDefined();
                //     expect(helper.getInstance().sheets[0].topLeftCell).toEqual('A1');
                //     expect(content.scrollTop).toEqual(0);
                //     expect(rhdr.scrollTop).toEqual(0);
                //     expect(content.scrollLeft).toEqual(0);
                //     expect(chdr.scrollLeft).toEqual(0);
                //     done();
                // });
                done();
            }, 10);
        });

        it('selectRange testing', (done: Function) => {
            helper.invoke('selectRange', ['D1']);
            expect(helper.getInstance().sheets[0].selectedRange).toEqual('D1:D1');
            done();
        });

        it('cut testing', (done: Function) => {
            helper.invoke('cut').then(() => {
                helper.invoke('selectRange', ['K1']);
                helper.invoke('paste', ['K1']);
                helper.invoke('getData', ['Sheet1!K1']).then((values: Map<string, CellModel>) => {
                    expect(values.get('K1').value).toEqual('Quantity');
                    done();
                });
            });
        });

        it('copy testing', (done: Function) => {
            helper.invoke('copy').then(() => {
                helper.invoke('selectRange', ['K2']);
                helper.invoke('paste', ['K2']);
                helper.invoke('getData', ['Sheet1!K2']).then((values: Map<string, CellModel>) => {
                    expect(values.get('K2').value).toEqual('Quantity');
                    done();
                });
            })
        });

        it('paste testing', (done: Function) => {
            helper.invoke('selectRange', ['K1']);
            helper.invoke('copy').then(() => {
                helper.invoke('selectRange', ['K3']);
                helper.invoke('paste', ['K3']);
                helper.invoke('getData', ['Sheet1!K3']).then((values: Map<string, CellModel>) => {
                    expect(values.get('K3').value).toEqual('Quantity');
                    done();
                });
            });
        });

        it('setUsedRange testing', (done: Function) => {
            helper.invoke('setUsedRange', [11, 12]);
            expect(helper.getInstance().sheets[0].usedRange.rowIndex).toEqual(11);
            expect(helper.getInstance().sheets[0].usedRange.colIndex).toEqual(12);
            done();
        });

        it('getRowHeaderContent testing', (done: Function) => {
            expect(helper.invoke('getRowHeaderContent')).not.toBeNull();
            done();
        });

        it('getColumnHeaderContent testing', (done: Function) => {
            expect(helper.invoke('getColumnHeaderContent')).not.toBeNull();
            done();
        });

        it('getMainContent testing', (done: Function) => {
            expect(helper.invoke('getMainContent')).not.toBeNull();
            done();
        });

        it('getContentTable testing', (done: Function) => {
            expect(helper.invoke('getContentTable')).not.toBeNull();
            done();
        });

        it('getRowHeaderTable testing', (done: Function) => {
            expect(helper.invoke('getRowHeaderTable')).not.toBeNull();
            done();
        });

        it('getColHeaderTable testing', (done: Function) => {
            expect(helper.invoke('getColHeaderTable')).not.toBeNull();
            done();
        });

        it('isMobileView testing', (done: Function) => {
            expect(helper.invoke('isMobileView')).toBeFalsy();
            done();
        });

        it('getModuleName testing', (done: Function) => {
            expect(helper.invoke('getModuleName')).toBe('spreadsheet');
            done();
        });

        it('setRowHeight testing', (done: Function) => {
            helper.invoke('setRowHeight', [100, 2]);
            let tr: HTMLTableRowElement = helper.invoke('getRow', [2]);
            expect(tr.style.height).toBe('100px');
            done();
        });

        it('refreshNode testing', (done: Function) => {
            let td: HTMLTableCellElement = helper.invoke('getCell', [0, 8]);
            helper.invoke('refreshNode', [td, { result: 'test' }]);
            expect(td.textContent).toBe('test');
            done();
        });

        it('startEdit testing', (done: Function) => {
            helper.invoke('selectRange', ['K3']);
            helper.invoke('startEdit');
            let editorElem: HTMLElement = helper.getElement('.e-spreadsheet-edit');
            expect(helper.getInstance().isEdit).toBeTruthy();
            setTimeout(() => {
                expect(editorElem.textContent).toBe('Quantity');
                editorElem.textContent = 'Test';
                helper.triggerKeyNativeEvent(17); //To update internal props.
                done();
            }, 20);
        });

        it('endEdit testing', (done: Function) => {
            helper.invoke('endEdit');
            expect(helper.getInstance().isEdit).toBeFalsy();
            helper.invoke('getData', ['Sheet1!K3']).then((values: Map<string, CellModel>) => {
                expect(values.get('K3').value).toEqual('Test');
                done();
            });
        });

        it('closeEdit testing', (done: Function) => {
            helper.invoke('startEdit');
            let editorElem: HTMLElement = helper.getElement('.e-spreadsheet-edit');
            expect(helper.getInstance().isEdit).toBeTruthy();
            setTimeout(() => {
                expect(editorElem.textContent).toBe('Test');
                editorElem.textContent = 'Quantity';
                helper.triggerKeyNativeEvent(17); //To update internal props.
                helper.invoke('closeEdit');
                expect(helper.getInstance().isEdit).toBeFalsy();
                helper.invoke('getData', ['Sheet1!K3']).then((values: Map<string, CellModel>) => {
                    expect(values.get('K3').value).toEqual('Test');
                    done();
                });
            }, 20);
        });

        it('clearRange testing', (done: Function) => {
            helper.invoke('clearRange', ['K3']);
            done();
        });

        it('getModel testing', () => {
            let sheets: SheetModel[] = helper.getInstance().sheets;
            expect(getModel(sheets, 0)).not.toBeNull();
            let rows: RowModel[] = helper.getInstance().sheets[0].rows;
            expect(getModel(rows, 5)).not.toBeNull();
        });

        it('addDefinedName testing', () => {
            expect(helper.getInstance().definedNames.length).toBe(0);
            let result: boolean = helper.invoke('addDefinedName', [{ name: 'TestName', refersTo: 'Sheet1!A1:A10' }]);
            expect(result).toBeTruthy();
            expect(helper.getInstance().definedNames.length).toBe(1);
            expect(helper.getInstance().definedNames[0].name).toBe('TestName');
        });

        it('removeDefinedName testing', () => {
            expect(helper.getInstance().definedNames.length).toBe(1);
            let result: boolean = helper.invoke('removeDefinedName', ['TestName']);
            expect(result).toBeTruthy();
            expect(helper.getInstance().definedNames.length).toBe(0);
        });

        it('refresh', (done: Function) => {
            helper.invoke('refresh', []);
            setTimeout(() => {
                expect(JSON.stringify(helper.getInstance().sheets[0].rows[0].cells[0])).toBe('{"value":"Item Name"}');
                expect(helper.invoke('getCell', [1, 0]).textContent).toBe('Casual Shoes');
                done();
            });
        });

        it('setColumnWidth testing', (done: Function) => {
            helper.invoke('setColWidth', [130, 1]);
            expect(helper.getInstance().sheets[0].columns[1].width).toBe(130);
            // expect(getComputedStyle(helper.invoke('getCell', [0, 1])).width).toBe('130px'); // Check this now
            // expect(getComputedStyle(helper.getColHeaderElement().querySelector('.e-header-row').children[1]).width).toBe('130px'); // Check this it only fails in CI machine
            helper.invoke('setColWidth', [120, 2, 1]);
            expect(helper.getInstance().sheets[1].columns[2].width).toBe(120);
            done();
        });

        it('updateUndoRedoCollection', (done: Function) => {
            helper.invoke('getCell', [0, 0]).classList.add('customClass');
            helper.invoke('updateUndoRedoCollection', [{ eventArgs: { class: 'customClass', rowIdx: 0, colIdx: 0, action: 'customCSS' } }]);
            expect(helper.getElementFromSpreadsheet('#' + helper.id + '_undo').parentElement.classList).not.toBe('e-overlay');
            helper.getInstance().actionComplete = (args: any) => {
                expect(args.eventArgs.action).toBe('customCSS');
            };
            helper.click('#' + helper.id + '_undo');
            helper.getInstance().actionComplete = undefined;
            done();
        });

        it('addCustomFunction', (done: Function) => {
            (window as any).CustomFuntion = (str: string) => {
                let num: number;
                if (formula === '=SQRT(D2)' || formula === '=SQRT(D2:D2)') {
                    expect(str).toBe('10');
                    num = Number(str);
                } else {
                    expect(str).toBe('D2:D5');
                    num = 0;
                    const indexes: number[] = getRangeIndexes(str);
                    for (let i: number = indexes[0]; i <= indexes[2]; i++) {
                        for (let j: number = indexes[1]; j <= indexes[3]; j++) {
                            num += Number(getCell(i, j, sheet).value);
                        }
                    }
                }
                return Math.sqrt(num);
            };
            helper.invoke('addCustomFunction', ["CustomFuntion", "SQRT"]);
            let formula: string = '=SQRT(D2)';
            helper.edit('J5', formula);
            const cell: HTMLElement = helper.invoke('getCell', [4, 9]);
            const sheet: SheetModel = helper.getInstance().sheets[0];
            expect(cell.textContent).toBe('3.162278');
            expect(sheet.rows[4].cells[9].value).toBe('3.162278');
            formula = '=SQRT(D2:D5)';
            helper.edit('J5', formula);
            expect(cell.textContent).toBe('8.062258');
            expect(sheet.rows[4].cells[9].value).toBe('8.062258');
            helper.edit('D3', '30');
            expect(cell.textContent).toBe('8.660254');
            expect(sheet.rows[4].cells[9].value).toBe('8.660254');
            formula = '=SQRT(D2:D2)';
            helper.edit('J5', formula);
            expect(cell.textContent).toBe('3.162278');
            expect(sheet.rows[4].cells[9].value).toBe('3.162278');
            done();
        });
    });

    describe('OnProperty change checking ->', () => {
        beforeAll((done: Function) => {
            model = {
                sheets: [
                    {
                        ranges: [{ dataSource: defaultData }]
                    }
                ]
            };
            helper.initializeSpreadsheet(model, done);
        });

        afterAll(() => {
            helper.invoke('destroy');
        });

        it('showRibbon', (done: Function) => {
            helper.getInstance().showRibbon = false;
            helper.getInstance().dataBind();
            expect(helper.getRibbonElement()).toBeNull();
            helper.getInstance().showRibbon = true;
            helper.getInstance().dataBind();
            expect(helper.getRibbonElement()).not.toBeNull();
            done();
        });

        it('showFormulaBar', (done: Function) => {
            helper.getInstance().showFormulaBar = false;
            helper.getInstance().dataBind();
            expect(helper.getFormulaBarElement()).toBeNull();
            helper.getInstance().showFormulaBar = true;
            helper.getInstance().dataBind();
            expect(helper.getFormulaBarElement()).not.toBeNull();
            done();
        });

        it('showSheetTabs', (done: Function) => {
            helper.getInstance().showSheetTabs = false;
            helper.getInstance().dataBind();
            expect(helper.getElementFromSpreadsheet('.e-sheet-tab-panel')).toBeNull();
            helper.getInstance().showSheetTabs = true;
            helper.getInstance().dataBind();
            expect(helper.getElementFromSpreadsheet('.e-sheet-tab-panel')).not.toBeNull();
            done();
        });

        it('cellStyle', (done: Function) => {
            helper.getInstance().cellStyle = { fontWeight: 'bold', fontSize: '20pt' };
            helper.getInstance().dataBind();
            setTimeout(() => {
                expect(helper.invoke('getCell', [0, 0]).style.fontSize).toBe('20pt');
                expect(helper.invoke('getCell', [1, 0]).style.fontSize).toBe('20pt');
                expect(helper.invoke('getCell', [1, 0]).style.fontWeight).toBe('bold');
                helper.getInstance().cellStyle = { fontWeight: 'normal', fontSize: '11pt' };
                helper.getInstance().dataBind();
                // setTimeout(() => { // This case need to be fixed
                //     expect(helper.invoke('getCell', [0, 0]).style.fontSize).toBe('11pt');
                //     expect(helper.invoke('getCell', [1, 0]).style.fontSize).toBe('11pt');
                //     expect(helper.invoke('getCell', [1, 0]).style.fontWeight).toBe('normal');
                     done();
                // });
            });
        });

        it('allowEditing', (done: Function) => {
            helper.getInstance().allowEditing = false;
            helper.getInstance().dataBind();
            expect(helper.getInstance().editModule).toBeUndefined();
            helper.getInstance().allowEditing = true;
            helper.getInstance().dataBind();
            expect(helper.getInstance().editModule).not.toBeUndefined();
            done();
        });

        it('allowInsert', (done: Function) => {
            helper.getInstance().allowInsert = false;
            helper.getInstance().dataBind();
            expect(helper.getElementFromSpreadsheet('.e-add-sheet-tab').classList).toContain('e-disabled');
            helper.getInstance().allowInsert = true;
            helper.getInstance().dataBind();
            expect(helper.getElementFromSpreadsheet('.e-add-sheet-tab').classList).not.toContain('e-disabled');
            done();
        });

        it('locale', (done: Function) => {
            helper.getInstance().locale = 'en-GB';
            helper.getInstance().dataBind();
            done();
        });

    });

    // describe('Device Mode Checking ->', () => {

    //     beforeAll(() => {
    //         Browser.userAgent = helper.androidUserAgent;
    //     });

    //     afterAll(() => {
    //         Browser.userAgent = '';
    //     });

    //     afterEach(() => {
    //         helper.invoke('destroy');
    //     });

    //     it('Render testing', (done: Function) => {
    //         helper.initializeSpreadsheet(model, done);
    //         expect(helper.hasClass('e-mobile-view')).toBeTruthy();
    //     });

    //     it('isMobileView method testing', (done: Function) => {
    //         expect(helper.invoke('isMobileView')).toBeTruthy();
    //         done();
    //     });

    // });
    describe('Events ->', () => {
        describe('beforeCellUpdate ->', () => {
            let action: string; let cancel: boolean; let spreadsheet: Spreadsheet; let id: string;
            beforeAll((done: Function) => {
                model = {
                    sheets: [{ ranges: [{ dataSource: defaultData }], selectedRange: 'D3:D3' }],
                    beforeCellUpdate: (args: BeforeCellUpdateArgs): void => {
                        switch (action) {
                            case 'edit':
                                if (args.cell.value === '0') {
                                    args.cancel = true;
                                } else {
                                    expect(args.cell).toEqual({ value: '5' });
                                    expect(args.rowIndex).toBe(2);
                                    expect(args.colIndex).toBe(3);
                                    expect(args.sheet).toBe('Sheet1');
                                }
                                break;
                            case 'clipboard':
                                if (args.cell === null) {
                                    args.cancel = true;
                                    expect(args.rowIndex).toBe(0);
                                    expect(args.colIndex).toBe(3);
                                } else {
                                    if (args.rowIndex === 3) {
                                        expect(args.cell).toEqual({ value: <any>20 });
                                        expect(args.colIndex).toBe(4);
                                        expect(args.sheet).toBe('Sheet1');
                                    } else if (args.rowIndex === 4) {
                                        expect(args.cell).toEqual({ format: 'h:mm:ss AM/PM', style: undefined });
                                        expect(args.colIndex).toBe(3);
                                    } else {
                                        expect(args.cell).toEqual({ value: 'Quantity' });
                                        expect(args.rowIndex).toBe(0);
                                        expect(args.colIndex).toBe(8);
                                    }
                                }
                                break;
                            case 'cell-delete':
                                if (args.rowIndex === 5) {
                                    args.cancel = true;
                                } else {
                                    expect(args.cell).toEqual({ value: '' });
                                    expect(args.colIndex).toBe(5);
                                }
                                break;
                            case 'wrap':
                                if (spreadsheet.sheets[0].rows[4].cells[6].wrap) {
                                    expect(args.cell).toEqual({ wrap: false });
                                    args.cancel = true;
                                } else {
                                    expect(args.cell).toEqual({ wrap: true });
                                    expect(args.rowIndex).toBe(4);
                                    expect(args.colIndex).toBe(6);
                                }
                                break;
                            case 'number-format':
                                if (args.rowIndex === 0) {
                                    args.cancel = true;
                                } else {
                                    expect(args.cell).toEqual({ format: '$#,##0.00' });
                                    expect(args.rowIndex).toBe(4);
                                    expect(args.colIndex).toBe(6);
                                }
                                break;
                            case 'cell-format':
                                if (args.rowIndex === 4) {
                                    args.cancel = true;
                                } else {
                                    expect(args.cell).toEqual({ style: { fontWeight: 'bold' } });
                                    expect(args.rowIndex).toBe(0);
                                    expect(args.colIndex).toBe(6);
                                }
                                break;
                        }
                    }
                };
                helper.initializeSpreadsheet(model, done);
            });
            afterAll(() => {
                helper.invoke('destroy');
            });
            it('Editing', (done: Function) => {
                spreadsheet = helper.getInstance();
                action = 'edit';
                expect(spreadsheet.sheets[0].rows[2].cells[3].value.toString()).toBe('20');
                helper.invoke('startEdit');
                helper.getElement('.e-spreadsheet-edit').textContent = '5';
                helper.triggerKeyNativeEvent(13);
                expect(spreadsheet.sheets[0].rows[2].cells[3].value.toString()).toBe('5');
                helper.invoke('startEdit');
                helper.getElement('.e-spreadsheet-edit').textContent = '0';
                helper.triggerKeyNativeEvent(13);
                expect(spreadsheet.sheets[0].rows[2].cells[3].value.toString()).toBe('5');
                done();
            });
            it('Clipboard - copy', (done: Function) => {
                action = 'clipboard';
                id = '#' + helper.id;
                helper.getElement(`${id}_copy`).click();
                helper.invoke('selectRange', ['E4']);
                setTimeout((): void => {
                    helper.getElement(`${id}_paste_dropdownbtn`).click();
                    helper.getElement(`${id}_paste_dropdownbtn-popup .e-item`).click();
                    setTimeout((): void => {
                        expect(spreadsheet.sheets[0].rows[3].cells[4].value.toString()).toBe('20');
                        helper.invoke('selectRange', ['C5']);
                        helper.getElement(`${id}_copy`).click();
                        helper.invoke('selectRange', ['D5']);
                        setTimeout((): void => {
                            helper.getElement(`${id}_paste_dropdownbtn`).click();
                            helper.getElement(`${id}_paste_dropdownbtn-popup ul`).lastElementChild.click();
                            setTimeout((): void => {
                                expect(spreadsheet.sheets[0].rows[4].cells[3].value.toString()).toBe('15');
                                expect(spreadsheet.sheets[0].rows[4].cells[3].format).toBe('h:mm:ss AM/PM');
                                helper.invoke('selectRange', ['D1']);
                                done();
                            });
                        });
                    });
                });
            });
            it('Clipboard - cut', (done: Function) => {
                helper.getElement(`${id}_cut`).click();
                helper.invoke('selectRange', ['I1']);
                setTimeout((): void => {
                    helper.getElement(`${id}_paste_dropdownbtn`).click();
                    helper.getElement(`${id}_paste_dropdownbtn-popup .e-item`).click();
                    setTimeout((): void => {
                        expect(spreadsheet.sheets[0].rows[0].cells[3]).toEqual({ value: 'Quantity' });
                        expect(spreadsheet.sheets[0].rows[0].cells[8]).toEqual({ value: 'Quantity' });
                        helper.invoke('selectRange', ['F5:F7']);
                        done();
                    });
                });
            });
            it('Cell delete', (done: Function) => {
                action = 'cell-delete';
                helper.triggerKeyNativeEvent(46);
                expect(spreadsheet.sheets[0].rows[4].cells[5].value).toBeUndefined();
                expect(spreadsheet.sheets[0].rows[5].cells[5].value.toString()).toBe('300');
                expect(spreadsheet.sheets[0].rows[6].cells[5].value).toBeUndefined();
                helper.invoke('selectRange', ['G5']);
                done();
            });
            it('Wrap, cell and number formatting', (done: Function) => {
                action = 'wrap';
                expect(spreadsheet.sheets[0].rows[4].cells[6].wrap).toBeFalsy();
                helper.getElement(`${id}_wrap`).click();
                expect(spreadsheet.sheets[0].rows[4].cells[6].wrap).toBeTruthy();
                helper.getElement(`${id}_wrap`).click();
                expect(spreadsheet.sheets[0].rows[4].cells[6].wrap).toBeTruthy();
                action = 'number-format';
                helper.getElement(`${id}_number_format`).click();
                helper.getElement(`${id}_Currency`).click();
                expect(spreadsheet.sheets[0].rows[4].cells[6].format).toBe('$#,##0.00');
                helper.invoke('selectRange', ['G1']);
                helper.getElement(`${id}_number_format`).click();
                helper.getElement(`${id}_ShortDate`).click();
                expect(spreadsheet.sheets[0].rows[0].cells[6].format).toBeUndefined();
                action = 'cell-format';
                helper.getElement(`${id}_bold`).click();
                expect(spreadsheet.sheets[0].rows[0].cells[6].style).toEqual({ fontWeight: 'bold' });
                helper.invoke('selectRange', ['G5']);
                helper.getElement(`${id}_bold`).click();
                expect(spreadsheet.sheets[0].rows[4].cells[6].style).toBeUndefined();
                done();
            });
        });
    });

    describe('CR-Issues ->', () => {
        describe('I266607 ->', () => {
            beforeEach((done: Function) => {
                model = {
                    sheets: [{
                        rows: [{ cells: [{ value: 'columTitle', style: { textAlign: 'left', backgroundColor: '#FFFF33' } }] }],
                        rowCount: 50, colCount: 50
                    }]};
                helper.initializeSpreadsheet(model, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('spreedsheet-dataSource-Hidetab (Double time header created while updating the sheet model in the button click)', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.sheets = [{
                    rows: [{ cells: [{ value: 'columTitle', style: { textAlign: 'left', backgroundColor: '#FFFF33' } }] }],
                    rowCount: 50, colCount: 50
                }];
                setTimeout((): void => {
                    expect(helper.getElement().querySelectorAll('.e-colhdr-table').length).toBe(1);
                    expect(helper.getElement().querySelectorAll('.e-rowhdr-table').length).toBe(1);
                    done();
                });
            });
        });
        describe('I256901 ->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({ sheets: [{
                        rows: [{ cells: [{ value: 'Order ID' }, { value: 'Customer ID' }, { value: 'Employee ID' }, { value: 'Ship Name' },
                                    { value: 'Ship City' }, { value: 'Ship Address' }] },
                            { cells: [{ value: '10248' }, { value: 'VINET' }, { value: '5' }, { value: 'Vins et alcools Chevalier' },
                                    { value: 'Reims' }, { value: '59 rue de lAbbaye' }] },
                            { cells: [{ value: '10249' }, { value: 'TOMSP' }, { value: '6' }, { value: 'Toms Spezialitäten' },
                                { value: 'Münster' }, { value: 'Luisenstr. 48' }] },
                            { cells: [{ value: '10250' }, { value: 'HANAR' }, { value: '4' }, { value: 'Hanari Carnes' },
                                    { value: 'Rio de Janeiro' }, { value: 'Rua do Paço, 67' }] }] }] }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Used range not setting properly while using cell data binding', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                expect(spreadsheet.sheets[0].usedRange.rowIndex).toBe(3);
                expect(spreadsheet.sheets[0].usedRange.colIndex).toBe(5);
                done();
            });
        });
        describe('I316103 ->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({ sheets: [{ colCount: 5, rowCount: 10, columns: [
                    { width: 30 }, { width: 35 }, { width: 40 }, { width: 30 }, { width: 30 } ], rows: [{ cells: [{ value: 'Welcome!' }] }] }],
                    scrollSettings: { enableVirtualization: false, isFinite: true }, }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Need to improve the cell selection with limited column count in virtualization false', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                expect(spreadsheet.sheets[0].columns[0].width).toBe(30);
                expect(helper.invoke('getCell', [0, 0]).getBoundingClientRect().width).toBe(30);
                expect(spreadsheet.sheets[0].columns[2].width).toBe(40);
                expect(helper.invoke('getCell', [0, 2]).getBoundingClientRect().width).toBe(40);
                expect(helper.getElement('#' + helper.id + '_main_content').style.width).toBe('165px');
                spreadsheet.sheets[0].rowCount = 100; spreadsheet.sheets[0].colCount = 100; spreadsheet.dataBind();
                setTimeout((): void => {
                    expect(helper.getElement('#' + helper.id + '_main_content').style.width).toBe('calc(100% - 30px)');
                    done();
                });
            });
        });
        describe('fb22391 ->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({ sheets: [{ ranges: [{ dataSource: defaultData }] }] }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('getData doesnot work (Pass args in GetData method without sheet name)', (done: Function) => {
                helper.invoke('getData', ['A1:A2']).then((cells: Map<string, CellModel>): void => {
                    cells.forEach((cell: CellModel, key: string): void => {
                        if (key === 'A1') {
                            expect(cell.value).toBe('Item Name');
                        } else {
                            expect(cell.value).toBe('Casual Shoes');
                        }
                    });
                    done();
                });
            });
        });
        describe('I314986 ->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({ sheets: [{ ranges: [{ dataSource: defaultData }] }], allowInsert: false }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Need to fix the destroy method issue with allowInsert as false (allowInsert property onproperty change checking)', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                expect(spreadsheet.allowInsert).toBeFalsy();
                const addSheetBtn: HTMLButtonElement = helper.getElement('#' + helper.id + ' .e-add-sheet-tab');
                expect(addSheetBtn.disabled).toBeTruthy();
                expect(addSheetBtn.classList.contains('e-disabled')).toBeTruthy();
                spreadsheet.allowInsert = true;
                spreadsheet.dataBind();
                expect(addSheetBtn.disabled).toBeFalsy();
                expect(addSheetBtn.classList.contains('e-disabled')).toBeFalsy();
                done();
            });
        });
        describe('I296145 ->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({ sheets: [{ rows: [{ cells: [{ value: '987.65' }] }] }] }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Number value not updated properly with the property binding', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                expect(spreadsheet.sheets[0].rows[0].cells[0].value).toBe('987.65');
                expect(spreadsheet.sheets[0].rows[0].cells[0].format).toBeUndefined();
                helper.getElement('#' + helper.id + '_number_format').click();
                helper.getElement('#' + helper.id + '_number_format-popup .e-item:nth-child(2)').click();
                expect(spreadsheet.sheets[0].rows[0].cells[0].value).toBe('987.65');
                expect(spreadsheet.sheets[0].rows[0].cells[0].format).toBe('0.00');
                done();
            });
        });
        describe('I296132, I297067 ->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet(
                    { sheets: [{ ranges: [{ dataSource: [{ "Customer Name": "* Deluxe Queen Room - General\r\n" }] }] }] }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Console issue while providing the incorrect Datasource format', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                expect(spreadsheet.sheets[0].rows[1].cells[0].value).toBe('* Deluxe Queen Room - General\r\n');
                expect(helper.invoke('getCell', [1, 0]).textContent).toBe('* Deluxe Queen Room - General\r\n');
                done();
            });
        });
        describe('I288573, I293791 ->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({}, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('String value its display as date format', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                spreadsheet.updateCell({value: '(220 - 230)' }, 'B2');
                expect(spreadsheet.sheets[0].rows[1].cells[1].value).toBe('(220 - 230)');
                expect(spreadsheet.sheets[0].rows[1].cells[1].format).toBeUndefined();
                expect(helper.invoke('getCell', [1, 1]).textContent).toBe('(220 - 230)');
                done();
            });
        });
        describe('I252011, F152303, F152528, I281279, I284628, I297999 ->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({ sheets: [{ ranges: [{ dataSource: defaultData }] }] }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Dynamic data binding support', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                expect(spreadsheet.sheets[0].rows[0].cells[0].value).toBe('Item Name');
                spreadsheet.sheets = [{ranges: [{ dataSource: [{ 'Name': 'Sridhar' }], startCell: 'E5' }]}];
                spreadsheet.dataBind();
                setTimeout((): void => {
                    expect(spreadsheet.sheets[0].rows[4].cells[4].value).toBe('Name');
                    expect(helper.invoke('getCell', [4, 4]).textContent).toBe('Name');
                    expect(spreadsheet.sheets[0].rows[5].cells[4].value).toBe('Sridhar');
                    expect(helper.invoke('getCell', [5, 4]).textContent).toBe('Sridhar');
                    done();
                }, 20);
            });
        });
        describe('I312853 ->', () => {
            let actionBeginCalled: boolean = false; let actionCompleteCalled: boolean = false;
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({
                    actionBegin: (args: any): void => {
                        if (args.action === 'renameSheet') { actionBeginCalled = true; }
                    },
                    actionComplete: (args: any): void => {
                        if (args.action === 'renameSheet') { actionCompleteCalled = true; }
                    }
                }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Trigger actionBegin and actionComplete event for sheet rename action', (done: Function) => {
                expect(actionBeginCalled).toBeFalsy();
                expect(actionCompleteCalled).toBeFalsy();
                const item: HTMLElement = helper.getElement('#' + helper.id + ' .e-sheet-tab .e-toolbar-item.e-active');
                helper.triggerMouseAction(
                    'dblclick', { x: item.getBoundingClientRect().left + 1, y: item.getBoundingClientRect().top + 1 }, item.parentElement,
                    item);
                const renameInput: HTMLInputElement = helper.getElement('#' + helper.id + '_rename_input');
                renameInput.value = 'Changed';
                helper.triggerMouseAction(
                    'mousedown', { x: document.body.getBoundingClientRect().left + 1, y: document.body.getBoundingClientRect().top + 1 }, document,
                    document.body);
                setTimeout((): void => {
                    expect(helper.getInstance().sheets[0].name).toBe('Changed');
                    expect(actionBeginCalled).toBeTruthy();
                    expect(actionCompleteCalled).toBeTruthy();
                    done();
                });
            });
        });
        describe('I264109, F162113 ->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({}, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Error alert when named range given with space', (done: Function) => {
                helper.invoke('addDefinedName', [{ name: 'demo check', refersTo: 'Sheet1!A1:B5' }]);
                setTimeout((): void => {
                    const dialog: HTMLElement = helper.getElement('#' + helper.id + ' .e-dialog.e-popup-open');
                    expect(!!dialog).toBeTruthy();
                    expect(dialog.querySelector('.e-dlg-content').textContent).toBe('The name that you entered is not valid.');
                    helper.getInstance().serviceLocator.getService('dialog').hide();
                    done();
                });
            });
        });
        describe('F163837 ->', () => {
            beforeEach((done: Function) => {
                setCurrencyCode('EUR');
                helper.initializeSpreadsheet({ sheets: [{ rows: [{ cells: [{ value: '7', format: '$#,##0.00' }] }] }] }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
                setCurrencyCode('USD');
            });
            it('Speadsheet globalization - setCurrencyCode conflict with component language', (done: Function) => {
                expect(helper.invoke('getCell', [0, 0]).textContent).toBe('€7.00');
                helper.getElement('#' + helper.id + '_number_format').click();
                expect(helper.getElement('#' + helper.id + '_Currency .e-numformat-preview-text').textContent).toBe('€7.00');
                done();
            });
        });
        describe('fb24579 ->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({ sheets: [{ showHeaders: false }] }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Gridlines disappear when "Hide Headers" option is selected and sheet is scrolled to right', (done: Function) => {
                expect(helper.getElement('#' + helper.id + '_sheet').classList).toContain('e-hide-headers');
                helper.invoke('goTo', ['AA30']);
                setTimeout((): void => {
                    expect(helper.getInstance().sheets[0].topLeftCell).toBe('AA30');
                    expect(helper.invoke('getScrollElement').scrollLeft).toBeGreaterThan(0);
                    expect(helper.invoke('getMainContent').scrollLeft).toBeGreaterThan(0);
                    expect(helper.invoke('getCell', [29, 26])).toBeDefined(0);
                    done();
                }, 20);
            });
        });
        describe('I312024 ->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet(
                    { sheets: [{ rows: [{ cells: [{ value: '1' }] }, { cells: [{ value: '2' }] }, { cells: [{ value: '3' }] }, { cells:
                    [{ formula: '=SUM(A1:A3)' }] }] }] }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('sheets property issue in onPropertychange action', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                expect(spreadsheet.sheets.length).toBe(1);
                spreadsheet.sheets = [{}, {}, {}];
                setTimeout((): void => {
                    expect(spreadsheet.sheets.length).toBe(3);
                    expect(spreadsheet.sheets[0].rows.length).toBe(0);
                    expect(helper.getElements('#' + helper.id + ' .e-sheet-tabs-items .e-toolbar-item').length).toBe(3);
                    done();
                }, 20);
            });
        });
        describe('SF-352381 ->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet(
                    { sheets: [{ ranges: [{ dataSource: defaultData }], columns: [{ width: 180 }, { width: 130 }, { width: 130 },
                        { width: 180 }, { width: 130 }, { width: 120 }], topLeftCell: 'A310', rowCount: 999, colCount: 199 }],
                        scrollSettings: { isFinite: true } }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Horizontal scroll on finite mode is not proper when end reached', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                helper.invoke('getScrollElement').scrollLeft = 12508;
                const cellsCount: number = helper.invoke('getContentTable').rows[0].cells.length;
                setTimeout((): void => {
                    expect(spreadsheet.viewport.rightIndex).toBe(198);
                    let row: HTMLTableRowElement = helper.invoke('getContentTable').rows[0];
                    expect(row.cells.length).toBe(cellsCount);
                    expect(row.lastElementChild.getAttribute('aria-colindex')).toBe('199');
                    row = helper.invoke('getColHeaderTable').rows[0];
                    expect(row.lastElementChild.getAttribute('aria-colindex')).toBe('199');
                    expect(row.lastElementChild.textContent).toBe('GQ');
                    done();
                }, 20);
            });
            it('Selection misalignment and script error on undo operation after delete the column', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                helper.invoke('selectRange', ['D1:D999']);
                const cell: HTMLElement = (spreadsheet.element.querySelector('.e-colhdr-table') as HTMLTableElement).rows[0].cells[3];
                helper.triggerMouseAction(
                    'contextmenu', { x: cell.getBoundingClientRect().left + 1, y: cell.getBoundingClientRect().top + 1 }, null, cell);
                setTimeout((): void => {
                    helper.getElement('#' + helper.id + '_cmenu_delete_column').click();
                    helper.invoke('goTo', ['CE60']);
                    setTimeout((): void => {
                        expect(spreadsheet.getActiveSheet().topLeftCell).toBe('CE60');
                        helper.triggerKeyNativeEvent(90, true);
                        setTimeout((): void => {
                            expect(spreadsheet.getActiveSheet().topLeftCell).toBe('D1');
                            expect(spreadsheet.viewport.leftIndex).toBe(0);
                            expect(spreadsheet.viewport.topIndex).toBe(0);
                            done();
                        }, 20);
                    }, 20);
                });
            });
        });
        describe('SF-370011 ->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({ sheets: [{ ranges: [{ dataSource: defaultData }] }] }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Create new workbook not removing the filter range', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                helper.invoke('applyFilter');
                expect(spreadsheet.sheets[0].rows.length).toBe(11);
                expect(helper.invoke('getCell', [0, 0]).querySelector('.e-filter-icon')).not.toBeNull();
                helper.invoke('refresh', [true]);
                setTimeout((): void => {
                    expect(spreadsheet.sheets[0].rows.length).toBe(0);
                    expect(helper.invoke('getCell', [0, 0]).querySelector('.e-filter-icon')).toBeNull();
                    done();
                });
            });
        });
        describe('SF-366370 ->', () => {
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({ sheets: [{ ranges: [{ dataSource: defaultData }] }] }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Script error on sheet name changing through on property change', (done: Function) => {
                const spreadsheet: Spreadsheet = helper.getInstance();
                expect(spreadsheet.sheets[0].name).toBe('Sheet1');
                expect(helper.getElement().querySelector('.e-sheet-tabs-items').children[1].textContent).toBe('Sheet1');
                spreadsheet.sheets[0].name = 'Changed';
                spreadsheet.dataBind();
                expect(spreadsheet.sheets[0].name).toBe('Changed');
                expect(helper.getElement().querySelector('.e-sheet-tabs-items').children[1].textContent).toBe('Changed');
                done();
            });
        });
        describe('EJ2-59578 ->', () => {
            L10n.load({
                'de-DE': {
                    'spreadsheet': {
                        'Cut': 'Schneiden',
                        'TopBorders': 'Top dzdsfsd Borders',
                        'LeftBorders': 'Left sasd Borders',
                        'RightBorders': 'Right asd Borders',
                        'BottomBorders': 'BottomBorders asd  ',
                        'AllBorders': 'AllBorders asd ',
                        'HorizontalBorders': 'Horizontal asdasd Borders',
                        'VerticalBorders': 'Vertical asdasd Borders',
                        'OutsideBorders': 'Outside asdasd Borders',
                        'InsideBorders': 'Inside asdasd Borders',
                        'NoBorders': 'No asdsad Borders',
                        'BorderColor': 'Border asdasdsa Color',
                        'BorderStyle': 'Border sdfsdf Style'
                    }
                }
            });
            beforeEach((done: Function) => {
                helper.initializeSpreadsheet({ sheets: [{ ranges: [{ dataSource: defaultData }] }], locale: 'de-DE' }, done);
            });
            afterEach(() => {
                helper.invoke('destroy');
            });
            it('Border not applied properly when using locale text in spreadsheet', (done: Function) => {
                helper.invoke('setBorder', [{ borderLeft: '1px solid red' }, 'B2:B2']);
                var td = helper.invoke('getCell', [1, 0]);
                expect(td.style.borderRight).toBe('1px solid red');
                expect(td.style.borderTop).toBe('');
                expect(td.style.borderLeft).toBe('');
                expect(td.style.borderBottom).toBe('');
                helper.invoke('setBorder', [{ borderTop: '1px solid red' }, 'B4:B4']);
                var td = helper.invoke('getCell', [2, 1]);
                expect(td.style.borderRight).toBe('');
                expect(td.style.borderTop).toBe('');
                expect(td.style.borderLeft).toBe('');
                expect(td.style.borderBottom).toBe('1px solid red');
                helper.invoke('setBorder', [{ borderRight: '1px solid red' }, 'D2:D2']);
                td = helper.invoke('getCell', [1, 3]);
                expect(td.style.borderRight).toBe('1px solid red');
                expect(td.style.borderTop).toBe('');
                expect(td.style.borderLeft).toBe('');
                expect(td.style.borderBottom).toBe('');
                helper.invoke('setBorder', [{ borderBottom: '1px solid red' }, 'D2:D2']);
                td = helper.invoke('getCell', [1, 3]);
                expect(td.style.borderBottom).toBe('1px solid red');
                expect(td.style.borderRight).toBe('1px solid red');
                expect(td.style.borderTop).toBe('');
                expect(td.style.borderLeft).toBe('');
                helper.invoke('setBorder', [{ border: '1px solid #000000' }, 'C2:D3', 'Outer']);
                td = helper.invoke('getCell', [2, 3]);
                expect(td.style.borderRight).toBe('1px solid rgb(0, 0, 0)');
                expect(td.style.borderBottom).toBe('1px solid rgb(0, 0, 0)');
                expect(td.style.borderTop).toBe('');
                expect(td.style.borderLeft).toBe('');
                helper.invoke('setBorder', [{ border: '1px solid #000000' }, 'F2:G4', 'Inner']);
                td = helper.invoke('getCell', [1, 5]);
                expect(td.style.borderRight).toBe('1px solid rgb(0, 0, 0)');
                expect(td.style.borderBottom).toBe('1px solid rgb(0, 0, 0)');
                expect(td.style.borderTop).toBe('');
                expect(td.style.borderLeft).toBe('');
                helper.invoke('setBorder', [{ border: '1px solid #000000' }, 'C5:E8', 'Horizontal']);
                td = helper.invoke('getCell', [5, 2]);
                expect(td.style.borderRight).toBe('');
                expect(td.style.borderBottom).toBe('1px solid rgb(0, 0, 0)');
                expect(td.style.borderTop).toBe('');
                expect(td.style.borderLeft).toBe('');
                helper.invoke('setBorder', [{ border: '1px solid #000000' }, 'G5:I8', 'Vertical']);
                td = helper.invoke('getCell', [5, 8]);
                expect(td.style.borderRight).toBe('1px solid rgb(0, 0, 0)');
                expect(td.style.borderTop).toBe('');
                expect(td.style.borderLeft).toBe('');
                expect(td.style.borderBottom).toBe(''); 
                done();
            });
        });
    });
});