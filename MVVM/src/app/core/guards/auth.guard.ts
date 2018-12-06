import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/UserService';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService, private router: Router) { }
    canActivate(): boolean {
        if (this.userService.isLogin()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }

}
