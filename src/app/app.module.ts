/// <reference path="./../../node_modules/firebase/firebase.d.ts" />

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods, } from 'angularfire2';

import { routing, appRoutingProviders } from './app.routing';


const firebaseConfig = {
    apiKey: "AIzaSyBp_ZDqoPygbPs7jMclrBSJ3a99t1Yvr1k",
    authDomain: "mixidea-91a20.firebaseapp.com",
    databaseURL: "https://mixidea-91a20.firebaseio.com",
    storageBucket: ""
  };

const firebaseAuthConfig = {
    provider: AuthProviders.Facebook,
    method: AuthMethods.Popup
  }
  
  
  
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserauthService} from './shared/userauth.service';
import { NotificationHeaderComponent } from './header/notification-header/notification-header.component';
import { MessageHeaderComponent } from './header/message-header/message-header.component';

import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';



import { ArticlelistLayoutComponent } from './article/articlelist-layout/articlelist-layout.component';
import { LoginModalComponent } from './modal/login-modal/login-modal.component';
import { MobileLeftMenuComponent } from './header/mobile-left-menu/mobile-left-menu.component';

import {EventModule} from './event/event.module.ts'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotificationHeaderComponent,
    MessageHeaderComponent,
    ArticlelistLayoutComponent,
    LoginModalComponent,
    MobileLeftMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    ModalModule,
    routing,
    EventModule
  ],
  providers: [UserauthService,appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }