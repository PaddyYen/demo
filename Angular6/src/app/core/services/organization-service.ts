import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { QuartzConfig } from '../models/quartz-config.model';
import { Response } from '../models/response.model';
import { OrganizationServiceImpl } from './impl/organization-service-impl';

@Injectable({
    providedIn: 'root',
    useExisting: OrganizationServiceImpl
})
export abstract class OrganizationService {

    abstract getCompany(): Observable<Response>;

    abstract getMembers(any, firstCut: number, pageSize: number): Observable<Response>;

    abstract syschronizeOrgByCronExpression(quartzConfig: QuartzConfig): Observable<Response>;
}