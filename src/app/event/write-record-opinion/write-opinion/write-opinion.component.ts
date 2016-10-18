import { Component, OnInit,Input, OnChanges } from '@angular/core';
import {EventFirebaseService} from './../../service/event-firebase.service'
import { UserauthService} from './../../../core/service/userauth.service';

@Component({
  selector: 'app-write-opinion',
  templateUrl: './write-opinion.component.html',
  styleUrls: ['./write-opinion.component.scss']
})
export class WriteOpinionComponent implements OnInit, OnChanges {


  @Input() event_id: string;
  @Input() team_name: string;
  @Input() opinion_id: string;
  @Input() arg_id: string;
  @Input() phase:string
  @Input() default_text:string

  written_text = ""

  constructor(private event_firebase :EventFirebaseService,
              private user_auth : UserauthService) { }

  ngOnInit() {
  }


  ngOnChanges(){
    if(this.default_text){
      this.written_text = this.default_text;
    }
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

    this.event_firebase.upload_opinion_content(this.event_id,this.arg_id, this.opinion_id, this.phase,this.team_name, opinion_content_arr);
  }

}
