import { ModalSelectPersonsPage } from './../modal-select-persons/modal-select-persons';
import { DetailsMealboxPage } from './../details-mealbox/details-mealbox';
import { ApiProvider } from './../../providers/api/api';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the MealboxesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mealboxes',
  templateUrl: 'mealboxes.html',
})
export class MealboxesPage {

  categories: any;
  selectedCategory: any;

  selectedPersons = 3;
  products: any;

  loading: Boolean = true;

  error: Boolean = false;
  errorMessage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public apiProvider: ApiProvider, private storage: Storage) {
  }

  getMealboxes() {
    this.apiProvider.getMealboxes().subscribe(data => {
      this.categories = data["d"].Categories;
      //console.log("---", this.categories);
      this.storage.get("selectedPersonsInStorage").then(persons => {
        let defaultPersons = this.categories[0].Persons;
        if(persons){
          defaultPersons = persons;
        }
        this.getProductsByPersons(defaultPersons);
        this.storage.set("selectedPersonsInStorage", defaultPersons);

        this.loading = false;
        this.error = false;
  
      });
    }, error => {
      console.log("getNewItems() - error", error);
      this.loading = false;
      this.error = true;
      this.errorMessage = error;
    });
  }

  setSelectedCategory(category){
    this.selectedCategory = category;
  }

  getProductsByPersons(persons){
    this.selectedPersons = persons;
    var index = this.selectedPersons - 1;
    this.products = this.categories[index].Products;
    this.setSelectedCategory(this.categories[index]);
  }

  showDetails(product){
    //console.log("ccc", product);
    this.navCtrl.push(DetailsMealboxPage, { product: product });
  }
  
  presentSelectPersonsModal(categories) {
    console.log(">>>", "presentSelectPersonsModal", categories, this.selectedPersons);
    let selectPersonsModal = this.modalCtrl.create(ModalSelectPersonsPage, { "categories": categories, "selectedPersons": this.selectedPersons });
    selectPersonsModal.onDidDismiss(data => {
      console.log("# I got this back:", data);
      this.getProductsByPersons(data.selectedPersons);
    });
    selectPersonsModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MealboxesPage');
    this.getMealboxes();
  }

}
