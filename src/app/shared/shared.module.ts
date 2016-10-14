/// <reference path="./../../../node_modules/firebase/firebase.d.ts" />


import { NgModule, ModuleWithProviders }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import {LeftColumnMenuPcComponent} from './left-column-menu-pc/left-column-menu-pc.component';
import {RightColumnAdComponent} from './right-column-ad/right-column-ad.component'

import { UserauthService} from './service/userauth.service';
import { KeysInObjectPipe } from './../pipes/keys-in-object.pipe';
import { ModelUserService} from './service/model-user.service';



import { AngularFireModule, AuthProviders, AuthMethods, } from 'angularfire2';
import { UserLinkFullParallelComponent } from './user-link-full-parallel/user-link-full-parallel.component';

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


@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  declarations: [
    LeftColumnMenuPcComponent,
    RightColumnAdComponent,
    KeysInObjectPipe,
    UserLinkFullParallelComponent
    ],
  exports:  [
   LeftColumnMenuPcComponent,
    RightColumnAdComponent,
    KeysInObjectPipe,
    UserLinkFullParallelComponent
    ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [UserauthService, ModelUserService]
    }

  }

}

