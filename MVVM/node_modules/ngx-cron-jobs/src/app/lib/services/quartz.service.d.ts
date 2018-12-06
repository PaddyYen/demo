import { PosixService } from './posix.service';
import { DataService } from './data.service';
import { CronJobsFrequency, CronJobsSelectOption } from '../contracts/contracts';
export declare class QuartzService extends PosixService {
    protected dataService: DataService;
    constructor(dataService: DataService);
    protected getDaysOfWeek(): Array<CronJobsSelectOption>;
    fromCronWithDefault(value: String): CronJobsFrequency;
    fromCron(value: String): CronJobsFrequency;
    private fromCronQuartzInternal(cron, frequency);
    setCron(newValue: CronJobsFrequency): string;
}
