import { Injectable } from '@angular/core';
import { MicroAppDaoImpl } from './impl/MicroAppDaoImpl';
import { ObserverInterface } from 'app/shared/ObserverInterface';
import { MicroApp } from '../models/MicroApp';


@Injectable({
      providedIn: 'root',
      useExisting: MicroAppDaoImpl
})
export abstract class MicroAppDao extends ObserverInterface {

      abstract getAllMicroApps(): void;

      abstract getMicroAppById(microApp: MicroApp): void;

      abstract deleteMicroApp(microApp: MicroApp): void;

      abstract insertMicroApp(microApp: any): void;

      abstract updateMicroApp(microApp: MicroApp): void;

      abstract batchInsertMicroApp(microAppList: MicroApp[]): void;

      abstract batchUpdateMicroApp(microAppList: MicroApp[]): void;

      abstract batchDeleteMicroApp(microAppList: MicroApp[]): void;

}

