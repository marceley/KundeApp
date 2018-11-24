import { DetailsIngredientPage } from './../details-ingredient/details-ingredient';
import { OrderPage } from './../order/order';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiProvider } from './../../providers/api/api';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  details: any;
  ingredients: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider, public translate: TranslateService ) {
    
  }

  getDetails(product) {
    this.apiProvider.getDetails(product).subscribe(data => {
      console.log("details.ts: getDetails", data["d"]);
      this.details = data["d"];
      this.apiProvider.getIngredients(this.details.Ingredients).subscribe(data => {
        console.log("details.ts: getDetails", data["d"]);
        this.ingredients = data["d"].Ingredients;
      });
    });
  }

  showIngredientDetails(ingredient){
    console.log(ingredient);
    this.navCtrl.push(DetailsIngredientPage, ingredient);
  }

  order(details){
    this.navCtrl.push(OrderPage, details);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
    var params = this.navParams.data; 
    this.getDetails(params.product);
    console.log(params.Product);
  }

}
