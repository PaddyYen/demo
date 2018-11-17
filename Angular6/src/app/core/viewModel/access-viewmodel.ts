import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AccessViewModelImpl } from './impl/access-viewmodel-impl';
import { Response } from '../models/response.model';
import { m_User } from '../models/matrix/user.model';

@Injectable({
  providedIn: 'root',
  useExisting: AccessViewModelImpl,
})

export abstract class AccessViewModel {

  readonly mUserList$: Observable<m_User[]>;

  abstract getAllUsers(): void;

  abstract changePassword(newMUser): Observable<Response>;

  abstract deactivateAccount(mUser): Observable<Response>;

}