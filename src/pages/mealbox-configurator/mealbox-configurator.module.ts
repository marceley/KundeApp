import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealboxConfiguratorPage } from './mealbox-configurator';
import { IonicImageLoader } from 'ionic-image-loader';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MealboxConfiguratorPage,
  ],
  imports: [
    IonicPageModule.forChild(MealboxConfiguratorPage),
    TranslateModule.forChild(),
    IonicImageLoader
  ],
})
export class MealboxConfiguratorPageModule {}
