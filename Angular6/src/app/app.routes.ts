import {Routes} from "@angular/router";

import {Dashboard1Component} from "./views/dashboards/dashboard1.component";
import {Dashboard2Component} from "./views/dashboards/dashboard2.component";
import {Dashboard3Component} from "./views/dashboards/dashboard3.component";
import {Dashboard4Component} from "./views/dashboards/dashboard4.component";
import {Dashboard41Component} from "./views/dashboards/dashboard41.component";
import {Dashboard5Component} from "./views/dashboards/dashboard5.component";

import {BlankLayoutComponent} from "./components/common/layouts/blankLayout.component";
import {BasicLayoutComponent} from "./components/common/layouts/basicLayout.component";
// import {TopNavigationLayoutComponent} from "./components/common/layouts/topNavigationlayout.component";

//login
import {LoginComponent} from "./components/login/login.component";

//Tabs
import { TabsComponent } from './components/tabs/tabs.component';

import { AuthGuard } from "./core/guards/auth.guard";

//Organization
import { OrganizationComponent } from './components/organization/organization.component';

import { AccessComponent } from './components/access/access.component';


export const ROUTES:Routes = [
  // Main redirect
  {path: '', redirectTo: 'org', pathMatch: 'full'},

  // App views
  {
    path: 'dashboards', component: BasicLayoutComponent,
    children: [
      {path: 'dashboard1', component: Dashboard1Component},
      {path: 'dashboard2', component: Dashboard2Component},
      {path: 'dashboard3', component: Dashboard3Component},
      {path: 'dashboard4', component: Dashboard4Component},
      {path: 'dashboard5', component: Dashboard5Component}
    ]
  },
  {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      { path: 'tabs', component: TabsComponent,  canActivate:[AuthGuard] }
    ],
  },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      { path: 'org', component: OrganizationComponent,  canActivate:[AuthGuard] }
    ],
  },
  {
    path: '', component: BasicLayoutComponent,
    children: [
      { path: 'access', component: AccessComponent,  canActivate:[AuthGuard] }
    ],
  },
  // Handle all other routes
  {path: '**',  redirectTo: 'login'}
];
