import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalOrderCompletePage } from './modal-order-complete';

@NgModule({
  declarations: [
    ModalOrderCompletePage,
  ],
  imports: [
    IonicPageModule.forChild(ModalOrderCompletePage),
  ],
})
export class ModalOrderCompletePageModule {}
