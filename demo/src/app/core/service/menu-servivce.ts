import { Injectable } from '@angular/core';
import { MenuServiceImpl } from './impl/menu-service-impl';
import { Observable } from 'rxjs';
import { ResponseData } from '../models/response-data-model';


@Injectable({
    providedIn: 'root',
    useExisting: MenuServiceImpl
})
export abstract class MenuService {
    // readonly response$: Observable<ResponseData>;

    abstract getAllMenu(): Observable<ResponseData>;
}