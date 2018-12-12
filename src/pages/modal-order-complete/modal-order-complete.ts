import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {
  }

  goToAccount(){
    console.log("til mine leveringer");
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalOrderCompletePage');
  }

}
