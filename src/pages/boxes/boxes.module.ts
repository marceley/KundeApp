import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BoxesPage } from './boxes';

@NgModule({
  declarations: [
    BoxesPage,
  ],
  imports: [
    IonicPageModule.forChild(BoxesPage),
  ],
})
export class BoxesPageModule {}
