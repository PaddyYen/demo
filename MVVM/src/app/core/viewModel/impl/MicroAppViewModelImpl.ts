import { Injectable, OnDestroy } from "@angular/core";
import { ObserverClass } from "app/shared/ObserverClass";
import { MicroAppService } from "app/core/services/MicroAppService";
import { MicroApp } from "app/core/models/MicroApp";

@Injectable({
      providedIn: 'root'
})
export class MicroAppViewModelImpl extends ObserverClass implements OnDestroy {

      constructor(private microAppService: MicroAppService) {
            super();
            this.microAppService.subscribe("getAllMicroApps", this.getAllMicroAppsRes.bind(this));
            this.microAppService.subscribe("getMicroAppById", this.getMicroAppByIdRes.bind(this));
            this.methodMap.set("getAllMicroApps", new Array);
            this.methodMap.set("getMicroAppById", new Array);
      }

      getAllMicroApps() {
            this.microAppService.getAllMicroApps();
      }

      getAllMicroAppsRes(microAppList: MicroApp[]) {
            this.returnData('MicroAppViewModelImpl', "getAllMicroApps", microAppList);
      }

      getMicroAppById(microApp: MicroApp) {
            this.microAppService.getMicroAppById(microApp);
      }

      getMicroAppByIdRes(microApp: MicroApp) {
            this.returnData('MicroAppViewModelImpl', "getMicroAppById", microApp);
      }

      deleteMicroApp(microApp: MicroApp) {
            this.microAppService.deleteMicroApp(microApp);
      }

      insertMicroApp(microApp: MicroApp) {
            this.microAppService.insertMicroApp(microApp);
      }

      updateMicroApp(microApp: MicroApp) {
            this.microAppService.updateMicroApp(microApp);
      }

      batchInsertMicroApp(microAppList: MicroApp[]) {
            this.microAppService.batchInsertMicroApp(microAppList);
      }

      batchUpdateMicroApp(microAppList: MicroApp[]) {
            this.microAppService.batchUpdateMicroApp(microAppList);
      }

      batchDeleteMicroApp(microAppList: MicroApp[]) {
            this.microAppService.batchDeleteMicroApp(microAppList);
      }

      ngOnDestroy() {
            this.microAppService.unsubscribe("getAllMicroApps", this.getAllMicroAppsRes.bind(this));
            this.microAppService.unsubscribe("getMicroAppById", this.getMicroAppByIdRes.bind(this));
      }

}