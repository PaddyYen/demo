import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "app/shared/SharedModule";
import { AgentflowsettingComponent } from './agentflowsetting/AgentflowsettingComponent';
import { EntreprisesettingRouting } from "./EntrepriseAppmgmtRouting";

@NgModule({
      declarations: [
            AgentflowsettingComponent
      ],
      imports: [
            CommonModule,
            ReactiveFormsModule,
            SharedModule,
            EntreprisesettingRouting
      ],
      entryComponents: []
})
export class EntreprisesettingModule { }