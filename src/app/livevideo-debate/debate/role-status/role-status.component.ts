import { Component, OnInit, Input, OnChanges } from '@angular/core';

import {STYLE_NA, STYLE_ASIAN, STYLE_BP} from './../../../interface/deb_style'

import {NA_ROLE_ARRAY, Asian_ROLE_ARRAY, BP_ROLE_ARRAY} from './../../../interface/role'

import {DEBATE_STATUS_WAITING, 
      DEBATE_STATUS_SPEECH_MAIN_SPEAKER, 
      DEBATE_STATUS_SPEECH_POI} from './../../interface-livedebate/status'


@Component({
  selector: 'app-role-status',
  templateUrl: './role-status.component.html',
  styleUrls: ['./role-status.component.scss']
})
export class RoleStatusComponent implements OnInit,OnChanges {

  @Input() deb_style;
  @Input() debate_status;
  @Input() next_speaker_role_num;
  @Input() main_speaker_role_num;
  @Input() completed_role_obj;

  DEBATE_STATUS_WAITING = DEBATE_STATUS_WAITING;
  DEBATE_STATUS_SPEECH_MAIN_SPEAKER = DEBATE_STATUS_SPEECH_MAIN_SPEAKER;
  DEBATE_STATUS_SPEECH_POI = DEBATE_STATUS_SPEECH_POI;

  team_list = []

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.completed_role_obj = this.completed_role_obj || {};
    this.team_list = [];
    switch(this.deb_style){

      case STYLE_NA:
        this.team_list = NA_ROLE_ARRAY;
      break;
      case STYLE_ASIAN:
        this.team_list = Asian_ROLE_ARRAY;
      break;
      case STYLE_BP:
        this.team_list = BP_ROLE_ARRAY;
      break;
    }
    for(let i=0; i<this.team_list.length; i++){
      if(this.completed_role_obj[this.team_list[i].num]){
        this.team_list[i].completed = true;
      }else{
        this.team_list[i].completed = false;
      }
      if(this.main_speaker_role_num == this.team_list[i].num){
        this.team_list[i].main_speaker = true;        
      }else{
        this.team_list[i].main_speaker = false;  
      }
      if(this.next_speaker_role_num == this.team_list[i].num){
        this.team_list[i].next_speaker = true;        
      }else{
        this.team_list[i].next_speaker = false;  
      }
    }
    
  }



}
