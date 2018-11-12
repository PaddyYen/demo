import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseData } from '../../models/response-data-model';
import { tap } from 'rxjs/operators';

const httpOtion =
    { headers: new HttpHeaders({ "Content-Type": "application/json" }) };

@Injectable({
    providedIn: 'root'
})
export class MenuDaoImpl {

    constructor(private httpClient: HttpClient) { }

    private url = "api/tabs";

    // private initResponse: ResponseData = new ResponseData;

    // private responseSubject$: BehaviorSubject<ResponseData>
    //                  = new BehaviorSubject<ResponseData>(this.initResponse);

    // response$: Observable<ResponseData> = this.responseSubject$;

    getAllMenu(): Observable<ResponseData> {
        return this.httpClient.get<ResponseData>(this.url, httpOtion);
     }

    // getAllMenu(): Observable<ResponseData> {
    //    return this.httpClient.get(this.url, httpOtion).pipe(
    //         tap((responedata: ResponseData) =>
    //             this.responseSubject$.next(responedata)
    //         )
    //     );
    // }
}