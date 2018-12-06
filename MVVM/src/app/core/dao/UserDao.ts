import { Injectable } from '@angular/core';
import { ObserverInterface } from 'app/shared/ObserverInterface';
import { Observable } from 'rxjs/Observable';
import { UserDaoImpl } from './impl/UserDaoImpl';


@Injectable({
    providedIn: 'root',
    useExisting: UserDaoImpl
})
export abstract class UserDao extends ObserverInterface {

    abstract doLogin(user: any);

}