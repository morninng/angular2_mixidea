import { Component, OnInit, Input } from '@angular/core';

import {STYLE_NA, STYLE_ASIAN, STYLE_BP} from './../../../interface/deb_style'


import {TEAM_PROPOSITION, TEAM_OPPOSITION, 
        TEAM_GOV, TEAM_OPP, TEAM_OG, TEAM_OO, TEAM_CG, TEAM_CO} from './../../../interface/team';



@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss']
})
export class TeamMemberComponent implements OnInit {

  @Input() participants_team;
  @Input() deb_style;

  STYLE_NA = STYLE_NA;
  STYLE_ASIAN = STYLE_ASIAN;
  STYLE_BP = STYLE_BP;

  NA_gov_members = [];
  NA_opp_members = [];
  Asian_prop_members = [];
  Asian_opp_members = [];
  BP_OG_members = [];
  BP_OO_members = [];
  BP_CG_members = [];
  BP_CO_members = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.participants_team = this.participants_team || {};

    switch(this.deb_style){
      case STYLE_NA:
        const gov_obj = this.participants_team[TEAM_GOV];
        this.NA_gov_members = [];
        for(let key in gov_obj){
          this.NA_gov_members.push(key);
        }
        const opp_obj = this.participants_team[TEAM_OPP];
        this.NA_opp_members = [];
        for(let key in opp_obj){
          this.NA_opp_members.push(key);
        }
      break;
      case STYLE_ASIAN:

      break;
      case STYLE_BP:

      break;

    }




  }
  

}
