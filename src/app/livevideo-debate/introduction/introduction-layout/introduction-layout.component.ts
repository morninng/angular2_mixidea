import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {STYLE_NA, STYLE_ASIAN, STYLE_BP} from './../../../interface/deb_style'
import {TEAM_PROPOSITION, TEAM_OPPOSITION, 
        TEAM_GOV, TEAM_OPP, 
        TEAM_OG, TEAM_OO, TEAM_CG, TEAM_CO} from './../../../interface/team';
import {TEAM_STYLE_MAPPING} from './../../../interface/team'

import {LiveVideo} from './../../interface-livedebate/livevideo';

@Component({
  selector: 'app-introduction-layout',
  templateUrl: './introduction-layout.component.html',
  styleUrls: ['./introduction-layout.component.scss']
})
export class IntroductionLayoutComponent implements OnInit, OnChanges {

  @Input() livevideo_obj : LiveVideo;
  @Input() event_id;
  @Input() room_users;
  @Input() video_data;
  team_members;

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

  users_in_team = [];
  users_not_involved_team = [];

  constructor() { }

  ngOnInit() {}

  ngOnChanges(){
    console.log("introduction layout on change has been called");
    const participants = this.livevideo_obj.participants;
    this.team_members = participants.team || {};
    console.log("team_members", this.team_members);

// user related calculation
    const team_list = TEAM_STYLE_MAPPING[this.livevideo_obj.deb_style];
    if(team_list){
      team_list.forEach((team_name)=>{
        const team_member_obj = this.livevideo_obj[team_name];
        if(team_member_obj){
          for(var key in team_member_obj){
            this.users_in_team.push(key);
          }
        }
      })
    }
    this.users_not_involved_team = 
    this.room_users.filter((user_id)=>{
      const result = this.users_in_team.indexOf(user_id)
      return result !==-1;
    })


  }




}
