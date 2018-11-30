import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExtrasPage } from './extras';
import { IonicImageLoader } from 'ionic-image-loader';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ExtrasPage,
  ],
  imports: [
    IonicPageModule.forChild(ExtrasPage),
    TranslateModule.forChild(),
    IonicImageLoader
  ],
})
export class ExtrasPageModule {}
