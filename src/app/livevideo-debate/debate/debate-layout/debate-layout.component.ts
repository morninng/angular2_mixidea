import { Component, OnInit, Input } from '@angular/core';

import {TEAM_SIDE_MAPPING} from './../../../interface/team'

import {STYLE_NA, STYLE_ASIAN, STYLE_BP} from './../../../interface/deb_style'

import {DEBATE_STATUS_WAITING, 
      DEBATE_STATUS_SPEECH_SPEAKER, 
      DEBATE_STATUS_SPEECH_POI} from './../../interface-livedebate/status'


@Component({
  selector: 'app-debate-layout',
  templateUrl: './debate-layout.component.html',
  styleUrls: ['./debate-layout.component.scss']
})
export class DebateLayoutComponent implements OnInit {

  @Input() event_id;
  @Input() deb_style;
  @Input() participants_team;
  @Input() participants_type;
  @Input() is_in_team_myself;
  @Input() current_own_team;
  @Input() room_users;
  @Input() video_data;
  @Input() speech_status;

  own_team : string;
  own_team_side = "no_side";
  next_speaker_role_num : number = 1;
  debate_status = DEBATE_STATUS_WAITING;
  main_speaker = null;
  poi_speaker = null;
  poi_candidates = [];
  speech_start_time;

  constructor() { }

  ngOnInit() {


  }

  ngOnChanges(){
    this.current_own_team = this.current_own_team || [];
    this.own_team = this.current_own_team[0];
    if(this.own_team){
      this.own_team_side = TEAM_SIDE_MAPPING[this.own_team]
    }
    
    this.speech_status = this.speech_status || {};
    this.main_speaker = this.speech_status.main_speaker;
    if(this.main_speaker){
      this.speech_start_time = this.main_speaker.speech_start_time;
    }
    this.poi_speaker = this.speech_status.poi_speaker;
    this.poi_candidates.length=0;
    for(let key in this.speech_status.poi_candidates){
      this.poi_candidates.push(key);
    }

    if(this.poi_speaker){
      this.debate_status = DEBATE_STATUS_SPEECH_POI;
    }else if(this.main_speaker){
      this.debate_status = DEBATE_STATUS_SPEECH_SPEAKER;
    }else{
      this.debate_status = DEBATE_STATUS_WAITING;
    }

  }
  

}
