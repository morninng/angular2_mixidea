import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import {User, User_Search} from './../interface/user'
import {BehaviorSubject } from 'rxjs/Rx'

@Injectable()
export class UserauthService {

  constructor(public af: AngularFire) { }

  id: string;
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

      this.id = result.uid;

      this.own_user ={
          loggedIn : true,
          full_name : full_name, 
          short_name: split_name_arr[0],
          pict_src : result.auth.photoURL
      }
      this.own_user_subject$.next(this.own_user);
      console.log(this.own_user);

      const name1 = split_name_arr[0];
      const name2 = split_name_arr[1];
      const name3 = split_name_arr[2];
      const own_searach_user : User_Search = { name1, name2, name3};
      console.log(own_searach_user);
    //    this.own_user_subject.next(own_user);
      //  this.register_user(own_user);
    });


/*
    this.user.loggedIn = true;
    this.user.profile_pict = "https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/12341602_953593204721655_7227562974230394333_n.jpg?oh=5f62d11e552397a29b3d1343825fc149&oe=58451A03";
    this.user.first_name = "yuta";
    this.user.last_name = "moriyama";
    */
  }

  logout = function(){
    this.user.loggedIn = false;
  }


  private register_user = function(user_oj : User){
    /*
    let user_obj_db = {
      name : user_oj.name,
      pict_src :user_oj.pict_src
    }
    let user_firebase_ref = this.af.database.object('/users/' + user_oj.id);
    user_firebase_ref.set(user_obj_db);
    */
  }



}
