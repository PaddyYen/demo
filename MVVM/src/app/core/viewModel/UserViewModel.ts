import { Injectable } from '@angular/core';
import { ObserverInterface } from 'app/shared/ObserverInterface';
import { UserViewModelImpl } from './impl/UserViewModelImpl';

@Injectable({
  providedIn: 'root',
  useExisting: UserViewModelImpl,
})
export abstract class UserViewModel extends ObserverInterface {
  abstract doLogin(user: any);
}