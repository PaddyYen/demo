import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { UserDaoImpl } from './impl/user-dao-impl';
import { QuartzConfig } from '../models/quartz-config.model';

@Injectable({
    providedIn: 'root',
    useExisting: UserDaoImpl
})
export abstract class UserDao {
    
    abstract doLogin(any): Observable<any>;

}