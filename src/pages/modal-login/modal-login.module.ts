import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalLoginPage } from './modal-login';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ModalLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalLoginPage),
    TranslateModule.forChild(),
  ],
})
export class ModalLoginPageModule {}
