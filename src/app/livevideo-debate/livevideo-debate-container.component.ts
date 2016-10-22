import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {STATUS_INTRO, STATUS_PREP, STATUS_DEBATE, STATUS_REFLECTION} from './livedebate-interface/status'
import {STYLE_NA, STYLE_ASIAN, STYLE_BP} from './../interface/deb_style'

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
  livevideo_obj = {
    game_status : STATUS_INTRO,
    deb_style: STYLE_NA
  };

  constructor(private route: ActivatedRoute,
               private router: Router) { }



  ngOnInit() {
    this.event_id = this.route.snapshot.params['id'];
    console.log(this.event_id);
  }

}
