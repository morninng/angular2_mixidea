import { Component, OnInit, Input, OnChanges,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import {STYLE_NA, STYLE_ASIAN, STYLE_BP} from './../../../interface/deb_style'


import {TEAM_SIDE_MAPPING} from './../../../interface/team';
import { UserauthService} from './../../../core/service/userauth.service';
import {LiveDebateFirebaseService} from './../../service/live-debate-firebase.service';

import {DEBATE_STATUS_WAITING, 
      DEBATE_STATUS_SPEECH_MAIN_SPEAKER, 
      DEBATE_STATUS_SPEECH_POI} from './../../interface-livedebate/status'

import {Observable} from 'rxjs';

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
  @Input() main_speaker_role;
  @Input() speech_start_time;

  DEBATE_STATUS_WAITING = DEBATE_STATUS_WAITING;
  DEBATE_STATUS_SPEECH_MAIN_SPEAKER = DEBATE_STATUS_SPEECH_MAIN_SPEAKER;
  DEBATE_STATUS_SPEECH_POI = DEBATE_STATUS_SPEECH_POI;
  
  timer_subscription;
  
  speech_time_spent
  speech_time_spent_show

  constructor(private user_auth : UserauthService,
              private livedebate_firebase: LiveDebateFirebaseService,
              private change_ref: ChangeDetectorRef) { }

  ngOnInit() {

    const timer_source = Observable.interval(1000).map(()=>{
      const current_time = new Date();
      return current_time.getTime();
    });
    this.timer_subscription = timer_source.subscribe((current_time)=>{
      this.speech_time_spent = current_time - this.speech_start_time;
      const time_second_num = Math.floor(this.speech_time_spent/1000);
      const speech_time_seconds = time_second_num % 60;
      const speech_time_minutes = Math.floor(time_second_num/60);
      if(speech_time_seconds < 10){
        this.speech_time_spent_show = String(speech_time_minutes) + ":0" + String(speech_time_seconds);
      }else{
        this.speech_time_spent_show = String(speech_time_minutes) + ":" + String(speech_time_seconds);
      }
      
      console.log(this.speech_time_spent_show);
      this.change_ref.markForCheck()
    })

  }


  ngOnChanges(){
    console.log("debate controller component on changes");
    this.speech_start_time = this.speech_start_time || 0;

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
   // this.livedebate_firebase.complete_speech(this.event_id, this.main_speaker_role, this.speech_duration)
  }

}
