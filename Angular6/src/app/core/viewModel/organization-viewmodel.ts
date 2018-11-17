import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { QuartzConfig } from '../models/quartz-config.model';
import { OrganizationViewModelImpl } from './impl/organization-viewmodel-impl';
import { Response } from '../models/response.model';
import { DTreeNode } from '../models/dTreeNode.model';

@Injectable({
      providedIn: 'root',
      useExisting: OrganizationViewModelImpl,
})
export abstract class OrganizationViewModel {

      readonly company$: Observable<DTreeNode>;

      abstract getCompany(): void;

      abstract getMembers(any, firstCut: number, pageSize: number): Observable<Response>;

      abstract syschronizeOrgByCronExpression(quartzConfig: QuartzConfig): Observable<Response>;

}