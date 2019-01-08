import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';

import { NowPage } from '../now/now';
import { BoxesPage } from '../boxes/boxes';
import { MealboxesPage } from '../mealboxes/mealboxes';
import { ExtrasPage } from '../extras/extras';
import { AccountPage } from '../account/account';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NowPage;
  tab2Root = BoxesPage;
  tab3Root = MealboxesPage;
  tab4Root = ExtrasPage;
  tab5Root = AccountPage;

  constructor(
    public apiProvider: ApiProvider) {
    this.apiProvider.tryAutoLogin();
  }

  ionViewDidLoad(){
    
  }
}
