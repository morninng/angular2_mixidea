/// <reference path="./../../node_modules/firebase/firebase.d.ts" />

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';


  
  
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { NotificationHeaderComponent } from './header/notification-header/notification-header.component';
import { MessageHeaderComponent } from './header/message-header/message-header.component';

import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';



import { ArticlelistLayoutComponent } from './article/articlelist-layout/articlelist-layout.component';
import { LoginModalComponent } from './modal/login-modal/login-modal.component';
import { MobileLeftMenuComponent } from './header/mobile-left-menu/mobile-left-menu.component';

import {EventModule} from './event/event.module.ts';


import {SharedModule} from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MobileLeftMenuComponent,
    NotificationHeaderComponent,
    MessageHeaderComponent,
    ArticlelistLayoutComponent,
    LoginModalComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule,
    routing,
    EventModule,
    SharedModule.forRoot()
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }