import { Firebase } from '@ionic-native/firebase';
import { FcmProvider } from './../../providers/fcm/fcm';
import { Platform, ToastController } from 'ionic-angular';

import { ModalLoginPage } from './../modal-login/modal-login';
import { SettingsPage } from '../settings/settings';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  username: string;
  password: string;

  isAuthenticated: boolean = false;

  lines: any;
  dates: Array<Object> = [];
  groups: any;
  subscriptions: any;

  rootData: any;
  deviceLocale: any;
  deviceLanguage: any;
  devicePlatform: any;
  deviceHasCordova: any;

  loading: Boolean = true;

  error: Boolean = true;
  errorMessage: any;

  constructor(
    public fcm: FcmProvider,
    public toastCtrl: ToastController,
    public platform: Platform, 
    public navCtrl: NavController, 
    public modalCtrl: ModalController, 
    public navParams: NavParams, 
    public apiProvider: ApiProvider,
    public firebase: Firebase) {
  }

  getSales() {
    this.apiProvider.getSales().subscribe(data => {
      //console.log("account getSales()", data["d"]);

      const lines = data["d"].Lines;
      
      //console.log(lines);
      
      if (lines.length > 0) {

        this.lines = lines;

        let groupedByDates = this.lines.reduce((h, a) => Object.assign(h, { [a.ShipmentDate]: (h[a.ShipmentDate] || []).concat(a) }), {});

        let dateKeys = Object.keys(groupedByDates);
        let groups = [];
        dateKeys.forEach(element => {
          groups.push({ "date": element, "lines": groupedByDates[element] });
        });
        this.groups = groups;
      } else {
        this.apiProvider.getHasSubscriptions().subscribe(subscriptions => {
          this.subscriptions = subscriptions["d"];
          //console.log(this.subscriptions);
        }, e => {
          console.log(e);
        });
      }

    }, error => {
      console.error(error);
      this.error = error;
    });
  }

  showDetails(line) {
    console.log(line);
    this.apiProvider.getDetails(line).subscribe(data => {
      //console.log(data["d"]);
    });
  }

  deleteLine(line) {
    //console.log("#", line);
    this.apiProvider.deleteLine(line).subscribe(data => {
      this.getSales();
    });
  }

  getSettings() {
    this.navCtrl.push(SettingsPage);
  }

  presentLoginModal() {
    let loginModal = this.modalCtrl.create(ModalLoginPage);
    loginModal.onDidDismiss(data => {
      console.log(data);
      if (data && data.reload) {
        this.apiProvider.setUserUnauthenticated(true)
        this.isAuthenticated = true;
        this.getSales();
        this.initPush();
      }
    });
    loginModal.present();
  }

  logout() {
    this.apiProvider.logout();
    this.isAuthenticated = false;
    this.lines = null;
  }

  getRoot() {
    this.apiProvider.getRoot().subscribe(data => {
      this.rootData = data;
    });
  }

  initPush(){
    if (this.platform.is("cordova")) {
      this.firebase.hasPermission().then((data) => {
        if (!data.isEnabled) {
            console.log("App does NOT have IOS Notification Permission");
        } else {
          //this.firebase.getToken().then();
          console.log("App does have IOS Notification Permission " + data.isEnabled);
        }

        // Get a FCM token
      var token = this.fcm.getToken();
      console.log("TOKEN:", token);
 
    });

      //TODO: fix android bug: https://angularfirebase.com/lessons/ionic-native-with-firebase-fcm-push-notifications-ios-android/

    }
  }

  ionViewWillEnter() { // will always reload the view compared to ionViewDidLoad

    this.devicePlatform = this.platform.platforms().toString();
    this.deviceHasCordova = this.platform.is('cordova');
    
    this.apiProvider.getLocaleName().then(locale => {
      this.deviceLocale = locale.value;
    }).catch(e => console.log(e));
    
    this.apiProvider.getPreferredLanguage().then(lang => {
      console.log(lang);
      this.deviceLanguage = lang.value;
    }).catch(e => console.log(e));

    this.getRoot();

    if (this.apiProvider.userIsAuthenticated()) {
      this.isAuthenticated = true;
      this.getSales();
    }

  }

}
