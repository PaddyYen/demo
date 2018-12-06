import { OnDestroy } from "@angular/core";
import { LogService } from "./logger/LogService";

export abstract class ObserverClass implements OnDestroy {

      methodMap: Map<string, any> = new Map();

      constructor(public logger?: LogService) { }

      subscribe(methodName: string, method: any) {
            let tmpList: Array<any> = this.methodMap.get(methodName);
            if (tmpList != undefined) {
                  tmpList.push(method);
            }
      }

      unsubscribe(methodName: string, method: any) {
            let methodList: Array<string> = this.methodMap.get(methodName);
            for (let i = 0; i < methodList.length; i++) {
                  if (methodList[i].toString === method.toString) {
                        methodList.splice(i, 1);
                  }
            }
      }

      returnData(objName: string, methodName: string, data?: any) {
            let functionArray: Array<any> = this.methodMap.get(methodName);
            functionArray.forEach(method => {
                  new Promise(resolve => {
                        try {
                              method(data);
                        } catch (err) {
                              this.logger.error(objName + ' has error ' + err);
                        }
                  });
            });
      }

      ngOnDestroy() {
            this.methodMap = null;
      }

}