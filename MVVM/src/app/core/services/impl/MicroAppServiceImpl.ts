import { Injectable, OnDestroy } from '@angular/core';
import { ObserverClass } from 'app/shared/ObserverClass';
import { MicroAppDao } from 'app/core/dao/MicroAppDao';
import { MicroApp } from 'app/core/models/MicroApp';

@Injectable({
      providedIn: 'root'
})
export class MicroAppServiceImpl extends ObserverClass implements OnDestroy {

      constructor(private microAppDao: MicroAppDao) {
            super();
            this.microAppDao.subscribe("getAllMicroApps", this.getAllMicroAppsRes.bind(this));
            this.microAppDao.subscribe("getMicroAppById", this.getMicroAppByIdRes.bind(this));
            this.microAppDao.subscribe("insertMicroApp", this.insertMicroAppRes.bind(this));
            this.microAppDao.subscribe("deleteMicroApp", this.deleteMicroAppRes.bind(this));
            this.microAppDao.subscribe("updateMicroApp", this.updateMicroAppRes.bind(this));
            this.microAppDao.subscribe("batchInsertMicroApp", this.batchInsertMicroAppRes.bind(this));
            this.microAppDao.subscribe("batchUpdateMicroApp", this.batchUpdateMicroAppRes.bind(this));
            this.microAppDao.subscribe("batchDeleteMicroApp", this.batchDeleteMicroAppRes.bind(this));
            this.methodMap.set("getAllMicroApps", new Array);
            this.methodMap.set("getMicroAppById", new Array);
      }

      getAllMicroApps() {
            this.microAppDao.getAllMicroApps();
      }

      getAllMicroAppsRes(microAppList: MicroApp[]) {
            this.returnData('MicroAppServiceImpl', "getAllMicroApps", microAppList);
      }

      getMicroAppById(microApp: MicroApp) {
            this.microAppDao.getMicroAppById(microApp);
      }

      getMicroAppByIdRes(microApp: MicroApp) {
            this.returnData('MicroAppServiceImpl', "getMicroAppById", microApp);
      }

      deleteMicroApp(microApp: MicroApp) {
            this.microAppDao.deleteMicroApp(microApp);
      }

      deleteMicroAppRes() {
            this.microAppDao.getAllMicroApps();
      }

      insertMicroApp(microApp: MicroApp) {
            this.microAppDao.insertMicroApp(microApp);
      }

      insertMicroAppRes() {
            this.microAppDao.getAllMicroApps();
      }

      updateMicroApp(microApp: MicroApp) {
            this.microAppDao.updateMicroApp(microApp);
      }

      updateMicroAppRes() {
            this.microAppDao.getAllMicroApps();
      }

      batchInsertMicroApp(microAppList: MicroApp[]) {
            this.microAppDao.batchInsertMicroApp(microAppList);
      }

      batchInsertMicroAppRes() {
            this.microAppDao.getAllMicroApps();
      }

      batchUpdateMicroApp(microAppList: MicroApp[]) {
            this.microAppDao.batchUpdateMicroApp(microAppList);
      }

      batchUpdateMicroAppRes() {
            this.microAppDao.getAllMicroApps();
      }

      batchDeleteMicroApp(microAppList: MicroApp[]) {
            this.microAppDao.batchDeleteMicroApp(microAppList);
      }

      batchDeleteMicroAppRes() {
            this.microAppDao.getAllMicroApps();
      }

      ngOnDestroy() {
            this.microAppDao.unsubscribe("getAllMicroApps", this.getAllMicroAppsRes.bind(this));
            this.microAppDao.unsubscribe("getMicroAppById", this.getMicroAppByIdRes.bind(this));
            this.microAppDao.unsubscribe("insertMicroApp", this.insertMicroAppRes.bind(this));
            this.microAppDao.unsubscribe("deleteMicroApp", this.deleteMicroAppRes.bind(this));
            this.microAppDao.unsubscribe("updateMicroApp", this.updateMicroAppRes.bind(this));
            this.microAppDao.unsubscribe("batchInsertMicroApp", this.batchInsertMicroAppRes.bind(this));
            this.microAppDao.unsubscribe("batchUpdateMicroApp", this.batchUpdateMicroAppRes.bind(this));
            this.microAppDao.unsubscribe("batchDeleteMicroApp", this.batchDeleteMicroAppRes.bind(this));
      }


}