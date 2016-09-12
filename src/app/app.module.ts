/// <reference path="./../../node_modules/firebase/firebase.d.ts" />

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
    apiKey: "AIzaSyBp_ZDqoPygbPs7jMclrBSJ3a99t1Yvr1k",
    authDomain: "mixidea-91a20.firebaseapp.com",
    databaseURL: "https://mixidea-91a20.firebaseio.com",
    storageBucket: "",
  };

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserauthService} from './shared/userauth.service';
import { NotificationHeaderComponent } from './header/notification-header/notification-header.component';
import { MessageHeaderComponent } from './header/message-header/message-header.component';

import { AlertModule, DatepickerModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import {  ViewContainerRef } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NotificationHeaderComponent,
    MessageHeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    ModalModule,
    AlertModule,
    DatepickerModule
  ],
  providers: [UserauthService, ViewContainerRef],
  bootstrap: [AppComponent]
})

export class AppModule { }
