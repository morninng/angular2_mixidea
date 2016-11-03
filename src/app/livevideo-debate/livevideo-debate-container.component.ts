import { Component, OnInit,ChangeDetectorRef, OnDestroy,ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {STATUS_INTRO, STATUS_PREP, STATUS_DEBATE, STATUS_REFLECTION} from './interface-livedebate/status'
import {STYLE_NA, STYLE_ASIAN, STYLE_BP} from './../interface/deb_style'
import { AngularFire } from 'angularfire2';


import { UserauthService} from './../core/service/userauth.service';

import {SkywayService} from './service/skyway.service';
import {LiveVideo} from './interface-livedebate/livevideo';
import {TEAM_STYLE_MAPPING} from './../interface/team'

@Component({
  selector: 'app-livevideo-debate-container',
  templateUrl: './livevideo-debate-container.component.html',
  styleUrls: ['./livevideo-debate-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class LivevideoDebateContainerComponent implements OnInit, OnDestroy {

  STATUS_INTRO = STATUS_INTRO;
  STATUS_PREP = STATUS_PREP;
  STATUS_DEBATE = STATUS_DEBATE;
  STATUS_REFLECTION = STATUS_REFLECTION;
  
  event_id = null;
  video_data={};
  room_users = [];
  participants_team = {};
  participants_type = {};
  is_in_team_myself = false;
  current_own_team = [];
  users_in_team = [];
  deb_style : string;
  motion : string;
  team_name_list = [];
  prep_start_time = 0;
  prep_duration = 0


  game_status : string;
  speech_status : any;
  speech_log : any;

  event_item_subscription;

  constructor(private route: ActivatedRoute,
               private router: Router,
               private af: AngularFire,
               private change_ref: ChangeDetectorRef,
               private skyway : SkywayService,
               private user_auth : UserauthService) { }


  ngOnInit() {
    this.event_id = this.route.snapshot.params['id'];

    const event_item = this.af.database.object('/event_related/livevideo-debate/' + this.event_id, { preserveSnapshot: true });

    this.event_item_subscription = event_item.subscribe((event_snapshot)=>{

      const in_livevideo_obj = event_snapshot.val() || {};

      this.game_status = in_livevideo_obj.game_status || STATUS_INTRO
      this.deb_style = in_livevideo_obj.deb_style || STYLE_NA;
      this.motion = in_livevideo_obj.motion;
      const participants = in_livevideo_obj.participants || {};
      this.participants_team =  participants.team || {};
      this.participants_type =  participants.type || {};

  // user related calculation
    //  console.log("TEAM_STYLE_MAPPING", TEAM_STYLE_MAPPING);
      this.team_name_list = TEAM_STYLE_MAPPING[this.deb_style];
    // console.log("team_name_list", this.team_name_list);

      this.is_in_team_myself = false;
      this.current_own_team=[];
      this.users_in_team=[];

      if(this.team_name_list){
        for(var i=0; i<this.team_name_list.length; i++){
          const team_name = this.team_name_list[i];
          const team_member = this.participants_team[team_name];
     //     console.log("team_member", team_member);
          if(team_member){
            for(var key in team_member){
              this.users_in_team.push(key);
              if(this.user_auth.own_user.id == key){
                this.is_in_team_myself = true;
                this.current_own_team.push(team_name);
              }
            }
          }
        }
      }

// preparation dependent prameter
      this.prep_start_time = in_livevideo_obj.prep_start_time;
      this.prep_duration = in_livevideo_obj.prep_duration;

// debate dependent parameter

      this.speech_status = Object.assign({}, in_livevideo_obj.speech_status);
      this.speech_log = Object.assign({}, in_livevideo_obj.speech_log);


      this.change_ref.markForCheck();
    })


    this.skyway.room_data_subject.subscribe((room_data)=>{
      console.log("room data is updated", room_data)
      this.room_users = room_data.room_users || [];
      this.video_data = room_data.video_data || {};
      
      this.change_ref.markForCheck();
    })

    this.skyway.join_room('main', this.event_id ,null);
  }

  ngOnDestroy(){
    this.event_item_subscription.unsubscribe();
  }

}
