import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseData } from '../../models/response-data-model';
import { MenuDao } from '../../dao/menu-dao';


@Injectable({
    providedIn: 'root'
})
export class MenuServiceImpl {

    constructor(private menuDao: MenuDao) {}
    
    // response$: Observable<ResponseData> = this.menuDao.response$;

    getAllMenu(): Observable<ResponseData> {
      return this.menuDao.getAllMenu();
    }

}