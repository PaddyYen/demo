import { Component} from '@angular/core';

import { UserViewModel } from '../../core/viewModel/user-viewmodel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

   constructor(private userViewModel : UserViewModel) { }

   loginData = {}

   doLogin() : void {
       this.userViewModel.doLogin(this.loginData);
   }
}