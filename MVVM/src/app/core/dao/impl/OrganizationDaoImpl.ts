import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { ObserverClass } from 'app/shared/ObserverClass';
import { LogService } from 'app/shared/logger/LogService';
import { ResponseData } from 'app/core/models/ResponseData';
import { DTreeNode } from 'app/core/models/DTreeNode';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
      providedIn: 'root'
})
export class OrganizationDaoImpl extends ObserverClass {

      private url = '/api';

      constructor(private http: HttpClient, public logger: LogService) {
            super();
            this.methodMap.set("getCompany", new Array);
            this.methodMap.set("getMembers", new Array);
            this.methodMap.set("syschronizeOrgByCronExpression", new Array);
      }

      getCompany() {
            this.http.get<ResponseData>(this.url + '/company/members', httpOptions).subscribe((responseData: ResponseData) => {
                  let dTreeNode: DTreeNode = responseData.data;
                  this.returnData('OrganizationDaoImpl', "getCompany", dTreeNode);
            });
      }

      getMembers(roleIdList, firstCut, pageSize) {
            this.http.get<ResponseData>(this.url + '/department/members/' + roleIdList + '/firstCut/' + firstCut + '/page/' + pageSize, httpOptions).subscribe((responseData: ResponseData) => {
                  this.returnData('OrganizationDaoImpl', "getMembers", responseData.data);
            })
      }

      syschronizeOrgByCronExpression(quartzConfig) {
            this.http.post<ResponseData>(this.url + '/agentflow/departments/scheduler', quartzConfig, httpOptions).subscribe((responseData: ResponseData) => {
                  this.returnData('OrganizationDaoImpl', "syschronizeOrgByCronExpression", responseData);
            });
      }


}