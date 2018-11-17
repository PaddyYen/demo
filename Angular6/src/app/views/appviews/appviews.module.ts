import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

import {LoginComponent} from "./login.component";

import {PeityModule } from '../../components/charts/peity';
import {SparklineModule } from '../../components/charts/sparkline';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    PeityModule,
    SparklineModule
  ],
  exports: [
    LoginComponent
  ],
})

export class AppviewsModule {
}
