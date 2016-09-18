import { Component, OnInit } from '@angular/core';
import { UserauthService} from './../../shared/userauth.service';
import {User} from './../../interface/user'

@Component({
  selector: 'app-eventlist-layout',
  templateUrl: './eventlist-layout.component.html',
  styleUrls: ['./eventlist-layout.component.scss']
})
export class EventlistLayoutComponent implements OnInit {

  own_user :User =  { loggedIn:false,full_name:"",short_name:"",pict_src:""};

  constructor(private user_auth : UserauthService) { }

  event_list = [
    {name:"aaa", context:"fff"},
    {name:"aaa", context:"fff"},
    {name:"aaa", context:"fff"},
  ]


  ngOnInit() {
    console.log("event list component initialized");
      this.user_auth.own_user_subject$.subscribe(
      (user_data : User)=>{
        console.log("own user subject is called in eventlist component")
        this.own_user = user_data;
      }
    )

  }




}
