import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';


import {DEBATE_STATUS_WAITING, 
      DEBATE_STATUS_SPEECH_MAIN_SPEAKER, 
      DEBATE_STATUS_SPEECH_POI} from './../../interface-livedebate/status'

import { UserauthService} from './../../../core/service/userauth.service';
import {LiveDebateFirebaseService} from './../../service/live-debate-firebase.service';


@Component({
  selector: 'app-speaker-view',
  templateUrl: './speaker-view.component.html',
  styleUrls: ['./speaker-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeakerViewComponent implements OnInit {

  @Input() event_id;
  @Input() debate_status;
  @Input() main_speaker_id;
  @Input() poi_speaker_id;
  @Input() poi_candidates_id_arr;
  @Input() video_data;
  @Input() next_speaker_role_num;
  @Input() next_speaker_role_name;
  @Input() next_speaker_side;
  @Input() next_speaker_team;
  @Input() speech_start_button_value;


  main_speaker_team_side="left";

  DEBATE_STATUS_WAITING = DEBATE_STATUS_WAITING;
  DEBATE_STATUS_SPEECH_MAIN_SPEAKER = DEBATE_STATUS_SPEECH_MAIN_SPEAKER;
  DEBATE_STATUS_SPEECH_POI = DEBATE_STATUS_SPEECH_POI;

  constructor(private user_auth : UserauthService,
              private livedebate_firebase: LiveDebateFirebaseService) { }

  ngOnInit() {

  }

  ngOnChanges(){

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




}
