import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { OrganizationDao } from 'app/core/dao/organization-dao';
import { Response } from 'app/core/models/response.model';

@Injectable({
      providedIn: 'root'
})
export class OrganizationServiceImpl {

      constructor(private organizationDao: OrganizationDao) {}

      getCompany(): Observable<Response> {
            return this.organizationDao.getCompany();
      }

      getMembers(roleIdList, firstCut, pageSize): Observable<Response> {
            return this.organizationDao.getMembers(roleIdList, firstCut, pageSize);
      }

      syschronizeOrgByCronExpression(quartzConfig): Observable<Response> {
            return this.organizationDao.syschronizeOrgByCronExpression(quartzConfig);
      }

}