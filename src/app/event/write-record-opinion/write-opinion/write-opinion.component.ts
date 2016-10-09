import { Component, OnInit,Input } from '@angular/core';
import {EventFirebaseService} from './../../event-service/event-firebase.service'
import { UserauthService} from './../../../shared/userauth.service';

@Component({
  selector: 'app-write-opinion',
  templateUrl: './write-opinion.component.html',
  styleUrls: ['./write-opinion.component.scss']
})
export class WriteOpinionComponent implements OnInit {


  @Input() event_id: string;
  @Input() team_name: string;
  @Input() opinion_id: string;
  @Input() arg_id: string;
  @Input() type:string

  constructor(private event_firebase :EventFirebaseService,
              private user_auth : UserauthService) { }

  ngOnInit() {
  }


  upload_opinion(text){

    if(!this.user_auth.own_user.loggedIn){
      alert("you need to login to upload context");
      this.user_auth.open_login_modal();
      return;
    }

    const section_arr = text.split("\n\n");
    const opinion_content_arr = section_arr.map((value)=>{return {content:value}});
    console.log(opinion_content_arr)

    this.event_firebase.upload_opinion_content(this.event_id,this.arg_id, this.opinion_id, this.type,this.team_name, opinion_content_arr);
  }

}
