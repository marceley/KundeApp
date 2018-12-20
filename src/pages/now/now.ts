import { DetailsPage } from './../details/details';
import { TranslateService } from '@ngx-translate/core';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-now',
  templateUrl: 'now.html',
})
export class NowPage {

  products: any;

  loading: Boolean = true;

  error: Boolean = false;
  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider, public translate: TranslateService ) {
      // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('da');

      // the lang to use, if the lang isn't available, it will use the current loader to get them
      //translate.use('sv');
  }

  showDetails(product) {
    this.navCtrl.push(DetailsPage, { product: product });
  }

  getNewItems() {
    this.apiProvider.getNewitems()
      .subscribe(data => {
        //console.log("getNewItems() - data", data);
        this.products = data["d"].Categories[0].Products;
        this.loading = false;
        this.error = false;
      }, error => {
        //console.log("getNewItems() - error", error);
        this.loading = false;
        this.error = true;
        this.errorMessage = error;
      });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad NowPage');
    this.getNewItems();
  }

  ionViewWillEnter() {
    //console.log('ionViewWillEnter NowPage');
    //this.getNewItems();
  }

}
