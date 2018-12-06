import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "app/core/guards/auth.guard";
import { BasicLayoutComponent } from "../common/layouts/basicLayout.component";
import { AgentflowsettingComponent } from "./agentflowsetting/AgentflowsettingComponent";

const entreprisesettingRouting: Routes = [
      {
            path: '', component: BasicLayoutComponent,
            children: [
                  { path: 'afsetting', component: AgentflowsettingComponent, canActivate: [AuthGuard] }
            ]
      }
];
@NgModule({
      imports: [
            RouterModule.forChild(entreprisesettingRouting)
      ],
      exports: [RouterModule]
})
export class EntreprisesettingRouting { }