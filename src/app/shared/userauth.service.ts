import { Injectable } from '@angular/core';

@Injectable()
export class UserauthService {

  constructor() { }

  user = {
    loggedIn: false,
    first_name: null,
    last_name: null,
    profile_pict: null,
    lang_type: null,
    regist_complete:false,
    own_uid: null,
    api_securekey : null
  }

  login = function(){
    this.user.loggedIn = true;
    this.user.profile_pict = "https://scontent.xx.fbcdn.net/v/t1.0-1/p100x100/12341602_953593204721655_7227562974230394333_n.jpg?oh=5f62d11e552397a29b3d1343825fc149&oe=58451A03";
    this.user.first_name = "yuta";
    this.user.last_name = "moriyama";
  }

  logout = function(){
    this.user.loggedIn = false;
  }


}
