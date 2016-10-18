/// <reference path="./../../../node_modules/firebase/firebase.d.ts" />


import { NgModule, ModuleWithProviders }       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { UserauthService} from './service/userauth.service';
import { ModelUserService} from './service/model-user.service';
import {SharedFirebaseService} from './service/shared-firebase.service'

import { AngularFireModule, AuthProviders, AuthMethods, } from 'angularfire2';

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
  declarations: []
})

export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [UserauthService, ModelUserService, SharedFirebaseService]
    }

  }


}

