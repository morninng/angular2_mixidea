import { Injectable } from '@angular/core';
import {User} from './../interface/user'
import {Observable, Subject, BehaviorSubject} from 'rxjs';
import {AngularFire} from 'angularfire2';


@Injectable()
export class ModelUserService {


  user_model_observable : Observable<any>;
  userlist_obj = {};
 // private source : Subject<any>
  private behave_subject : BehaviorSubject<any>;

  constructor(private af: AngularFire) {
    this.behave_subject = new BehaviorSubject(null);
    this.user_model_observable = this.behave_subject.scan((acc : any , curr )=>{
        const new_user = Object.assign({}, acc, curr);
        this.userlist_obj = new_user;
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
           this.behave_subject.next(user_data);
        }
      )
  }



}
