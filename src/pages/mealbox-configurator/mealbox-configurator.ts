import { MealboxConfiguratorOptionsPage } from './../mealbox-configurator-options/mealbox-configurator-options';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

/**
 * Generated class for the MealboxConfiguratorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mealbox-configurator',
  templateUrl: 'mealbox-configurator.html',
})
export class MealboxConfiguratorPage {

  details: any;

  persons: Array<number> = [];
  daysForPersons: Array<number> = [];
  addOns: Array<Object> = [];

  selectedPersons: number;
  selectedDays: number;

  mealboxMatch: Array<{}> = [];
  selectedAddOns: Array<{}> = [];

  calculatedPrice: string = "";

  isAuthenticated = true;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public modalCtrl: ModalController, public navParams: NavParams, public apiProvider: ApiProvider) {
  }

  // Initial load get persons
  getPersons(){
    this.persons = [];
    this.daysForPersons = [];
    this.selectedDays = null;
    this.details.MealboxOptions.forEach(element => {
      if(this.persons.indexOf(element.Persons) == -1){
        this.persons.push(element.Persons);
      }
    });
    this.persons = this.persons.sort();
  }

  // Click on person link
  getDaysForPersons(persons){
    this.selectedPersons = persons;
    this.selectedDays = null;
    this.daysForPersons = [];
    this.mealboxMatch = [];
    this.addOns = [];
    this.details.MealboxOptions.forEach(element => {
      if(element.Persons === persons && this.daysForPersons.indexOf(element.Days) == -1){
        this.daysForPersons.push(element.Days);
      }
    });
    this.daysForPersons = this.daysForPersons.sort();
  }

  // Click on day link
  getAddonsForPersonsAndDays(days){

    this.selectedDays = days;
    this.mealboxMatch = [];
    this.selectedAddOns = [];

    this.details.MealboxOptions.forEach(element => {
      if(element.Persons === this.selectedPersons && element.Days === this.selectedDays){
        console.log(">>>", element.ItemNo);
        this.mealboxMatch = [element.ItemNo];
      }
    });

    if(this.mealboxMatch.length === 1){
      this.apiProvider.getAddOns(this.mealboxMatch[0], "STK").subscribe(data => {
        //console.log("<<<", data["d"]);
        this.addOns = data["d"];
        this.calculatePrice();
      });
  }
  }

  // Click on addon link
  selectAddOn(addon){
    //console.log("???", addon.Id);
    if(this.selectedAddOns.indexOf(addon.Id) !== -1){
      const index = this.selectedAddOns.indexOf(addon.Id, 0);
      if (index > -1) {
        this.selectedAddOns.splice(index, 1);
      }
    } else {
      this.selectedAddOns.push(addon.Id);
    }
    //console.log("??? selectedAddOns", this.selectedAddOns);
  }

  gatherSelectedProducts(){
    var products = this.mealboxMatch.concat(this.selectedAddOns);
    //console.log("---", products);

    // Create post payload to send to server
    let data = [];
    products.forEach(element => {
      data.push({
        "ShipmentDate": null,
        "UnitCode": "STK",
        "ItemNo": element
      });
    });
    return data;
  }
  
  calculatePrice(){
    let products = this.gatherSelectedProducts();
    this.apiProvider.calculatePrice(products).subscribe(data => {
      //console.log("$$$", data["d"]);
      if(data && data["d"] && data["d"].TotalPrice){
        this.calculatedPrice = data["d"].TotalPrice;
      }
    });
  }

  getDeliveryOptions(){
    console.log("hallo");
    let products = this.gatherSelectedProducts();
    this.navCtrl.push(MealboxConfiguratorOptionsPage, { details: this.details, products: products });
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MealboxConfiguratorPage');
    this.details = this.navParams.data.details;
    if(this.details && this.details.MealboxOptions){
      this.getPersons();
    }
  }


}
