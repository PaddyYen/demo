import { Injectable, OnDestroy } from '@angular/core';
import { OrganizationDao } from 'app/core/dao/OrganizationDao';
import { DTreeNode } from 'app/core/models/DTreeNode';
import { ResponseData } from 'app/core/models/ResponseData';
import { ObserverClass } from 'app/shared/ObserverClass';
import { Observable } from 'rxjs/Observable';


@Injectable({
      providedIn: 'root'
})
export class OrganizationServiceImpl extends ObserverClass implements OnDestroy {

      constructor(private organizationDao: OrganizationDao) {
            super();
            this.organizationDao.subscribe("getCompany", this.getCompanyRes.bind(this));
            this.organizationDao.subscribe("getMembers", this.getMembersRes.bind(this));
            this.organizationDao.subscribe("syschronizeOrgByCronExpression", this.syschronizeOrgByCronExpressionRes.bind(this));
            this.methodMap.set("getCompany", new Array);
            this.methodMap.set("getMembers", new Array);
            this.methodMap.set("syschronizeOrgByCronExpression", new Array);
      }

      getCompany() {
            this.organizationDao.getCompany();
      }

      getCompanyRes(dTreeNode: DTreeNode) {
            this.returnData('OrganizationServiceImpl', "getCompany", dTreeNode);
      }

      getMembers(roleIdList, firstCut, pageSize): Observable<Response> {
            return this.organizationDao.getMembers(roleIdList, firstCut, pageSize);
      }

      getMembersRes(memberList: any) {
            this.returnData('OrganizationServiceImpl', "getMembers", memberList);
      }

      syschronizeOrgByCronExpression(quartzConfig) {
            this.organizationDao.syschronizeOrgByCronExpression(quartzConfig);
      }

      syschronizeOrgByCronExpressionRes(responseData: ResponseData) {
            this.returnData('OrganizationViewModelImpl', "syschronizeOrgByCronExpression", responseData);
      }

      ngOnDestroy() {
            this.organizationDao.unsubscribe("getCompany", this.getCompanyRes.bind(this));
            this.organizationDao.unsubscribe("getMembers", this.unsubscribe.bind(this));
            this.organizationDao.unsubscribe("syschronizeOrgByCronExpression", this.syschronizeOrgByCronExpressionRes.bind(this));
      }

}