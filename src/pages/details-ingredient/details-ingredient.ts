import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailsIngredientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-ingredient',
  templateUrl: 'details-ingredient.html',
})
export class DetailsIngredientPage {

  ingredient: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  showIngredientDetails(ingredient){
    console.log(ingredient);
    this.navCtrl.push(DetailsIngredientPage, ingredient);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsIngredientPage');
    this.ingredient = this.navParams.data; 
  }

}
