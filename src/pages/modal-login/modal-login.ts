import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ModalLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-login',
  templateUrl: 'modal-login.html',
})
export class ModalLoginPage {

  username: string = "";
  password: string = "";

  error: Boolean = true;
  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider, public viewCtrl: ViewController) {

  }

  login(){
    this.apiProvider.login(this.username, this.password).subscribe(apiUser => {
      if(apiUser["d"].Status === "Authenticated"){
        console.log("YES!! user authenticated!", apiUser);
        this.apiProvider.addUserToStorage(this.username, this.password);
        this.apiProvider.setUserUnauthenticated(true);
        this.viewCtrl.dismiss({ reload: true });
      } else {
        console.log(JSON.stringify(apiUser["d"]));
        this.error = true;
        this.errorMessage = "Forkert brugernavn eller kodeord. Prøv igen";
        this.apiProvider.removeAuthorizationHeaderValue();
        this.apiProvider.setUserUnauthenticated(false);        }
    },
    error => {
      console.log("account.ts:login() - error", error);
      this.error = true;
      this.errorMessage = error.message;
      this.apiProvider.removeAuthorizationHeaderValue();
      this.apiProvider.setUserUnauthenticated(false);
    });
    
  }

  dismiss() {
    //let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss();
  }

  // TODO implement
  createUser(){
    console.log("create user");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalLoginPage');
  }

}
