import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "app/shared/SharedModule";
import { RobotComponent } from './robot/RobotComponent';
import { MessagemgmtRouting } from "./MessagemgmtRouting";

@NgModule({
      declarations: [
            RobotComponent
      ],
      imports: [
            CommonModule,
            ReactiveFormsModule,
            SharedModule,
            MessagemgmtRouting
      ],
      entryComponents: []
})
export class MessagemgmtModule { }