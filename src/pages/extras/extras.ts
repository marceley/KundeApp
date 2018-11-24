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

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider) {
  }

  getExtras() {
    this.apiProvider.getExtras()
    .subscribe(data => {
      this.categories = data["d"].Categories;
    });
  }
  
  showProducts(products) {
    console.log("showProducts -> Extra", products);
    this.navCtrl.push(ProductsPage, { products: products });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExtrasPage');
    this.getExtras();
  }

}
