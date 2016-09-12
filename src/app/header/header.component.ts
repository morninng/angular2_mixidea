import { Component, OnInit, ViewChild } from '@angular/core';
import { UserauthService} from './../shared/userauth.service';

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

  ngOnInit() { }


  @ViewChild(ModalDirective) login_modal:ModalDirective;


  login(){
    console.log("login button is clicked");
    this.login_modal.show()
    this.user_auth.login();
  }


  hide_login_modal(){
    this.login_modal.hide();
  }

  logout(){
    this.user_auth.logout();
  }

}

