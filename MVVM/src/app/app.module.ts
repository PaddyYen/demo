import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//i18n
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//progressbar
import { NgProgressModule } from 'ngx-progressbar';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app.routes";
//Component
import { LoginComponent } from './components/login/LoginComponent';
//Intercept Service
import { LoginInterceptorService } from './core/interceptors/LoginInterceptorService';
//Modules
import { SharedModule } from './shared/SharedModule';
import { AppviewsModule } from "./views/appviews/appviews.module";
// App views
import { DashboardsModule } from "./views/dashboards/dashboards.module";


export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DashboardsModule,
    AppviewsModule,
    SharedModule,
    AppRoutingModule,
    TranslateModule.forRoot({ loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient] } }),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgProgressModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
