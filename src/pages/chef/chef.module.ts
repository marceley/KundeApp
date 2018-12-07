import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChefPage } from './chef';
import { IonicImageLoader } from 'ionic-image-loader';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ChefPage,
  ],
  imports: [
    IonicPageModule.forChild(ChefPage),
    TranslateModule.forChild(),
    IonicImageLoader
  ],
})
export class ChefPageModule {}
