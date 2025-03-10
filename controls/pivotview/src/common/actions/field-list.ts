import { PivotView } from '../../pivotview/base/pivotview';
import { IAction } from '../../common/base/interface';
import * as events from '../../common/base/constant';
import * as cls from '../base/css-constant';
import { PivotFieldList } from '../../pivotfieldlist/base/field-list';
import { createElement, setStyleAttribute, formatUnit, prepend, addClass, removeClass, isNullOrUndefined, select, remove } from '@syncfusion/ej2-base';
import { CalculatedField } from '../../common/calculatedfield/calculated-field';

PivotFieldList.Inject(CalculatedField);
/**
 * Module for Field List rendering
 */
/** @hidden */
export class FieldList implements IAction {
    /**
     * Module declarations
     */
    private parent: PivotView;
    private element: HTMLElement;
    /* eslint-disable */
    private handlers: {
        load: Function,
        update: Function
    };
    private timeOutObj: any;

    /** Constructor for Field List module */
    constructor(parent: PivotView) {
        this.parent = parent;
        this.addEventListener();
    }

    /**
     * For internal use only - Get the module name.
     * @private
     */
    protected getModuleName(): string {
        /* eslint-enable */
        return 'fieldList';
    }

    private initiateModule(): void {
        this.element = createElement('div', {
            id: this.parent.element.id + '_PivotFieldList',
            styles: 'position:' + (this.parent.enableRtl ? 'static' : 'absolute') + ';height:0;width:' + this.parent.element.style.width +
                ';display:none'
        });
        if (select('#' + this.parent.element.id + 'containerwrapper', document) === null) {
            let containerWrapper: HTMLElement = createElement('div', {
                id: this.parent.element.id + 'containerwrapper',
                styles: 'height:' + this.parent.height
            });
            this.parent.element.parentElement.appendChild(containerWrapper);
            containerWrapper.appendChild(this.element);
            containerWrapper.appendChild(this.parent.element);
        } else {
            (select('#' + this.parent.element.id + 'containerwrapper', document) as HTMLElement).appendChild(this.element);
        }
        this.parent.pivotFieldListModule = new PivotFieldList({
            dataSourceSettings: {
                providerType: this.parent.dataSourceSettings.providerType,
                rows: [],
                columns: [],
                values: [],
                filters: []
            },
            spinnerTemplate: this.parent.spinnerTemplate,
            allowDeferLayoutUpdate: this.parent.allowDeferLayoutUpdate,
            renderMode: 'Popup',
            allowCalculatedField: this.parent.allowCalculatedField,
            showValuesButton: this.parent.showValuesButton,
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            target: this.parent.element.parentElement,
            aggregateTypes: this.parent.aggregateTypes,
            maxNodeLimitInMemberEditor: this.parent.maxNodeLimitInMemberEditor,
            aggregateCellInfo: this.parent.bindTriggerEvents.bind(this.parent),
            onHeadersSort: this.parent.bindTriggerEvents.bind(this.parent),
            cssClass: this.parent.cssClass
        });
        this.parent.pivotFieldListModule.isPopupView = true;
        this.parent.pivotFieldListModule.pivotGridModule = this.parent;
        this.parent.pivotFieldListModule.appendTo('#' + this.element.id);
    }

    private updateControl(): void {
        if (this.element) {
            this.element.style.display = 'block';
            prepend([this.element], this.parent.element);
            if (this.parent.showGroupingBar && this.parent.groupingBarModule) {
                clearTimeout(this.timeOutObj);
                this.timeOutObj = setTimeout(this.update.bind(this));
            } else if (!isNullOrUndefined((this.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS)))) {
                setStyleAttribute(this.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS) as HTMLElement, {
                    left: 'auto'
                });
                if (this.parent.enableRtl) {
                    removeClass([this.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS)], 'e-fieldlist-left');
                } else {
                    addClass([this.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS)], 'e-fieldlist-left');
                }
            }
            setStyleAttribute(this.element, {
                width: formatUnit(this.parent.element.offsetWidth)
            });
        }
        this.parent.pivotFieldListModule.update(this.parent);
    }

    private update(): void {
        let currentWidth: number;
        if (this.parent.currentView !== 'Table') {
            currentWidth = this.parent.chart ? this.parent.pivotChartModule.getCalulatedWidth() : currentWidth;
        } else {
            currentWidth = this.parent.grid ? this.parent.grid.element.offsetWidth : currentWidth;
        }
        if (currentWidth && (!isNullOrUndefined((this.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS))))) {
            let actualWidth: number = currentWidth < 400 ? 400 : currentWidth;
            setStyleAttribute(this.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS) as HTMLElement, {
                left: formatUnit(this.parent.enableRtl ?
                    -Math.abs((actualWidth) -
                        (this.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS) as HTMLElement).offsetWidth) :
                    (actualWidth) -
                    (this.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS) as HTMLElement).offsetWidth),

                top: this.parent.element.querySelector('.' + cls.FIELD_PANEL_SCROLL_CLASS) ? (this.parent.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS) as HTMLElement).offsetHeight.toString() + 'px' : ""
            });
            if (this.parent.enableRtl) {
                addClass([this.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS)], 'e-fieldlist-left');
            } else {
                removeClass([this.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS)], 'e-fieldlist-left');
            }
        }
    }

    /* eslint-disable-next-line */
    /**
     * @hidden
     */
    public addEventListener(): void {
        this.handlers = {
            load: this.initiateModule,
            update: this.updateControl
        };
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.initSubComponent, this.handlers.load, this);
        this.parent.on(events.uiUpdate, this.handlers.update, this);
    }

    /* eslint-disable-next-line */
    /**
     * @hidden
     */
    public removeEventListener(): void {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.initSubComponent, this.handlers.load);
        this.parent.off(events.uiUpdate, this.handlers.update);
    }

    /**
     * To destroy the Field List.
     * @returns {void}
     * @hidden
     */
    public destroy(): void {
        this.removeEventListener();
        if (this.parent.pivotFieldListModule && !this.parent.pivotFieldListModule.isDestroyed) {
            this.parent.pivotFieldListModule.destroy();
            this.parent.pivotFieldListModule = null;
            if (!isNullOrUndefined(select('#' + this.parent.element.id + '_PivotFieldList', document))) {
                remove(select('#' + this.parent.element.id + '_PivotFieldList', document));
            }
        } else {
            return;
        }
    }
}
