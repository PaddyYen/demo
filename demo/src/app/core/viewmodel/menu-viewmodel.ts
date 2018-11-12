import {Injectable} from '@angular/core';
import { MenuViewModelImpl } from './impl/menu-viewmodel-impl';
import { Observable } from 'rxjs';
import { ResponseData } from '../models/response-data-model';

@Injectable({
    providedIn:'root',
    useExisting:MenuViewModelImpl
})
export abstract class MenuViewModel {
    
    readonly response$:Observable<ResponseData>;

    abstract getAllMenu():void;

}