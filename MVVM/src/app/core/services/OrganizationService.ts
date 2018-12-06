import { Injectable } from '@angular/core';

import { QuartzConfig } from '../models/QuartzConfig';
import { OrganizationServiceImpl } from './impl/OrganizationServiceImpl';
import { ObserverInterface } from 'app/shared/ObserverInterface';

@Injectable({
    providedIn: 'root',
    useExisting: OrganizationServiceImpl
})
export abstract class OrganizationService extends ObserverInterface {

    abstract getCompany();

    abstract getMembers(any, firstCut: number, pageSize: number);

    abstract syschronizeOrgByCronExpression(quartzConfig: QuartzConfig);
}