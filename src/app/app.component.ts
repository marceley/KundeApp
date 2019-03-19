import { CloudSettings } from '@ionic-native/cloud-settings';
import { ApiProvider } from './../providers/api/api';
import { Firebase } from '@ionic-native/firebase';
import { FcmProvider } from './../providers/fcm/fcm';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  settings: any;


  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public apiProvider: ApiProvider,
    public fcmProvider: FcmProvider,
    public firebase: Firebase,
    private cloudSettings: CloudSettings) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.backgroundColorByHexString('#0d7548');

      splashScreen.hide();

      this.apiProvider.tryAutoLogin();

        // Cloud settings API
        if(platform.is('cordova')){
          this.cloudSettings.exists().then((exists: boolean) => console.log("Saved settings exist: " + exists) );
        }

    /*getCloud(){
      this.cloudSettings.load()
      .then((settings: any) => this.settings = settings)
      .catch((error: any) => console.error(error));
    }

    setCloud(){
      this.cloudSettings.save(this.settings)
      .then((savedSettings: any) => console.log("Saved settings: " + JSON.stringify(savedSettings)))
      .catch((error: any) => console.error(error));    
    }*/


      
    });
  }
}
