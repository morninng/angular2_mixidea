import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {STATUS_INTRO, STATUS_PREP, STATUS_DEBATE, STATUS_REFLECTION} from './livedebate-interface/status'
import {STYLE_NA, STYLE_ASIAN, STYLE_BP} from './../interface/deb_style'
import { AngularFire } from 'angularfire2';

import {LiveVideo} from './livedebate-interface/livedebate';

@Component({
  selector: 'app-livevideo-debate-container',
  templateUrl: './livevideo-debate-container.component.html',
  styleUrls: []
})


export class LivevideoDebateContainerComponent implements OnInit {

  STATUS_INTRO = STATUS_INTRO;
  STATUS_PREP = STATUS_PREP;
  STATUS_DEBATE = STATUS_DEBATE;
  STATUS_REFLECTION = STATUS_REFLECTION;
  
  event_id = null;
  livevideo_obj : LiveVideo = {
    game_status : STATUS_INTRO,
    deb_style: STYLE_NA,
    participants: {}
  };

  constructor(private route: ActivatedRoute,
               private router: Router,
               private af: AngularFire,
               private change_ref: ChangeDetectorRef) { }



  ngOnInit() {
    this.event_id = this.route.snapshot.params['id'];
    console.log(this.event_id);


    const event_item = this.af.database.object('/event_related/livevideo-debate/' + this.event_id, { preserveSnapshot: true });
    event_item.subscribe((snapshot)=>{
      const in_livevideo_obj = snapshot.val();
      const updated_livevideo_obj : LiveVideo = {
        game_status: in_livevideo_obj.game_status || this.livevideo_obj.game_status,
        deb_style: in_livevideo_obj.deb_style || this.livevideo_obj.deb_style,
        participants: in_livevideo_obj.participants || {}
      };
      this.livevideo_obj = Object.assign({}, updated_livevideo_obj);
      console.log("livevideo_obj updated");
      console.log(this.livevideo_obj);
      this.change_ref.markForCheck();
    })

  }

}
