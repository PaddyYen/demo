import { Injectable } from '@angular/core';
import { UserServiceImpl } from './impl/user-service-impl';
import { Observable } from 'rxjs/Observable';
import { QuartzConfig } from '../models/quartz-config.model';

@Injectable({
    providedIn: 'root',
    useExisting: UserServiceImpl
})

export abstract class UserService {

    abstract doLogin(any): Observable<any>;

    abstract isLogin(): Observable<any>;

    abstract logoutUser(): void;

    abstract getToken(): Observable<any>;

}
