import { FcmProvider } from './../../providers/fcm/fcm';
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

  pushTopicCatalog: boolean;
  pushTopicArrangements: boolean;
  firebaseToken: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider, private fcmProvider: FcmProvider) {

  }

  subscribeToPushTopic (topic){
    this.fcmProvider.getToken().then(() => {
      console.log("Subscribe to ", topic);
      if(topic === "catalog"){
        console.log(this.pushTopicCatalog);
        if(this.pushTopicCatalog){
          this.fcmProvider.subscribeToTopic(topic);
        } else {
          this.fcmProvider.unsubscribeToTopic(topic);
        }
      } else if(topic === "arrangements"){
        console.log(this.pushTopicArrangements);
        if(this.pushTopicArrangements){
          this.fcmProvider.subscribeToTopic(topic);
        } else {
          this.fcmProvider.unsubscribeToTopic(topic);
        }
      }
    });
  }

  getPushMessages(){
    this.apiProvider.getPushMessages().subscribe(data => {
      console.log("---getting pushes", data["d"][0].Subscriptions);
      this.groups = data["d"];
    });
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad SettingsPage');
    this.fcmProvider.setScreenName("Settings");
    this.getPushMessages(); // TODO: where to get token?
  }



}
