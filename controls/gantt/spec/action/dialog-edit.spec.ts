/**
 * Gantt taskbaredit spec
 */
 import { getValue, L10n } from '@syncfusion/ej2-base';
 import { Gantt, Edit, Toolbar, IGanttData } from '../../src/index';
 import { dialogEditData, resourcesData, resources, scheduleModeData, projectData1, indentOutdentData, splitTasksData, projectData} from '../base/data-source.spec';
 import { createGantt, destroyGantt, triggerMouseEvent } from '../base/gantt-util.spec';
 import { DropDownList } from '@syncfusion/ej2-dropdowns';
 import { DataManager } from '@syncfusion/ej2-data';
 interface EJ2Instance extends HTMLElement {
     ej2_instances: Object[];
 }
 let dropDownElement: HTMLElement;
 let dropDownObj: DropDownList;
 let dropDownData = [
     { "Id": 1, "Name": "Tracker 1" },
     { "Id": 2, "Name": "Tracker 2" },
     { "Id": 3, "Name": "Tracker 3" },
     { "Id": 4, "Name": "Tracker 4" },
     { "Id": 5, "Name": "Tracker 5" },
 ];
 let ganttModel: Object = {
     dataSource: dialogEditData,
     taskFields: {
        id: 'TaskID',
        name: 'TaskName',
        startDate: 'StartDate',
        endDate: 'EndDate',
        duration: 'Duration',
        progress: 'Progress',
        notes: 'Notes',
        baselineStartDate: 'BaselineStartDate',
        baselineEndDate: 'BaselineEndDate',
        resourceInfo: 'Resource',
        dependency: 'Predecessor',
        child: 'subtasks'
    },
    resourceIDMapping: 'resourceId',
    resourceNameMapping: 'resourceName',
    resources: resourcesData,
    projectStartDate: new Date('03/25/2019'),
    projectEndDate: new Date('05/30/2019'),
    renderBaseline: true,
    editSettings: {
        allowAdding: true,
        allowEditing: true,
        allowDeleting: true,
        mode: 'Dialog'
    },
    editDialogFields: [
        { type: 'General' },
        { type: 'Dependency' },
        { type: 'Resources' },
        { type: 'Notes' },
        { type: 'Custom' }
    ],
    addDialogFields: [
        { type: 'General' },
        { type: 'Resources' },
        { type: 'Dependency' }
    ],
    columns: [
        { field: 'TaskID', width: 60 },
        { field: 'TaskName', width: 100 },
        { field: 'StartDate', editType: 'datepickeredit', width: 100 },
        { field: 'EndDate', editType: 'datepickeredit', width: 100 },
        { field: 'Duration', width: 100 },
        { field: 'Predecessor', width: 100 },
        { field: 'Progress', width: 100 },
        { field: 'BaselineStartDate', editType: 'datetimepickeredit', width: 100 },
        { field: 'BaselineEndDate', editType: 'datetimepickeredit', width: 100 },
        { field: 'Resource', width: 100 },
        { field: 'Notes', width: 100 },
        { field: 'Customcol1', editType: 'dropdownedit', headerText: 'Custom Column1', width: 100 },
        { field: 'Customcol2', editType: 'maskededit', headerText: 'Custom Column2', width: 100 },
        { field: 'Customcol3', editType: 'booleanedit', headerText: 'Custom Column3', width: 100 },
        {
            field: 'Customcol4', edit: {
                create: (args: Object) => {
                    dropDownElement = document.createElement('input');
                    return dropDownElement;
                },
                read: () => {
                    return dropDownObj.value;
                },
                destroy: () => {
                    dropDownObj.destroy();
                },
                write: function (args: any) {
                    dropDownObj = new DropDownList({
                        dataSource: dropDownData,
                        fields: { text: 'Name' },
                        value: args.rowData[args.column.field],
                        placeholder: "DropDown Custom Column",
                        floatLabelType: 'Auto'
                    });
                    dropDownObj.appendTo(dropDownElement);
                    return dropDownObj;
                }
             }
         }
     ],
     toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel'],
     allowUnscheduledTasks: true,
 };
 Gantt.Inject(Edit, Toolbar);
 describe('Gantt dialog module', () => {
 
     describe('Dialog editing - General Tab', () => {
         let ganttObj: Gantt;
 
         beforeAll((done: Function) => {
             ganttObj = createGantt(ganttModel, done);
         });
         afterAll(() => {
            if (ganttObj) {
                destroyGantt(ganttObj);
            }
        });
        beforeEach((done) => {
            setTimeout(done, 1000);
            ganttObj.openEditDialog(4);
        });
        it('Schedule validation- duration', () => {
            ganttObj.actionBegin = function (args: any): void {
                if (args.requestType === "beforeOpenEditDialog") {
                    args.dialogModel.animationSettings = { 'effect': 'none' };
                }
            };
            ganttObj.dataBind();
            let durationField: any = document.querySelector('#' + ganttObj.element.id + 'Duration') as HTMLInputElement;
            if (durationField) {
                let textObj: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'Duration')).ej2_instances[0];
                textObj.value = '5 days';
                textObj.dataBind();
                let SD: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'StartDate')).ej2_instances[0];
                expect(ganttObj.getFormatedDate(SD.value, 'M/d/yyyy')).toBe('3/29/2019');
                let ED: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'EndDate')).ej2_instances[0];
                expect(ganttObj.getFormatedDate(ED.value, 'M/d/yyyy')).toBe('4/4/2019');
                let cancelRecord: HTMLElement = document.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
                triggerMouseEvent(cancelRecord, 'click');
            }
        });
        it('Schedule validation- endDate', () => {
            ganttObj.dataBind();
            let ED: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'EndDate')).ej2_instances[0];
            ED.value = new Date('04/09/2019');
            ED.dataBind();
            let SD: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'StartDate')).ej2_instances[0];
            expect(ganttObj.getFormatedDate(SD.value, 'M/d/yyyy')).toBe('4/4/2019');
            let textObj: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'Duration')).ej2_instances[0];
            expect(textObj.value).toBe('3 days');
            let cancelRecord: HTMLElement = document.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
            triggerMouseEvent(cancelRecord, 'click');
        });
        it('Schedule validation- startDate', () => {
            ganttObj.dataBind();
            let SD: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'StartDate')).ej2_instances[0];
            SD.value = new Date('04/09/2019');
            SD.dataBind();
            let ED: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'EndDate')).ej2_instances[0];
            expect(ganttObj.getFormatedDate(ED.value, 'M/d/yyyy')).toBe('4/9/2019');
            let textObj: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'Duration')).ej2_instances[0];
            expect(textObj.value).toBe('0 days');
            let cancelRecord: HTMLElement = document.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
            triggerMouseEvent(cancelRecord, 'click');
        });
        it('Record update with duration', () => {
            ganttObj.dataBind();
            let durationField: any = document.querySelector('#' + ganttObj.element.id + 'Duration') as HTMLInputElement;
            if (durationField) {
                let textObj: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'Duration')).ej2_instances[0];
                textObj.value = '5 days';
                textObj.dataBind();
                let SD: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'StartDate')).ej2_instances[0];
                expect(ganttObj.getFormatedDate(SD.value, 'M/d/yyyy')).toBe('3/29/2019');
                let ED: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'EndDate')).ej2_instances[0];
                expect(ganttObj.getFormatedDate(ED.value, 'M/d/yyyy')).toBe('4/4/2019');
                let saveRecord: HTMLElement = document.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
                triggerMouseEvent(saveRecord, 'click');
            }
        });
        // it('Unschedule validation- StartDate', () => {
        //     ganttObj.dataBind();
        //     let SD: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'StartDate')).ej2_instances[0];
        //     SD.value = null;
        //     SD.dataBind();
        //     let rowData: IGanttData = getValue('rowData', ganttObj.editModule.dialogModule);
        //     let validEndDate = rowData.ganttProperties.endDate;
        //     let ED: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'EndDate')).ej2_instances[0];
        //     expect(ED.value).toEqual(validEndDate);
        //     let textObj: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'Duration')).ej2_instances[0];
        //     expect(textObj.value).toBe('');
        //     let cancelRecord: HTMLElement = ganttObj.element.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
        //     triggerMouseEvent(cancelRecord, 'click');
        // });
        // it('Unschedule validation- endDate', () => {
        //     ganttObj.dataBind();
        //     let ED: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'EndDate')).ej2_instances[0];
        //     ED.value = null;
        //     ED.dataBind();
        //     let SD: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'StartDate')).ej2_instances[0];
        //     expect(ganttObj.getFormatedDate(SD.value, 'M/d/yyyy')).toBe('4/4/2019');
        //     let textObj: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'Duration')).ej2_instances[0];
        //     expect(textObj.value).toBe('');
        //     let cancelRecord: HTMLElement = ganttObj.element.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
        //     triggerMouseEvent(cancelRecord, 'click');
        // });
        it('Unschedule validation- Duration', () => {
            ganttObj.dataBind();
            let durationField: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'Duration')).ej2_instances[0];
            durationField.value = null;
            durationField.dataBind();
            let SD: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'StartDate')).ej2_instances[0];
            expect(ganttObj.getFormatedDate(SD.value, 'M/d/yyyy')).toBe('4/4/2019');
            let ED: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'EndDate')).ej2_instances[0];
            expect(ED.value).toBe(null);
            let cancelRecord: HTMLElement = document.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
            triggerMouseEvent(cancelRecord, 'click');
        });
        it('Unschedule to schedule- StartDate', () => {
            ganttObj.dataBind();
            let cancelRecord: HTMLElement = document.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
            triggerMouseEvent(cancelRecord, 'click');
            ganttObj.openEditDialog(5);
            let ED: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'EndDate')).ej2_instances[0];
            ED.value = new Date('04/05/2019');
            ED.dataBind();
            let durationField: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'Duration')).ej2_instances[0];
            expect(durationField.value).toBe('4 days');
            let cancel: HTMLElement = document.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
            triggerMouseEvent(cancel, 'click');
        });
        it('Unschedule to schedule- EndDate', () => {
            ganttObj.dataBind();
            let cancelRecord: HTMLElement = document.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
            triggerMouseEvent(cancelRecord, 'click');
            ganttObj.openEditDialog(6);
            let durationField: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'Duration')).ej2_instances[0];
            durationField.value = '3 days';
            durationField.dataBind();
            let SD: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'StartDate')).ej2_instances[0];
            expect(ganttObj.getFormatedDate(SD.value, 'M/d/yyyy')).toBe('3/29/2019');
            let cancel: HTMLElement = document.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
            triggerMouseEvent(cancel, 'click');
        });
        it('Unschedule to schedule- Duration', () => {
            ganttObj.dataBind();
            let cancelRecord: HTMLElement = document.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
            triggerMouseEvent(cancelRecord, 'click');
            ganttObj.openEditDialog(7);
            let SD: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'StartDate')).ej2_instances[0];
            SD.value = new Date('04/02/2019');
            SD.dataBind();
            let ED: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'EndDate')).ej2_instances[0];
            expect(ganttObj.getFormatedDate(ED.value, 'M/d/yyyy')).toBe('4/8/2019');
            let cancel: HTMLElement = document.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
            triggerMouseEvent(cancel, 'click');
        });
        it('Unschedule duration validation', () => {
            ganttObj.dataBind();
            let cancelRecord: HTMLElement = document.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
            triggerMouseEvent(cancelRecord, 'click');
            ganttObj.openEditDialog(7);
            let ED: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'EndDate')).ej2_instances[0];
            ED.value = new Date('04/08/2019');
            ED.dataBind();
            let SD: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'StartDate')).ej2_instances[0];
            expect(ganttObj.getFormatedDate(SD.value, 'M/d/yyyy')).toBe('4/2/2019');
            let cancel: HTMLElement = document.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
            triggerMouseEvent(cancel, 'click');
        });
        it('Schedule validation- Null values', () => {
            ganttObj.dataBind();
            let cancelRecord: HTMLElement = document.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
            triggerMouseEvent(cancelRecord, 'click');
            ganttObj.dataSource[1].StartDate = null;
            ganttObj.dataSource[1].EndDate = null;
            ganttObj.dataSource[1].Duration = null;
            ganttObj.isAdaptive = true;
            ganttObj.selectionSettings.mode = 'Both';
            ganttObj.dataBind();
            let element: HTMLElement = ganttObj.element.querySelector('#' + ganttObj.element.id + 'GanttTaskTableBody > tr.gridrowtaskIdlevel0:nth-Child(5) > td > div.e-left-label-container');
            triggerMouseEvent(element, 'dblclick');
            let SD: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'StartDate')).ej2_instances[0];
            SD.value = new Date('04/09/2019');
            SD.dataBind();
            let ED: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'EndDate')).ej2_instances[0];
            expect(ED.value).toBe(null);
            let textObj: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'Duration')).ej2_instances[0];
            expect(textObj.value).toBe('');
            let cancel: HTMLElement = document.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
            triggerMouseEvent(cancel, 'click');
        });
        // it('Duration editing without resource unit and work mapping', () => {
        //     ganttObj.actionBegin = function (args: any): void {
        //         if (args.requestType === "beforeOpenEdiaDialog") {
        //             args.dialogModel.animationSettings = { 'effect': 'none' };
        //         }
        //     };
        //     ganttObj.actionComplete = (args: any): void => {
        //         if (args.requestType === 'save') {
        //             //Checking work values of task which have resource after duration editing
        //             expect(ganttObj.currentViewData[2].ganttProperties.resourceNames).toBe("Resource 3,Resource 1");
        //             expect(ganttObj.currentViewData[2].ganttProperties.resourceInfo[0]['unit']).toBe(100);
        //             expect(ganttObj.currentViewData[2].ganttProperties.resourceInfo[1]['unit']).toBe(100);
        //             expect(ganttObj.currentViewData[2].ganttProperties.work).toBe(80);
        //             expect(ganttObj.currentViewData[2].ganttProperties.duration).toBe(5);
        //         }
        //     };
        //     ganttObj.dataBind();
        //     let cancelRecord: HTMLElement = ganttObj.element.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
        //     triggerMouseEvent(cancelRecord, 'click');
        //     ganttObj.openEditDialog(3);
        //     //Checking work values of task which have resource before duration editing
        //     expect(ganttObj.currentViewData[2].ganttProperties.resourceNames).toBe("Resource 3,Resource 1");
        //     expect(ganttObj.currentViewData[2].ganttProperties.resourceInfo[0]['unit']).toBe(100);
        //     expect(ganttObj.currentViewData[2].ganttProperties.resourceInfo[1]['unit']).toBe(100);
        //     expect(ganttObj.currentViewData[2].ganttProperties.work).toBe(48);
        //     expect(ganttObj.currentViewData[2].ganttProperties.duration).toBe(3);
        //     expect(ganttObj.currentViewData[2].ganttProperties.workUnit).toBe('hour');
        //     expect(ganttObj.currentViewData[2].ganttProperties.taskType).toBe('FixedUnit');
        //     let durationField: any = ganttObj.element.querySelector('#' + ganttObj.element.id + 'Duration') as HTMLInputElement;
        //     if (durationField) {
        //         let textObj: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'Duration')).ej2_instances[0];
        //         textObj.value = '5 days';
        //         textObj.dataBind();
        //         let saveRecord: HTMLElement = ganttObj.element.querySelector('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control.e-btn.e-lib.e-primary.e-flat') as HTMLElement;
        //         triggerMouseEvent(saveRecord, 'click');
        //     }
        // });
        // it('Edit record by toolbar', () => {
        //     ganttObj.dataBind();
        //     let cancelRecord: HTMLElement = ganttObj.element.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
        //     triggerMouseEvent(cancelRecord, 'click');
        //     ganttObj.dataSource[1].StartDate = null;
        //     ganttObj.dataSource[1].EndDate = null;
        //     ganttObj.dataSource[1].Duration = null;
        //     ganttObj.selectionSettings.mode = 'Both';
        //     ganttObj.dataBind();
        //     let element: HTMLElement = ganttObj.element.querySelector('#' + ganttObj.element.id + 'GanttTaskTableBody > tr.gridrowtaskIdlevel0:nth-Child(5) > td > div.e-left-label-container');
        //     triggerMouseEvent(element, 'click');
        //     let edit: HTMLElement = ganttObj.element.querySelector('#' + ganttObj.element.id + '_Gantt_Toolbar > div > div:nth-Child(2) > button');
        //     triggerMouseEvent(edit, 'click');
        //     let SD: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'StartDate')).ej2_instances[0];
        //     SD.value = new Date('04/09/2019');
        //     SD.dataBind();
        //     let ED: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'EndDate')).ej2_instances[0];
        //     expect(ED.value).toBe(null);
        //     let textObj: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'Duration')).ej2_instances[0];
        //     expect(textObj.value).toBe('');
        //     let cancel1: HTMLElement = ganttObj.element.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
        //     triggerMouseEvent(cancel1, 'click');
        //     ganttObj.openEditDialog(1);
        //     let cancel2: HTMLElement = ganttObj.element.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
        //     triggerMouseEvent(cancel2, 'click');
        // });
    });
    describe('Dialog editing with work mapping - General Tab', () => {
        let ganttObj: Gantt;
 
        beforeAll((done: Function) => {
            ganttObj = createGantt({
                dataSource: dialogEditData,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    notes: 'Notes',
                    baselineStartDate: 'BaselineStartDate',
                    baselineEndDate: 'BaselineEndDate',
                    resourceInfo: 'Resource',
                    dependency: 'Predecessor',
                    work: 'EstimatedWork',
                    child: 'subtasks'
                },
                resourceIDMapping: 'resourceId',
                resourceNameMapping: 'resourceName',
                resources: resourcesData,
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                renderBaseline: true,
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    mode: 'Dialog'
                },
                editDialogFields: [
                    { type: 'General' },
                    { type: 'Dependency' },
                    { type: 'Resources' },
                    { type: 'Notes' },
                    { type: 'Custom' }
                ],
                addDialogFields: [
                    { type: 'General' },
                    { type: 'Resources' },
                    { type: 'Dependency' }
                ],
                toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel'],
                allowUnscheduledTasks: true
            }, done);
        });
        afterAll(() => {
            if (ganttObj) {
                destroyGantt(ganttObj);
            }
        });
        beforeEach((done) => {
            setTimeout(done, 1000);
            ganttObj.openEditDialog(3);
        });
        it('Work editing', () => {
            ganttObj.dataBind();
            let workField: any = ganttObj.element.querySelector('#' + ganttObj.element.id + 'EstimatedWork') as HTMLInputElement;
            if (workField) {
                let inputObj: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'EstimatedWork')).ej2_instances[0];
                inputObj.value = 40;
                let durationFocus: any = document.querySelector('#' + ganttObj.element.id + 'Duration') as HTMLInputElement;
                triggerMouseEvent(durationFocus, 'click');
                let cancelRecord: HTMLElement = document.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
                triggerMouseEvent(cancelRecord, 'click');
            }
        });
        //  it('Task type editing', () => {
        //      ganttObj.dataBind();
        //      let taskType: any = ganttObj.element.querySelector('#' + ganttObj.element.id + 'taskType') as HTMLInputElement;
        //      if (taskType) {
        //          let inputObj: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'taskType')).ej2_instances[0];
        //          inputObj.value = 'FixedDuration';
        //          inputObj.dataBind();
        //          let workInputObj: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'EstimatedWork')).ej2_instances[0];
        //          workInputObj.value = 40;
        //          let duration: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'Duration')).ej2_instances[0];
        //          expect(duration.value).toBe('3 days');
        //          let cancelRecord: HTMLElement = ganttObj.element.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
        //          triggerMouseEvent(cancelRecord, 'click');
        //      }
        //  });
     });
     describe('Dialog editing - predecessor Tab', () => {
         let ganttObj: Gantt;
 
         beforeAll((done: Function) => {
             ganttObj = createGantt(ganttModel, done);
         });
        afterAll(() => {
            if (ganttObj) {
                destroyGantt(ganttObj);
            }
        });
        beforeEach((done: Function) => {
            setTimeout(done, 1000);
            ganttObj.openEditDialog(4);
            let tab: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + '_Tab')).ej2_instances[0];
            tab.selectedItem = 1;
            tab.dataBind();
        });
        it('Dependency tab editing', () => {
            ganttObj.actionComplete = (args: any): void => {
                if (args.requestType === 'save') {
                    expect(ganttObj.currentViewData[3].ganttProperties.predecessorsName).toBe("3FS");
                }
            };
            let row: HTMLElement = document.querySelector('#' + ganttObj.element.id + 'DependencyTabContainer_content_table > tbody > tr > td:nth-child(2)') as HTMLElement;
            if (row) {
                triggerMouseEvent(row, 'dblclick');
                let input: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'DependencyTabContainername')).ej2_instances[0];
                input.dataSource = input.dataSource.dataSource.json;
                input.value = "3-Child Task 2";
                input.dataBind();
                let toolbar: HTMLElement = document.querySelector('#' + ganttObj.element.id + 'DependencyTabContainer_toolbarItems') as HTMLElement;
                triggerMouseEvent(toolbar, 'click');
                let saveRecord: HTMLElement = document.querySelector('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control.e-btn.e-lib.e-primary.e-flat') as HTMLElement;
                triggerMouseEvent(saveRecord, 'click');
            }
        });
    });
    describe('Dialog editing - Resource Tab', () => {
        let ganttObj: Gantt;
 
        beforeAll((done: Function) => {
            ganttObj = createGantt(ganttModel, done);
        });
        afterAll(() => {
            if (ganttObj) {
                destroyGantt(ganttObj);
            }
        });
        beforeEach((done) => {
            setTimeout(done, 1000);
            ganttObj.openEditDialog(2);
            let tab: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + '_Tab')).ej2_instances[0];
            tab.selectedItem = 2;
        });
        it('Resource tab editing', () => {
            ganttObj.actionBegin = function (args: any): void {
                if (args.requestType === "beforeOpenEditDialog") {
                    args.dialogModel.animationSettings = { 'effect': 'none' };
                }
            };
            ganttObj.actionComplete = (args: any): void => {
                if (args.requestType === 'save') {
                    expect(ganttObj.currentViewData[1].ganttProperties.resourceNames).toBe("Resource 1");
                    // without unit and work mapping
                    expect(ganttObj.currentViewData[1].ganttProperties.resourceInfo[0]['unit']).toBe(100);
                    //expect(ganttObj.currentViewData[1].ganttProperties.work).toBe(24);
                    expect(ganttObj.currentViewData[1].ganttProperties.duration).toBe(3);
                    expect(ganttObj.currentViewData[1].ganttProperties.workUnit).toBe('hour');
                    expect(ganttObj.currentViewData[1].ganttProperties.taskType).toBe('FixedUnit');
                }
            };
            ganttObj.dataBind();
            expect(ganttObj.currentViewData[1].ganttProperties.duration).toBe(3);
            let checkbox: HTMLElement = document.querySelector('#' + ganttObj.element.id + 'ResourcesTabContainer_gridcontrol_content_table > tbody > tr:nth-child(1) > td.e-rowcell.e-gridchkbox > div > span.e-frame.e-icons.e-uncheck') as HTMLElement;
            if (checkbox) {
                triggerMouseEvent(checkbox, 'click');
                let saveRecord: HTMLElement = document.querySelector('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control.e-btn.e-lib.e-primary.e-flat') as HTMLElement;
                triggerMouseEvent(saveRecord, 'click');
            }
        });
        it('Resource unit editing', () => {
            //Task which have resource
            expect(ganttObj.currentViewData[1].ganttProperties.resourceNames).toBe("Resource 1");
            expect(ganttObj.currentViewData[1].ganttProperties.resourceInfo[0]['unit']).toBe(100);
            //expect(ganttObj.currentViewData[1].ganttProperties.work).toBe(24);
            expect(ganttObj.currentViewData[1].ganttProperties.duration).toBe(3);
            expect(ganttObj.getFormatedDate(ganttObj.currentViewData[1].ganttProperties.endDate, 'M/dd/yyyy')).toBe('4/04/2019');
            ganttObj.actionBegin = function (args: any): void {
                if (args.requestType === "beforeOpenEditDialog") {
                    args.dialogModel.animationSettings = { 'effect': 'none' };
                }
            };
            ganttObj.actionComplete = (args: any): void => {
                if (args.requestType === 'save') {
                    expect(ganttObj.currentViewData[1].ganttProperties.resourceNames).toBe("Resource 1[50%]");
                    // without unit and work mapping
                    expect(ganttObj.currentViewData[1].ganttProperties.resourceInfo[0]['unit']).toBe(50);
                    //expect(ganttObj.currentViewData[1].ganttProperties.work).toBe(24);
                    // expect(ganttObj.currentViewData[1].ganttProperties.duration).toBe(6);
                    // expect(ganttObj.getFormatedDate(ganttObj.currentViewData[1].ganttProperties.endDate, 'M/dd/yyyy')).toBe('4/07/2019');
                    expect(ganttObj.currentViewData[1].ganttProperties.workUnit).toBe('hour');
                    expect(ganttObj.currentViewData[1].ganttProperties.taskType).toBe('FixedUnit');
                }
            };
            ganttObj.dataBind();
            let checkbox: HTMLElement = document.querySelector('#' + ganttObj.element.id + 'ResourcesTabContainer_gridcontrol_content_table > tbody > tr:nth-child(1) > td.e-rowcell.e-gridchkbox > div > span.e-frame.e-icons.e-uncheck') as HTMLElement;
            triggerMouseEvent(checkbox, 'click');
            let unit: HTMLElement = document.querySelector('#' + ganttObj.element.id + 'ResourcesTabContainer_gridcontrol_content_table > tbody > tr:nth-child(1) > td:nth-child(4)') as HTMLElement;
            if (unit) {
                triggerMouseEvent(unit, 'dblclick');
                let input: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'ResourcesTabContainer_gridcontrolunit')).ej2_instances[0];
                input.value = 50;
                input.dataBind();
                let saveRecord: HTMLElement = document.querySelector('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control.e-btn.e-lib.e-primary.e-flat') as HTMLElement;
                triggerMouseEvent(saveRecord, 'click');
            }
        });
    });
    describe('Dialog editing - Resource Tab with unit mapping', () => {
        let ganttObj: Gantt;
 
        beforeAll((done: Function) => {
            ganttObj = createGantt({
                dataSource: dialogEditData,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    notes: 'Notes',
                    baselineStartDate: 'BaselineStartDate',
                    baselineEndDate: 'BaselineEndDate',
                    resourceInfo: 'Resource',
                    dependency: 'Predecessor',
                    child: 'subtasks'
                },
                resourceFields: {
                    id: 'resourceId',
                    name: 'resourceName',
                    unit: 'resourceUnit'
                },
                resources: resources,
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                renderBaseline: true,
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    mode: 'Dialog'
                },
                editDialogFields: [
                    { type: 'General' },
                    { type: 'Dependency' },
                    { type: 'Resources' },
                    { type: 'Notes' },
                    { type: 'Custom' }
                ],
                addDialogFields: [
                    { type: 'General' },
                    { type: 'Resources' },
                    { type: 'Dependency' }
                ],
                toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel'],
                allowUnscheduledTasks: true
            }, done);
        });
        afterAll(() => {
            if (ganttObj) {
                destroyGantt(ganttObj);
            }
        });
        beforeEach((done) => {
            setTimeout(done, 1000);
            ganttObj.openEditDialog(2);
            let tab: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + '_Tab')).ej2_instances[0];
            tab.selectedItem = 2;
        });
        it('Resource unit initial with unit mapping', () => {
            ganttObj.actionBegin = function (args: any): void {
                if (args.requestType === "beforeOpenEditDialog") {
                    args.dialogModel.animationSettings = { 'effect': 'none' };
                }
            };
            ganttObj.actionComplete = (args: any): void => {
                if (args.requestType === 'save') {
                    expect(ganttObj.currentViewData[1].ganttProperties.resourceNames).toBe("Resource 2[80%]");
                    // with unit and without work mapping
                    expect(ganttObj.currentViewData[1].ganttProperties.resourceInfo[0]['resourceUnit']).toBe(80);
                    expect(ganttObj.currentViewData[1].ganttProperties.work).toBe(19.2);
                    expect(ganttObj.currentViewData[1].ganttProperties.workUnit).toBe('hour');
                    expect(ganttObj.currentViewData[1].ganttProperties.taskType).toBe('FixedUnit');
                }
            };
            ganttObj.dataBind();
            let checkbox: HTMLElement = document.querySelector('#' + ganttObj.element.id + 'ResourcesTabContainer_gridcontrol_content_table > tbody > tr:nth-child(2) > td.e-rowcell.e-gridchkbox > div > span.e-frame.e-icons.e-uncheck') as HTMLElement;
            if (checkbox) {
                triggerMouseEvent(checkbox, 'click');
                let saveRecord: HTMLElement = document.querySelector('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control.e-btn.e-lib.e-primary.e-flat') as HTMLElement;
                triggerMouseEvent(saveRecord, 'click');
            }
        });
        it('Resource unit editing with unit mapping', () => {
            ganttObj.actionBegin = function (args: any): void {
                if (args.requestType === "beforeOpenEditDialog") {
                    args.dialogModel.animationSettings = { 'effect': 'none' };
                }
            };
            ganttObj.actionComplete = (args: any): void => {
                if (args.requestType === 'save') {
                    expect(ganttObj.currentViewData[1].ganttProperties.resourceNames).toBe("Resource 2[50%]");
                    // without unit and work mapping
                    expect(ganttObj.currentViewData[1].ganttProperties.resourceInfo[0]['resourceUnit']).toBe(50);
                    // expect(ganttObj.currentViewData[1].ganttProperties.work).toBe(24);
                    expect(ganttObj.currentViewData[1].ganttProperties.workUnit).toBe('hour');
                    expect(ganttObj.currentViewData[1].ganttProperties.taskType).toBe('FixedUnit');
                }
            };
            ganttObj.dataBind();
            let checkbox: HTMLElement = document.querySelector('#' + ganttObj.element.id + 'ResourcesTabContainer_gridcontrol_content_table > tbody > tr:nth-child(2) > td.e-rowcell.e-gridchkbox > div > span.e-frame.e-icons.e-uncheck') as HTMLElement;
            triggerMouseEvent(checkbox, 'click');
            let unit: HTMLElement = document.querySelector('#' + ganttObj.element.id + 'ResourcesTabContainer_gridcontrol_content_table > tbody > tr:nth-child(2) > td:nth-child(4)') as HTMLElement;
            if (unit) {
                triggerMouseEvent(unit, 'dblclick');
                let input: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'ResourcesTabContainer_gridcontrolresourceUnit')).ej2_instances[0];
                input.value = 50;
                input.dataBind();
                let saveRecord: HTMLElement = document.querySelector('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control.e-btn.e-lib.e-primary.e-flat') as HTMLElement;
                triggerMouseEvent(saveRecord, 'click');
            }
        });
    });
    describe('Custom tab', () => {
        let ganttObj: Gantt;
        beforeAll((done: Function) => {
            ganttObj = createGantt(ganttModel, done);
        });
        afterAll(() => {
            if (ganttObj) {
                destroyGantt(ganttObj);
            }
        });
        beforeEach((done) => {
            setTimeout(done, 1000);
            ganttObj.openEditDialog(4);
            let tab: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + '_Tab')).ej2_instances[0];
            tab.selectedItem = 4;
        });
        it('Custom Editor for custom column', () => {
            let customColumn: any = document.querySelector('#' + ganttObj.element.id + 'Customcol4') as HTMLInputElement;
            if (customColumn) {
                triggerMouseEvent(customColumn, 'click');
                let customValue: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'Customcol4')).ej2_instances[0];
                customValue.value = 'Tracker 4';
                customValue.dataBind();
                let saveRecord: HTMLElement = document.querySelector('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control.e-btn.e-lib.e-primary.e-flat') as HTMLElement;
                triggerMouseEvent(saveRecord, 'click');
                expect(getValue('Customcol4', ganttObj.flatData[3])).toBe('Tracker 4');
            }
        });
    });
    describe('Add Dialog', () => {
        let ganttObj: Gantt;
        beforeAll((done: Function) => {
            ganttObj = createGantt(ganttModel, done);
        });
        afterAll(() => {
            if (ganttObj) {
                destroyGantt(ganttObj);
            }
        });
        beforeEach(() => {
            let add: HTMLElement = ganttObj.element.querySelector('#' + ganttObj.element.id + '_add') as HTMLElement;
            triggerMouseEvent(add, 'click');
        });
        it('Add new record', () => {
            ganttObj.actionComplete = (args: any): void => {
                if (args.action === 'add') {
                    expect(ganttObj.currentViewData.length).toEqual(8);
                }
            };
            ganttObj.dataBind();
            let saveRecord: HTMLElement = document.querySelector('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control.e-btn.e-lib.e-primary.e-flat') as HTMLElement;
            triggerMouseEvent(saveRecord, 'click');
        });
        it('Add new record beyond project dates', () => {
            ganttObj.actionComplete = (args: any): void => {
                if (args.action === 'TimescaleUpdate') {
                    expect(ganttObj.getFormatedDate(ganttObj.cloneProjectStartDate, 'M/d/yyyy')).toEqual('3/18/2019');
                }
            };
            ganttObj.dataBind();
            let SD: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'StartDate')).ej2_instances[0];
            SD.value = new Date('03/20/2019');
            SD.dataBind();
            let saveRecord: HTMLElement = document.querySelector('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control.e-btn.e-lib.e-primary.e-flat') as HTMLElement;
            triggerMouseEvent(saveRecord, 'click');
        });
    });
    describe('Dialog tab', () => {
        let ganttObj: Gantt;
        beforeAll((done: Function) => {
            ganttObj = createGantt(ganttModel, done);
        });
        afterAll(() => {
            if (ganttObj) {
                destroyGantt(ganttObj);
            }
        });
        beforeEach(() => {
            ganttObj.openEditDialog(4);
        });
        it('Dynamic property change', () => {
            ganttObj.editSettings.mode = "Dialog";
            ganttObj.dataBind();
            let cancelRecord1: HTMLElement = document.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
            triggerMouseEvent(cancelRecord1, 'click');
            let taskName: HTMLElement = ganttObj.element.querySelector('#treeGrid' + ganttObj.element.id + '_gridcontrol_content_table > tbody > tr:nth-child(2) > td:nth-child(2)') as HTMLElement;
            triggerMouseEvent(taskName, 'dblclick');
            let name: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'TaskName')).ej2_instances[0];
            name.value = "updated";
            name.dataBind();
            let cancelRecord2: HTMLElement = document.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[1] as HTMLElement;
            triggerMouseEvent(cancelRecord2, 'click');
        });
        it('Click event', () => {
            ganttObj.isAdaptive = true;
            ganttObj.dataBind();
            let tab: HTMLElement = document.querySelector('#' + ganttObj.element.id + '_dialog > div.e-dlg-content > div > div > div > div:nth-Child(3)') as HTMLElement;
            triggerMouseEvent(tab, 'click');
            let saveRecord: HTMLElement = document.querySelector('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control.e-btn.e-lib.e-primary.e-flat') as HTMLElement;
            triggerMouseEvent(saveRecord, 'click');
            ganttObj.refresh();
        });
        it('Restrict dialog rendering when allowediting is set as false', () => {
            ganttObj.editSettings.allowEditing = false;
            ganttObj.dataBind();
            let row: HTMLElement = ganttObj.element.querySelector('#' + ganttObj.element.id + 'GanttTaskTableBody > tr:nth-child(3) > td') as HTMLElement;
            triggerMouseEvent(row, 'dblclick');
            expect(document.getElementById('ganttContainer_dialog')).toEqual(null);
        });
    });
    describe('Schedule mode', () => {
        let ganttObj: Gantt;
 
        beforeAll((done: Function) => {
            ganttObj = createGantt({
                dataSource: scheduleModeData,
                allowSorting: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    endDate: 'EndDate',
                    child: 'Children',
                    manual: 'isManual',
                },
                taskMode: 'Custom',
                splitterSettings: {
                    columnIndex: 8
                },
                editSettings: {
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel'],
            }, done);
        });
        afterAll(() => {
            if (ganttObj) {
                destroyGantt(ganttObj);
            }
        });
        beforeEach((done: Function) => {
            setTimeout(done, 1000);
            // ganttObj.openEditDialog(3);
        });
        it('Changing taskmode of a task to manual', (done: Function) => {
            expect(ganttObj.currentViewData[1].ganttProperties.isAutoSchedule).toBe(true);
            ganttObj.openEditDialog(2);
            let taskMode: any = document.querySelector('#' + ganttObj.element.id + 'isManual') as HTMLInputElement;
            if (taskMode) {
                let inputObj: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'isManual')).ej2_instances[0];
                inputObj.value = true;
                inputObj.dataBind();
                let saveRecord: HTMLElement = document.querySelector('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control.e-btn.e-lib.e-primary.e-flat') as HTMLElement;
                triggerMouseEvent(saveRecord, 'click');
                setTimeout(done, 500);
            }
            expect(ganttObj.currentViewData[1].ganttProperties.isAutoSchedule).toBe(false);
        });
        it('Changing taskmode of a task to auto', (done: Function) => {
            let startDate: Date = ganttObj.currentViewData[2].ganttProperties.startDate;
            expect(ganttObj.getFormatedDate(startDate, 'M/d/yyyy')).toBe('2/26/2017');
            ganttObj.openEditDialog(3);
            let taskMode: any = document.querySelector('#' + ganttObj.element.id + 'isManual') as HTMLInputElement;
            if (taskMode) {
                let inputObj: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'isManual')).ej2_instances[0];
                inputObj.value = false;
                inputObj.dataBind();
                let saveRecord: HTMLElement = document.querySelector('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control.e-btn.e-lib.e-primary.e-flat') as HTMLElement;
                triggerMouseEvent(saveRecord, 'click');
                setTimeout(done, 500);
            }
            expect(ganttObj.getFormatedDate(ganttObj.currentViewData[2].ganttProperties.startDate, 'M/d/yyyy')).toBe('2/27/2017');
        });
    });
    describe('indent-outdent', () => {
        let ganttObj: Gantt;
 
        beforeAll((done: Function) => {
            ganttObj = createGantt({
                dataSource: indentOutdentData,
                allowSorting: true,
                allowSelection: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    endDate: 'EndDate',
                    child: 'subtasks',
                   
                },
                editSettings: {
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'Indent', 'Outdent'],
            }, done);
        });
        afterAll(() => {
            if (ganttObj) {
                destroyGantt(ganttObj);
            }
        });
        beforeEach((done: Function) => {
            setTimeout(done, 1000);
        });
        it('Indenting a record', (done: Function) => {
            expect(ganttObj.currentViewData[2].level).toBe(1);
            ganttObj.selectRow(2, false);
            setTimeout(done, 1000);
            ganttObj.indent();
            setTimeout(done, 10000);
            expect(ganttObj.currentViewData[2].level).toBe(2);
        });
        it('Otdenting a record', (done: Function) => {
            expect(ganttObj.currentViewData[2].level).toBe(2);
            ganttObj.selectRow(2, false);
            setTimeout(done, 1000);
            ganttObj.outdent();
            setTimeout(done, 10000);
            expect(ganttObj.currentViewData[2].level).toBe(1);
        });
    });
    describe('CR-issues', function () {
        let ganttObj: Gantt;
        beforeAll(function (done) {
            ganttObj = createGantt({
                dataSource: dialogEditData,
                allowSorting: true,
                allowSelection: true,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    endDate: 'EndDate',
                    child: 'subtasks',
                    resourceInfo: 'Resource',
                },
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'Indent', 'Outdent'],
            }, done);
        });
        afterAll(function () {
            if (ganttObj) {
                destroyGantt(ganttObj);
            }
        });
        beforeEach(function (done) {
            setTimeout(done, 1000);
        });
        it('EJ2-48224 - Schedule validation- endDate', () => {
            ganttObj.openEditDialog(4);
            ganttObj.dataBind();
            let ED: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'EndDate')).ej2_instances[0];
            ED.value = new Date('04/09/2019');
            ED.dataBind();
            let saveRecord: HTMLElement = document.querySelector('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control.e-btn.e-lib.e-primary.e-flat') as HTMLElement;
            triggerMouseEvent(saveRecord, 'click');
            expect(ganttObj.flatData[3].ganttProperties.duration).toBe(6);
            ganttObj.openEditDialog(4);
            let ED1: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'EndDate')).ej2_instances[0];
            ED1.value = new Date('04/12/2019');
            ED1.dataBind();
            let saveRecord1: HTMLElement = document.querySelector('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control.e-btn.e-lib.e-primary.e-flat') as HTMLElement;
            triggerMouseEvent(saveRecord1 , 'click');
            expect(ganttObj.flatData[3].ganttProperties.duration).toBe(9);
        });
		it('EJ2-48816 - Adding new task with empty string', () => {
            ganttObj.actionComplete = (args: any): void => {
                if (args.requestType === 'save') {
                    expect(ganttObj.flatData[0].ganttProperties.taskName).toBe('');
                }
            };
            ganttObj.openAddDialog();
            ganttObj.dataBind();
            let name: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'TaskName')).ej2_instances[0];
            name.value = '';
            name.dataBind();
            let saveRecord: HTMLElement = document.querySelector('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control.e-btn.e-lib.e-primary.e-flat') as HTMLElement;
            triggerMouseEvent(saveRecord, 'click');
        });
    });
    
    describe('CR-issues', function () {
        let ganttObj: Gantt;
        beforeAll(function (done) {
            ganttObj = createGantt({
                dataSource: [
                    {
                        TaskID: 1,
                        TaskName: "Project Initiation",
                        StartDate: new Date("04/26/2021"),
                        EndDate: new Date("04/30/2021")
                    },
                    {
                        TaskID: 2,
                        TaskName: "Project Initiation1",
                        StartDate: new Date("04/26/2021"),
                        EndDate: new Date("04/30/2021")
                    }
                ],
                projectStartDate: new Date("04/25/2021"),
                projectEndDate: new Date("07/28/2021"),
                dateFormat: "MMM dd, y",
 
                taskFields: {
                    id: "TaskID",
                    name: "TaskName",
                    startDate: "StartDate",
                    endDate: "EndDate",
                    duration: "Duration",
                    progress: "Progress",
                    dependency: "Predecessor",
                    child: "subtasks",
                    notes: "info",
                    resourceInfo: "resources"
                },
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                toolbar: [
                    "Add",
                    "Edit",
                    "Update",
                    "Delete",
                    "Cancel",
                    "ExpandAll",
                    "CollapseAll",
                    "Indent",
                    "Outdent"
                ],
                allowSelection: true,
                gridLines: "Both",
                height: "450px",
                treeColumnIndex: 1
            }, done);
        });
        afterAll(function () {
            if (ganttObj) {
                destroyGantt(ganttObj);
            }
        });
        beforeEach((done: Function) => {
            setTimeout(done, 1000);
        });
        it('dynamically updating holidays', () => {
            ganttObj.dataBind();
            ganttObj.holidays = [
                {
                    from: "04/26/2021",
                    to: "04/27/2021",
                    label: "Test"
                }
            ];
             setTimeout(function () {
                expect(ganttObj.currentViewData[0]['StartDate'].getDate()).toBe(28);
                expect(ganttObj.currentViewData[0]['EndDate'].getDate()).toBe(4);
            }, 100);
        });
    });
     describe('MT-issues', function () {
        let ganttObj: Gantt;
        beforeAll(function (done) {
            ganttObj = createGantt({
                dataSource: projectData1,
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true
                },
                toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'Search'],
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    child: 'subtasks',
                    dependency: 'Predecessor',
                },
                projectStartDate: new Date('02/01/2017'),
                projectEndDate: new Date('12/30/2017'),
                rowHeight: 40,
                taskbarHeight: 30,
                allowSelection: true
            }, done);
        });
        afterAll(function () {
            if (ganttObj) {
                destroyGantt(ganttObj);
            }
        });
        beforeEach((done: Function) => {
            setTimeout(done, 1000);
        });
        it('Selection maintain after adding record', () => {
            ganttObj.selectRow(1);
            let addToolbar: HTMLElement = ganttObj.element.querySelector('#' + ganttObj.element.id + '_add') as HTMLElement;
            triggerMouseEvent(addToolbar, 'click');
            let saveRecord: HTMLElement = document.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[0] as HTMLElement;
            triggerMouseEvent(saveRecord, 'click');
             expect((ganttObj.selectionModule.getSelectedRows().length)).toBe(1);
         });
     });
     describe('Split task', function () {
        let ganttObj: Gantt;
        beforeAll(function (done) {
            ganttObj = createGantt({
                dataSource: splitTasksData,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    dependency: 'Predecessor',
                    child: 'subtasks',
                    durationUnit: 'DurationUnit',
                    segments: 'Segments',
                },
                durationUnit: 'Hour',
                toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'Search'],
                editSettings: {
                  allowAdding: true,
                  allowEditing: true,
                  allowDeleting: true,
                  allowTaskbarEditing: true,
                  showDeleteConfirmDialog: true,
                },
                enableContextMenu: true,
                allowSelection: true,
                height: '450px',
                treeColumnIndex: 1,
                highlightWeekends: true,
                }, done);
        });
        afterAll(function () {
            if (ganttObj) {
                destroyGantt(ganttObj);
            }
        });
        beforeEach((done: Function) => {
            setTimeout(done, 1000);
        });
        it('end date validation when remove all segments', () => {
            expect(ganttObj.element.getElementsByClassName('e-row')[2].children[3].innerHTML).toBe('2/8/2019');
            ganttObj.openEditDialog(3);
            let selectSegment: HTMLElement = document.querySelector('#' + ganttObj.element.id + '_Tab > div.e-tab-header.e-control.e-toolbar.e-lib.e-keyboard > div > div:nth-child(4)') as HTMLElement;
            triggerMouseEvent(selectSegment, 'click');
            let selectRow: HTMLElement = document.querySelector('#' + ganttObj.element.id + 'SegmentsTabContainer_content_table > tbody > tr:nth-child(1)') as HTMLElement;
            triggerMouseEvent(selectRow, 'click');
            let deleteSegment: HTMLElement = document.querySelector('#' + ganttObj.element.id + 'SegmentsTabContainer_delete > span.e-tbar-btn-text') as HTMLElement;
            triggerMouseEvent(deleteSegment, 'click');
            triggerMouseEvent(deleteSegment, 'click');
            triggerMouseEvent(deleteSegment, 'click');
            let saveRecord: HTMLElement = document.querySelector('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control.e-btn.e-lib.e-primary.e-flat') as HTMLElement;
            triggerMouseEvent(saveRecord, 'click');
            expect(ganttObj.element.getElementsByClassName('e-row')[2].children[3].innerHTML).toBe('2/5/2019');

            
        });
    });

 	describe('DataManager data ', () => {
        let ganttObj: Gantt;
        beforeAll((done: Function) => {
            ganttObj = createGantt({
                dataSource: new DataManager(dialogEditData),
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    resourceInfo: 'Resource',
                    dependency: 'Predecessor',
                    child: 'subtasks'
                },
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    mode: 'Dialog'
                },
                toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel'],
            }, done);
        });
        afterAll(() => {
            if (ganttObj) {
                destroyGantt(ganttObj);
            }
        });
        it('Editing with datamanager data', () => {
            ganttObj.openEditDialog(1);
            let name: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'TaskName')).ej2_instances[0];
            name.value = "updated";
            name.dataBind();
            let saveRecord: HTMLElement = document.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[0] as HTMLElement;
            triggerMouseEvent(saveRecord, 'click');
            expect(ganttObj.flatData[0].ganttProperties.taskName).toBe("updated");
        });
        
    });
	 describe('Custom Tab with defaultedit editType', function () {
        let ganttObj: Gantt;
        beforeAll(function (done) {
            ganttObj = createGantt({
                dataSource: dialogEditData,
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    startDate: 'StartDate',
                    endDate: 'EndDate',
                    duration: 'Duration',
                    progress: 'Progress',
                    notes: 'Notes',
                    baselineStartDate: 'BaselineStartDate',
                    baselineEndDate: 'BaselineEndDate',
                    resourceInfo: 'Resource',
                    dependency: 'Predecessor',
                    child: 'subtasks'
                },
                resourceIDMapping: 'resourceId',
                resourceNameMapping: 'resourceName',
                resources: resourcesData,
                projectStartDate: new Date('03/25/2019'),
                projectEndDate: new Date('05/30/2019'),
                renderBaseline: true,
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    mode: 'Dialog'
                },
                editDialogFields: [
                    { type: 'General' },
                    { type: 'Dependency' },
                    { type: 'Resources' },
                    { type: 'Notes' },
                    { type: 'Custom' }
                ],
                addDialogFields: [
                    { type: 'General' },
                    { type: 'Resources' },
                    { type: 'Dependency' }
                ],
                columns: [
                    { field: 'TaskID', width: 60 },
                    { field: 'TaskName', width: 100 },
                    { field: 'StartDate', editType: 'datepickeredit', width: 100 },
                    { field: 'EndDate', editType: 'datepickeredit', width: 100 },
                    { field: 'Duration', width: 100 },
                    { field: 'Predecessor', width: 100 },
                    { field: 'Progress', width: 100 },
                    { field: 'BaselineStartDate', editType: 'datetimepickeredit', width: 100 },
                    { field: 'BaselineEndDate', editType: 'datetimepickeredit', width: 100 },
                    { field: 'Resource', width: 100 },
                    { field: 'Notes', width: 100 },
                    { field: 'Customcolumn', editType: 'defaultedit', headerText: 'Custom Column1', width: 100 }
                ],
                toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel'],
                allowUnscheduledTasks: true,
                }, done);
        });
        afterAll(function () {
            if (ganttObj) {
                destroyGantt(ganttObj);
            }
        });
        beforeEach((done: Function) => {
            setTimeout(done, 1000);
        });
        it('defaultedit type', () => {
            let customColumn: any = document.querySelector('#' + ganttObj.element.id + 'Customcolumn') as HTMLInputElement;
            if (customColumn) {
                triggerMouseEvent(customColumn, 'click');
                let customValue: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'Customcolumn')).ej2_instances[0];
                customValue.value = 'Tracker 4';
                customValue.dataBind();
                let saveRecord: HTMLElement = document.querySelector('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control.e-btn.e-lib.e-primary.e-flat') as HTMLElement;
                triggerMouseEvent(saveRecord, 'click');
                expect(getValue('Customcolumn', ganttObj.flatData[3])).toBe('Tracker 4');
            }

        });
    });
	describe('Localization', function () {
        let ganttObj: Gantt;
        beforeAll(function (done) {
            L10n.load({
                'de-DE': {
                    'gantt': {
                        "emptyRecord": "Gösterilecek kayıt yok",
                        "id": "Id",
                        "name": "Başlık",
                        "duration": "Süre",
                        "progress": "İlerleme",
                        "dependency": "Bağımlılık",
                        "addDialogTitle": "Yeni görev",
                        "editDialogTitle": "Görev Bilgisi",
                        "saveButton": "Kaydet",
                        "add": "",
                        "edit": "",
                        "update": "Güncelleme",
                        "delete": "Sil",
                        "cancel": "İptal",
                    },
                  }
              });
            ganttObj = createGantt({
                dataSource: dialogEditData,
                height: '450px',
                locale: 'de-DE',
                allowSelection: true,
                highlightWeekends: true,
                allowUnscheduledTasks: true,
                enableContextMenu: true,
                editSettings: {
                    allowAdding: true,
                    allowEditing: true,
                    allowDeleting: true,
                    allowTaskbarEditing: true,
                    showDeleteConfirmDialog: true
                },
                toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'ZoomToFit', 'Indent', 'Outdent'],
                taskFields: {
                    id: 'TaskID',
                    name: 'TaskName',
                    duration: 'Duration',
                    progress: 'Progress',
                    dependency: 'Predecessor',
                    child: 'subtasks',
                },
                projectStartDate: new Date('03/28/2019'),
                projectEndDate: new Date('07/06/2019'),
                durationUnit: 'Hour',
                treeColumnIndex: 1,
                }, done);
                });
                afterAll(function () {
                    if (ganttObj) {
                        destroyGantt(ganttObj);
                    }
                });
                beforeEach((done: Function) => {
                    setTimeout(done, 1000);
                });
                it('localization for the word New Task', () => {
                    ganttObj.openAddDialog();
                    let taskname: HTMLElement = document.getElementById(ganttObj.element.id + 'TaskName') as HTMLElement;
                    expect(taskname.getAttribute('value')).toBe("Yeni görev 8");
                });
        });
        describe('Render only segments tab', function () {
            let ganttObj: Gantt;
            beforeAll(function (done) {
                ganttObj = createGantt({
                    dataSource: projectData1,
                    height: '450px',
                    allowSelection: true,
                    highlightWeekends: true,
                    enableContextMenu: true,
                    editSettings: {
                        allowAdding: true,
                        allowEditing: true,
                        allowDeleting: true,
                        allowTaskbarEditing: true,
                        showDeleteConfirmDialog: true
                    },
                    editDialogFields: [
                        { type: 'Segments' }
                    ],
                    toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel', 'ExpandAll', 'CollapseAll', 'ZoomToFit', 'Indent', 'Outdent'],
                    taskFields: {
                        id: 'TaskID',
                        name: 'TaskName',
                        duration: 'Duration',
                        startDate: 'StartDate',
                        progress: 'Progress',
                        dependency: 'Predecessor',
                        child: 'subtasks',
                        segments: 'Segments'
                    },
                    projectStartDate: new Date('03/28/2019'),
                    projectEndDate: new Date('07/06/2019'),
                    treeColumnIndex: 1,
                    }, done);
                });
                afterAll(function () {
                    if (ganttObj) {
                        destroyGantt(ganttObj);
                    }
                });
                beforeEach((done: Function) => {
                    setTimeout(done, 1000);
                });
                it('Render segments tab', () => {
                    ganttObj.actionComplete = (args: any): void => {
                        if (args.requestType === 'save') {
                            expect(args.data.ganttProperties.segments).toBe(null);
                        }
                    };
                    ganttObj.selectRow(2);
                    ganttObj.openEditDialog();
                    let addIcon: HTMLElement = document.getElementById(ganttObj.element.id + 'SegmentsTabContainer' + '_add') as HTMLElement;
                    triggerMouseEvent(addIcon, 'click');
                    let saveRecord: HTMLElement = document.querySelectorAll('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control')[0] as HTMLElement;
                    triggerMouseEvent(saveRecord, 'click');
                });
            });
	    describe('Add Dialog for Bottom position', () => {
                let ganttObj: Gantt;
                beforeAll((done: Function) => {
                    ganttObj = createGantt({
                        dataSource: projectData,
                        allowSorting: true,
                        allowReordering: true,
                        enableContextMenu: true,
                        taskFields: {
                            id: 'TaskID',
                            name: 'TaskName',
                            startDate: 'StartDate',
                            duration: 'Duration',
                            progress: 'Progress',
                            dependency: 'Predecessor',
                            baselineStartDate: "BaselineStartDate",
                            baselineEndDate: "BaselineEndDate",
                            child: 'subtasks',
                            indicators: 'Indicators'
                        },
                        editSettings: {
                            allowAdding: true,
                            allowEditing: true,
                            allowDeleting: true,
                            allowTaskbarEditing: true,
                            showDeleteConfirmDialog: true
                        },
                        columns: [
                            { field: 'TaskID', headerText: 'Task ID' },
                            { field: 'TaskName', headerText: 'Task Name', allowReordering: false },
                            { field: 'StartDate', headerText: 'Start Date', allowSorting: false },
                            { field: 'Duration', headerText: 'Duration', allowEditing: false },
                            { field: 'Progress', headerText: 'Progress', allowFiltering: false },
                        ],
                        editDialogFields: [
                            { type: 'General' },
                            { type: 'Dependency' },
                            { type: 'Resources' },
                            { type: 'Notes' }
                        ],
                        toolbar: ['Add', 'Edit', 'Update'],
                        splitterSettings: {
                            position: "50%",
                        },
                        highlightWeekends: true,
                        timelineSettings: {
                            showTooltip: true,
                            topTier: {
                                unit: 'Week',
                                format: 'dd/MM/yyyy'
                            },
                            bottomTier: {
                                unit: 'Day',
                                count: 1
                            }
                        },
                        height: '550px',
                        allowUnscheduledTasks: true,
                        projectStartDate: new Date('03/25/2019'),
                        projectEndDate: new Date('05/30/2019'),
                        }, done);
                });
                afterAll(() => {
                    if (ganttObj) {
                        destroyGantt(ganttObj);
                    }
                });
                beforeEach((done: Function) => {
                    setTimeout(done, 1000);

                });
                it('Add new record as Bottom', () => {
                    ganttObj.actionComplete = (args: any): void => {
                        if (args.action === 'add') {
                            expect(ganttObj.dataSource[ganttObj.dataSource['length'] - 1].ganttProperties).toBe(undefined);
                        }
                    };
                    ganttObj.dataBind();
                    let add: HTMLElement = ganttObj.element.querySelector('#' + ganttObj.element.id + '_add') as HTMLElement;
                    triggerMouseEvent(add, 'click');
                    let saveRecord: HTMLElement = document.querySelector('#' + ganttObj.element.id + '_dialog > div.e-footer-content > button.e-control.e-btn.e-lib.e-primary.e-flat') as HTMLElement;
                    triggerMouseEvent(saveRecord, 'click');
                });
        });
     describe('Manual mode edit endDate', function () {
         let ganttObj: Gantt;
         beforeAll(function (done) {
             ganttObj = createGantt({
                 dataSource: dialogEditData,
                 taskFields: {
                     id: 'TaskID',
                     name: 'TaskName',
                     startDate: 'StartDate',
                     endDate: 'EndDate',
                     duration: 'Duration',
                     progress: 'Progress',
                     notes: 'Notes',
                     baselineStartDate: 'BaselineStartDate',
                     baselineEndDate: 'BaselineEndDate',
                     resourceInfo: 'Resource',
                     dependency: 'Predecessor',
                     child: 'subtasks'
                 },
                 resourceIDMapping: 'resourceId',
                 resourceNameMapping: 'resourceName',
                 resources: resourcesData,
                 projectStartDate: new Date('03/25/2019'),
                 projectEndDate: new Date('05/30/2019'),
                 renderBaseline: true,
                 editSettings: {
                     allowAdding: true,
                     allowEditing: true,
                     allowDeleting: true,
                     mode: 'Dialog'
                 },
                 taskMode: 'Manual',
                 editDialogFields: [
                     { type: 'General' },
                     { type: 'Dependency' },
                     { type: 'Resources' },
                     { type: 'Notes' },
                     { type: 'Custom' }
                 ],
                 addDialogFields: [
                     { type: 'General' },
                     { type: 'Resources' },
                     { type: 'Dependency' }
                 ],
                 columns: [
                     { field: 'TaskID', width: 60 },
                     { field: 'TaskName', width: 100 },
                     { field: 'StartDate', editType: 'datepickeredit', width: 100 },
                     { field: 'EndDate', editType: 'datepickeredit', width: 100 },
                     { field: 'Duration', width: 100 },
                     { field: 'Predecessor', width: 100 },
                     { field: 'Progress', width: 100 },
                     { field: 'BaselineStartDate', editType: 'datetimepickeredit', width: 100 },
                     { field: 'BaselineEndDate', editType: 'datetimepickeredit', width: 100 },
                     { field: 'Resource', width: 100 },
                     { field: 'Notes', width: 100 },
                     { field: 'Customcolumn', editType: 'defaultedit', headerText: 'Custom Column1', width: 100 }
                 ],
                 toolbar: ['Add', 'Edit', 'Update', 'Delete', 'Cancel'],
                 allowUnscheduledTasks: true,
             }, done);
         });
         afterAll(function () {
             if (ganttObj) {
                 destroyGantt(ganttObj);
             }
         });
         beforeEach((done: Function) => {
             setTimeout(done, 1000);
             ganttObj.openEditDialog(1);
         });
         it('Edit end date', () => {
             let ED: any = (<EJ2Instance>document.getElementById(ganttObj.element.id + 'EndDate')).ej2_instances[0];
             ED.value = new Date('04/09/2019');
             ED.dataBind();
             expect(ganttObj.getFormatedDate(ED.value, 'M/d/yyyy')).toBe('4/9/2019');
         });
     }); 
 });
 
