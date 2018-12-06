import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TreeModule } from "angular-tree-component";
import { SharedModule } from "app/shared/SharedModule";
import { AccessModalComponent } from "./access/access-modal/AccessModalComponent";
import { AccessComponent } from "./access/AccessComponent";
import { AuthoritymgmtRouting } from "./AuthoritymgmtRouting";
import { ChatgroupComponent } from './chatgroup/ChatgroupComponent';
import { OrgSettingModelComponent } from "./organization/org-setting-model/OrgSettingModelComponent";
import { OrganizationComponent } from "./organization/OrganizationComponent";

@NgModule({
      declarations: [
            OrganizationComponent,
            OrgSettingModelComponent,
            AccessComponent,
            AccessModalComponent,
            ChatgroupComponent
      ],
      imports: [
            CommonModule,
            ReactiveFormsModule,
            AuthoritymgmtRouting,
            TreeModule.forRoot(),
            SharedModule,
      ],
      entryComponents: [OrgSettingModelComponent, AccessModalComponent]
})
export class AuthoritymgmtModule { }