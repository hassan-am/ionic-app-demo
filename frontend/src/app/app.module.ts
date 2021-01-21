import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy,  } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Http, HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpService } from './services/http.service';

import { HttpClientModule } from '@angular/common/http';
import { Users } from './models/Users';
import { Products } from './models/Products';

import { HomePage } from './pages/home/home.page';
import { MessageComponent } from './components/message/message.component';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';

import { Persist } from './persist';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpModule, HttpClientModule, IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    HttpService,
    Persist,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
