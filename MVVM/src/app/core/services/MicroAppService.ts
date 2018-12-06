import { Injectable } from '@angular/core';
import { MicroAppServiceImpl } from './impl/MicroAppServiceImpl';
import { ObserverInterface } from 'app/shared/ObserverInterface';
import { MicroApp } from '../models/MicroApp';

@Injectable({
      providedIn: 'root',
      useExisting: MicroAppServiceImpl
})
export abstract class MicroAppService extends ObserverInterface {

      abstract getAllMicroApps(): void;

      abstract getMicroAppById(microApp: MicroApp): void;

      abstract deleteMicroApp(microApp: MicroApp): void;

      abstract insertMicroApp(microApp: MicroApp): void;

      abstract updateMicroApp(microApp: MicroApp): void;

      abstract batchInsertMicroApp(microAppList: MicroApp[]): void;

      abstract batchUpdateMicroApp(microAppList: MicroApp[]): void;

      abstract batchDeleteMicroApp(microAppList: MicroApp[]): void;
}