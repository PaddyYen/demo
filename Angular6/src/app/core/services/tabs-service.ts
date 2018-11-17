import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TabsServiceImpl } from './impl/tabs-service-impl';
import { Observable } from 'rxjs/Observable';

import { Response } from '../models/response.model';
import { Tab } from '../models/tab.model';

@Injectable({
  providedIn: 'root',
  useExisting: TabsServiceImpl
})
export abstract class TabsService {

  abstract getAllTabs(): Observable<Response>;

  abstract getTabById(tab:Tab): Observable<Response>;

  abstract deleteTab(tab:Tab): Observable<Response>;

  abstract insertTab(tab:Tab): Observable<Response>;

  abstract updateTab(tab:Tab): Observable<Response>;

  abstract batchInsertTab(tabList): Observable<Response>;

  abstract batchUpdateTab(tabList): Observable<Response>;

  abstract batchDeleteTab(tabList): Observable<Response>;

}
