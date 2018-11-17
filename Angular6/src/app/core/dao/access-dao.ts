import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Response } from '../models/response.model';
import { AccessDaoImpl } from './impl/access-dao-impl';

@Injectable({
    providedIn: 'root',
    useExisting: AccessDaoImpl
})
export abstract class AccessDao {

    abstract getAllUsers(): Observable<Response>;

    abstract changePassword(newMUser) : Observable<Response>;

    abstract deactivateAccount(mUser) : Observable<Response>;

}