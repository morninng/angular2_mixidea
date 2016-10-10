import { Component, OnInit, Input,OnChanges } from '@angular/core';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss']
})
export class TeamMemberComponent implements OnInit,OnChanges {

  @Input() team_members;
  proposition_members:string[];
  opposition_members:string[];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    console.log(this.team_members);
    const team_members = this.team_members || {};
    this.proposition_members = team_members.proposition;
    this.opposition_members = team_members.opposition;
  }

}
