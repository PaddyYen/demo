import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Response } from 'app/core/models/response.model';
import { OrganizationService } from 'app/core/services/organization-service';
import { DTreeNode } from 'app/core/models/dTreeNode.model';

@Injectable({
      providedIn: 'root',
})
export class OrganizationViewModelImpl {

      constructor(private organizationService: OrganizationService) { }

      private initCompanyDTreeNode: DTreeNode = new DTreeNode;
      private companyDTreeNode$: BehaviorSubject<DTreeNode> = new BehaviorSubject(this.initCompanyDTreeNode);
      company$: Observable<DTreeNode> = this.companyDTreeNode$;

      getCompany(): void {
            this.organizationService.getCompany().subscribe((response: Response) => {
                  this.companyDTreeNode$.next(response.data);
            });
      }

      getMembers(roleIdList, firstCut, pageSize): Observable<Response> {
         return this.organizationService.getMembers(roleIdList, firstCut, pageSize);
      }

      syschronizeOrgByCronExpression(quartzConfig): Observable<Response> {
         return this.organizationService.syschronizeOrgByCronExpression(quartzConfig);
      }

}