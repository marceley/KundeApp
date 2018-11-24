import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsMealboxPage } from './details-mealbox';

@NgModule({
  declarations: [
    DetailsMealboxPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsMealboxPage),
  ],
})
export class DetailsMealboxPageModule {}
