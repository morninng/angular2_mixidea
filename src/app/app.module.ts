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
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

/* module */
import {CoreModule} from './core/core.module'
import {EventModule} from './event/event.module';
import {ArticleModule} from './article/article.module'
import {LiveVideoDebateModule} from './livevideo-debate/livevideo-debate.module';
import {SharedModule} from './shared/shared.module';
import { TestComponent } from './test/test.component';


import { LoginModalComponent } from './modal/login-modal/login-modal.component';

/* Routing Module */
import { AppRoutingModule }   from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    LoginModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModalModule,
    EventModule,
    ArticleModule,
    LiveVideoDebateModule,
    AppRoutingModule,
    StoreModule.provideStore({ counter: counterReducer,transcript: TranscriptionReducer }, { counter: 0, transcript: [] }),
    SharedModule,
    CoreModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }