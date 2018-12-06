import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "app/shared/SharedModule";
import { EntrepriseAppmgmtRouting } from "./EntrepriseAppmgmtRouting";
import { MicroAppComponent } from "./microapp/MicroAppComponent";
import { MicroAppModalComponent } from "./microapp/microappmodal/MicroAppModalComponent";
import { SubMicroAppModalComponent } from "./microapp/submicroappmodal/SubMicroAppModalComponent";

@NgModule({
      declarations: [
            MicroAppComponent,
            MicroAppModalComponent,
            SubMicroAppModalComponent
      ],
      imports: [
            CommonModule,
            ReactiveFormsModule,
            SharedModule,
            EntrepriseAppmgmtRouting
      ],
      entryComponents: [MicroAppModalComponent, SubMicroAppModalComponent]
})
export class EntrepriseAppmgmtModule { }