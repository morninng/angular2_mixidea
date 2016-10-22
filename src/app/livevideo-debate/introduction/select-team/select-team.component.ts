import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {LiveDebateFirebaseService} from './../../service/live-debate-firebase.service';

import { UserauthService} from './../../../core/service/userauth.service';


@Component({
  selector: 'app-select-team',
  templateUrl: './select-team.component.html',
  styleUrls: ['./select-team.component.scss']
})
export class SelectTeamComponent implements OnInit, OnChanges {

  @Input() team;
  @Input() event_id;
  @Input() team_member;

  constructor(private livedebate_firebase: LiveDebateFirebaseService,
               private user_auth : UserauthService) { }

  ngOnInit() {
  }

  ngOnChanges(){
    console.log(this.team_member);
    this.team_member = this.team_member || {};
  }

  join_team(){
    console.log("join", this.team);
    this.livedebate_firebase.join_team(this.event_id,
                                       this.team,
                                       this.user_auth.own_user_id );
  }

}
