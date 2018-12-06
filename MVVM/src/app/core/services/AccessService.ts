import { Injectable } from '@angular/core';

import { AccessServiceImpl } from './impl/AccessServiceImpl';
import { ObserverInterface } from 'app/shared/ObserverInterface';
import { MUser } from '../models/matrix/MUser';

@Injectable({
  providedIn: 'root',
  useExisting: AccessServiceImpl
})
export abstract class AccessService extends ObserverInterface {

  abstract getAllUsers();

  abstract changePassword(mUser: MUser);

  abstract deactivateAccount(mUser: MUser);

}