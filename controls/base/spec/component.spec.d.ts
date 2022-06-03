import { Component } from '../src/component';
import { ChildProperty } from '../src/child-property';
import { ModuleDeclaration } from '../src/module-loader';
import { INotifyPropertyChanged } from '../src/notify-property-change';
import { Touch } from '../src/touch';
export declare class InnerTable extends ChildProperty<Table> {
    id: string;
    name: string;
}
export declare class Table extends ChildProperty<Table> {
    id: string;
    name: string;
    innerTable: InnerTable;
}
export declare class Fields extends ChildProperty<Fields> {
    id: string;
    name: string;
    table: Table;
}
export declare class Styler extends Component<HTMLElement> implements INotifyPropertyChanged {
    size: string;
    enablePersistence: boolean;
    fields: Fields;
    settings: {
        color: string;
        size: number;
    };
    items: string[];
    event1: Function;
    enableTouch: boolean;
    event2: Function;
    currencyCode: string;
    event3: Function;
    created: Function;
    destroyed: Function;
    constructor(fontObj?: {
        size: string;
        enablePersistence?: boolean;
        enableRtl?: boolean;
        locale?: string;
        created?: Function;
        destroyed?: Function;
    }, id?: string | HTMLElement);
    touchModule: Touch;
    preRender(): void;
    getModuleName(): string;
    getPersistData(): string;
    render(): void;
    destroy(): void;
    onPropertyChanged(newProp: any, oldProp: any): void;
}
export declare class Styler1 extends Styler implements INotifyPropertyChanged {
    destroyed: Function;
    constructor(fontObj: {
        size: string;
        enablePersistence?: boolean;
        destroyed?: Function;
    }, id?: string | HTMLElement);
    requiredModules(): ModuleDeclaration[];
}
export declare class ObserveComponent extends Component<HTMLElement> implements INotifyPropertyChanged {
    event1: Function;
    event2: Function;
    event3: Function;
    constructor(id: string | HTMLElement, option: Object);
    preRender(): void;
    getModuleName(): string;
    getPersistData(): string;
    render(): void;
    destroy(): void;
    onPropertyChanged(newProp: Object, oldProp: Object): void;
}
