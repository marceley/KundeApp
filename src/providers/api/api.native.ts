import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';

import { NativeStorage } from '@ionic-native/native-storage';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  //apiUrl = 'https://mobileapi.aarstiderne.com/v7';
  apiUrl = 'https://aarsmobileapi.herokuapp.com';
  aarsApiUrl = 'https://mobileapi.aarstiderne.com/v7';
  //username = 'mae@aarstiderne.com';
  //password = 'Jukilo90';
  username = '';
  password = '';
  
  auth = "Basic " + btoa(this.username + ":" + this.password);

  constructor(public http: HTTP, private storage: NativeStorage) {
    console.log('Hello ApiProvider Provider');
    this.getUser();
  }

  getNewitems() {
    return this.http.get(this.apiUrl + '/products/newitems', {}, {
        
    });
  }

  getBoxes() {
    return this.http.get(this.apiUrl + '/products/boxes', {}, {
      
    });
  }

  getMealboxes() {
    return this.http.get(this.apiUrl + '/products/families', {}, {
      
    });
  }

  getExtras() {
    return this.http.get(this.apiUrl + '/products/extra', {}, {
      
    });
  }

  getDetails(product) {
    var url = product.Details.replace(this.aarsApiUrl, this.apiUrl);
    return this.http.get(url, {}, {
      
    });
  }



  getUser() {
    console.log("get user");
    this.storage.getItem('user')
      .then(
        user => {
          if(user){
            if(user.username && user.password){
              this.http.useBasicAuth(user.username, user.password);


              this.http.get(this.apiUrl + '/user', {}, {}).then(
                apiUser => {
                  console.log("apiUser", apiUser);
                  /*if(apiUser["d"].Status === "Unauthenticated"){
                    
                    console.log("NO!!! user Unauthenticated!");
                    this.http.useBasicAuth("", "");

                  } else if(apiUser["d"].Status === "Authenticated"){

                    console.log("YES!! user authenticated!");
                    this.auth = "Basic " + btoa(user.username + ":" + user.password);
          
                  }*/
                },
                error => {
                  console.log(error);
                });
            }
          }
        },
        error => console.error(error)
      );

  }

  getSales() {
    return this.http.get(this.apiUrl + '/sales2', {}, {
      
    });
  }

}
