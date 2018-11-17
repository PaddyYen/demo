import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { ConstantsService } from '../utils/constants.service';
import { UserDao } from '../../dao/user-dao'

import { HttpErrorHandler, HandleError } from '../utils/httpErrorHandler.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceImpl {

  constructor(private constants: ConstantsService, private router: Router, private httpErrorHandler: HttpErrorHandler, private userDao: UserDao) {
    this.handleError = this.httpErrorHandler.createHandleError('UserServiceImpl');
  }

  private handleError: HandleError;

  doLogin(user): Observable<any> {
    return this.userDao.doLogin(user).pipe(
      catchError(this.handleError<Response>('doLogin'))
      // catchError(_ => Observable.throw(this.logger.error('doLogin in user service is fail!')))
    );
  }

  public isLogin() {
    return !!localStorage.getItem(this.constants.token);
  }

  public logoutUser() {
    localStorage.removeItem(this.constants.token);
    this.router.navigate([this.constants.loginUrl]);
    catchError(this.handleError<Response>('logoutUser'))
    // this.logger.debug('log out successfully!')
  }

  public getToken() {
    return localStorage.getItem(this.constants.token);
  }

}
