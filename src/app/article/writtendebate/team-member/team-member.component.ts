import { Component, OnInit, Input,OnChanges } from '@angular/core';

import {SharedFirebaseService} from "./../../../shared/service/shared-firebase.service";

import { UserauthService} from './../../../shared/service/userauth.service';
import {TEAM_PROPOSITION, TEAM_OPPOSITION} from "./../../../interface/team"

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss']
})

export class TeamMemberComponent implements OnInit,OnChanges {

  @Input() team_members;
  @Input() event_id;
  proposition_members:string[];
  opposition_members:string[];

  constructor(private user_auth : UserauthService,
                private shared_firebase : SharedFirebaseService) { }

  ngOnInit() {
  }

  ngOnChanges(){
    console.log(this.team_members);
    const team_members = this.team_members || {};
    this.proposition_members = team_members.proposition;
    this.opposition_members = team_members.opposition;
  }


  join_as_proposition(){
    if(!this.user_auth.own_user.loggedIn){
      alert("you need to login to join event");
      this.user_auth.open_login_modal();
      return;
    }
    this.shared_firebase.join_writtendebate_event_team(this.user_auth.own_user_id, this.event_id, TEAM_PROPOSITION);
  }

  join_as_opposition(){
    if(!this.user_auth.own_user.loggedIn){
      alert("you need to login to join event");
      this.user_auth.open_login_modal();
      return;
    }
    this.shared_firebase.join_writtendebate_event_team(this.user_auth.own_user_id, this.event_id, TEAM_OPPOSITION);
  }

}
