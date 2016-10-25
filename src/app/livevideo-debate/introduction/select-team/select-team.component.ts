import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {LiveDebateFirebaseService} from './../../service/live-debate-firebase.service';

import { UserauthService} from './../../../core/service/userauth.service';

import {SkywayService} from './../../service/skyway.service';

@Component({
  selector: 'app-select-team',
  templateUrl: './select-team.component.html',
  styleUrls: ['./select-team.component.scss']
})
export class SelectTeamComponent implements OnInit, OnChanges {

  @Input() team;
  @Input() event_id;
  @Input() team_member;
  @Input() video_data;

  id_videourl_mapping = {};

  constructor(private livedebate_firebase: LiveDebateFirebaseService,
               private user_auth : UserauthService,
               private skyway : SkywayService) { }


  ngOnInit() {

  }

  ngOnChanges(){
    console.log(this.team_member);
    this.team_member = this.team_member || {};
    this.video_data = this.video_data || {};
  }

  join_team(){
    console.log("join", this.team);
    this.livedebate_firebase.join_team(this.event_id,
                                       this.team,
                                       this.user_auth.own_user_id );
  }

}
