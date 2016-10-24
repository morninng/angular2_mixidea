import { Component, OnInit,ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {STATUS_INTRO, STATUS_PREP, STATUS_DEBATE, STATUS_REFLECTION} from './livedebate-interface/status'
import {STYLE_NA, STYLE_ASIAN, STYLE_BP} from './../interface/deb_style'
import { AngularFire } from 'angularfire2';

import {LiveVideo} from './livedebate-interface/livedebate';

import { UserauthService} from './../core/service/userauth.service';

import {SkywayService} from './service/skyway.service';

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
    room_users: [],
    video_data:{}
  };

  combined_subscription;

  constructor(private route: ActivatedRoute,
               private router: Router,
               private af: AngularFire,
               private change_ref: ChangeDetectorRef,
               private skyway : SkywayService,
               private user_auth : UserauthService) { }


  ngOnInit() {
    this.event_id = this.route.snapshot.params['id'];
    console.log(this.event_id);

    const event_item = this.af.database.object('/event_related/livevideo-debate/' + this.event_id, { preserveSnapshot: true });

    const combined_src = 
    event_item.combineLatest(this.skyway.room_data_subject, (event_snapshot, room_data)=>{


      let video_data = room_data.video_data;
      const room_users = room_data.room_users;
      for(var key in video_data){
        if(room_users && room_users.indexOf(key)==-1){
          delete video_data[key];
        }
      }
      const in_livevideo_obj = event_snapshot.val();

      const updated_livevideo_obj : LiveVideo = {
        game_status: in_livevideo_obj.game_status || STATUS_INTRO,
        deb_style: in_livevideo_obj.deb_style || STYLE_NA,
        participants: in_livevideo_obj.participants || {},
        room_users : room_users || [],
        video_data: video_data || {}
      };
      this.livevideo_obj = Object.assign({}, updated_livevideo_obj);
      console.log("livevideo_obj updated");
      console.log(this.livevideo_obj);
      this.change_ref.markForCheck();
    })

    this.skyway.join_room('main', this.event_id ,null);
    this.combined_subscription = combined_src.subscribe();

  }

  ngOnDestroy(){

    this.combined_subscription.unsubscribe();
  
  }

}
