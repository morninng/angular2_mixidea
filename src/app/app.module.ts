/// <reference path="./../../node_modules/firebase/firebase.d.ts" />

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
//import { routing, appRoutingProviders } from './app.routing';

import { Store, StoreModule } from '@ngrx/store';
import { counterReducer } from './redux/counter_reducer';
import {TranscriptionReducer} from './redux/transcription-reducer'
  
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { NotificationHeaderComponent } from './header/notification-header/notification-header.component';
import { MessageHeaderComponent } from './header/message-header/message-header.component';

import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';



import { LoginModalComponent } from './modal/login-modal/login-modal.component';
import { MobileLeftMenuComponent } from './header/mobile-left-menu/mobile-left-menu.component';

import {EventModule} from './event/event.module';
import {ArticleModule} from './article/article.module'

import {SharedModule} from './shared/shared.module';
import { TestComponent } from './test/test.component';

/* Routing Module */
import { AppRoutingModule }   from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MobileLeftMenuComponent,
    NotificationHeaderComponent,
    MessageHeaderComponent,
    LoginModalComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule,
    EventModule,
    ArticleModule,
    AppRoutingModule,
    StoreModule.provideStore({ counter: counterReducer,transcript: TranscriptionReducer }, { counter: 0, transcript: [] }),
    SharedModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }