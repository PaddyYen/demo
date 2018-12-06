import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LogService } from 'app/shared/logger/LogService';
import { MUser } from 'app/core/models/matrix/MUser';
import { ObserverClass } from 'app/shared/ObserverClass';
import { ResponseData } from 'app/core/models/ResponseData';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
    providedIn: 'root'
})
export class AccessDaoImpl extends ObserverClass {

    private userUrl = '/api/users';

    constructor(private http: HttpClient, public logger: LogService) {
        super();
        this.methodMap.set("getAllUsers", new Array);
        this.methodMap.set("changePassword", new Array);
        this.methodMap.set("deactivateAccount", new Array);
    }

    getAllUsers() {
        this.http.get<ResponseData>(this.userUrl, httpOptions).subscribe((responseData: ResponseData) => {
            let mUserList: MUser[] = responseData.data;
            this.returnData('AccessDaoImpl', "getAllUsers", mUserList);
        });
    }

    changePassword(mUser: MUser) {
        this.http.post<ResponseData>(this.userUrl + '/password', mUser, httpOptions).subscribe((responseData: ResponseData) => {
            this.returnData('AccessDaoImpl', "changePassword", responseData);
        });
    }

    deactivateAccount(mUser: MUser) {
        this.http.post<ResponseData>(this.userUrl + '/deactivate', mUser, httpOptions).subscribe((responData: ResponseData) => {
            this.returnData('AccessDaoImpl', "deactivateAccount", responData);
        });
    }



}