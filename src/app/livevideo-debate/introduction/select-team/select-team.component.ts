import { Component, OnInit, Input } from '@angular/core';
import {LiveDebateFirebaseService} from './../../service/live-debate-firebase.service';

import { UserauthService} from './../../../core/service/userauth.service';


@Component({
  selector: 'app-select-team',
  templateUrl: './select-team.component.html',
  styleUrls: ['./select-team.component.scss']
})
export class SelectTeamComponent implements OnInit {

  @Input() team;
  @Input() event_id;

  constructor(private livedebate_firebase: LiveDebateFirebaseService,
               private user_auth : UserauthService) { }

  ngOnInit() {
  }

  join_team(){
    console.log("join", this.team);
    this.livedebate_firebase.join_team(this.event_id,
                                       this.team,
                                       this.user_auth.own_user_id );
  }

}
