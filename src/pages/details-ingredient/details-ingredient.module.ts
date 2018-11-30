import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsIngredientPage } from './details-ingredient';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DetailsIngredientPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsIngredientPage),
    TranslateModule.forChild(),
  ],
})
export class DetailsIngredientPageModule {}
