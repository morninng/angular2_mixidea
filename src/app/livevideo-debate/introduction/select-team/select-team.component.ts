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
  @Input() team_name;
  @Input() team_member;
  @Input() current_own_team;
  @Input() is_in_team_myself;
  @Input() video_data;

  is_my_team
  show_leave_team = false;
  show_join_team = false;
  show_move_to_team = false;

  id_videourl_mapping = {};

  constructor(private livedebate_firebase: LiveDebateFirebaseService,
               private user_auth : UserauthService,
               private skyway : SkywayService) { }


  ngOnInit() {

  }

  ngOnChanges(){
    console.log(this.team_name);
    console.log(this.team_member);
    this.team_member = this.team_member || {};
    this.video_data = this.video_data || {};

    if(this.team_member[this.user_auth.own_user.id]){
      this.is_my_team = true;
    }else{
      this.is_my_team = false;
    }

    if(this.is_my_team){
      this.show_leave_team = true;
      this.show_join_team = false;
      this.show_move_to_team = false;
    }else{
      if(this.is_in_team_myself){
        this.show_leave_team = false;
        this.show_join_team = false;
        this.show_move_to_team = true;
      }else{
        this.show_leave_team = false;
        this.show_join_team = true;
        this.show_move_to_team = false;
      }
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

  move_team(){
    console.log("move team", this.team_name);
    this.livedebate_firebase.move_team(this.event_id,
                                        this.current_own_team,
                                       this.team_name,
                                       this.user_auth.own_user_id );
  }

}
