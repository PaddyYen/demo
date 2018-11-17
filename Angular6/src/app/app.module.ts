import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {RouterModule} from "@angular/router";
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ROUTES} from "./app.routes";
import { AppComponent } from './app.component';

// App views
import {DashboardsModule} from "./views/dashboards/dashboards.module";
import {AppviewsModule} from "./views/appviews/appviews.module";

//Modules
import {LayoutsModule} from "./components/common/layouts/layouts.module";
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './shared/material.module';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ToastrModule } from 'ngx-toastr';

//i18n
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

//angular-tree-component
import { TreeModule } from 'angular-tree-component';

//Service
import { LoginInterceptorService } from './core/interceptors/login-interceptor.service';

//progressbar
import { NgProgressModule } from 'ngx-progressbar';

//Component
import { TabsComponent } from './components/tabs/tabs.component';
import { LoginComponent } from './components/login/login.component';
import { OrganizationComponent } from './components/organization/organization.component';
import { TabModalComponent } from './components/tabs/tab-modal/tab-modal.component';
import { SubtabModalComponent } from './components/tabs/tab-modal/subtab-modal.component';
import { OrgSettingModelComponent } from './components/organization/org-setting-model/org-setting-model.component';
import { AccessComponent } from './components/access/access.component';
import { AccessModalComponent } from './components/access/access-modal/access-modal.component';

export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    LoginComponent,
    OrganizationComponent,
    TabModalComponent,
    SubtabModalComponent,
    OrgSettingModelComponent,
    AccessComponent,
    AccessModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DashboardsModule,
    LayoutsModule,
    AppviewsModule,
    SharedModule,
    MaterialModule,
    RouterModule.forRoot(ROUTES),
    TranslateModule.forRoot({loader: { provide: TranslateLoader, useFactory: createTranslateLoader, deps: [HttpClient]}}),
    LoggerModule.forRoot({serverLoggingUrl: '/api/logs', level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR}),
    BrowserAnimationsModule,
    TreeModule.forRoot(),
    ToastrModule.forRoot(),
    NgProgressModule
  ],
  providers: [ 
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: LoginInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [TabModalComponent, SubtabModalComponent, OrgSettingModelComponent, AccessModalComponent]
})
export class AppModule { }
