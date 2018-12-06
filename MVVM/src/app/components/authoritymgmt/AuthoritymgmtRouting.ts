import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "app/core/guards/auth.guard";
import { BasicLayoutComponent } from "../common/layouts/basicLayout.component";
import { AccessComponent } from "./access/AccessComponent";
import { ChatgroupComponent } from "./chatgroup/ChatgroupComponent";
import { OrganizationComponent } from "./organization/OrganizationComponent";

const authoritymgmtRoutinges: Routes = [
      {
            path: '', component: BasicLayoutComponent,
            children: [
                  { path: 'account', component: AccessComponent, canActivate: [AuthGuard] },
                  { path: 'org', component: OrganizationComponent, canActivate: [AuthGuard]},
                  { path: 'group', component: ChatgroupComponent, canActivate: [AuthGuard]}
            ]
      }
];
@NgModule({
      imports: [
            RouterModule.forChild(authoritymgmtRoutinges)
      ],
      exports: [RouterModule]
})
export class AuthoritymgmtRouting { }