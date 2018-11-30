import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealboxesPage } from './mealboxes';
import { IonicImageLoader } from 'ionic-image-loader';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MealboxesPage,
  ],
  imports: [
    IonicPageModule.forChild(MealboxesPage),
    TranslateModule.forChild(),
    IonicImageLoader
  ],
})
export class MealboxesPageModule {}
