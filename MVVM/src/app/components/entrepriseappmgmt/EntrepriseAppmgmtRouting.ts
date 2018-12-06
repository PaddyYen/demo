import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "app/core/guards/auth.guard";
import { BasicLayoutComponent } from "../common/layouts/basicLayout.component";
import { MicroAppComponent } from "./microapp/MicroAppComponent";

const entreprisemgmtRouting: Routes = [
      {
            path: '', component: BasicLayoutComponent,
            children: [
              { path: 'appList', component: MicroAppComponent,  canActivate:[AuthGuard] }
            ]
      }
];
@NgModule({
      imports: [
            RouterModule.forChild(entreprisemgmtRouting)
      ],
      exports: [RouterModule]
})
export class EntrepriseAppmgmtRouting { }