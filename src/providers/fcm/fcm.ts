import { ApiProvider } from './../api/api';
import { AngularFirestore} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';


@Injectable()
export class FcmProvider {

  constructor(
    public api: ApiProvider,
    public firebase: Firebase,
    public afs: AngularFirestore,
    private platform: Platform
  ) {}

  // Get permission from the user
  async getToken() { 
    let token;
    if( this.platform.is("android")){
      //token = await this.firebase.getToken();
    }
    if(this.platform.is("ios")){
      console.log("FCM prov. = ios = getting token?");
      token = await this.firebase.getToken();
      console.log("- token = ", token);
      await this.firebase.grantPermission();
    }
    return this.saveTokenToFirestore(token);
  }

  // Save the token to firestore
  private saveTokenToFirestore(token) {
    if(!token) return;
    const devicesRef = this.afs.collection("devices");
    const docData = {
      token,
      userId: 'marc' // TODO: get NAV ID?
    };
    return devicesRef.doc(token).set(docData);

  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebase.onNotificationOpen();
  }

  subscribeToTopic(topic){
    return this.firebase.subscribe(topic);
  }

  unsubscribeToTopic(topic){
    return this.firebase.unsubscribe(topic);
  }

}