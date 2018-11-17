import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { NGXLogger } from 'ngx-logger';

export type HandleError = <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandler {

  constructor(private logger: NGXLogger) { }

  /** Create handleError function that already knows the service name */
  createHandleError = (serviceName = '') => <T>
    (operation = 'operation', result = {} as T) => this.handleError(serviceName, operation, result);

  /**
   * @param serviceName: name of the data service
   * @param operation: name of the failed operation
   * @param result: optional value to return as the observable result
   */
  handleError<T>(serviceName = '', operation = 'operation', result = {} as T) {

    return (error: HttpErrorResponse): Observable<T> => {
      // Todo -> Send the error to remote logging infrastructure
      this.logger.debug(serviceName + ' ' + operation + ' failed:' + error.message); // log to console instead

      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
        `{error code: ${error.status}, body: "${error.message}"}`;

      // -> Return a safe result.
      return of(result);
    };
  }
}