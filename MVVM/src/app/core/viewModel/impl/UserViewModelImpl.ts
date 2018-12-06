import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseData } from 'app/core/models/ResponseData';
import { ObserverClass } from 'app/shared/ObserverClass';
import { ChatUser } from '../../models/chatuser.model';
import { UserService } from '../../services/UserService';
import { ConstantsService } from '../../services/utils/ConstantsService';


@Injectable({
    providedIn: 'root',
})
export class UserViewModelImpl extends ObserverClass{

    constructor(private userService: UserService, private constants: ConstantsService, private router: Router) {
        super();
        this.userService.subscribe("doLogin", this.doLoginRes.bind(this));
        this.methodMap.set("doLogin", new Array);
    }
    
    doLogin(user:any) {
        this.userService.doLogin(user);
    }

    doLoginRes(responseData:ResponseData) {
        if (responseData.success) {
            const resChatUser = new ChatUser(responseData.data);
            localStorage.setItem(this.constants.token, resChatUser.accessToken);
            this.router.navigate([this.constants.orgUrl]);
        }
    }

} 