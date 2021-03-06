import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  readonly token: string = 'token';
  readonly loginUrl: string = 'login';
  readonly tabUrl: string = '/' + 'tabs';
  readonly orgUrl: string = '/' + 'org';
}
