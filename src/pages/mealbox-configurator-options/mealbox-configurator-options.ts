import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MealboxConfiguratorOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mealbox-configurator-options',
  templateUrl: 'mealbox-configurator-options.html',
})
export class MealboxConfiguratorOptionsPage {

  details: any;

  options: any;
  selectedDeliveryDay: null;
  selectedFrequency: null;

  isAuthenticated: boolean = false;

  loading: Boolean = true;

  error: Boolean = false;
  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider) {
  }

  setFrequency(frequency){
    this.selectedFrequency = frequency;
  }

  setDeliveryDay(deliveryDay){
    this.selectedDeliveryDay = deliveryDay;
  }

  getMealboxOrderingOptions(products){
    this.apiProvider.getMealboxOrderingOptions(products).subscribe(data => {
      console.log("!!!!", data["d"]);
      if(data && data["d"]){
        this.options = data["d"];
        this.loading = false;
      }
    });
  }

  placeOrder(){
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MealboxConfiguratorOptionsPage');
    if(this.apiProvider.userIsAuthenticated()){
      this.isAuthenticated = true;
      this.details = this.navParams.data.details;
      let products = this.navParams.data.products;
      if(products){
        this.getMealboxOrderingOptions(products);
      }
    } else {
      this.isAuthenticated = false;
      this.apiProvider.setUserUnauthenticated(false);
    }
  }

}
