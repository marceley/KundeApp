import { MealboxConfiguratorOptionsPage } from './../mealbox-configurator-options/mealbox-configurator-options';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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

  addOns: Array<any> = [];
  addOnTypes: Array<any> = [];

  selectedPersons: number;
  selectedDays: number;

  mealboxMatch: Array<{}> = [];
  selectedAddOns: Array<string> = [];

  calculatedPrice: string = "";

  constructor(
    public appCtrl: App,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public apiProvider: ApiProvider,
    private storage: Storage) {
  }

  // Initial load get persons
  getPersons() {
    this.persons = [];
    this.daysForPersons = [];
    this.selectedDays = null;
    this.details.MealboxOptions.forEach(element => {
      if (this.persons.indexOf(element.Persons) == -1) {
        this.persons.push(element.Persons);
      }
    });

    this.persons = this.persons.sort();

    this.storage.get("selectedPersonsInStorage").then(data => {
      //console.log(">> persons in storage", data);
      if (data) {
        this.selectedPersons = data;
        this.getDaysForPersons(this.selectedPersons);
        this.savePersonsChoice();
      }
    });

  }

  savePersonsChoice() {
    this.storage.set("selectedPersonsInStorage", this.selectedPersons);
  }

  // Click on person link
  getDaysForPersons(persons) {
    this.selectedPersons = persons;
    this.selectedDays = null;
    this.daysForPersons = [];
    this.mealboxMatch = [];
    this.addOns = [];
    this.details.MealboxOptions.forEach(element => {
      if (element.Persons === persons && this.daysForPersons.indexOf(element.Days) == -1) {
        this.daysForPersons.push(element.Days);
      }
    });
    this.daysForPersons = this.daysForPersons.sort();

    this.savePersonsChoice();
  }

  // Click on day link
  getAddonsForPersonsAndDays(days) {

    this.selectedDays = days;
    this.mealboxMatch = [];
    this.selectedAddOns = [];

    this.details.MealboxOptions.forEach(element => {
      if (element.Persons === this.selectedPersons && element.Days === this.selectedDays) {
        //console.log(">>>", element.ItemNo);
        this.mealboxMatch = [element.ItemNo];
      }
    });

    if (this.mealboxMatch.length === 1) {
      this.apiProvider.getAddOns(this.mealboxMatch[0], "STK").subscribe(data => {
        //console.log("addons for match", data["d"]);
        this.addOns = data["d"];
        this.apiProvider.getAddOnTypes().subscribe(data => {
          //console.log("all addontypes:", data["d"]);
          this.addOnTypes = data["d"];
          // decorate addons with more data
          this.addOns.forEach(addOn => {
            //console.log("addon for match:", addOn);
            this.addOnTypes.forEach(type => {
              //console.log("---", type);
              if(type.Alias === addOn.AddonSetting.AddonType){
                //console.log(type);
                addOn._Type = type;
              }
            });
          });
          this.calculatePrice();
        });
      });
    }
  }

  // Click on addon checkbox
  selectAddOn(index, addon) {
    //console.log("???", addon.Id, addon.AddonSetting.AddonType);
    if (this.selectedAddOns[index] != null) {
      this.selectedAddOns[index] = null;
    } else {
      this.selectedAddOns[index] = addon.Id;
    }
    //console.log("+++ selectedAddOns", this.selectedAddOns);
    this.calculatePrice();
  }

  gatherSelectedProducts() {
    //console.log("1---", this.mealboxMatch, this.selectedAddOns);
    var products = this.mealboxMatch.concat(this.selectedAddOns);
    //console.log("2---", products);

    // Create post payload to send to server
    let data = [];
    products.forEach(element => {
      if (element != null) {
        data.push({
          "ShipmentDate": null,
          "UnitCode": "STK",
          "ItemNo": element
        });
      }
    });
    return data;
  }

  calculatePrice() {
    let products = this.gatherSelectedProducts();
    this.apiProvider.calculatePrice(products).subscribe(data => {
      console.log("Calc $$$", data["d"]);
      if (data && data["d"] && data["d"].TotalPrice) {
        this.calculatedPrice = data["d"].TotalPrice;
      }
    });
  }

  getDeliveryOptions() {
    let products = this.gatherSelectedProducts();
    this.navCtrl.push(MealboxConfiguratorOptionsPage, { details: this.details, products: products });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter MealboxConfiguratorPage');
    this.details = this.navParams.data.details;
    console.log(">>>>", this.details);
    if (this.details && this.details.MealboxOptions) {
      this.getPersons();
      //this.gatherSelectedProducts();
      //this.calculatePrice();
    }
  }
}