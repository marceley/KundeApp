import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalSelectPersonsPage } from './modal-select-persons';

@NgModule({
  declarations: [
    ModalSelectPersonsPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalSelectPersonsPage),
  ],
})
export class ModalSelectPersonsPageModule {}
