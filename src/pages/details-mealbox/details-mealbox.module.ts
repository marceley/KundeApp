import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsMealboxPage } from './details-mealbox';
import { IonicImageLoader } from 'ionic-image-loader';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DetailsMealboxPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsMealboxPage),
    TranslateModule.forChild(),
    IonicImageLoader
  ]
})
export class DetailsMealboxPageModule {}
