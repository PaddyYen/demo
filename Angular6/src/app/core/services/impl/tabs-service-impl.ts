import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Response } from '../../models/response.model';
import { Tab } from '../../models/tab.model';
import { TabsDao } from '../../dao/tabs-dao'


@Injectable({
    providedIn: 'root'
})

export class TabsServiceImpl {

    constructor(private tabsDao: TabsDao) {}

    getAllTabs(): Observable<Response> {
        return this.tabsDao.getAllTabs();
    }

    getTabById(tab:Tab): Observable<Response> {
        return this.tabsDao.getTabById(tab);
    }

    deleteTab(tab:Tab): Observable<Response> {
        return this.tabsDao.deleteTab(tab);
    }

    insertTab(tab:Tab): Observable<Response> {
        return this.tabsDao.insertTab(tab);
    }

    updateTab(tab:Tab): Observable<Response> {
        return this.tabsDao.updateTab(tab);
    }

    batchInsertTab(tabList): Observable<Response> {
        return this.tabsDao.batchInsertTab(tabList);
    }

    batchUpdateTab(tabList): Observable<Response> {
        return this.tabsDao.batchUpdateTab(tabList);
    }

    batchDeleteTab(tabList): Observable<Response> {
        return this.tabsDao.batchDeleteTab(tabList);
    }

}