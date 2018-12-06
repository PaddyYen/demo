export class QuartzConfig {
  groupName: string;
  jobName: string;
  cronExpression: string;
  fullEntity:string;
 
  constructor(quartzConfig: QuartzConfig = {} as QuartzConfig) {
    this.groupName = quartzConfig.groupName;
    this.jobName = quartzConfig.jobName;
    this.cronExpression = quartzConfig.cronExpression;
    this.fullEntity = quartzConfig.fullEntity;
  }
}

