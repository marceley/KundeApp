import { SettingsPage } from '../settings/settings';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  loggedIn: boolean = false;

  lines: any;

  loading: Boolean = true;

  error: Boolean = true;
  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider) {

  }

  login(){
    this.apiProvider.login(this.username, this.password).subscribe(apiUser => {
      if(apiUser["d"].Status === "Authenticated"){
        console.log("YES!! user authenticated!", apiUser);
        this.apiProvider.addUserToStorage(this.username, this.password);
        this.apiProvider.setUserUnauthenticated(true);
        this.loggedIn = true;
        this.getSales();
      }
    },
    error => {
      console.log("account.ts:login() - error", error);
      this.apiProvider.removeAuthorizationHeaderValue();
      this.apiProvider.setUserUnauthenticated(false);
    });
    
  }

  logout(){
    this.apiProvider.logout();
    this.loggedIn = false;
    this.lines = null;
  }

  getSales() {
    this.apiProvider.getSales().subscribe(data => {
      console.log("account getSales()", data["d"]);
      this.lines = data["d"].Lines;
      console.log(this.lines[1]);
    }, error => {
      console.error(error);
      this.error = error;
    });
  }

  showDetails(line){
    console.log(line);
    this.apiProvider.getDetails(line).subscribe(data => {
      console.log(data["d"]);
    });
  }

  deleteLine (line){
    this.apiProvider.deleteLine(line).subscribe(data => {
      this.getSales();
    });
  }

  getSettings(){
      this.navCtrl.push(SettingsPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  ionViewWillEnter(){ // will always reload the view compared to ionViewDidLoad
    if(this.apiProvider.userIsAuthenticated()){
      this.loggedIn = true;
      this.getSales();
    }
  }

}
