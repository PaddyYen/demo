import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Response } from '../../models/response.model';
import { AccessDao } from '../../dao/access-dao';

@Injectable({
    providedIn: 'root'
})
export class AccessServiceImpl {

    constructor(private accessDao: AccessDao) {}

    getAllUsers(): Observable<Response> {
        return this.accessDao.getAllUsers();
    }

    changePassword(newMUser): Observable<Response> {
        return this.accessDao.changePassword(newMUser);
    }

    deactivateAccount(mUser) : Observable<Response> {
        return this.accessDao.deactivateAccount(mUser);
    }
}