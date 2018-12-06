import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { UserService } from '../../../core/services/UserService';

declare var jQuery:any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent {

  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }
  /** UserService is for logout */
  constructor(private userService : UserService) {}

}
