import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsIngredientPage } from './details-ingredient';

@NgModule({
  declarations: [
    DetailsIngredientPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsIngredientPage),
  ],
})
export class DetailsIngredientPageModule {}
