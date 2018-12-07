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

  loading: Boolean = true;

  error: Boolean = true;
  errorMessage: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public apiProvider: ApiProvider) {

  }

  getSales() {
    this.apiProvider.getSales().subscribe(data => {
      console.log("account getSales()", data["d"]);

      this.lines = data["d"].Lines;

      let groupedByDates = this.lines.reduce((h, a) => Object.assign(h, { [a.ShipmentDate]: (h[a.ShipmentDate] || []).concat(a) }), {});
      
      let dateKeys = Object.keys(groupedByDates);
      let groups = [];
      dateKeys.forEach(element => {
        groups.push({ "date": element, "lines": groupedByDates[element]});
      });
      this.groups = groups;

    }, error => {
      console.error(error);
      this.error = error;
    });
  }

  showDetails(line) {
    console.log(line);
    this.apiProvider.getDetails(line).subscribe(data => {
      console.log(data["d"]);
    });
  }

  deleteLine(line) {
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
      if(data && data.reload){
        this.apiProvider.setUserUnauthenticated(true)
        this.isAuthenticated = true;
        this.getSales();
      }
    });
    loginModal.present();
  }

  logout() {
    this.apiProvider.logout();
    this.isAuthenticated = false;
    this.lines = null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  ionViewWillEnter() { // will always reload the view compared to ionViewDidLoad
    if (this.apiProvider.userIsAuthenticated()) {
      this.isAuthenticated = true;
      this.getSales();
    }
  }

}
