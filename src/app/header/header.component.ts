import { Component, OnInit } from '@angular/core';
import { UserauthService} from './../shared/service/userauth.service';

import {User} from './../interface/user'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor(private user_auth : UserauthService) { }

  notification_arr = [];
  message_arr = [];
  mobile_menu_oepn = false;

  own_user :User =  { loggedIn:false,full_name:"",short_name:"",pict_src:""};

  ngOnInit() {
    this.user_auth.own_user_subject$.subscribe(
      (user_data : User)=>{
        console.log("own user subject is called in header component")
        this.own_user = user_data;
      }
    )
  }


  show_login_modal(){
    this.user_auth.open_login_modal();
  }

  open_mobile_navigation(){
    console.log("open_mobile_navigation");
    this.mobile_menu_oepn = !this.mobile_menu_oepn;
  }

}

