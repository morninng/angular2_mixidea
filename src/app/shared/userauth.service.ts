import { Injectable } from '@angular/core';
import { AngularFire , FirebaseObjectObservable} from 'angularfire2';
import {User, User_Search} from './../interface/user'
import {BehaviorSubject } from 'rxjs/Rx'

@Injectable()
export class UserauthService {

  constructor(public af: AngularFire) {

/* this code is still not working, but it will come soon.*/ 
    af.auth.subscribe((auth) => {
      console.log("auth status changed");
      console.log(auth);
    })
///////////////////////


   }


  own_user_id: string;
  own_user: User = { loggedIn:false,full_name:"",short_name:"",pict_src:""};
  own_user_subject$ = new BehaviorSubject(this.own_user);

  ext_data = {
    lang_type: null,
    api_securekey : null
  }

  login = ()=>{

    this.af.auth.login().then((result : any) => {
      console.log("after login");
      console.log(result);

      const full_name = result.auth.displayName;
      const split_name_arr = full_name.split(" ");

      this.own_user_id = result.uid;

      this.own_user ={
          loggedIn : true,
          full_name : full_name, 
          short_name: split_name_arr[0],
          pict_src : result.auth.photoURL
      }
      this.own_user_subject$.next(this.own_user);
      this.register_user();

      const name1 = split_name_arr[0];
      const name2 = split_name_arr[1];
      const name3 = split_name_arr[2];
      const own_searach_user : User_Search = { name1, name2, name3};
      console.log(own_searach_user);
    });
  }



  logout = function(){
    this.user.loggedIn = false;
  }


  private register_user = ()　=>{

    if(!this.own_user_id || !this.own_user.loggedIn ){
      alert("cannot register user");
      return;
    }

    const own_data_regist : User = {
      full_name: this.own_user.full_name,
      short_name: this.own_user.short_name,
      pict_src: this.own_user.pict_src
    }

    const userObservable = this.af.database.object('/users/user_basic/' + this.own_user_id);
    userObservable.update(own_data_regist);

  }



}
