import { Injectable, Injector } from '@angular/core';
import { UserService } from '../services/user-service';
import { HttpInterceptor } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req, next) {
    let userService = this.injector.get(UserService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Lale ${userService.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }

}
