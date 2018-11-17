import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { OrganizationDaoImpl } from './impl/organization-dao-impl';
import { QuartzConfig } from '../models/quartz-config.model';
import { Response } from '../models/response.model';

@Injectable({
    providedIn: 'root',
    useExisting: OrganizationDaoImpl
})
export abstract class OrganizationDao {

    abstract getCompany(): Observable<Response>;

    abstract getMembers(any, firstCut: number, pageSize: number): Observable<Response>;

    abstract syschronizeOrgByCronExpression(quartzConfig: QuartzConfig): Observable<Response>;
}