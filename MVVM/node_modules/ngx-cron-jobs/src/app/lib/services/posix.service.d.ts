import { CronJobsBaseFrequency, CronJobsFrequency, CronJobsSelectOption } from '../contracts/contracts';
import { DataService } from './data.service';
export declare class PosixService {
    protected dataService: DataService;
    baseFrequency: CronJobsBaseFrequency;
    private frequencyData;
    constructor(dataService: DataService);
    getDefaultFrequency(): CronJobsFrequency;
    getDefaultFrequenceWithDefault(): CronJobsFrequency;
    protected getDaysOfWeek(): Array<CronJobsSelectOption>;
    fromCronWithDefault(value: String): CronJobsFrequency;
    fromCron(value: String): CronJobsFrequency;
    private fromCronInternal(cron, frequency);
    setCron(value: CronJobsFrequency): string;
    getValueArray(value: string): Array<number>;
}
