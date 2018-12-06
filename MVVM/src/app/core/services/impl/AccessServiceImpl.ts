import { Injectable, OnDestroy } from '@angular/core';
import { MUser } from 'app/core/models/matrix/MUser';
import { ResponseData } from 'app/core/models/ResponseData';
import { ObserverClass } from 'app/shared/ObserverClass';
import { AccessDao } from '../../dao/AccessDao';


@Injectable({
    providedIn: 'root'
})
export class AccessServiceImpl extends ObserverClass implements OnDestroy {

    constructor(private accessDao: AccessDao) {
        super();
        this.accessDao.subscribe("getAllUsers", this.getAllUsersRes.bind(this));
        this.accessDao.subscribe("changePassword", this.changePasswordRes.bind(this));
        this.accessDao.subscribe("deactivateAccount", this.deactivateAccountRes.bind(this));
        this.methodMap.set("getAllUsers", new Array);
        this.methodMap.set("changePassword", new Array);
        this.methodMap.set("deactivateAccount", new Array);
    }

    getAllUsers() {
        this.accessDao.getAllUsers();
    }

    getAllUsersRes(mUserList: MUser[]): void {
        this.returnData('AccessServiceImpl', "getAllUsers", mUserList);
    }

    changePassword(newMUser) {
        this.accessDao.changePassword(newMUser);
    }

    changePasswordRes(responseData: ResponseData) {
        this.returnData('AccessServiceImpl', "changePassword", responseData);
    }

    deactivateAccount(mUser: MUser) {
        this.accessDao.deactivateAccount(mUser);
    }

    deactivateAccountRes(responseData: ResponseData) {
        this.returnData('AccessViewModelImpl', "deactivateAccount", responseData);
    }

    ngOnDestroy() {
        this.accessDao.unsubscribe("getAllUsers", this.getAllUsersRes.bind(this));
        this.accessDao.unsubscribe("changePassword", this.deactivateAccountRes.bind(this));
        this.accessDao.unsubscribe("deactivateAccount", this.deactivateAccountRes.bind(this));
    }
}