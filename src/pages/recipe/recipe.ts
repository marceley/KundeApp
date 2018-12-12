import { TranslateService } from '@ngx-translate/core';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html', 
})
export class RecipePage {

  details: any;

  loading: Boolean = true;
  error: Boolean = false;
  errorMessage: String = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider, public translate: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');

    var recipe = this.navParams.get("recipe");

    this.apiProvider.getRecipe(recipe.Details)
      .subscribe(data => {
        //console.log("getNewItems() - data", data);
        this.details = data["d"];
        this.loading = false;
        this.error = false;
      }, error => {
        //console.log("getNewItems() - error", error);
        this.loading = false;
        this.error = true;
        this.errorMessage = error;
      });

    }

}
