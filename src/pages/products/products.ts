import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams } from 'ionic-angular';

import { DetailsPage } from './../details/details';
/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  title: any;
  products: any;

  constructor(public appCtrl: App, public navCtrl: NavController, public navParams: NavParams) {
  }

  showDetails(product) {
    console.log("showdetails -> Products", product);
    this.appCtrl.getRootNav().push(DetailsPage, { product: product })
    //this.navCtrl.push(DetailsPage, { product: product });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
    this.title = this.navParams.data.category;
    this.products = this.navParams.data.products;    
  }

}
