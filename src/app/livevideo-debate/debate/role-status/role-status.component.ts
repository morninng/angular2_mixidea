import { Component, OnInit, Input, OnChanges } from '@angular/core';

import {STYLE_NA, STYLE_ASIAN, STYLE_BP} from './../../../interface/deb_style'

import {NA_ROLE_ARRAY, Asian_ROLE_ARRAY, BP_ROLE_ARRAY} from './../../../interface/role'


@Component({
  selector: 'app-role-status',
  templateUrl: './role-status.component.html',
  styleUrls: ['./role-status.component.scss']
})
export class RoleStatusComponent implements OnInit,OnChanges {

  @Input() deb_style;
  @Input() debate_status;
  @Input() next_speaker_role_num;

  team_list = []

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.team_list = [];
    switch(this.deb_style){

      case STYLE_NA:
        this.team_list = NA_ROLE_ARRAY;
      break;
      case STYLE_ASIAN:
        this.team_list = Asian_ROLE_ARRAY;
      break;
      case STYLE_BP:
        this.team_list = BP_ROLE_ARRAY;
      break;
    }
  }



}
