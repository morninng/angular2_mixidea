import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {STYLE_NA, STYLE_ASIAN, STYLE_BP} from './../../../interface/deb_style'
import {TEAM_PROPOSITION, TEAM_OPPOSITION, 
        TEAM_GOV, TEAM_OPP, 
        TEAM_OG, TEAM_OO, TEAM_CG, TEAM_CO} from './../../../interface/team';


@Component({
  selector: 'app-introduction-layout',
  templateUrl: './introduction-layout.component.html',
  styleUrls: ['./introduction-layout.component.scss']
})
export class IntroductionLayoutComponent implements OnInit, OnChanges {

  @Input() livevideo_obj;
  @Input() event_id;
  team_members;

  STYLE_NA = STYLE_NA;
  STYLE_ASIAN = STYLE_ASIAN;
  STYLE_BP = STYLE_BP;
  
  TEAM_PROPOSITION = TEAM_PROPOSITION;
  TEAM_OPPOSITION = TEAM_OPPOSITION;
  TEAM_GOV = TEAM_GOV;
  TEAM_OPP = TEAM_OPP;
  TEAM_OG = TEAM_OG;
  TEAM_OO = TEAM_OO;
  TEAM_CG = TEAM_CG;
  TEAM_CO = TEAM_CO;

  constructor() { }

  ngOnInit() {}

  ngOnChanges(){
    console.log("introduction layout on change has been called");
    const participants = this.livevideo_obj.participants;
    this.team_members = participants.team || {};
    console.log("team_members", this.team_members);

  }




}
