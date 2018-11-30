import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { NowPage } from './now';
import { IonicImageLoader } from 'ionic-image-loader';

@NgModule({
  declarations: [
    NowPage,
  ],
  imports: [
    IonicPageModule.forChild(NowPage),
    TranslateModule.forChild(),
    IonicImageLoader
  ],
})
export class NowPageModule {}
