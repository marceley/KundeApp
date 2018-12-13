import { ModalLoginPage } from './../modal-login/modal-login';
import { DetailsIngredientPage } from './../details-ingredient/details-ingredient';
import { OrderPage } from './../order/order';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiProvider } from './../../providers/api/api';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  details: any;
  ingredients: any;

  isAuthenticated: boolean = false;

  loading: Boolean = true;

  error: Boolean = false;
  errorMessage: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public apiProvider: ApiProvider, 
    public translate: TranslateService, 
    public modalCtrl: ModalController ) {
    
  }

  getDetails(product) {
    this.apiProvider.getDetails(product).subscribe(data => {
      console.log("details.ts: getDetails", data["d"]);
      this.details = data["d"];
      this.loading = false;
      this.error = false;
      
      this.apiProvider.getIngredients(this.details.Ingredients).subscribe(data => {
        console.log("details.ts: getDetails", data["d"]);
        this.ingredients = data["d"].Ingredients;
      });

    }, error => {
      console.log("getDetails() - error", error);
      this.loading = false;
      this.error = true;
      this.errorMessage = error;
    });
  }

  presentLoginModal() {
    let loginModal = this.modalCtrl.create(ModalLoginPage);
    loginModal.onDidDismiss(data => {
      console.log(data);
      if(data && data.reload){
        this.apiProvider.setUserUnauthenticated(true)
        this.isAuthenticated = true;
      }
    });
    loginModal.present();
  }

  showIngredientDetails(ingredient){
    console.log(ingredient);
    this.navCtrl.push(DetailsIngredientPage, ingredient);
  }

  order(details){
    if(this.isAuthenticated){
      this.navCtrl.push(OrderPage, details);
    } else {
        this.presentLoginModal();
    }
  }

  //ionViewDidLoad() {
  //  console.log('ionViewDidLoad DetailsPage');
  //}

  ionViewWillEnter(){ // will always reload the view compared to ionViewDidLoad
    console.log('ionViewWillEnter DetailsPage', this.apiProvider.userIsAuthenticated());
    //console.log("just checking", this.apiProvider.userIsAuthenticated());
    var params = this.navParams.data; 
    this.getDetails(params.product);

    if(this.apiProvider.userIsAuthenticated()){
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }

}
