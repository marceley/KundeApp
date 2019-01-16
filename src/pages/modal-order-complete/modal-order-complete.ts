import { AccountPage } from './../account/account';
import { Component } from '@angular/core';
import { IonicPage, App, NavController, ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ModalOrderCompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-order-complete',
  templateUrl: 'modal-order-complete.html',
})
export class ModalOrderCompletePage {

  constructor(public navCtrl: NavController, public appCtrl: App, public viewCtrl: ViewController, public navParams: NavParams) {
  }

  goToAccount(){
    console.log("til mine leveringer");
    // clear navigation and go to account page
    this.navCtrl.popToRoot(); // TODO make work in modals
    this.viewCtrl.dismiss();
    this.appCtrl.getRootNav().push(AccountPage);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalOrderCompletePage');
  }

}
