import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select-team',
  templateUrl: './select-team.component.html',
  styleUrls: ['./select-team.component.scss']
})
export class SelectTeamComponent implements OnInit {

  @Input() team;

  constructor() { }

  ngOnInit() {
  }

}
