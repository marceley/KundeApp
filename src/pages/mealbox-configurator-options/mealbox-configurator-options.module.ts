import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealboxConfiguratorOptionsPage } from './mealbox-configurator-options';

@NgModule({
  declarations: [
    MealboxConfiguratorOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MealboxConfiguratorOptionsPage),
  ],
})
export class MealboxConfiguratorOptionsPageModule {}
