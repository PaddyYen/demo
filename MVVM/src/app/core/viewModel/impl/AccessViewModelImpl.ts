import { Injectable, OnDestroy } from '@angular/core';
import { AccessService } from '../../services/AccessService';
import { MUser } from '../../models/matrix/MUser';

import { ObserverClass } from 'app/shared/ObserverClass';
import { ResponseData } from 'app/core/models/ResponseData';

@Injectable({
    providedIn: 'root',
})
export class AccessViewModelImpl extends ObserverClass implements OnDestroy {

    constructor(private accessService: AccessService) {
        super();
        this.accessService.subscribe("getAllUsers", this.getAllUsersRes.bind(this));
        this.accessService.subscribe("changePassword", this.changePasswordRes.bind(this));
        this.accessService.subscribe("deactivateAccount", this.deactivateAccountRes.bind(this));
        this.methodMap.set("getAllUsers", new Array);
        this.methodMap.set("changePassword", new Array);
        this.methodMap.set("deactivateAccount", new Array);
    }

    getAllUsers(): void {
        this.accessService.getAllUsers();
    }

    getAllUsersRes(mUserList: MUser[]): void {
        this.returnData('AccessViewModelImpl', "getAllUsers", mUserList);
    }

    changePassword(mUser: MUser) {
        this.accessService.changePassword(mUser);
    }

    changePasswordRes(responseData: ResponseData) {
        this.returnData('AccessViewModelImpl', "changePassword", responseData);
    }

    deactivateAccount(mUser: MUser) {
        this.accessService.deactivateAccount(mUser);
    }

    deactivateAccountRes(responseData: ResponseData) {
        this.returnData('AccessViewModelImpl', "deactivateAccount", responseData);
    }

    ngOnDestroy() {
        this.accessService.unsubscribe("getAllUsers", this.getAllUsersRes.bind(this));
        this.accessService.unsubscribe("changePassword", this.changePasswordRes.bind(this));
        this.accessService.unsubscribe("deactivateAccount", this.deactivateAccountRes.bind(this));
    }
}