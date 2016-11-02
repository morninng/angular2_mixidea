import { Component, OnInit,  Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-prep-team-member',
  templateUrl: './prep-team-member.component.html',
  styleUrls: ['./prep-team-member.component.scss']
})
export class PrepTeamMemberComponent implements OnInit {


  @Input() participants_team;
  @Input() prep_team;

  room_team_member_arr;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.participants_team = this.participants_team || {};
    const team_member_obj = this.participants_team[this.prep_team];
    this.room_team_member_arr = [];
    for(let key in team_member_obj){
      this.room_team_member_arr.push(key);
    }
  }

}
