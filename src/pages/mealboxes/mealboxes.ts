import { DetailsMealboxPage } from './../details-mealbox/details-mealbox';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the MealboxesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mealboxes',
  templateUrl: 'mealboxes.html',
})
export class MealboxesPage {

  categories: any;

  selectedPersons = 3;
  products: any;

  loading: Boolean = true;

  error: Boolean = false;
  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider) {
  }

  getMealboxes() {
    this.apiProvider.getMealboxes().subscribe(data => {
      this.categories = data["d"].Categories;
      console.log("---", this.categories);
      this.getProducts(this.selectedPersons);
      this.loading = false;
      this.error = false;
    }, error => {
      console.log("getNewItems() - error", error);
      this.loading = false;
      this.error = true;
      this.errorMessage = error;
    });
  }

  getProducts(persons){
    this.selectedPersons = persons;
    var index = this.selectedPersons - 1;
    this.products = this.categories[index].Products;
  }

  showDetails(product){
    //console.log("ccc", product);
    this.navCtrl.push(DetailsMealboxPage, { product: product });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MealboxesPage');
    this.getMealboxes();
  }

}
