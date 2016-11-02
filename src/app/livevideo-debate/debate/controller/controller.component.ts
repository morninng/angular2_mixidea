import { Component, OnInit, Input, OnChanges,ChangeDetectionStrategy } from '@angular/core';
import {STYLE_NA, STYLE_ASIAN, STYLE_BP} from './../../../interface/deb_style'


import {TEAM_SIDE_MAPPING} from './../../../interface/team';
import { UserauthService} from './../../../core/service/userauth.service';
import {LiveDebateFirebaseService} from './../../service/live-debate-firebase.service';

import {DEBATE_STATUS_WAITING, 
      DEBATE_STATUS_SPEECH_MAIN_SPEAKER, 
      DEBATE_STATUS_SPEECH_POI} from './../../interface-livedebate/status'



@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControllerComponent implements OnInit,OnChanges {

  @Input() event_id;
  @Input() deb_style;
  @Input() debate_status;
  @Input() next_speaker_role_num;
  @Input() next_speaker_role_name;
  @Input() next_speaker_side;
  @Input() next_speaker_team;
  @Input() speech_start_button_value;

  DEBATE_STATUS_WAITING = DEBATE_STATUS_WAITING;
  DEBATE_STATUS_SPEECH_MAIN_SPEAKER = DEBATE_STATUS_SPEECH_MAIN_SPEAKER;
  DEBATE_STATUS_SPEECH_POI = DEBATE_STATUS_SPEECH_POI;
  
  constructor(private user_auth : UserauthService,
              private livedebate_firebase: LiveDebateFirebaseService) { }

  ngOnInit() {
  }


  ngOnChanges(){
    console.log("debate controller component on changes");

  }
  
  speech_start(){
    const current_time = new Date();
    const current_time_val = current_time.getTime();
    const speaker_obj = {
      user_id : this.user_auth.own_user_id,
      role_num: this.next_speaker_role_num,
      role_name: this.next_speaker_role_name,
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
