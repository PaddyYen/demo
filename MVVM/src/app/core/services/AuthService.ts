import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ConstantsService } from "./utils/ConstantsService";


@Injectable({
      providedIn: 'root'
})
export class AuthService {
      constructor(private router: Router, private constants: ConstantsService) { }

      logoutUser() {
            localStorage.removeItem(this.constants.token);
            this.router.navigate([this.constants.loginUrl]);
      }

      getToken() {
            return localStorage.getItem(this.constants.token);
      }

      loggedIn() {
            return !!localStorage.getItem('token')
      }
}
