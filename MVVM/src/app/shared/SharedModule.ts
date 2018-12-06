import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CompareValidatorDirective } from './directives/CompareValidatorDirective';
import { MaterialModule } from './MaterialModule';
import { LayoutsModule } from 'app/components/common/layouts/layouts.module';

@NgModule({
  imports: [
    MaterialModule,
    LayoutsModule
  ],
  exports: [
    CommonModule,
    TranslateModule,
    MaterialModule,
    CompareValidatorDirective
  ],
  declarations: [CompareValidatorDirective],
  providers: [
  ],
  entryComponents: []
})
export class SharedModule { }
