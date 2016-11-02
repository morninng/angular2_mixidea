import { Component, OnInit, Input, OnChanges,ChangeDetectionStrategy } from '@angular/core';
import {STYLE_NA, STYLE_ASIAN, STYLE_BP} from './../../../interface/deb_style'
import {NA_ROLE_SHORT_ENUM,ROLE_SIDE_MAPPING,
         ROLE_TEAM_MAPPING_NA,
        ROLE_TEAM_MAPPING_Asian,
        ROLE_TEAM_MAPPING_BP } from './../../../interface/role'

import {TEAM_SIDE_MAPPING} from './../../../interface/team';
import { UserauthService} from './../../../core/service/userauth.service';
import {LiveDebateFirebaseService} from './../../service/live-debate-firebase.service';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControllerComponent implements OnInit,OnChanges {

  @Input() next_speaker_role_num;
  @Input() deb_style;
  @Input() event_id;
  @Input() poi_speaker;

  next_speaker_role_neme : string;
  speech_start_button_value : string;
  next_speaker_side : string;
  next_speaker_team : string;
  
  constructor(private user_auth : UserauthService,
              private livedebate_firebase: LiveDebateFirebaseService) { }

  ngOnInit() {
  }


  ngOnChanges(){
    console.log("debate controller component on changes");
    switch(this.deb_style){
      case STYLE_NA:
        this.next_speaker_role_neme = NA_ROLE_SHORT_ENUM[this.next_speaker_role_num];
        this.next_speaker_side = ROLE_SIDE_MAPPING[this.next_speaker_role_neme];
        this.next_speaker_team = ROLE_TEAM_MAPPING_NA[this.next_speaker_role_neme]
      break;
      case STYLE_ASIAN:
      break;
      case STYLE_BP:
      break;
    }
    this.speech_start_button_value = "start speech as " + this.next_speaker_role_neme;
  }
  
  speech_start(){
    const current_time = new Date();
    const current_time_val = current_time.getTime();
    const speaker_obj = {
      user_id : this.user_auth.own_user_id,
      role_num: this.next_speaker_role_num,
      role_name: this.next_speaker_role_neme,
      team_side: this.next_speaker_side,
      team_name: this.next_speaker_team,
      speech_start_time: current_time_val
    }
    console.log('speaker_obj', speaker_obj);
    this.livedebate_firebase.set_debate_speaker(this.event_id, speaker_obj);
  }

  speech_finish(){
    this.livedebate_firebase.remove_speech_status(this.event_id);
  }

  poi(){
    this.livedebate_firebase.set_poi_candidate(this.event_id, this.user_auth.own_user_id);
  }

  cancel_poi(){
    this.livedebate_firebase.cancel_poi_candidate(this.event_id, this.user_auth.own_user_id);
  }

  finish_poi(){
    this.livedebate_firebase.remove_poi_speaker(this.event_id);
  }
  

}
