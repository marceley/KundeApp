import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams } from 'ionic-angular';
import { AccountPage } from './../account/account';

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

  selectedDeliveryDay: String;
  selectedFrequency: Number;

  isAuthenticated: Boolean = false;

  loading: Boolean = true;

  creatingOrder: Boolean = false;
  error: Boolean = false;
  errorMessage: any;

  showSuccess: Boolean = false;

  constructor(public appCtrl: App, public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider) {
  }

  setFrequency(frequency){
    this.selectedFrequency = frequency || 0;
  }

  setDeliveryDay(deliveryDay){
    this.selectedDeliveryDay = deliveryDay;
  }

  getMealboxOrderingOptions(products){
    this.apiProvider.getMealboxOrderingOptions(products).subscribe(data => {
      console.log("!!!!", data["d"], data["d"].DefaultFrequency);
      if(data && data["d"]){
        this.options = data["d"];
        this.loading = false;
        this.selectedFrequency = this.options.DefaultFrequency;
      }
    });
  }

  placeOrder(){
    console.log("Placing order", this.selectedFrequency, this.selectedDeliveryDay);
    
    this.creatingOrder = true;

    var order = {
      ItemNo: this.details.Id,
      SalesUnit: "STK",
      ShipmentDate: this.selectedDeliveryDay,
      Frequency: this.selectedFrequency,
      //Voucher: ""
    };

    console.log(order);

    this.apiProvider.placeOrder(order).subscribe(data => {
      console.log("Ha! bought a product", data);
      this.error = false;
      this.errorMessage = "";
      this.creatingOrder = false;
      this.showSuccess = true;
    }, error => {
      console.log(error);
      this.error = true;
      this.errorMessage = error;
      this.creatingOrder = false;
      this.showSuccess = false;
    });
  }

  goToAccount(){
    // clear navigation and go to account page
    this.navCtrl.popToRoot();
    this.appCtrl.getRootNav().push(AccountPage);
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
