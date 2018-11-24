import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MealboxesPage } from './mealboxes';

@NgModule({
  declarations: [
    MealboxesPage,
  ],
  imports: [
    IonicPageModule.forChild(MealboxesPage),
  ],
})
export class MealboxesPageModule {}
