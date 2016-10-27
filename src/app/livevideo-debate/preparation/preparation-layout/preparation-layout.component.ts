import { Component, OnInit, Input, OnChanges } from '@angular/core';

import {STYLE_NA, STYLE_ASIAN, STYLE_BP} from './../../../interface/deb_style'

import {TEAM_PROPOSITION, TEAM_GOV, TEAM_OG} from './../../../interface/team';



@Component({
  selector: 'app-preparation-layout',
  templateUrl: './preparation-layout.component.html',
  styleUrls: ['./preparation-layout.component.scss']
})
export class PreparationLayoutComponent implements OnInit, Input, OnChanges {

  @Input() event_id;
  @Input() deb_style;
  @Input() participants_team;
  @Input() participants_type;
  @Input() users_in_team;
  @Input() is_in_team_myself;
  @Input() current_own_team;

  @Input() room_users;
  @Input() video_data;
  
  prep_team : string;
  audience_team : string = null;
  default_team : string;


  constructor() { }

  ngOnInit() {

    switch(this.deb_style){
      case STYLE_NA:
        this.default_team = TEAM_GOV;
      break;
      case STYLE_ASIAN:
        this.default_team = TEAM_PROPOSITION;
      break;
      case STYLE_BP:
        this.default_team = TEAM_OG;
      break;
    }

  }

  ngOnChanges(){

    this.prep_team = this.audience_team || this.current_own_team[0] || this.default_team;

  }

}
