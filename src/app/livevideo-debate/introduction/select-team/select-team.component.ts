import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {LiveDebateFirebaseService} from './../../service/live-debate-firebase.service';

import { UserauthService} from './../../../core/service/userauth.service';

import {SkywayService} from './../../service/skyway.service';

@Component({
  selector: 'app-select-team',
  templateUrl: './select-team.component.html',
  styleUrls: ['./select-team.component.scss']
})
export class SelectTeamComponent implements OnInit, OnChanges {

  @Input() event_id;
  @Input() team_member;
  @Input() video_data;
  @Input() team_name;
  @Input() is_in_team;

  is_my_team

  id_videourl_mapping = {};

  constructor(private livedebate_firebase: LiveDebateFirebaseService,
               private user_auth : UserauthService,
               private skyway : SkywayService) { }


  ngOnInit() {

  }

  ngOnChanges(){
    console.log(this.team_member);
    this.team_member = this.team_member || {};
    this.video_data = this.video_data || {};

    if(this.team_member[this.user_auth.own_user.id]){
      this.is_my_team = true;
    }else{
      this.is_my_team = false;
    }
  }

  join_team(){
    console.log("join", this.team_name);
    this.livedebate_firebase.join_team(this.event_id,
                                       this.team_name,
                                       this.user_auth.own_user_id );
  }

  leave_team(){
    console.log("cancel", this.team_name);
    this.livedebate_firebase.leave_team(this.event_id,
                                       this.team_name,
                                       this.user_auth.own_user_id );

  }


}
