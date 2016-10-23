import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';

import { UserauthService} from './../../core/service/userauth.service';


import {SkywayService} from './../service/skyway.service';


@Component({
  selector: 'app-environment-check',
  templateUrl: './environment-check.component.html',
  styleUrls: ['./environment-check.component.scss']
})
export class EnvironmentCheckComponent implements OnInit {

  constructor(private route: ActivatedRoute,
               private router: Router
               ,private user_auth : UserauthService,
               private skyway : SkywayService) { }

  evnet_id

  ngOnInit() {
    this.evnet_id = this.route.snapshot.params['id'];
    console.log(this.evnet_id);
    this.skyway.get_usermedia();
  }


  join_game(){

    if(!this.user_auth.own_user.loggedIn){
      alert("you need to login to enter video call");
      this.user_auth.open_login_modal();
      return;
    }
    console.log("enter video call");
    this.router.navigate(['/livevideo-debate/game/', this.evnet_id]);
  }



}
