import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';

import { Tab } from '../../models/tab.model';
import { Response } from '../../models/response.model';
import { TabsService } from '../../services/tabs-service';
import { HttpErrorHandler, HandleError } from '../../services/utils/httpErrorHandler.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TabsViewModelImpl {

    constructor(private tabsService: TabsService) { }

    private storeTabs$: BehaviorSubject<Tab[]> = new BehaviorSubject<Tab[]>(null);

    readonly tabs$: Observable<Tab[]> = this.storeTabs$;

    getAllTabs(): void {
        this.tabsService.getAllTabs().subscribe((response: Response) => {
            this.storeTabs$.next(response.data);
        });
    }

    getTabById(tab: Tab): Observable<Response> {
        return this.tabsService.getTabById(tab);
    }

    deleteTab(tab: Tab, tabList: Tab[], index: number): Observable<Response> {
        tabList.splice(index, 1);
        this.storeTabs$.next(tabList.slice());
        return this.tabsService.deleteTab(tab);
    }

    insertTab(tab): Observable<Response> {
        const tabList: Tab[] = this.storeTabs$.value;
        tabList.push(tab);
        this.storeTabs$.next(tabList.slice());
        return this.tabsService.insertTab(tab);
    }

    updateTab(tab, index: number): Observable<Response> {
        const tabList: Tab[] = this.storeTabs$.value;
        tabList[index] = tab;
        this.storeTabs$.next(tabList.slice());
        return this.tabsService.updateTab(tab);
    }

    batchInsertTab(tabList): void {
        this.tabsService.batchInsertTab(tabList).subscribe();
    }

    batchUpdateTab(tabList): void {
        this.tabsService.batchUpdateTab(tabList).subscribe();
    }

    batchUpdateSubTab(tabList, mainTab:Tab, index: number): void {
        this.tabsService.batchUpdateTab(tabList).subscribe(
            (response:Response) => {
                if (response.success) {
                    const tabList: Tab[] = this.storeTabs$.value;
                    tabList[index] = mainTab;
                    console.log(mainTab);
                    this.storeTabs$.next(tabList.slice());
                }
            }
        );
    }

    batchDeleteTab(tabList): void {
        this.tabsService.batchDeleteTab(tabList).subscribe();
    }

    reloadSubTab(tab: Tab, index: number): void {
        this.getTabById(tab).subscribe((response: Response) => {
            let tab: Tab = new Tab;
            tab = response.data;
            const tabList: Tab[] = this.storeTabs$.value;
            tabList[index] = tab;
            this.storeTabs$.next(tabList.slice());
        });
    }

}