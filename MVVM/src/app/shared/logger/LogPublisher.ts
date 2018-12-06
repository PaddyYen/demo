import { LogEntry } from "./LogService";
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { ResponseData } from "app/core/models/ResponseData";

export abstract class LogPublisher {

      location: string;

      abstract log(record: LogEntry): Observable<boolean>

      abstract clear(): Observable<boolean>;
}

export class LogConsole extends LogPublisher {

      log(entry: LogEntry): Observable<boolean> {
            // Log to console
            console.log(entry.buildLogString());
            return of(true);
      }
      clear(): Observable<boolean> {
            console.clear();
            return of(true);
      }
}

export class LogLocalStorage extends LogPublisher {

      constructor() {
            super();
            this.location = "logging";
      }

      // Append log entry to local storage
      log(entry: LogEntry): Observable<boolean> {
            let ret: boolean = false;
            let values: LogEntry[];
            try {
                  // Get previous values from local storage
                  values = JSON.parse(localStorage.getItem(this.location)) || [];
                  // Add new log entry to array
                  values.push(entry);
                  // Store array into local storage
                  localStorage.setItem(this.location, JSON.stringify(values));
                  // Set return value
                  ret = true;
            } catch (ex) {
                  // Display error in console
                  console.log(ex);
            }
            return of(ret);
      }

      // Clear all log entries from local storage
      clear(): Observable<boolean> {
            localStorage.removeItem(this.location);
            return of(true);
      }
}

export class LogWebApi extends LogPublisher {

      constructor(private httpClient: HttpClient) {
            super();
            this.location = "/api/logs";
      }

      // Add log entry to back end data store
      log(entry: LogEntry): Observable<boolean> {
            let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
            return this.httpClient.post(this.location, entry, httpOptions).pipe(
                  map((responseData: ResponseData) => responseData.success),
                  catchError(this.handleErrors)
            );
      }

      // Clear all log entries from local storage
      clear(): Observable<boolean> {
            // TODO: Call Web API to clear all values
            return of(true);
      }

      private handleErrors(error: any): Observable<any> {
            let errors: string[] = [];
            let msg: string = "";

            msg = "Status: " + error.status;
            msg += " - Status Text: " + error.statusText;
            if (error.message) {
                  msg += " - Exception Message: " +
                        error.message;
            }
            errors.push(msg);
            console.error('An error occurred', errors);

            return of(errors);
      }
}

export class LogPublisherConfig {
      loggerName: string;
      loggerLocation: string;
      isActive: boolean;
}

