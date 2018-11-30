import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BoxesPage } from './boxes';
import { IonicImageLoader } from 'ionic-image-loader';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    BoxesPage,
  ],
  imports: [
    IonicPageModule.forChild(BoxesPage),
    TranslateModule.forChild(),
    IonicImageLoader
  ],
})
export class BoxesPageModule {}
