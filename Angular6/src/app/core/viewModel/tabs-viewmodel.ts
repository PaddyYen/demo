import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TabsViewModelImpl } from './impl/tabs-viewmodel-impl';

import { Response } from '../models/response.model';
import { Tab } from '../models/tab.model';

@Injectable({
    providedIn: 'root',
    useExisting: TabsViewModelImpl,
})
export abstract class TabsViewModel {

    readonly tabs$: Observable<Tab[]>;

    abstract getAllTabs(): void;

    abstract getTabById(tab:Tab):void;

    abstract deleteTab(tab: Tab, tabList: Tab[], index: number): Observable<Response>;

    abstract insertTab(tab): Observable<Response>;

    abstract updateTab(tab:Tab, index:number): Observable<Response>;

    abstract batchInsertTab(tabList): void;

    abstract batchUpdateTab(tabList): void;

    abstract batchUpdateSubTab(tabList, mainTab:Tab, index: number): void;

    abstract batchDeleteTab(tabList): void;

    abstract reloadSubTab(tab:Tab, index:number): void;

}