import { Injectable } from '@angular/core';
import { LogPublisher, LogConsole, LogLocalStorage, LogWebApi, LogPublisherConfig } from "./LogPublisher";
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

const PUBLISHERS_FILE = "../../assets/log-publishers.json";

@Injectable({
      providedIn: 'root'
})
export class LogPublishersService {

      constructor(private httpClient: HttpClient) {
            // Build publishers arrays
            this.buildPublishers();
      }

      // Public properties
      publishers: LogPublisher[] = [];

      // Build publishers array
      buildPublishers(): void {
            let logPub: LogPublisher;
            this.getLoggers().subscribe(response => {
                  for (let pub of response.filter(p => p.isActive)) {
                        switch (pub.loggerName.toLowerCase()) {
                              case "console":
                                    logPub = new LogConsole();
                                    break;
                              case "localstorage":
                                    logPub = new LogLocalStorage();
                                    break;
                              case "webapi":
                                    logPub = new LogWebApi(this.httpClient);
                                    break;
                        }
                        // Set location of logging
                        logPub.location = pub.loggerLocation;
                        // Add publisher to array
                        this.publishers.push(logPub);
                  }
            });
      }

      getLoggers(): Observable<LogPublisherConfig[]> {
            return this.httpClient.get(PUBLISHERS_FILE).pipe(
                  map(response => response),
                  catchError(this.handleErrors)
            )
      }

      private handleErrors(error: any): Observable<any> {
            let errors: string[] = [];
            let msg: string = "";

            msg = "Status: " + error.status;
            msg += " - Status Text: " + error.statusText;
            if (error.message) {
                  msg += " - Exception Message: "
                        + error.message;
            }
            errors.push(msg);
            console.error('An error occurred', errors);
            return of(errors);
      }

}
