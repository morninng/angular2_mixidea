import { Component, OnInit, ViewChild } from '@angular/core';
import { UserauthService} from './../shared/userauth.service';

import {User} from './../interface/user'
import { ModalDirective } from './../../../node_modules/ng2-bootstrap/components/modal/modal.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor(private user_auth : UserauthService) { }

  notification_arr = [];
  message_arr = [];

  own_user :User

  ngOnInit() {

    this.own_user =  { loggedIn:false,full_name:"",short_name:"",pict_src:""};

    this.user_auth.own_user_subject$.subscribe(
      (user_data : User)=>{
        this.own_user = user_data;
        this.login_modal.hide();
      }
    )
   }


  @ViewChild(ModalDirective) login_modal:ModalDirective;


  show_login_modal(){
    console.log("login button is clicked");
    this.login_modal.show()
  }

  login_fb(){
    console.log("facebook login is called");
    this.user_auth.login();
  }



  hide_login_modal(){
    this.login_modal.hide();
  }

  logout(){
    this.user_auth.logout();
  }

}

