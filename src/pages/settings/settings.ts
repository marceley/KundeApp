import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  loading: Boolean = true;

  error: Boolean = true;
  errorMessage: any;

  test: boolean = true;

  groups: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider) {

  }

  getPushMessages(){
    this.apiProvider.getPushMessages().subscribe(data => {
      console.log("getting pushes", data);
      this.groups = data["d"];
    });
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad SettingsPage');
    this.getPushMessages(); // TODO: where to get token?
  }

}
