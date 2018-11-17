import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Tab } from '../models/tab.model';
import { TabsDaoImpl } from './impl/tabs-dao-impl';
import { Response } from '../models/response.model';

@Injectable({
    providedIn: 'root',
    useExisting: TabsDaoImpl
})
export abstract class TabsDao {

    abstract getAllTabs(): Observable<Response>;

    abstract getTabById(tab:Tab): Observable<Response>

    abstract deleteTab(tab:Tab) : Observable<Response>;
  
    abstract insertTab(tab:Tab) : Observable<Response>;

    abstract updateTab(tab:Tab): Observable<Response>;
  
    abstract batchInsertTab(tabList) : Observable<Response>;
       
    abstract batchUpdateTab(tabList) : Observable<Response>;
  
    abstract batchDeleteTab(tabList) : Observable<Response>;
}