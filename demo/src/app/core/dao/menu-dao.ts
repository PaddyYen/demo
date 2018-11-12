import { Injectable } from '@angular/core';
import { MenuDaoImpl } from './impl/menu-dao-impl';
import { ResponseData } from '../models/response-data-model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
    useExisting: MenuDaoImpl
})
export abstract class MenuDao {

    // readonly response$: Observable<ResponseData>;

    abstract getAllMenu(): Observable<ResponseData>;

}
