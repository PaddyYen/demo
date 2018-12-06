import { Injectable } from '@angular/core';
import { LogPublisher } from './LogPublisher';
import { LogPublishersService } from './LogPublishersService';

export enum LogLevel {
      All = 0,
      Debug = 1,
      Info = 2,
      Warn = 3,
      Error = 4,
      Fatal = 5,
      Off = 6
}

@Injectable({
      providedIn: 'root'
})
export class LogService {
      level: LogLevel = LogLevel.All;
      logWithDate: boolean = true;
      publishers: LogPublisher[];

      constructor(private publishersService: LogPublishersService) {
            this.publishers = this.publishersService.publishers;
      }

      private writeToLog(msg: string,
            level: LogLevel,
            params: any[]) {
            if (this.shouldLog(level)) {
                  let entry: LogEntry = new LogEntry();
                  entry.message = msg;
                  entry.level = level;
                  entry.extraInfo = params;
                  entry.logWithDate = this.logWithDate;
                  for (let logger of this.publishers) {
                        logger.log(entry).subscribe();
                        // logger.log(entry)
                        //       .subscribe(response =>
                        //             console.log(response));
                  }
            }
      }

      private shouldLog(level: LogLevel): boolean {
            let ret: boolean = false;
            if ((level >= this.level &&
                  level !== LogLevel.Off) ||
                  this.level === LogLevel.All) {
                  ret = true;
            }
            return ret;
      }

      debug(msg: string, ...optionalParams: any[]) {
            this.writeToLog(msg, LogLevel.Debug,
                  optionalParams);
      }

      info(msg: string, ...optionalParams: any[]) {
            this.writeToLog(msg, LogLevel.Info,
                  optionalParams);
      }

      warn(msg: string, ...optionalParams: any[]) {
            this.writeToLog(msg, LogLevel.Warn,
                  optionalParams);
      }

      error(msg: string, ...optionalParams: any[]) {
            this.writeToLog(msg, LogLevel.Error,
                  optionalParams);
      }

      fatal(msg: string, ...optionalParams: any[]) {
            this.writeToLog(msg, LogLevel.Fatal,
                  optionalParams);
      }

      log(msg: string, ...optionalParams: any[]) {
            this.writeToLog(msg, LogLevel.All,
                  optionalParams);
      }
}

export class LogEntry {
      entryDate: String = this.getTime(new Date());
      message: string = "";
      level: LogLevel = LogLevel.Debug;
      extraInfo: any[] = [];
      logWithDate: boolean = true;

      buildLogString(): string {
            let ret: string = "";
            if (this.logWithDate) {
                  ret = new Date() + " - ";
            }
            ret += "Type: " + LogLevel[this.level];
            ret += " - Message: " + this.message;
            if (this.extraInfo.length) {
                  ret += " - Extra Info: "
                        + this.formatParams(this.extraInfo);
            }
            return ret;
      }

      private formatParams(params: any[]): string {
            let ret: string = params.join(",");
            // Is there at least one object in the array?
            if (params.some(p => typeof p == "object")) {
                  ret = "";
                  // Build comma-delimited string
                  for (let item of params) {
                        ret += JSON.stringify(item) + ",";
                  }
            }
            return ret;
      }

      private getTime(d : Date) {
          return  new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().replace("T", " ").replace(/\..+$/,"");
      }

     
}