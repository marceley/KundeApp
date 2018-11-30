import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { ApiProvider } from './../../providers/api/api';
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

  details: any;
  options: any;

  selectedDeliveryDay: null;
  selectedFrequency: null;

  isAuthenticated: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiProvider: ApiProvider, public translate: TranslateService) {

  }

  getOrderingOptions(details) {
    this.apiProvider.getOrderingOptions(details.OrderingOptions).subscribe(data => {
      console.log("order.ts: getOrderingOptions", data["d"]);
      this.details = details;
      this.options = data["d"];
    });
  }

  setFrequency(frequency){
    this.selectedFrequency = frequency;
  }

  setDeliveryDay(deliveryDay){
    this.selectedDeliveryDay = deliveryDay;
  }

  placeOrder(){
    var order = {
      ItemNo: this.details.Id,
      SalesUnit: "STK",
      ShipmentDate: this.selectedDeliveryDay,
      Frequency: this.selectedFrequency,
      //Voucher: ""
    };
    this.apiProvider.placeOrder(order).subscribe(data => {
      console.log("Ha! bought a product", data);
      console.warn("TODO: make success message");
    });
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter OrderPage', this.apiProvider.userIsAuthenticated());
    if(this.apiProvider.userIsAuthenticated()){
      this.isAuthenticated = true;
      this.getOrderingOptions(this.navParams["data"]);
    } else {
      this.isAuthenticated = false;
    }
  }

}
