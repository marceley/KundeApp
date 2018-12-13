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
  products: any;
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

  setFrequency(frequency) {
    this.selectedFrequency = frequency || 0;
  }

  setDeliveryDay(deliveryDay) {
    this.selectedDeliveryDay = deliveryDay;
  }

  getMealboxOrderingOptions(products) {
    this.apiProvider.getMealboxOrderingOptions(products).subscribe(data => {
      console.log("!!!!", data["d"], data["d"].DefaultFrequency);
      if (data && data["d"]) {
        //HACK - the server data does not contain a Number prop for "single delivery", so add it before the data is added to the model to make it easier to control.
        data["d"].Frequency[0].Number = 0;
        // END HACK
        this.options = data["d"];
        this.loading = false;
        this.selectedFrequency = this.options.DefaultFrequency;
      }
    });
  }

  placeOrder() {
    console.log("Placing order", this.selectedFrequency, this.selectedDeliveryDay);

    this.creatingOrder = true;

    // Create models for sending multiple products to order endpoint
    let orders = [];
    this.products.forEach(element => {
      let order = {
        "Voucher": null, // todo
        "Frequency": this.selectedFrequency,
        "ShipmentDate": this.selectedDeliveryDay,
        "ItemNo": element.ItemNo,
        "SalesUnit": element.UnitCode
      };
      orders.push(order);
    });
    //console.log("ordering: ", orders);

    this.apiProvider.placeOrderCombined(orders).subscribe(data => {
      console.log("Ha! bought multiple products", data);
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

  goToAccount() {
    // clear navigation and go to account page
    this.navCtrl.popToRoot(); // TODO make work in modals
    this.appCtrl.getRootNav().push(AccountPage);
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter MealboxConfiguratorOptionsPage');
    if (this.apiProvider.userIsAuthenticated()) {
      this.isAuthenticated = true;
      this.details = this.navParams.data.details;
      this.products = this.navParams.data.products;
      //console.log(this.products);
      if (this.products) {
        this.getMealboxOrderingOptions(this.products);
      }
    } else {
      this.isAuthenticated = false;
      this.apiProvider.setUserUnauthenticated(false);
    }
  }

}
