import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  proxyApiUrl = 'https://aarsmobileapi.herokuapp.com';
  aarsApiUrl = 'https://mobileapi.aarstiderne.com';

  username: string = "";
  password: string = "";
  
  isAuthenticated: boolean = false;

  auth: string = "";

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello ApiProvider Provider');
  }

  getNewitems() {
    return this.http.get(this.proxyApiUrl + '/v7/products/newitems', {
        headers: new HttpHeaders({ "Authorization": this.auth, "Target-URL": this.aarsApiUrl })
    });
  }

  getBoxes() {
    return this.http.get(this.proxyApiUrl + '/v7/products/boxes', {
      headers: new HttpHeaders({ "Authorization": this.auth, "Target-URL": this.aarsApiUrl })
    });
  }

  getMealboxes() {
    return this.http.get(this.proxyApiUrl + '/v7/products/families', {
      headers: new HttpHeaders({ "Authorization": this.auth, "Target-URL": this.aarsApiUrl })
    });
  }

  getExtras() {
    return this.http.get(this.proxyApiUrl + '/v7/products/extra', {
      headers: new HttpHeaders({ "Authorization": this.auth, "Target-URL": this.aarsApiUrl })
    });
  }

  getDetails(product) {
    var url = product.Details.replace(this.aarsApiUrl, this.proxyApiUrl);
    return this.http.get(url, {
      headers: new HttpHeaders({ "Authorization": this.auth, "Target-URL": this.aarsApiUrl })
    });
  }

  getIngredients(ingredientsUrl) {
    var url = ingredientsUrl.replace(this.aarsApiUrl, this.proxyApiUrl);
    return this.http.get(url, {
      headers: new HttpHeaders({ "Authorization": this.auth, "Target-URL": this.aarsApiUrl })
    });
  }

  getOrderingOptions(orderingOptionsUrl) {
    var url = orderingOptionsUrl.replace(this.aarsApiUrl, this.proxyApiUrl);
    return this.http.get(url, {
      headers: new HttpHeaders({ "Authorization": this.auth, "Target-URL": this.aarsApiUrl })
    });
  }

  placeOrder(order){
    var url = this.proxyApiUrl + "/v7/sales";
    console.log(">>>", order, url);
    return this.http.post(url, order, {
      headers: new HttpHeaders({ "Authorization": this.auth, "Target-URL": this.aarsApiUrl })
    });
  }

  removeAuthorizationHeaderValue(){
    this.auth = "";
  }

  setAuthorizationHeaderValue(username, password){
    this.auth = "Basic " + btoa(username + ":" + password);
  }

  removeUserFromStorage(){
    this.storage.remove("user");
  }

  addUserToStorage(username, password){
    this.storage.set("user", { username: username, password: password });
  }

  tryAutoLogin(){
    console.log("Running autologin()");
    this.storage.get('user').then(user => {
      if(user && user.username && user.password){
        console.log("- autologin(): have user in storage...");
        this.login(user.username, user.password).subscribe(apiUser => {
          if(apiUser["d"].Status === "Authenticated"){
            console.log("- autologin(): user is authenticated...", apiUser);
            this.addUserToStorage(this.username, this.password);
            this.isAuthenticated = true;
          } else {
            console.log("- autologin(): Sorry! Aser is NOT authenticated...", apiUser);
            this.removeAuthorizationHeaderValue();
            this.removeUserFromStorage();
            this.isAuthenticated = false;
          }
        },
        error => {
          console.log("api.ts:login() - error", error);
          this.removeAuthorizationHeaderValue();
          this.removeUserFromStorage();
          this.isAuthenticated = false;
        });
      } else {
        console.log("Cant autologin. Have no user in storage!");
        this.removeAuthorizationHeaderValue();
        this.removeUserFromStorage();
        this.isAuthenticated = false;
      }
    });
  }

  login(username, password){
    console.log("Running api.ts:login()");
    this.setAuthorizationHeaderValue(username, password);
    return this.http.get(this.proxyApiUrl + '/v7/user', {
      headers: new HttpHeaders({ "Authorization": this.auth, "Target-URL": this.aarsApiUrl })
    });
  }

  logout(){
    this.removeAuthorizationHeaderValue();
    this.removeUserFromStorage();
    this.isAuthenticated = false;
  }

  setUserUnauthenticated(auth: boolean){
    this.isAuthenticated = auth;
  }

  userIsAuthenticated(){
    return this.isAuthenticated;
  }

  getSales() {
    return this.http.get(this.proxyApiUrl + '/v7/sales', {
      headers: new HttpHeaders({ "Authorization": this.auth, "Target-URL": this.aarsApiUrl })
    });
  }

  deleteLine(line){
    return this.http.delete(this.proxyApiUrl + '/v7/sales/' + line.LineId, {
      headers: new HttpHeaders({ "Authorization": this.auth, "Target-URL": this.aarsApiUrl })
    });
  }

  getPushMessages(){
    var token = "token"; // TODO where does this token come from?
    return this.http.get(this.proxyApiUrl + '/v7/pushmessageslist/' + token, {
      headers: new HttpHeaders({ "Authorization": this.auth, "Target-URL": this.aarsApiUrl })
    });
  }

  calculatePrice(products){
    return this.http.post(this.proxyApiUrl + '/v7/sales/calculateprice', products, {
      headers: new HttpHeaders({ "Authorization": this.auth, "Target-URL": this.aarsApiUrl })
    });
  }

  getAddOns(itemNo, unitCode){
    // /v7/addonsbyid/115192/STK
    return this.http.get(this.proxyApiUrl + '/v7/addonsbyid/' + itemNo + "/" + unitCode, {
      headers: new HttpHeaders({ "Authorization": this.auth, "Target-URL": this.aarsApiUrl })
    });
  }

  getMealboxOrderingOptions(products){
    return this.http.post(this.proxyApiUrl + '/v7/sales/multipleorderingoptionscombined', products, {
      headers: new HttpHeaders({ "Authorization": this.auth, "Target-URL": this.aarsApiUrl })
    });
  }

}
