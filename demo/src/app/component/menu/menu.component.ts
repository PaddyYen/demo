import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuViewModel } from 'src/app/core/viewmodel/menu-viewmodel';
import { Observable, Subscription } from 'rxjs';
import { ResponseData } from 'src/app/core/models/response-data-model';
import { Menu } from 'src/app/core/models/menu-model';

@Component({
  selector: 'cn-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {

  constructor(private menuViewModel: MenuViewModel) {}

  private subscription: Subscription;

  menus: Menu[];

  response$: Observable<ResponseData> = this.menuViewModel.response$;

  ngOnInit() {
    this.subscription = this.response$.subscribe((res: ResponseData) => this.menus = res.data);
  }

  showMenu() {
    this.menuViewModel.getAllMenu();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
