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

import { AlertModule, DatepickerModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import {  ViewContainerRef } from '@angular/core';
import { EventlistLayoutComponent } from './event/eventlist-layout/eventlist-layout.component';
import { VerticalEventchoiceComponent } from './event/vertical-eventchoice/vertical-eventchoice.component';
import { HorizontalEventtypePcComponent } from './event/horizontal-eventtype-pc/horizontal-eventtype-pc.component';
import { HorizontalEventtypeMobileComponent } from './event/horizontal-eventtype-mobile/horizontal-eventtype-mobile.component';
import { AdvertisingColumnComponent } from './event/advertising-column/advertising-column.component';
import { ArticlelistLayoutComponent } from './article/articlelist-layout/articlelist-layout.component';
import { LoginModalComponent } from './modal/login-modal/login-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotificationHeaderComponent,
    MessageHeaderComponent,
    EventlistLayoutComponent,
    VerticalEventchoiceComponent,
    HorizontalEventtypePcComponent,
    HorizontalEventtypeMobileComponent,
    AdvertisingColumnComponent,
    ArticlelistLayoutComponent,
    LoginModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    ModalModule,
    AlertModule,
    DatepickerModule,
    routing
  ],
  providers: [UserauthService, ViewContainerRef, appRoutingProviders],
  bootstrap: [AppComponent]
})

export class AppModule { }

