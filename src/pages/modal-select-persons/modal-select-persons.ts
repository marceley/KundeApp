import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalSelectPersonsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-select-persons',
  templateUrl: 'modal-select-persons.html',
})
export class ModalSelectPersonsPage {

  categories: any;
  selectedPersons: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  dismiss() {
    this.viewCtrl.dismiss({ "selectedPersons": this.selectedPersons });
  }

  selectPersons(persons) {
    //console.log("---", persons);
    this.selectedPersons = persons;
    this.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalSelectPersonsPage');

    this.categories = this.navParams.get("categories");
    this.selectedPersons = this.navParams.get("selectedPersons");

    //console.log("???", this.categories, this.selectedPersons);

  }

}
