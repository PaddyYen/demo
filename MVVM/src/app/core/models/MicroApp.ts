export class MicroApp {
      id?: number;
      parentId?: number
      name?: string;
      url?: string;
      synopsis?: string;
      queues: number;
      appType: number;
      subMicroAppList: any[];
      constructor(microApp: MicroApp = {} as MicroApp) {
          this.id = microApp.id;
          this.parentId = microApp.parentId;
          this.name = microApp.name;
          this.url = microApp.url;
          this.synopsis = microApp.synopsis;
          this.queues = microApp.queues;
          this.appType = microApp.appType;
          this.subMicroAppList = microApp.subMicroAppList;
      }
  }