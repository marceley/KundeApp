import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProductsPage } from './../products/products';

/**
 * Generated class for the ExtrasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-extras',
  templateUrl: 'extras.html',
})
export class ExtrasPage {

  categories: any;

  loading: Boolean = true;

  error: Boolean = false;
  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider) {
  }

  getExtras() {
    this.apiProvider.getExtras().subscribe(data => {
      this.categories = data["d"].Categories;
      this.loading = false;
      this.error = false;
    }, error => {
      console.log("getExtras() - error", error);
      this.loading = false;
      this.error = true;
      this.errorMessage = error;
    });
  }
  
  showProducts(category) {
    console.log("showProducts -> Extra", category);
    this.navCtrl.push(ProductsPage, { category: category.Name, products: category.Products });
  }

  ionViewDidLoad() {
    console.log('ionViewWillEnter ExtrasPage');
    this.getExtras();
  }

}
