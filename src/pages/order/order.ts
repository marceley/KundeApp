import { FcmProvider } from './../../providers/fcm/fcm';
import { Component } from '@angular/core';
import { IonicPage, App, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiProvider } from './../../providers/api/api';
import { AccountPage } from './../account/account';
import { ModalOrderCompletePage } from './../modal-order-complete/modal-order-complete';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  creatingOrder: Boolean = false;
  error: Boolean = false;
  errorMessage: any;
 
  gettingOrderingOptions: Boolean = false;
  errorGettingOrderingOptions: Boolean = false;
  errorMessageGettingOrderingOptions: any;
 
  details: any;
  options: any;

  selectedDeliveryDay: String;
  selectedFrequency: Number;

  isAuthenticated: Boolean = false;

  showSuccess: Boolean = false;

  constructor(
    public appCtrl: App, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public apiProvider: ApiProvider, 
    public fcmProvider: FcmProvider,
    public translate: TranslateService) {

  }

  getOrderingOptions(details) {
    this.gettingOrderingOptions = true;
    this.apiProvider.getOrderingOptions(details.OrderingOptions).subscribe(data => {
      console.log("order.ts: getOrderingOptions", data["d"]);
      //HACK - the server data does not contain a Number prop for "single delivery", so add it before the data is added to the model to make it easier to control.
      data["d"].Frequency[0].Number = 0;
      // END HACK
      this.errorGettingOrderingOptions = false;
      this.errorMessageGettingOrderingOptions = "";
      this.gettingOrderingOptions = false;
      this.details = details;
      this.options = data["d"];
      this.selectedFrequency = this.options.DefaultFrequency;
    }, error => {
      console.log(error);
      this.errorGettingOrderingOptions = true;
      this.errorMessageGettingOrderingOptions = error;
      this.gettingOrderingOptions = false;
    });
  }

  setFrequency(frequency){
    this.selectedFrequency = frequency || 0;
  }

  setDeliveryDay(deliveryDay){
    this.selectedDeliveryDay = deliveryDay;
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

    this.apiProvider.placeOrder(order).subscribe(data => {
      console.log("Ha! bought a product", data);
      this.error = false;
      this.errorMessage = "";
      this.creatingOrder = false;
      //this.showSuccess = true; // TODO remove in favour of modal page

      this.navCtrl.push(ModalOrderCompletePage, { success: true });

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
    this.navCtrl.popToRoot().then(() => {
      this.appCtrl.getRootNav().push(AccountPage);
    });
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter OrderPage', this.apiProvider.userIsAuthenticated());
    this.fcmProvider.setScreenName("Order");
    if(this.apiProvider.userIsAuthenticated()){
      this.isAuthenticated = true;
      this.getOrderingOptions(this.navParams["data"]);
    } else {
      this.isAuthenticated = false;
    }
  }

}
