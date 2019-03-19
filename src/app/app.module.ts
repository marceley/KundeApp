import { CloudSettings } from '@ionic-native/cloud-settings';
import { IonicImageLoader } from 'ionic-image-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Globalization } from '@ionic-native/globalization';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { Firebase } from "@ionic-native/firebase";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FirebaseMessaging } from "@ionic-native/firebase-messaging";

import { TabsPageModule } from '../pages/tabs/tabs.module';
import { NowPageModule  } from './../pages/now/now.module';
import { BoxesPageModule } from '../pages/boxes/boxes.module';
import { MealboxesPageModule } from '../pages/mealboxes/mealboxes.module';
import { ExtrasPageModule } from './../pages/extras/extras.module';
import { AccountPageModule } from './../pages/account/account.module';
import { ProductsPageModule } from './../pages/products/products.module';
import { DetailsPageModule } from './../pages/details/details.module';
import { DetailsMealboxPageModule } from './../pages/details-mealbox/details-mealbox.module';
import { DetailsIngredientPageModule } from './../pages/details-ingredient/details-ingredient.module';
import { OrderPageModule } from './../pages/order/order.module';
import { ModalLoginPageModule } from './../pages/modal-login/modal-login.module';
import { SettingsPageModule } from './../pages/settings/settings.module';
import { MealboxConfiguratorOptionsPageModule } from './../pages/mealbox-configurator-options/mealbox-configurator-options.module';
import { MealboxConfiguratorPageModule } from './../pages/mealbox-configurator/mealbox-configurator.module';
import { ChefPageModule } from './../pages/chef/chef.module';
import { RecipePageModule } from './../pages/recipe/recipe.module';
import { ModalSelectPersonsPageModule } from './../pages/modal-select-persons/modal-select-persons.module';
import { ModalOrderCompletePageModule } from './../pages/modal-order-complete/modal-order-complete.module';

import { ApiProvider } from '../providers/api/api';
import { FcmProvider } from '../providers/fcm/fcm';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const firebase = {
  apiKey: "AIzaSyBGbxWAod0mjq7-1VENoUyfDZHNaexmHsg",
  authDomain: "aarstiderne-96d75.firebaseapp.com",
  databaseURL: "https://aarstiderne-96d75.firebaseio.com",
  projectId: "aarstiderne-96d75",
  storageBucket: "aarstiderne-96d75.appspot.com",
  messagingSenderId: "387341916630"
 }

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicImageLoader.forRoot(),
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      swipeBackEnabled: true
    }),
    AngularFireModule.initializeApp(firebase), 
    AngularFirestoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    TabsPageModule,
    NowPageModule,
    BoxesPageModule,
    MealboxesPageModule,
    ExtrasPageModule,
    AccountPageModule,
    DetailsPageModule,
    ProductsPageModule,
    OrderPageModule,
    DetailsMealboxPageModule,
    DetailsIngredientPageModule,
    ModalLoginPageModule,
    ModalSelectPersonsPageModule,
    ModalOrderCompletePageModule,
    SettingsPageModule,
    MealboxConfiguratorPageModule,
    MealboxConfiguratorOptionsPageModule,
    RecipePageModule,
    ChefPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Globalization,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    Firebase,
    FirebaseMessaging,
    FcmProvider,
    Camera,
    FileTransfer,
    FileTransferObject,
    File,
    CloudSettings
  ]
})
export class AppModule {}