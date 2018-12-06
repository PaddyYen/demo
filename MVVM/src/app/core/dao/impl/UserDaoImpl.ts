import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseData } from 'app/core/models/ResponseData';
import { LogService } from 'app/shared/logger/LogService';
import { ObserverClass } from 'app/shared/ObserverClass';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
    providedIn: 'root'
})
export class UserDaoImpl extends ObserverClass {

    constructor(private http: HttpClient, public logger: LogService) {
        super();
        this.methodMap.set("doLogin", new Array);
    }
    private url = '/api';

    doLogin(user: any) {
        this.http.post<ResponseData>(this.url + '/doLogin', user, httpOptions).subscribe((responseData: ResponseData) => {
            this.returnData('UserDaoImpl', "doLogin", responseData);
        });
    }

}
