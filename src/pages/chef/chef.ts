import { TranslateService } from '@ngx-translate/core';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonicImageLoader } from 'ionic-image-loader';

/**
 * Generated class for the ChefPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chef',
  templateUrl: 'chef.html',
})
export class ChefPage {

  details: any; 

  loading: Boolean = true;
  error: Boolean = false;
  errorMessage: String = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider, public translate: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChefPage');

    var chef = this.navParams.get("chef");

    this.apiProvider.getChef(chef.Details)
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
