import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { Response } from '../../models/response.model';
import { HttpErrorHandler, HandleError } from '../../services/utils/httpErrorHandler.service';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
      providedIn: 'root'
})
export class OrganizationDaoImpl {

      constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
            this.handleError = this.httpErrorHandler.createHandleError('OrganizationDaoImpl');
      }

      private handleError: HandleError;

      private url = '/api';

      getCompany(): Observable<Response> {
            return this.http.get<Response>(this.url + '/company/members', httpOptions).pipe(
                  catchError(this.handleError<Response>('getCompany'))
            );
      }

      getMembers(roleIdList, firstCut, pageSize): Observable<Response> {
            return this.http.get<Response>(this.url + '/department/members/' + roleIdList + '/firstCut/' + firstCut + '/page/' + pageSize, httpOptions).pipe(
                  catchError(this.handleError<Response>('getMembers'))
            );
      }

      syschronizeOrgByCronExpression(quartzConfig): Observable<Response> {
            return this.http.post<Response>(this.url + '/agentflow/departments/scheduler', quartzConfig, httpOptions).pipe(
                  catchError(this.handleError<Response>('syschronizeOrgByCronExpression'))
            );
      }
}