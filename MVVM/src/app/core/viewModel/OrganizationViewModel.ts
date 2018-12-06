import { Injectable } from '@angular/core';
import { QuartzConfig } from '../models/QuartzConfig';
import { OrganizationViewModelImpl } from './impl/OrganizationViewModelImpl';
import { ObserverInterface } from 'app/shared/ObserverInterface';

@Injectable({
      providedIn: 'root',
      useExisting: OrganizationViewModelImpl,
})
export abstract class OrganizationViewModel extends ObserverInterface {

      abstract getCompany();

      abstract getMembers(any, firstCut: number, pageSize: number);

      abstract syschronizeOrgByCronExpression(quartzConfig: QuartzConfig);

}