import { Injectable } from '@angular/core';
import { ObserverInterface } from 'app/shared/ObserverInterface';
import { Observable } from 'rxjs/Observable';
import { UserServiceImpl } from './impl/UserServiceImpl';

@Injectable({
    providedIn: 'root',
    useExisting: UserServiceImpl
})
export abstract class UserService extends ObserverInterface {

    abstract doLogin(user: any);

    abstract isLogin(): Observable<any>;

    abstract logoutUser(): void;

    abstract getToken(): Observable<any>;

}
