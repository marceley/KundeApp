import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
//import { NativeStorage } from '@ionic-native/native-storage';
import { IonicStorageModule } from '@ionic/storage';

import { NowPage } from './../pages/now/now';
import { BoxesPage } from '../pages/boxes/boxes';
import { MealboxesPage } from '../pages/mealboxes/mealboxes';
import { AccountPage } from './../pages/account/account';
import { ExtrasPage } from './../pages/extras/extras';
import { TabsPage } from '../pages/tabs/tabs';
import { ProductsPage } from './../pages/products/products';
import { DetailsPage } from './../pages/details/details';
import { DetailsMealboxPage } from './../pages/details-mealbox/details-mealbox';
import { DetailsIngredientPage } from './../pages/details-ingredient/details-ingredient';
import { OrderPage } from './../pages/order/order';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ApiProvider } from '../providers/api/api';

//import { HTTP } from '@ionic-native/http';
//import { ApiProvider } from '../providers/api/api.native';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    NowPage,
    BoxesPage,
    MealboxesPage,
    ExtrasPage,
    AccountPage,
    TabsPage,
    DetailsPage,
    ProductsPage,
    OrderPage,
    DetailsMealboxPage,
    DetailsIngredientPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NowPage,
    BoxesPage,
    MealboxesPage,
    ExtrasPage,
    AccountPage,
    TabsPage,
    DetailsPage,
    ProductsPage,
    OrderPage,
    DetailsMealboxPage,
    DetailsIngredientPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider,
    //NativeStorage
  ]
})
export class AppModule {}
