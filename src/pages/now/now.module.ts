import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { NowPage } from './now';

@NgModule({
  declarations: [
    NowPage,
  ],
  imports: [
    IonicPageModule.forChild(NowPage),
    TranslateModule.forChild()
  ],
})
export class NowPageModule {}
