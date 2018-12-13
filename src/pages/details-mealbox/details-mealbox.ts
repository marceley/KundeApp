import { RecipePage } from '../recipe/recipe';
import { ChefPage } from './../chef/chef';
import { ModalLoginPage } from './../modal-login/modal-login';
import { MealboxConfiguratorPage } from './../mealbox-configurator/mealbox-configurator';
import { DetailsIngredientPage } from './../details-ingredient/details-ingredient';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
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

  personsRange: Array<number> = [];
  daysRange: Array<number> = [];

  personsRangeAsString: string = "";
  daysRangeAsString: string = "";

  loading: Boolean = true;

  error: Boolean = false;
  errorMessage: any;

  isAuthenticated: boolean = false;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams, public apiProvider: ApiProvider, public translate: TranslateService) {

  }

  getDetails(product) {
    this.apiProvider.getDetails(product).subscribe(data => {
      //console.log("¤¤¤details-mealbox.ts: getDetails", data["d"]);
      this.details = data["d"];
      this.loading = false;
      this.error = false;

      this.personsRange = this.calcPersonsRange();
      this.daysRange = this.calcDaysRange();

      this.personsRangeAsString = this.getPersonsRangeAsString();
      this.daysRangeAsString = this.getDaysRangeAsString();

      this.apiProvider.getIngredients(this.details.Ingredients).subscribe(data => {
        this.ingredients = data["d"].Ingredients;
      });
    }, error => {
      console.log("getDetails() - error", error);
      this.loading = false;
      this.error = true;
      this.errorMessage = error;
    });
  }

  calcPersonsRange() {
    let persons = [];
    this.details.MealboxOptions.filter(element => {
      if (persons.indexOf(element.Persons) == -1) {
        persons.push(element.Persons);
      }
    });
    return persons.sort();
  }

  calcDaysRange() {
    let days = [];
    this.details.MealboxOptions.filter(element => {
      if (days.indexOf(element.Days) == -1) {
        days.push(element.Days);
      }
    });
    return days.sort();
  }

  getPersonsRangeAsString() {
    return this.personsRange[0] + "-" + this.personsRange[this.personsRange.length - 1];
  }

  getDaysRangeAsString() {
    return this.daysRange.join(" / ");
  }

  showIngredientDetails(ingredient) {
    //console.log(ingredient);
    this.navCtrl.push(DetailsIngredientPage, ingredient);
  }

  presentLoginModal() {
    let loginModal = this.modalCtrl.create(ModalLoginPage);
    loginModal.onDidDismiss(data => {
      console.log(data);
      if (data && data.reload) {
        this.apiProvider.setUserUnauthenticated(true);
        this.isAuthenticated = true;
      }
    });
    loginModal.present();
  }

  showConfigurator(details) {
    console.log("mealbox details - showConfigurator()", details);

    if (this.isAuthenticated) {
      this.navCtrl.push(MealboxConfiguratorPage, { details: details });

      // TODO: ionic 3 doesn't navigate correctly to subpages in modals
      /*const modal = this.modalCtrl.create(MealboxConfiguratorPage, { details: details });
      modal.onDidDismiss(data => {

      });
      modal.present();*/
    } else {
      this.presentLoginModal();
    }

  }

  showRecipe(recipe) {
    console.log("aaa", recipe);
    this.navCtrl.push(RecipePage, { recipe: recipe });
  }

  showChef(chef) {
    console.log("bbb", chef);
    this.navCtrl.push(ChefPage, { chef: chef });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsMealboxPage');
    var params = this.navParams.data;
    this.getDetails(params.product);
    if (this.apiProvider.userIsAuthenticated()) {
      this.isAuthenticated = true;
    }
  }

}
