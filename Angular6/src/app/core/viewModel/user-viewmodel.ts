import { Injectable } from '@angular/core';
import { UserViewModelImpl } from './impl/user-viewmodel-impl';

@Injectable({
  providedIn: 'root',
  useExisting: UserViewModelImpl,
})
export abstract class UserViewModel {
  abstract doLogin(user):void;
}