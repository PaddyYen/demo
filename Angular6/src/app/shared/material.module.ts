import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatRadioModule } from "@angular/material";


//Material Table
import { MatTableModule, MatSortModule, MatPaginatorModule } from '@angular/material';

import { MatTabsModule } from '@angular/material';

@NgModule({
  imports: [
  ],
  exports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatTabsModule,
    MatRadioModule
  ],
  declarations: [],
  providers: [
    // {provide: ModalService, useClass: MatDialogModule}
  ]
 
})
export class MaterialModule { }
