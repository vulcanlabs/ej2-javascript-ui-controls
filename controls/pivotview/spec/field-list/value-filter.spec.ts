import { PivotFieldList } from '../../src/pivotfieldlist/base/field-list';
import { createElement, remove, EmitType, getInstance } from '@syncfusion/ej2-base';
import { pivot_dataset } from '../base/datasource.spec';
import { IDataSet } from '../../src/base/engine';
import { PivotCommon } from '../../src/common/base/pivot-common';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { profile, inMB, getMemoryProfile } from '../common.spec';
import { MemberEditorOpenEventArgs, MemberFilteringEventArgs } from '../../src/common/base/interface';

describe('Value Filter', () => {
    beforeAll(() => {
        const isDef = (o: any) => o !== undefined && o !== null;
        if (!isDef(window.performance)) {
            console.log("Unsupported environment, window.performance.memory is unavailable");
            this.skip(); //Skips test (in Chai)
            return;
        }
    });
    describe('Check Value Filter Actions', () => {
        let fieldListObj: PivotFieldList;
        let pivotCommon: PivotCommon;
        let elem: HTMLElement = createElement('div', { id: 'PivotFieldList', styles: 'height:400px;width:60%' });
        afterAll(() => {
            if (fieldListObj) {
                fieldListObj.destroy();
            }
            remove(elem);
        });
        beforeAll((done: Function) => {
            if (document.getElementById(elem.id)) {
                remove(document.getElementById(elem.id));
            }
            document.body.appendChild(elem);
            let dataBound: EmitType<Object> = () => { done(); };
            fieldListObj = new PivotFieldList(
                {
                    dataSourceSettings: {
                        dataSource: pivot_dataset as IDataSet[],
                        expandAll: true,
                        enableSorting: true,
                        allowLabelFilter: true,
                        allowValueFilter: true,
                        sortSettings: [{ name: 'company', order: 'Descending' }],
                        formatSettings: [{ name: 'balance', format: 'C' }],
                        drilledMembers: [{ name: 'product', items: ['Bike', 'Car'] }, { name: 'gender', items: ['male'] }],
                        filterSettings: [
                            { name: 'product', type: 'Value', condition: 'GreaterThan', value1: '1000', measure: 'quantity' },
                            { name: 'eyeColor', type: 'Value', condition: 'GreaterThanOrEqualTo', value1: '600', measure: 'quantity' }
                        ],
                        rows: [{ name: 'product', caption: 'Items' }, { name: 'eyeColor' }],
                        columns: [{ name: 'gender', caption: 'Population' }, { name: 'isActive' }],
                        values: [{ name: 'balance' }, { name: 'quantity' }],
                        filters: [],
                    },
                    renderMode: 'Fixed',
                    memberEditorOpen: (args: MemberEditorOpenEventArgs) => {
                        expect(args.fieldMembers).toBeTruthy;
                        expect(args.cancel).toBe(false);
                        console.log('MemberFilterOpenNAme: ' + args.fieldName);
                    },
                    memberFiltering: (args: MemberFilteringEventArgs) => {
                        expect(args.filterSettings).toBeTruthy;
                        expect(args.cancel).toBe(false);
                        console.log('MemberFilterOpenNAme: ' + args.filterSettings.name);
                    },
                    dataBound: dataBound
                });
            fieldListObj.appendTo('#PivotFieldList');
            pivotCommon = fieldListObj.pivotCommon;
        });
        it('check value filter for code behind', (done: Function) => {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            setTimeout(() => {
                expect(fieldListObj.element.classList.contains('e-pivotfieldlist')).toEqual(true);
                let leftAxisPanel: HTMLElement = fieldListObj.axisTableModule.axisTable.querySelector('.e-left-axis-fields');
                let rowAxiscontent: HTMLElement = leftAxisPanel.querySelector('.e-rows');
                let pivotButtons: HTMLElement[] = [].slice.call(rowAxiscontent.querySelectorAll('.e-pivot-button'));
                expect(pivotButtons.length).toBeGreaterThan(0);
                expect((pivotButtons[0]).querySelector('.e-btn-filter').classList.contains('e-pv-filtered')).toBeTruthy;
                done();
            }, 1000);
        });
        it('open filter popup', (done: Function) => {
            let leftAxisPanel: HTMLElement = fieldListObj.axisTableModule.axisTable.querySelector('.e-left-axis-fields');
            let rowAxiscontent: HTMLElement = leftAxisPanel.querySelector('.e-rows');
            let pivotButtons: HTMLElement[] = [].slice.call(rowAxiscontent.querySelectorAll('.e-pivot-button'));
            expect(pivotButtons.length).toBeGreaterThan(0);
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            setTimeout(() => {
                ((pivotButtons[0]).querySelector('.e-btn-filter') as HTMLElement).click();
                expect(pivotCommon.filterDialog.dialogPopUp).toBeTruthy;
                done();
            }, 1000);
        });
        it('check on member filter type change', (done: Function) => {
            let dialogElement: HTMLElement = pivotCommon.filterDialog.dialogPopUp.element;
            expect([].slice.call(dialogElement.querySelectorAll('.e-toolbar-item')).length).toEqual(3);
            let headerElement: HTMLElement[] = [].slice.call(dialogElement.querySelectorAll('.e-toolbar-item'));
            expect(headerElement[2].classList.contains('e-active')).toBeTruthy;
            headerElement[0].click();
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            setTimeout(() => {
                expect(headerElement[0].textContent).toBe('Member');
                expect(headerElement[0].classList.contains('e-active')).toBeTruthy;
                headerElement[2].click();
                done();
            }, 1000);
        });
        it('Check clear filter option', (done: Function) => {
            let dialogElement: HTMLElement = pivotCommon.filterDialog.dialogPopUp.element;
            expect(dialogElement.classList.contains('e-popup-open')).toBe(true);
            expect([].slice.call(dialogElement.querySelectorAll('.e-toolbar-item')).length).toEqual(3);
            let headerElement: HTMLElement[] = [].slice.call(dialogElement.querySelectorAll('.e-toolbar-item'));
            expect(headerElement[2].textContent).toBe('Value');
            expect(headerElement[2].classList.contains('e-active')).toBeTruthy;
            let leftAxisPanel: HTMLElement = fieldListObj.axisTableModule.axisTable.querySelector('.e-left-axis-fields');
            let rowAxiscontent: HTMLElement = leftAxisPanel.querySelector('.e-rows');
            let pivotButtons: HTMLElement[] = [].slice.call(rowAxiscontent.querySelectorAll('.e-pivot-button'));
            expect(pivotButtons.length).toBeGreaterThan(0);
            (dialogElement.querySelector('.e-clear-filter-button') as HTMLElement).click();
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            setTimeout(() => {
                expect(pivotCommon.filterDialog.dialogPopUp.element).toBeUndefined;
                expect((pivotButtons[0]).querySelector('.e-btn-filter').classList.contains('e-pv-filtered')).not.toBeTruthy;
                ((pivotButtons[0]).querySelector('.e-btn-filter') as HTMLElement).click();
                done();
            }, 1000);
        });
        it('check on value filter type change', (done: Function) => {
            let dialogElement: HTMLElement = pivotCommon.filterDialog.dialogPopUp.element;
            expect([].slice.call(dialogElement.querySelectorAll('.e-toolbar-item')).length).toEqual(3);
            let headerElement: HTMLElement[] = [].slice.call(dialogElement.querySelectorAll('.e-toolbar-item'));
            expect(headerElement[0].classList.contains('e-active')).toBeTruthy;
            headerElement[2].click();
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            setTimeout(() => {
                expect(headerElement[2].textContent).toBe('Value');
                expect(headerElement[2].classList.contains('e-active')).toBeTruthy;
                done();
            }, 1000);
        });
        it('check value filter options', (done: Function) => {
            let dialogElement: HTMLElement = pivotCommon.filterDialog.dialogPopUp.element;
            expect(dialogElement.classList.contains('e-popup-open')).toBe(true);
            let dropdownlist: any = getInstance(dialogElement.querySelector('#' + fieldListObj.element.id + '_value_measure_option_container') as HTMLElement, DropDownList);
            expect(dropdownlist).toBeTruthy;
            dropdownlist.value = "quantity";
            let dropdownlist1: any = getInstance(dialogElement.querySelector('#' + fieldListObj.element.id + '_value_contition_option_container') as HTMLElement, DropDownList);
            expect(dropdownlist1).toBeTruthy;
            dropdownlist1.value = "Between";
            let input1: any = getInstance(dialogElement.querySelector('#' + fieldListObj.element.id + '_value_input_option_1') as HTMLElement, NumericTextBox);
            let input2: any = getInstance(dialogElement.querySelector('#' + fieldListObj.element.id + '_value_input_option_2') as HTMLElement, NumericTextBox);
            expect(input1).toBeTruthy;
            expect(input2).toBeTruthy;
            input1.setProperties({ value: 1500 });
            input1.change({ value: input1.value });
            input2.setProperties({ value: 2100 });
            input2.change({ value: input2.value });
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            setTimeout(() => {
                expect(input1.value.toString() === '1500').toBeTruthy;
                expect(input2.value.toString() === '2100').toBeTruthy;
                done();
            }, 1000);
        });
        it('check update filter using ok', (done: Function) => {
            let dialogElement: HTMLElement = pivotCommon.filterDialog.dialogPopUp.element;
            expect(dialogElement.classList.contains('e-popup-open')).toBe(true);
            let dropdownlist: any = getInstance(dialogElement.querySelector('#' + fieldListObj.element.id + '_value_contition_option_container') as HTMLElement, DropDownList);
            dropdownlist.value = 'Contains';
            setTimeout(() => {
                (dialogElement.querySelector('.e-ok-btn') as HTMLElement).click();
                let leftAxisPanel: HTMLElement = fieldListObj.axisTableModule.axisTable.querySelector('.e-left-axis-fields');
                let rowAxiscontent: HTMLElement = leftAxisPanel.querySelector('.e-rows');
                let pivotButtons: HTMLElement[] = [].slice.call(rowAxiscontent.querySelectorAll('.e-pivot-button'));
                expect(pivotButtons.length).toBeGreaterThan(0);
                expect(pivotCommon.filterDialog.dialogPopUp.element).toBeUndefined;
                expect((pivotButtons[0]).querySelector('.e-btn-filter').classList.contains('e-pv-filtered')).toBeTruthy;
                ((pivotButtons[0]).querySelector('.e-btn-filter') as HTMLElement).click();
                done();
            }, 1000);
        });
        // it('check with sort order change', (done: Function) => {
        //     let dialogElement: HTMLElement = pivotCommon.filterDialog.dialogPopUp.element;
        //     let leftAxisPanel: HTMLElement = fieldListObj.axisTableModule.axisTable.querySelector('.e-left-axis-fields');
        //     let rowAxiscontent: HTMLElement = leftAxisPanel.querySelector('.e-rows');
        //     let pivotButtons: HTMLElement[] = [].slice.call(rowAxiscontent.querySelectorAll('.e-pivot-button'));
        //     expect(pivotButtons.length).toBeGreaterThan(0);
        //     ((pivotButtons[0]).querySelector('.e-sort') as HTMLElement).click();
        //     expect(true).toBe(true);
        //     setTimeout(() => {
        //         expect((pivotButtons[0]).querySelector('.e-descend')).toBeTruthy;
        //         expect((pivotButtons[0]).querySelector('.e-btn-filter').classList.contains('e-pv-filtered')).toBeTruthy;
        //         done();
        //     }, 1000);
        // });
        // it('drag/drop pivot button from axis field to same axis field', (done: Function) => {
        //     let leftAxisPanel: HTMLElement = fieldListObj.axisTableModule.axisTable.querySelector('.e-left-axis-fields');
        //     let rowAxiscontent: HTMLElement = leftAxisPanel.querySelector('.e-rows');
        //     let pivotButton: HTMLElement[] = [].slice.call((rowAxiscontent).querySelectorAll('.e-pivot-button'));
        //     expect(pivotButton.length).toEqual(2);
        //     let dragElement: HTMLElement = pivotButton[0].querySelector('.e-draggable');
        //     let mousedown: any =
        //         util.getEventObject('MouseEvents', 'mousedown', dragElement, dragElement, 15, 10);
        //     EventHandler.trigger(dragElement, 'mousedown', mousedown);
        //     let mousemove: any =
        //         util.getEventObject('MouseEvents', 'mousemove', dragElement, rowAxiscontent, 15, 70);
        //     mousemove.srcElement = mousemove.target = mousemove.toElement = rowAxiscontent;
        //     EventHandler.trigger(<any>(document), 'mousemove', mousemove);
        //     mousemove = util.setMouseCordinates(mousemove, 15, 75);
        //     EventHandler.trigger(<any>(document), 'mousemove', mousemove);
        //     let mouseUp: any = util.getEventObject('MouseEvents', 'mouseup', dragElement, rowAxiscontent);
        //     mouseUp.type = 'mouseup';
        //     mouseUp.srcElement = mouseUp.target = mouseUp.toElement = rowAxiscontent;
        //     EventHandler.trigger(<any>(document), 'mouseup', mouseUp);
        //     pivotButton = [].slice.call((rowAxiscontent).querySelectorAll('.e-pivot-button'));
        //     expect(pivotCommon.filterDialog.dialogPopUp.element).toBeUndefined;
        //     expect(pivotButton.length).toEqual(2);
        //     setTimeout(() => {
        //         expect((pivotButton[pivotButton.length - 1]).querySelector('.e-descend')).toBeTruthy;
        //         expect((pivotButton[pivotButton.length - 1]).querySelector('.e-btn-filter').classList.contains('e-pv-filtered')).toBeTruthy;
        //         done();
        //     }, 1000);
        // });
        // it('set rtl property', (done: Function) => {
        //     fieldListObj.enableRtl = true;
        //     jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        //     setTimeout(() => {
        //         expect(document.getElementById('PivotFieldList').classList.contains('e-rtl')).toBeTruthy;
        //         done();
        //     }, 1000);
        // });
        it('open filter popup', (done: Function) => {
            let leftAxisPanel: HTMLElement = fieldListObj.axisTableModule.axisTable.querySelector('.e-left-axis-fields');
            let rowAxiscontent: HTMLElement = leftAxisPanel.querySelector('.e-rows');
            let pivotButtons: HTMLElement[] = [].slice.call(rowAxiscontent.querySelectorAll('.e-pivot-button'));
            expect(pivotButtons.length).toBeGreaterThan(0);
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            setTimeout(() => {
                ((pivotButtons[0]).querySelector('.e-btn-filter') as HTMLElement).click();
                expect(pivotCommon.filterDialog.dialogPopUp).toBeTruthy;
                done();
            }, 1000);
        });
        it('close filter popup by cancel', (done: Function) => {
            let dialogElement: HTMLElement = document.getElementById(fieldListObj.element.id + '_EditorTreeView');
            expect(dialogElement.classList.contains('e-popup-open')).toBe(true);
            (dialogElement.querySelector('.e-cancel-btn') as HTMLElement).click();
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            setTimeout(() => {
                expect(dialogElement).toBeUndefined;
                done();
            }, 1000);
        });
    });
    describe('Check Value Filter Actions without member filtering enabled', () => {
        let fieldListObj: PivotFieldList;
        let pivotCommon: PivotCommon;
        let elem: HTMLElement = createElement('div', { id: 'PivotFieldList', styles: 'height:400px;width:60%' });
        afterAll(() => {
            if (fieldListObj) {
                fieldListObj.destroy();
            }
            remove(elem);
        });
        beforeAll((done: Function) => {
            if (document.getElementById(elem.id)) {
                remove(document.getElementById(elem.id));
            }
            document.body.appendChild(elem);
            let dataBound: EmitType<Object> = () => { done(); };
            fieldListObj = new PivotFieldList(
                {
                    dataSourceSettings: {
                        dataSource: pivot_dataset as IDataSet[],
                        expandAll: true,
                        enableSorting: true,
                        allowLabelFilter: true,
                        allowValueFilter: true,
                        allowMemberFilter: false,
                        sortSettings: [{ name: 'company', order: 'Descending' }],
                        formatSettings: [{ name: 'balance', format: 'C' }],
                        drilledMembers: [{ name: 'product', items: ['Bike', 'Car'] }, { name: 'gender', items: ['male'] }],
                        filterSettings: [
                            { name: 'product', type: 'Value', condition: 'GreaterThan', value1: '1000', measure: 'quantity' },
                            { name: 'eyeColor', type: 'Value', condition: 'GreaterThanOrEqualTo', value1: '600', measure: 'quantity' },
                            { name: 'gender', type: 'Include', items: ['male'] }
                        ],
                        rows: [{ name: 'product', caption: 'Items' }, { name: 'eyeColor' }],
                        columns: [{ name: 'gender', caption: 'Population' }, { name: 'isActive' }],
                        values: [{ name: 'balance' }, { name: 'quantity' }],
                        filters: [],
                    },
                    renderMode: 'Fixed',
                    dataBound: dataBound
                });
            fieldListObj.appendTo('#PivotFieldList');
            pivotCommon = fieldListObj.pivotCommon;
        });
        it('check value filter for code behind', (done: Function) => {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            setTimeout(() => {
                expect(fieldListObj.element.classList.contains('e-pivotfieldlist')).toEqual(true);
                let leftAxisPanel: HTMLElement = fieldListObj.axisTableModule.axisTable.querySelector('.e-left-axis-fields');
                let rowAxiscontent: HTMLElement = leftAxisPanel.querySelector('.e-rows');
                let pivotButtons: HTMLElement[] = [].slice.call(rowAxiscontent.querySelectorAll('.e-pivot-button'));
                expect(pivotButtons.length).toBeGreaterThan(0);
                expect((pivotButtons[0]).querySelector('.e-btn-filter').classList.contains('e-pv-filtered')).toBeTruthy;
                done();
            }, 1000);
        });
        it('open filter popup', (done: Function) => {
            let leftAxisPanel: HTMLElement = fieldListObj.axisTableModule.axisTable.querySelector('.e-left-axis-fields');
            let rowAxiscontent: HTMLElement = leftAxisPanel.querySelector('.e-rows');
            let pivotButtons: HTMLElement[] = [].slice.call(rowAxiscontent.querySelectorAll('.e-pivot-button'));
            expect(pivotButtons.length).toBeGreaterThan(0);
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            setTimeout(() => {
                ((pivotButtons[0]).querySelector('.e-btn-filter') as HTMLElement).click();
                expect(pivotCommon.filterDialog.dialogPopUp).toBeTruthy;
                done();
            }, 1000);
        });
        it('check on member filter type change', (done: Function) => {
            let dialogElement: HTMLElement = pivotCommon.filterDialog.dialogPopUp.element;
            expect([].slice.call(dialogElement.querySelectorAll('.e-toolbar-item')).length).toEqual(3);
            let headerElement: HTMLElement[] = [].slice.call(dialogElement.querySelectorAll('.e-toolbar-item'));
            expect(headerElement[2].classList.contains('e-active')).toBeTruthy;
            headerElement[0].click();
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            setTimeout(() => {
                expect(headerElement[0].textContent).toBe('Member');
                expect(headerElement[0].classList.contains('e-active')).toBeTruthy;
                headerElement[2].click();
                done();
            }, 1000);
        });
        it('Check clear filter option', (done: Function) => {
            let dialogElement: HTMLElement = pivotCommon.filterDialog.dialogPopUp.element;
            expect(dialogElement.classList.contains('e-popup-open')).toBe(true);
            expect([].slice.call(dialogElement.querySelectorAll('.e-toolbar-item')).length).toEqual(3);
            let headerElement: HTMLElement[] = [].slice.call(dialogElement.querySelectorAll('.e-toolbar-item'));
            expect(headerElement[2].textContent).toBe('Value');
            expect(headerElement[2].classList.contains('e-active')).toBeTruthy;
            let leftAxisPanel: HTMLElement = fieldListObj.axisTableModule.axisTable.querySelector('.e-left-axis-fields');
            let rowAxiscontent: HTMLElement = leftAxisPanel.querySelector('.e-rows');
            let pivotButtons: HTMLElement[] = [].slice.call(rowAxiscontent.querySelectorAll('.e-pivot-button'));
            expect(pivotButtons.length).toBeGreaterThan(0);
            (dialogElement.querySelector('.e-clear-filter-button') as HTMLElement).click();
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            setTimeout(() => {
                expect(pivotCommon.filterDialog.dialogPopUp.element).toBeUndefined;
                expect((pivotButtons[0]).querySelector('.e-btn-filter').classList.contains('e-pv-filtered')).not.toBeTruthy;
                ((pivotButtons[0]).querySelector('.e-btn-filter') as HTMLElement).click();
                done();
            }, 1000);
        });
        it('check on value filter type change', (done: Function) => {
            let dialogElement: HTMLElement = pivotCommon.filterDialog.dialogPopUp.element;
            expect([].slice.call(dialogElement.querySelectorAll('.e-toolbar-item')).length).toEqual(3);
            let headerElement: HTMLElement[] = [].slice.call(dialogElement.querySelectorAll('.e-toolbar-item'));
            expect(headerElement[0].classList.contains('e-active')).toBeTruthy;
            headerElement[2].click();
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            setTimeout(() => {
                expect(headerElement[2].textContent).toBe('Value');
                expect(headerElement[2].classList.contains('e-active')).toBeTruthy;
                done();
            }, 1000);
        });
        it('check value filter options', (done: Function) => {
            let dialogElement: HTMLElement = pivotCommon.filterDialog.dialogPopUp.element;
            expect(dialogElement.classList.contains('e-popup-open')).toBe(true);
            let dropdownlist: any = getInstance(dialogElement.querySelector('#' + fieldListObj.element.id + '_value_measure_option_container') as HTMLElement, DropDownList);
            expect(dropdownlist).toBeTruthy;
            dropdownlist.value = "quantity";
            let dropdownlist1: any = getInstance(dialogElement.querySelector('#' + fieldListObj.element.id + '_value_contition_option_container') as HTMLElement, DropDownList);
            expect(dropdownlist1).toBeTruthy;
            dropdownlist1.value = "Between";
            let input1: any = getInstance(dialogElement.querySelector('#' + fieldListObj.element.id + '_value_input_option_1') as HTMLElement, NumericTextBox);
            let input2: any = getInstance(dialogElement.querySelector('#' + fieldListObj.element.id + '_value_input_option_2') as HTMLElement, NumericTextBox);
            expect(input1).toBeTruthy;
            expect(input2).toBeTruthy;
            input1.setProperties({ value: 1500 });
            input1.change({ value: input1.value });
            input2.setProperties({ value: 2100 });
            input2.change({ value: input2.value });
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            setTimeout(() => {
                expect(input1.value.toString() === '1500').toBeTruthy;
                expect(input2.value.toString() === '2100').toBeTruthy;
                done();
            }, 1000);
        });
        it('check update filter using ok', (done: Function) => {
            let dialogElement: HTMLElement = pivotCommon.filterDialog.dialogPopUp.element;
            expect(dialogElement.classList.contains('e-popup-open')).toBe(true);
            let dropdownlist: any = getInstance(dialogElement.querySelector('#' + fieldListObj.element.id + '_value_contition_option_container') as HTMLElement, DropDownList);
            dropdownlist.value = 'Contains';
            setTimeout(() => {
                (dialogElement.querySelector('.e-ok-btn') as HTMLElement).click();
                let leftAxisPanel: HTMLElement = fieldListObj.axisTableModule.axisTable.querySelector('.e-left-axis-fields');
                let rowAxiscontent: HTMLElement = leftAxisPanel.querySelector('.e-rows');
                let pivotButtons: HTMLElement[] = [].slice.call(rowAxiscontent.querySelectorAll('.e-pivot-button'));
                expect(pivotButtons.length).toBeGreaterThan(0);
                expect(pivotCommon.filterDialog.dialogPopUp.element).toBeUndefined;
                expect((pivotButtons[0]).querySelector('.e-btn-filter').classList.contains('e-pv-filtered')).toBeTruthy;
                ((pivotButtons[0]).querySelector('.e-btn-filter') as HTMLElement).click();
                done();
            }, 1000);
        });
        it('open filter popup', (done: Function) => {
            let leftAxisPanel: HTMLElement = fieldListObj.axisTableModule.axisTable.querySelector('.e-left-axis-fields');
            let rowAxiscontent: HTMLElement = leftAxisPanel.querySelector('.e-rows');
            let pivotButtons: HTMLElement[] = [].slice.call(rowAxiscontent.querySelectorAll('.e-pivot-button'));
            expect(pivotButtons.length).toBeGreaterThan(0);
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            setTimeout(() => {
                ((pivotButtons[0]).querySelector('.e-btn-filter') as HTMLElement).click();
                expect(pivotCommon.filterDialog.dialogPopUp).toBeTruthy;
                done();
            }, 1000);
        });
        it('close filter popup by cancel', (done: Function) => {
            let dialogElement: HTMLElement = document.getElementById(fieldListObj.element.id + '_EditorTreeView');
            expect(dialogElement.classList.contains('e-popup-open')).toBe(true);
            (dialogElement.querySelector('.e-cancel-btn') as HTMLElement).click();
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
            setTimeout(() => {
                expect(dialogElement).toBeUndefined;
                done();
            }, 1000);
        });
    });

    it('memory leak', () => {
        profile.sample();
        let average: any = inMB(profile.averageChange);
        //Check average change in memory samples to not be over 10MB
        expect(average).toBeLessThan(10);
        let memory: any = inMB(getMemoryProfile());
        //Check the final memory usage against the first usage, there should be little change if everything was properly deallocated
        expect(memory).toBeLessThan(profile.samples[0] + 0.25);
    });
});