import { IonicImageLoader } from 'ionic-image-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicStorageModule } from '@ionic/storage';

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

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ApiProvider } from '../providers/api/api';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
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
      backButtonText: ''
    }),
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
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiProvider
  ]
})
export class AppModule {}