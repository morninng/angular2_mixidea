/// <reference path="./../../../node_modules/firebase/firebase.d.ts" />


import { NgModule, ModuleWithProviders }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { RouterModule} from '@angular/router';
/*header component*/

import {HeaderComponent} from './header/header.component'
import {MessageHeaderComponent} from './header/message-header/message-header.component'
import {MobileLeftMenuComponent} from './header/mobile-left-menu/mobile-left-menu.component'
import {NotificationHeaderComponent} from './header/notification-header/notification-header.component'

/* common component */
import { UserLinkComponent } from './user-link/user-link.component';

/* modal*/
/*
import { LoginModalComponent } from './login-modal/login-modal.component';
*/

/* additional sub layout */
import {LeftColumnMenuPcComponent} from './left-column-menu-pc/left-column-menu-pc.component';
import {RightColumnAdComponent} from './right-column-ad/right-column-ad.component'

/*pipe */

import { KeysInObjectPipe } from './pipes/keys-in-object.pipe';



import { AngularFireModule, AuthProviders, AuthMethods, } from 'angularfire2';

const firebaseConfig = {
    apiKey: "AIzaSyBp_ZDqoPygbPs7jMclrBSJ3a99t1Yvr1k",
    authDomain: "mixidea-91a20.firebaseapp.com",
    databaseURL: "https://mixidea-91a20.firebaseio.com",
    storageBucket: "mixidea-91a20.appspot.com"
  };

const firebaseAuthConfig = {
    provider: AuthProviders.Facebook,
    method: AuthMethods.Popup
  }


@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    RouterModule.forRoot([])
  ],
  declarations: [
    LeftColumnMenuPcComponent,
    RightColumnAdComponent,
    KeysInObjectPipe,
    UserLinkComponent,
    HeaderComponent,
    MessageHeaderComponent,
    MobileLeftMenuComponent,
    NotificationHeaderComponent
    ],
  exports:  [
    LeftColumnMenuPcComponent,
    RightColumnAdComponent,
    KeysInObjectPipe,
    UserLinkComponent,
    HeaderComponent,
    MessageHeaderComponent,
    MobileLeftMenuComponent,
    NotificationHeaderComponent
    ]
})
export class SharedModule {}

