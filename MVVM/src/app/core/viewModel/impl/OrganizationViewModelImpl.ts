import { Injectable, OnDestroy } from '@angular/core';

import { DTreeNode } from 'app/core/models/DTreeNode';
import { OrganizationService } from 'app/core/services/OrganizationService';
import { ObserverClass } from 'app/shared/ObserverClass';
import { ResponseData } from 'app/core/models/ResponseData';

@Injectable({
      providedIn: 'root',
})
export class OrganizationViewModelImpl extends ObserverClass implements OnDestroy {

      constructor(private organizationService: OrganizationService) {
            super();
            this.organizationService.subscribe("getCompany", this.getCompanyRes.bind(this));
            this.organizationService.subscribe("getMembers", this.getMembersRes.bind(this));
            this.organizationService.subscribe("syschronizeOrgByCronExpression", this.syschronizeOrgByCronExpressionRes.bind(this));
            this.methodMap.set("getCompany", new Array);
            this.methodMap.set("getMembers", new Array);
            this.methodMap.set("syschronizeOrgByCronExpression", new Array);
      }

      getCompany() {
            this.organizationService.getCompany();
      }

      getCompanyRes(dTreeNode: DTreeNode) {
            this.returnData('OrganizationViewModelImpl', "getCompany", dTreeNode);
      }

      getMembers(roleIdList, firstCut, pageSize) {
            this.organizationService.getMembers(roleIdList, firstCut, pageSize);
      }

      getMembersRes(memberList: any) {
            this.returnData('OrganizationViewModelImpl', "getMembers", memberList);
      }

      syschronizeOrgByCronExpression(quartzConfig) {
            this.organizationService.syschronizeOrgByCronExpression(quartzConfig);
      }

      syschronizeOrgByCronExpressionRes(responseData: ResponseData) {
            this.returnData('OrganizationViewModelImpl', "syschronizeOrgByCronExpression", responseData);
      }

      ngOnDestroy() {
            this.organizationService.unsubscribe("getCompany", this.getCompanyRes.bind(this));
            this.organizationService.unsubscribe("getMembers", this.getMembersRes.bind(this));
            this.organizationService.unsubscribe("syschronizeOrgByCronExpression", this.syschronizeOrgByCronExpressionRes.bind(this));
      }
}