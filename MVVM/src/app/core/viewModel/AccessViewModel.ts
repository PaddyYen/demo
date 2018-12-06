import { Injectable } from '@angular/core';
import { ObserverInterface } from 'app/shared/ObserverInterface';
import { MUser } from '../models/matrix/MUser';
import { AccessViewModelImpl } from './impl/AccessViewModelImpl';


@Injectable({
  providedIn: 'root',
  useExisting: AccessViewModelImpl,
})
export abstract class AccessViewModel extends ObserverInterface {

  abstract getAllUsers(): void;

  abstract changePassword(mUser: MUser);

  abstract deactivateAccount(mUser: MUser);

}