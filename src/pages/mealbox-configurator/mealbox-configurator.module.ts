import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealboxConfiguratorPage } from './mealbox-configurator';

@NgModule({
  declarations: [
    MealboxConfiguratorPage,
  ],
  imports: [
    IonicPageModule.forChild(MealboxConfiguratorPage),
  ],
})
export class MealboxConfiguratorPageModule {}
