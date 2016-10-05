import { Injectable } from '@angular/core';
import {User} from './../interface/user'
import {Observable, Subject} from 'rxjs';
import {AngularFire} from 'angularfire2';


@Injectable()
export class ModelUserService {


  user_model_observable : Observable<any>;
  userlist_obj = {};
  private source : Subject<any>


  constructor(private af: AngularFire) {
    this.source = new Subject();
    this.user_model_observable = Observable.from(this.source)
      .scan((acc : any , curr )=>{
       // const acc_user = acc.user;
        const new_user = Object.assign({}, acc, curr);
        this.userlist_obj = new_user;
       // const new_state = {user:new_user};
        return new_user;
      }, {});
   }


  add_user = function(userid:string){

    const that = this;
    if(this.userlist_obj[userid]){
      return;
    }
    this.af.database.object('/users/user_basic/' + userid)
      .subscribe(
        (user_obj) =>{
           let user_data = {};
           user_data[user_obj.$key] = {
                short_name: user_obj.short_name,
                full_name: user_obj.full_name,
                pict_src: user_obj.pict_src
            }
           that.source.next(user_data);
        }
      )
  }



}
