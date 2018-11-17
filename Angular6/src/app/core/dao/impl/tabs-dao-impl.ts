import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { Tab } from '../../models/tab.model';
import { Response } from '../../models/response.model';

import { HttpErrorHandler, HandleError } from '../../services/utils/httpErrorHandler.service';
import { Resolve } from '@angular/router';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
    providedIn: 'root'
})
export class TabsDaoImpl {

    constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
        this.handleError = this.httpErrorHandler.createHandleError('TabsDaoImpl');
    }
    private handleError: HandleError;

    private tabUrl = '/api/tabs';

    getAllTabs(): Observable<Response> {
        return this.http.get<Response>(this.tabUrl, httpOptions).pipe(
            catchError(this.handleError<Response>('getAllTabs'))
        );
    }

    getTabById(tab:Tab): Observable<Response> {
        return this.http.get<Response>(this.tabUrl + "/" + tab.id, httpOptions).pipe(
            catchError(this.handleError<Response>('getTabById'))
        );
    }

    deleteTab(tab:Tab): Observable<Response> {
        let httpDeleteOptions = { "headers": { 'Content-type': 'application/json;charset=utf-8' } };
        return this.http.delete<Response>(this.tabUrl + "/" + tab.id, httpDeleteOptions).pipe(
            catchError(this.handleError<Response>('deleteTab'))
        );
    }

    insertTab(tab): Observable<Response> {
        return this.http.post<Response>(this.tabUrl, tab, httpOptions).pipe(
            catchError(this.handleError<Response>('insertTab'))
        );
    }

    updateTab(tab): Observable<Response> {
        return this.http.put<Response>(this.tabUrl + "/" + tab.id, tab, httpOptions).pipe(
            catchError(this.handleError<Response>('updateTab'))
        );
    }

    batchInsertTab(tabList): Observable<Response> {
        return this.http.post<Response>(this.tabUrl + "/batch", tabList, httpOptions).pipe(
            catchError(this.handleError<Response>('batchInsertTab'))
        );
    }

    batchUpdateTab(tabList): Observable<Response> {
        return this.http.put<Response>(this.tabUrl + "/batch", tabList, httpOptions).pipe(
            catchError(this.handleError<Response>('batchUpdateTab'))
        );
    }

    batchDeleteTab(tabList): Observable<Response> {
        let options = ({ headers: { 'Content-type': 'application/json;charset=utf-8' }, body: tabList });
        return this.http.delete<Response>(this.tabUrl + "/batch", options).pipe(
            catchError(this.handleError<Response>('batchDeleteTab'))
        );
    }


}
