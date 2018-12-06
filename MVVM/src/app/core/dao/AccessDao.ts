import { Injectable } from '@angular/core';
import { ObserverInterface } from 'app/shared/ObserverInterface';
import { MUser } from '../models/matrix/MUser';
import { AccessDaoImpl } from './impl/AccessDaoImpl';


@Injectable({
    providedIn: 'root',
    useExisting: AccessDaoImpl
})
export abstract class AccessDao extends ObserverInterface {

    abstract getAllUsers();

    abstract changePassword(mUser: MUser);

    abstract deactivateAccount(mUser: MUser);

}