import { DetailsPage } from './../details/details';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BoxesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-boxes',
  templateUrl: 'boxes.html',
})
export class BoxesPage {

  categories: any;

  loading: Boolean = true;

  error: Boolean = false;
  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider) {
  }

  showDetails(product) {
    console.log(product);
    this.navCtrl.push(DetailsPage, { product: product });
  }

  getBoxes() {
    this.apiProvider.getBoxes()
    .subscribe(data => {
      this.categories = data["d"].Categories;
      this.loading = false;
      this.error = false;
    }, error => {
      console.log("getBoxes() - error", error);
      this.loading = false;
      this.error = true;
      this.errorMessage = error;
    });
  }
  
  ionViewWillEnter() {
    console.log('ionViewWillEnter BoxesPage');
    this.getBoxes();
  }

}
