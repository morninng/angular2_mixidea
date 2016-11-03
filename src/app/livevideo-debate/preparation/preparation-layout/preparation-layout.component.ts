import { Component, OnInit, Input, OnChanges, ChangeDetectorRef } from '@angular/core';

import {STYLE_NA, STYLE_ASIAN, STYLE_BP} from './../../../interface/deb_style'

import {TEAM_PROPOSITION, TEAM_GOV, TEAM_OG} from './../../../interface/team';

import { AngularFire } from 'angularfire2';

import {Observable} from 'rxjs';

import {LiveDebateFirebaseService} from './../../service/live-debate-firebase.service';
import {STATUS_DEBATE} from './../../interface-livedebate/status'



interface Preparation_Document {
  intro: any,
  argument: any
}

@Component({
  selector: 'app-preparation-layout',
  templateUrl: './preparation-layout.component.html',
  styleUrls: ['./preparation-layout.component.scss']
})
export class PreparationLayoutComponent implements OnInit, Input, OnChanges {

  @Input() event_id;
  @Input() deb_style;
  @Input() participants_team;
  @Input() participants_type;
  @Input() users_in_team;
  @Input() is_in_team_myself;
  @Input() current_own_team;

  @Input() room_users;
  @Input() video_data;
  @Input() preparation_start_time
  
  @Input() prep_start_time;
  @Input() prep_duration;
  preparation_time
  timer_subscripton



  current_prep_team : string = null;
  audience_team : string = null;
  default_team : string;

  prep_doc_subscription = null;
  intro_doc = {};
  arg_obj = {};


  constructor(private af: AngularFire,
              private livedebate_firebase: LiveDebateFirebaseService,
              private change_ref: ChangeDetectorRef) { }

  ngOnInit() {

    switch(this.deb_style){
      case STYLE_NA:
        this.default_team = TEAM_GOV;
      break;
      case STYLE_ASIAN:
        this.default_team = TEAM_PROPOSITION;
      break;
      case STYLE_BP:
        this.default_team = TEAM_OG;
      break;
    }

    const source = Observable.interval(1000).map(()=>{
      const current_time = new Date();
      const current_time_val = current_time.getTime();

      return current_time_val;
    })
    this.timer_subscripton = source.subscribe(
      (current_time)=>{
        const preparation_time = (current_time - this.prep_start_time)/1000;
        const prep_time = Math.floor(preparation_time);
        const prep_seconds = prep_time % 60
        const prep_minutes = (prep_time - prep_seconds) / 60;
        this.preparation_time = String(prep_minutes) + ":" + String(prep_seconds);
        this.change_ref.detectChanges()
      }
    )



  }

  ngOnChanges(){

    const prep_team = this.audience_team || this.current_own_team[0] || this.default_team;

    if(this.current_prep_team != prep_team){

      if(this.prep_doc_subscription){
        this.prep_doc_subscription.unsubscribe();
      }
      const reference = "/event_related/livevideo-debate-prepdoc/" + this.event_id + "/" + prep_team;
      const prep_doc_item = this.af.database.object(reference, { preserveSnapshot: true });
      this.prep_doc_subscription
        = prep_doc_item.subscribe((snapshot)=>{

          const prep_doc :Preparation_Document = snapshot.val() || {};
          console.log("preparation document subscription in preparation layout:", prep_doc);
          this.intro_doc = Object.assign({}, prep_doc.intro);
          this.arg_obj = Object.assign({}, prep_doc.argument);
          this.arg_obj["0"] = this.arg_obj["0"] || {};
          this.arg_obj["1"] = this.arg_obj["1"] || {}






      })
      this.current_prep_team = prep_team;
    }

  }

  start_debate(){

    this.livedebate_firebase.change_game_status(this.event_id, STATUS_DEBATE);
    console.log("start debate");
  }


  ngOnDestroy(){
    this.timer_subscripton.unsubscribe();
  }


}


