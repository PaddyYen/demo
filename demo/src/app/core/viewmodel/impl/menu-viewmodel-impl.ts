import { Injectable } from '@angular/core';
import { MenuService } from '../../service/menu-servivce';
import { Observable, BehaviorSubject } from 'rxjs';
import { ResponseData } from '../../models/response-data-model';
import { tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class MenuViewModelImpl {

    constructor(private menuService: MenuService) { }

    private initResponse: ResponseData = new ResponseData;

    private responseSubject$: BehaviorSubject<ResponseData> = new BehaviorSubject<ResponseData>(this.initResponse);

    response$: Observable<ResponseData> = this.responseSubject$;

    getAllMenu(): void {
        this.menuService.getAllMenu().pipe(
            tap((responData: ResponseData) => {
                this.responseSubject$.next(responData)
            })
        ).subscribe();
    }
}