import { NgModule } from '@angular/core';

import { ModalComponent } from './modal/modal.component';
import { ModalService } from '../core/services/modal.service';
import { SuperPlaceholderDirective } from './directives/super-placeholder.directive';

@NgModule({
  imports: [
  ],
  exports: [
    ModalComponent,
    SuperPlaceholderDirective
  ],
  declarations: [ModalComponent, SuperPlaceholderDirective],
  providers: [
    ModalService
  ],
  entryComponents: []
})
export class SharedModule { }
