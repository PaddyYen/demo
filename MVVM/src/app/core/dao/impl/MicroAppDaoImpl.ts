import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LogService } from 'app/shared/logger/LogService';
import { Injectable } from '@angular/core';
import { MicroApp } from 'app/core/models/MicroApp';
import { ObserverClass } from 'app/shared/ObserverClass';
import { ResponseData } from 'app/core/models/ResponseData';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
      providedIn: 'root'
})
export class MicroAppDaoImpl extends ObserverClass {

      private url = "api/microApps";

      constructor(private httpClient: HttpClient, public logger: LogService) {
            super();
            this.methodMap.set("getAllMicroApps", new Array);
            this.methodMap.set("getMicroAppById", new Array);
            this.methodMap.set("insertMicroApp", new Array);
            this.methodMap.set("deleteMicroApp", new Array);
            this.methodMap.set("updateMicroApp", new Array);
            this.methodMap.set("batchInsertMicroApp", new Array);
            this.methodMap.set("batchUpdateMicroApp", new Array);
            this.methodMap.set("batchDeleteMicroApp", new Array);
      }

      getAllMicroApps() {
            this.httpClient.get<ResponseData>(this.url, httpOptions).subscribe((responseData: ResponseData) => {
                  let microAppsList: MicroApp[] = responseData.data;
                  this.returnData('MicroAppDaoImpl', "getAllMicroApps", microAppsList);
            });
      }

      getMicroAppById(microApp: MicroApp) {
            this.httpClient.get<ResponseData>(this.url + "/" + microApp.id, httpOptions).subscribe((responseData: ResponseData) => {
                  let newMicroApp: MicroApp = responseData.data;
                  this.returnData('MicroAppDaoImpl', "getMicroAppById", newMicroApp);
            });
      }

      deleteMicroApp(microApp: MicroApp) {
            this.httpClient.delete<ResponseData>(this.url + "/" + microApp.id, httpOptions).subscribe((responseData: ResponseData) => {
                  if (!responseData.success) {
                        this.logger.error('MicroAppDaoImpl has error ' + responseData.errorMessage);
                  } else {
                        this.returnData('MicroAppDaoImpl', "deleteMicroApp");
                  }
            });
      }

      insertMicroApp(microApp: MicroApp) {
            this.httpClient.post<ResponseData>(this.url, microApp, httpOptions).subscribe((responseData: ResponseData) => {
                  if (!responseData.success) {
                        this.logger.error('MicroAppDaoImpl has error ' + responseData.errorMessage);
                  } else {
                        this.returnData('MicroAppDaoImpl', "insertMicroApp");
                  }
            });
      }

      updateMicroApp(microApp: MicroApp) {
            this.httpClient.put<ResponseData>(this.url + "/" + microApp.id, microApp, httpOptions).subscribe((responseData: ResponseData) => {
                  if (!responseData.success) {
                        this.logger.error('MicroAppDaoImpl has error ' + responseData.errorMessage);
                  } else {
                        this.returnData('MicroAppDaoImpl', "updateMicroApp");
                  }
            });
      }

      batchInsertMicroApp(microAppList: MicroApp[]) {
            this.httpClient.post<ResponseData>(this.url + "/batch", microAppList, httpOptions).subscribe((responseData: ResponseData) => {
                  if (!responseData.success) {
                        this.logger.error('MicroAppDaoImpl has error ' + responseData.errorMessage);
                  } else {
                        this.returnData('MicroAppDaoImpl', "batchInsertMicroApp");
                  }
            });
      }

      batchUpdateMicroApp(microAppList: MicroApp[]) {
            this.httpClient.put<ResponseData>(this.url + "/batch", microAppList, httpOptions).subscribe((responseData: ResponseData) => {
                  if (!responseData.success) {
                        this.logger.error('MicroAppDaoImpl has error ' + responseData.errorMessage);
                  } else {
                        this.returnData('MicroAppDaoImpl', "batchUpdateMicroApp");
                  }
            });
      }

      batchDeleteMicroApp(microAppList: MicroApp[]) {
            let options = ({ headers: { 'Content-type': 'application/json;charset=utf-8' }, body: microAppList });
            this.httpClient.delete<ResponseData>(this.url + "/batch", options).subscribe((responseData: ResponseData) => {
                  if (!responseData.success) {
                        this.logger.error('MicroAppDaoImpl has error ' + responseData.errorMessage);
                  } else {
                        this.returnData('MicroAppDaoImpl', "batchDeleteMicroApp");
                  }
            });
      }
}

