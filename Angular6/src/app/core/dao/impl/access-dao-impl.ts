import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { Response } from '../../models/response.model';

import { HttpErrorHandler, HandleError } from '../../services/utils/httpErrorHandler.service';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
    providedIn: 'root'
})
export class AccessDaoImpl {

    constructor(private http: HttpClient, private httpErrorHandler: HttpErrorHandler) {
        this.handleError = this.httpErrorHandler.createHandleError('AccessDaoImpl');
    }

    private handleError: HandleError;

    private userUrl = '/api/users';

    getAllUsers(): Observable<Response> {
        return this.http.get<Response>(this.userUrl, httpOptions).pipe(
            catchError(this.handleError<Response>('getAllUsers'))
        );
    }

    changePassword(newMUser): Observable<Response> {
        return this.http.post<Response>(this.userUrl + '/password', newMUser, httpOptions).pipe(
            catchError(this.handleError<Response>('changePassword'))
        );
    }

    deactivateAccount(mUser): Observable<Response> {
        return this.http.post<Response>(this.userUrl + '/deactivate', mUser, httpOptions).pipe(
            catchError(this.handleError<Response>('deactivateAccount'))
        );
    }



}