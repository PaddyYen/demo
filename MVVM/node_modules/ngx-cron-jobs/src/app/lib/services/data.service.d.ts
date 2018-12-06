import { CronJobsConfig, CronJobsSelectOption, CronJobsValidationConfig } from '../contracts/contracts';
export declare class DataService {
    private defaultConfig;
    private defaultValidateConfig;
    private daysOfWeekPosix;
    private daysOfWeekQuartz;
    private numeral;
    private _months;
    private _baseFrequency;
    private _hours;
    private _minutes;
    readonly baseFrequency: Array<CronJobsSelectOption>;
    readonly daysOfMonth: Array<CronJobsSelectOption>;
    readonly months: Array<CronJobsSelectOption>;
    readonly hours: Array<CronJobsSelectOption>;
    readonly minutes: Array<CronJobsSelectOption>;
    constructor();
    getConfig(config?: CronJobsConfig): CronJobsConfig;
    getValidate(validateConfig?: CronJobsValidationConfig): CronJobsValidationConfig;
    getDaysOfWeek(quartz?: Boolean): Array<CronJobsSelectOption>;
}
