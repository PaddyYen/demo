import { Injectable } from '@angular/core';

import { OrganizationDaoImpl } from './impl/OrganizationDaoImpl';
import { QuartzConfig } from '../models/QuartzConfig';
import { ObserverInterface } from 'app/shared/ObserverInterface';

@Injectable({
    providedIn: 'root',
    useExisting: OrganizationDaoImpl
})
export abstract class OrganizationDao extends ObserverInterface {

    abstract getCompany();

    abstract getMembers(any, firstCut: number, pageSize: number);

    abstract syschronizeOrgByCronExpression(quartzConfig: QuartzConfig);
}