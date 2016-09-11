import { Component, OnInit } from '@angular/core';
import { UserauthService} from './../shared/userauth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private user_auth : UserauthService) { }

  notification_arr = [];
  message_arr = [];

  ngOnInit() {
  }

  login=()=>{
    this.user_auth.login();
  }

  logout=()=>{
    this.user_auth.logout();
  }

}
