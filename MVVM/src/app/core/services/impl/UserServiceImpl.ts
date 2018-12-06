import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ResponseData } from 'app/core/models/ResponseData';
import { ObserverClass } from 'app/shared/ObserverClass';
import { UserDao } from '../../dao/UserDao';
import { ConstantsService } from '../utils/ConstantsService';


@Injectable({
  providedIn: 'root'
})
export class UserServiceImpl extends ObserverClass implements OnDestroy {

  constructor(private constants: ConstantsService, private router: Router, private userDao: UserDao) {
    super();
    this.userDao.subscribe("doLogin", this.doLoginRes.bind(this));
    this.methodMap.set("doLogin", new Array);
  }

  doLogin(user: any) {
    this.userDao.doLogin(user);
  }

  doLoginRes(responseData: ResponseData) {
    this.returnData('UserServiceImpl', "doLogin", responseData);
  }

  public isLogin() {
    return !!localStorage.getItem(this.constants.token);
  }

  public logoutUser() {
    localStorage.removeItem(this.constants.token);
    this.router.navigate([this.constants.loginUrl]);
  }

  public getToken() {
    return localStorage.getItem(this.constants.token);
  }

  ngOnDestroy() {
    this.userDao.unsubscribe("doLogin", this.doLoginRes.bind(this));
  }

}
