import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

import {TEAM_SIDE_MAPPING} from './../../../interface/team'

import {STYLE_NA, STYLE_ASIAN, STYLE_BP} from './../../../interface/deb_style'

import {DEBATE_STATUS_WAITING, 
      DEBATE_STATUS_SPEECH_MAIN_SPEAKER, 
      DEBATE_STATUS_SPEECH_POI} from './../../interface-livedebate/status'

import { UserauthService} from './../../../core/service/userauth.service';

import {NA_ROLE_SHORT_ENUM,ROLE_SIDE_MAPPING,
         ROLE_TEAM_MAPPING_NA,
        ROLE_TEAM_MAPPING_Asian,
        ROLE_TEAM_MAPPING_BP } from './../../../interface/role'

import {LiveDebateFirebaseService} from './../../service/live-debate-firebase.service';

import {STATUS_REFLECTION} from './../../interface-livedebate/status'


@Component({
  selector: 'app-debate-layout',
  templateUrl: './debate-layout.component.html',
  styleUrls: ['./debate-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  @Input() speech_log;

  own_team : string;
  own_team_side = "no_side";
  next_speaker_role_num : number;
  last_completed_role_num : number;
  completed_role_obj = {};
  debate_status = DEBATE_STATUS_WAITING;
  main_speaker = null;
  poi_speaker = null;
  poi_candidates_id_arr = [];
  speech_start_time;

  main_speaker_id;
  is_main_speaker_yourself = false;
  poi_speaker_id;
  is_poi_speaker_yourself = false;
  main_speaker_team_side;

  is_poi_candidate_yourself = false;


  next_speaker_role_name : string;
  next_speaker_side : string;
  next_speaker_team : string;
  speech_start_button_value : string;
  main_speaker_role_name : string
  main_speaker_role_num : number
  main_speech_start_time : number;

  all_speech_finished = false;

  constructor(private change_ref: ChangeDetectorRef,
              private user_auth : UserauthService,
              private livedebate_firebase: LiveDebateFirebaseService) { }

  ngOnInit() {
  }

  ngOnChanges(){

//retrieve the info from input data

    this.speech_status = this.speech_status || {};
    this.main_speaker = this.speech_status.main_speaker;
    if(this.main_speaker){
      this.speech_start_time = this.main_speaker.speech_start_time;
    }
    this.poi_speaker = this.speech_status.poi_speaker;

    this.poi_candidates_id_arr=[];
    for(let key in this.speech_status.poi_candidates){
      this.poi_candidates_id_arr.push(key);
    }

// check the debate status from the existence of the speaker

    if(this.poi_speaker){
      this.debate_status = DEBATE_STATUS_SPEECH_POI;
    }else if(this.main_speaker){
      this.debate_status = DEBATE_STATUS_SPEECH_MAIN_SPEAKER;
    }else{
      this.debate_status = DEBATE_STATUS_WAITING;
    }

// set speaker id to show the video

    switch(this.debate_status){
      case DEBATE_STATUS_WAITING:
        this.poi_speaker_id = null;
        this.main_speaker_id = null;
      break;
      case DEBATE_STATUS_SPEECH_MAIN_SPEAKER:
        this.poi_speaker_id = null;
        this.main_speaker_id = this.main_speaker.user_id;
        this.main_speaker_team_side = this.main_speaker.team_side;
        this.main_speaker_role_name = this.main_speaker.role_name;
        this.main_speaker_role_num = this.main_speaker.role_num;
        this.main_speech_start_time = this.main_speaker.speech_start_time;
      break;
      case DEBATE_STATUS_SPEECH_POI:
        this.poi_speaker_id = this.poi_speaker.user_id;
        this.main_speaker_id = this.main_speaker.user_id;
        this.main_speaker_team_side = this.main_speaker.team_side
        this.main_speaker_role_name = this.main_speaker.role_name;
        this.main_speaker_role_num = this.main_speaker.role_num;
        this.main_speech_start_time = this.main_speaker.speech_start_time;
      break;
    }

// check own status

    this.current_own_team = this.current_own_team || [];
    this.own_team = this.current_own_team[0];
    if(this.own_team){
      this.own_team_side = TEAM_SIDE_MAPPING[this.own_team]
    }

    if(this.main_speaker_id　&& this.main_speaker_id == this.user_auth.own_user.id){
      this.is_main_speaker_yourself = true;
    }else{
      this.is_main_speaker_yourself = false;
    }

    if(this.poi_speaker_id&& this.poi_speaker_id == this.user_auth.own_user.id){
      this.is_poi_speaker_yourself = true;
    }else{
      this.is_poi_speaker_yourself = false;
    }


    if(this.poi_candidates_id_arr.indexOf(this.user_auth.own_user.id) == -1){
      this.is_poi_candidate_yourself = false;
    }else{
      this.is_poi_candidate_yourself = true;
    }

//completed role and next role calculation

    this.speech_log = this.speech_log || {};
    this.last_completed_role_num = this.speech_log.last_completed_role_num || 0
    this.next_speaker_role_num = this.last_completed_role_num + 1;
    this.completed_role_obj = this.speech_log.completed_role_obj || {};
    /*
    this.completed_role_list = [];
    for(let key in completed_role_list_obj){
      this.completed_role_list.push(key);
    }*/

// next speaker related calculation for starting the next speech

    switch(this.deb_style){
      case STYLE_NA:
        this.next_speaker_role_name = NA_ROLE_SHORT_ENUM[this.next_speaker_role_num];
        this.next_speaker_side = ROLE_SIDE_MAPPING[this.next_speaker_role_name];
        this.next_speaker_team = ROLE_TEAM_MAPPING_NA[this.next_speaker_role_name];
      break;
      case STYLE_ASIAN:
      break;
      case STYLE_BP:
      break;
    }
    if(!this.next_speaker_role_name){
      this.all_speech_finished = true;
    }else{
      this.all_speech_finished = false;
      this.speech_start_button_value = "start speech as " + this.next_speaker_role_name;
    }


    this.change_ref.markForCheck();
  }
  
  goto_reflection(){
    this.livedebate_firebase.change_game_status(this.event_id, STATUS_REFLECTION);
    console.log("start debate");
  }


}
