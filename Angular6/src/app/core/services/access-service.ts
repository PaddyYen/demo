import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Response } from '../models/response.model';
import { AccessServiceImpl } from './impl/access-service-impl';

@Injectable({
  providedIn: 'root',
  useExisting: AccessServiceImpl
})
export abstract class AccessService {

    abstract getAllUsers() : Observable<Response>;
  
    abstract changePassword(newMUser) : Observable<Response>;

    abstract deactivateAccount(mUser) : Observable<Response>;

}