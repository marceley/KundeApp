import { IonicImageLoader } from 'ionic-image-loader';
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
import { ModalLoginPage } from './../pages/modal-login/modal-login';
import { SettingsPage } from './../pages/settings/settings';
import { MealboxConfiguratorOptionsPage } from './../pages/mealbox-configurator-options/mealbox-configurator-options';
import { MealboxConfiguratorPage } from './../pages/mealbox-configurator/mealbox-configurator';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ApiProvider } from '../providers/api/api';

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
    DetailsIngredientPage,
    ModalLoginPage,
    SettingsPage,
    MealboxConfiguratorPage,
    MealboxConfiguratorOptionsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicImageLoader.forRoot(),
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
    }),
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
    DetailsIngredientPage,
    ModalLoginPage,
    SettingsPage,
    MealboxConfiguratorPage,
    MealboxConfiguratorOptionsPage
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
