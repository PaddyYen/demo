import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';

import { ConstantsService } from '../../services/utils/constants.service';
import { UserService } from '../../services/user-service';
import { ChatUser } from '../../models/chatuser.model';
import { Response } from 'app/core/models/response.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class UserViewModelImpl {

    constructor(private userService: UserService, private constants: ConstantsService, private router: Router) {}
    
    doLogin(paraUser) {
        this.userService.doLogin(paraUser)
            .subscribe((response: Response) => {
                if (response.success) {
                    const resChatUser = new ChatUser(response.data);
                    localStorage.setItem(this.constants.token, resChatUser.accessToken);
                    this.router.navigate([this.constants.orgUrl]);
                }
            });
    }

} 