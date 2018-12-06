import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "app/core/guards/auth.guard";
import { BasicLayoutComponent } from "../common/layouts/basicLayout.component";
import { RobotComponent } from "./robot/RobotComponent";

const messagemgmtRouting: Routes = [
      {
            path: '', component: BasicLayoutComponent,
            children: [
                  { path: 'robot', component: RobotComponent,  canActivate:[AuthGuard] }
            ]
      }
];
@NgModule({
      imports: [
            RouterModule.forChild(messagemgmtRouting)
      ],
      exports: [RouterModule]
})
export class MessagemgmtRouting { }