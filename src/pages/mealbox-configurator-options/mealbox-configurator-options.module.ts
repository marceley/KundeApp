import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealboxConfiguratorOptionsPage } from './mealbox-configurator-options';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MealboxConfiguratorOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MealboxConfiguratorOptionsPage),
    TranslateModule.forChild(),
  ],
})
export class MealboxConfiguratorOptionsPageModule {}
