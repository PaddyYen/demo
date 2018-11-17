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
export class UserDaoImpl {

    constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
        this.handleError = this.httpErrorHandler.createHandleError('UserDaoImpl');
    }
    private handleError: HandleError;

    private url = '/api';

    doLogin(user): Observable<Response> {
        return this.http.post<Response>(this.url + '/doLogin', user, httpOptions).pipe(
            catchError(this.handleError<Response>('doLogin'))
        );
    }

}
