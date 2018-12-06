import { Routes, RouterModule } from "@angular/router";

// import {Dashboard1Component} from "./views/dashboards/dashboard1.component";
// import {Dashboard2Component} from "./views/dashboards/dashboard2.component";
// import {Dashboard3Component} from "./views/dashboards/dashboard3.component";
// import {Dashboard4Component} from "./views/dashboards/dashboard4.component";
// import {Dashboard5Component} from "./views/dashboards/dashboard5.component";

import { BlankLayoutComponent } from "./components/common/layouts/blankLayout.component";
// import {TopNavigationLayoutComponent} from "./components/common/layouts/topNavigationlayout.component";

//login
import { LoginComponent } from "./components/login/LoginComponent";
import { NgModule } from "@angular/core";
import { EntreprisesettingModule } from "./components/entreprisesetting/EntreprisesettingModule";

export const ROUTES: Routes = [
  // Main redirect, and need to put first line.
  { path: '', redirectTo: '/access/org', pathMatch: 'full' },
  // App views
  // {
  //   path: 'dashboards', component: BasicLayoutComponent,
  //   children: [
  //     {path: 'dashboard1', component: Dashboard1Component},
  //     {path: 'dashboard2', component: Dashboard2Component},
  //     {path: 'dashboard3', component: Dashboard3Component},
  //     {path: 'dashboard4', component: Dashboard4Component},
  //     {path: 'dashboard5', component: Dashboard5Component}
  //   ]
  // },
  {
    path: '', component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: 'access', loadChildren: './components/authoritymgmt/AuthoritymgmtModule#AuthoritymgmtModule'
  },
  {
    path: 'apps', loadChildren: './components/entrepriseappmgmt/EntrepriseAppmgmtModule#EntrepriseAppmgmtModule'

  },
  {
    path: 'message', loadChildren: './components/messagemgmt/MessagemgmtModule#MessagemgmtModule'

  },
  {
    path: 'entsetting', loadChildren: './components/entreprisesetting/EntreprisesettingModule#EntreprisesettingModule'

  },
  // Handle all other routes
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


