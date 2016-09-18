import { Component, OnInit } from '@angular/core';
import { UserauthService} from './../../shared/userauth.service';
import {User} from './../../interface/user'

@Component({
  selector: 'app-articlelist-layout',
  templateUrl: './articlelist-layout.component.html',
  styleUrls: ['./articlelist-layout.component.scss']
})
export class ArticlelistLayoutComponent implements OnInit {


  own_user :User =  { loggedIn:false,full_name:"",short_name:"",pict_src:""};

  constructor(private user_auth : UserauthService) {

    console.log("article list component initialized");
   }

  ngOnInit() {
    this.user_auth.own_user_subject$.subscribe(
      (user_data : User)=>{
        console.log("own user subject is called in article layout")
        this.own_user = user_data;
      }
    )
  }

}
