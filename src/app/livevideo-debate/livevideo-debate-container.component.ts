import { Component, OnInit,ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {STATUS_INTRO, STATUS_PREP, STATUS_DEBATE, STATUS_REFLECTION} from './interface-livedebate/status'
import {STYLE_NA, STYLE_ASIAN, STYLE_BP} from './../interface/deb_style'
import { AngularFire } from 'angularfire2';


import { UserauthService} from './../core/service/userauth.service';

import {SkywayService} from './service/skyway.service';
import {LiveVideo} from './interface-livedebate/livevideo';

@Component({
  selector: 'app-livevideo-debate-container',
  templateUrl: './livevideo-debate-container.component.html',
  styleUrls: []
})


export class LivevideoDebateContainerComponent implements OnInit, OnDestroy {

  STATUS_INTRO = STATUS_INTRO;
  STATUS_PREP = STATUS_PREP;
  STATUS_DEBATE = STATUS_DEBATE;
  STATUS_REFLECTION = STATUS_REFLECTION;
  
  event_id = null;
  livevideo_obj : LiveVideo = {
    game_status : STATUS_INTRO,
    deb_style: STYLE_NA,
    participants: {},
    motion:null
  };
  video_data={};
  room_users = [];

  combined_subscription;

  constructor(private route: ActivatedRoute,
               private router: Router,
               private af: AngularFire,
               private change_ref: ChangeDetectorRef,
               private skyway : SkywayService,
               private user_auth : UserauthService) { }


  ngOnInit() {
    this.event_id = this.route.snapshot.params['id'];

    const event_item = this.af.database.object('/event_related/livevideo-debate/' + this.event_id, { preserveSnapshot: true });

    const combined_src = event_item.subscribe((event_snapshot)=>{

      const in_livevideo_obj = event_snapshot.val();

      const updated_livevideo_obj : LiveVideo = {
        game_status: in_livevideo_obj.game_status || STATUS_INTRO,
        deb_style: in_livevideo_obj.deb_style || STYLE_NA,
        participants: in_livevideo_obj.participants || {},
        motion: in_livevideo_obj.motion || null,
      };
      this.livevideo_obj = Object.assign({}, updated_livevideo_obj);

      console.log("livevideo_obj updated", this.livevideo_obj);

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

    this.combined_subscription.unsubscribe();
  
  }

}
