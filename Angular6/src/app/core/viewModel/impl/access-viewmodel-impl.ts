import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AccessService } from '../../services/access-service';
import { m_User } from '../../models/matrix/user.model';

import { Response } from '../../models/response.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AccessViewModelImpl {

    constructor(private accessService:AccessService) {}

    private initmUserList: Array<m_User> = new Array;

    private mUserList$: BehaviorSubject<m_User[]> = new BehaviorSubject<m_User[]>(this.initmUserList);

    mUserList: Observable<m_User[]> = this.mUserList$;
   
    getAllUsers(): void {
        this.accessService.getAllUsers().subscribe((response:Response)=>{
            this.mUserList$.next(response.data);
        });
    }

    changePassword(newMUser): Observable<Response> {
        return this.accessService.changePassword(newMUser);
    }

    deactivateAccount(mUser) : Observable<Response> {
        return this.accessService.deactivateAccount(mUser);
    }
}