import { DetailsIngredientPage } from './../details-ingredient/details-ingredient';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiProvider } from './../../providers/api/api';

/**
 * Generated class for the DetailsMealboxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details-mealbox',
  templateUrl: 'details-mealbox.html',
})
export class DetailsMealboxPage {

  details: any; 
  ingredients: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider, public translate: TranslateService ) {
    
  }

  getDetails(product) {
    this.apiProvider.getDetails(product).subscribe(data => {
      //console.log("¤¤¤details-mealbox.ts: getDetails", data["d"]);
      this.details = data["d"];
      //console.log("!!!!!", this.details.Ingredients);
      this.apiProvider.getIngredients(this.details.Ingredients).subscribe(data => {
        //console.log("details-mealbox.ts: getIngredients", data["d"]);
        this.ingredients = data["d"].Ingredients;
      });
    });
  }

  showIngredientDetails(ingredient){
    console.log(ingredient);
    this.navCtrl.push(DetailsIngredientPage, ingredient);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsMealboxPage');
    var params = this.navParams.data; 
    this.getDetails(params.product);
  }

}
