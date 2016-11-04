import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {STYLE_NA, STYLE_ASIAN, STYLE_BP} from './../../../interface/deb_style'
import {TEAM_PROPOSITION, TEAM_OPPOSITION, 
        TEAM_GOV, TEAM_OPP, 
        TEAM_OG, TEAM_OO, TEAM_CG, TEAM_CO} from './../../../interface/team';

import {LiveVideo} from './../../interface-livedebate/livevideo';

import { UserauthService} from './../../../core/service/userauth.service';
import {LiveDebateFirebaseService} from './../../service/live-debate-firebase.service';

import {STATUS_PREP} from './../../interface-livedebate/status'


@Component({
  selector: 'app-introduction-layout',
  templateUrl: './introduction-layout.component.html',
  styleUrls: ['./introduction-layout.component.scss']
})
export class IntroductionLayoutComponent implements OnInit, OnChanges {

  @Input() event_id;
  @Input() deb_style;
  @Input() participants_team;
  @Input() participants_type;
  @Input() users_in_team;
  @Input() is_in_team_myself;
  @Input() current_own_team;

  @Input() room_users;
  @Input() video_data;
  @Input() user_env;
  @Input() motion;

  STYLE_NA = STYLE_NA;
  STYLE_ASIAN = STYLE_ASIAN;
  STYLE_BP = STYLE_BP;
  
  TEAM_PROPOSITION = TEAM_PROPOSITION;
  TEAM_OPPOSITION = TEAM_OPPOSITION;
  TEAM_GOV = TEAM_GOV;
  TEAM_OPP = TEAM_OPP;
  TEAM_OG = TEAM_OG;
  TEAM_OO = TEAM_OO;
  TEAM_CG = TEAM_CG;
  TEAM_CO = TEAM_CO;

  users_not_involved_team = [];

  constructor(private user_auth : UserauthService, 
              private livedebate_firebase: LiveDebateFirebaseService) { }

  ngOnInit() {}

  ngOnChanges(){
    console.log("introduction layout on change has been called");


    this.users_not_involved_team = 
    this.room_users.filter((user_id)=>{
      const result = this.users_in_team.indexOf(user_id)
      return result == -1;
    })
    console.log("users_not_involved_team", this.users_not_involved_team)


  }

  start_preparation(){
    
    this.livedebate_firebase.change_game_status(this.event_id, STATUS_PREP);

    this.livedebate_firebase.set_prep_start_time(this.event_id);
    this.livedebate_firebase.set_prep_duration(this.event_id, 0.1);
    this.livedebate_firebase.reflesh_speech_log(this.event_id);
    this.livedebate_firebase.remove_speech_status(this.event_id);
  }


}
