import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-argument',
  templateUrl: './argument.component.html',
  styleUrls: ['./argument.component.scss']
})
export class ArgumentComponent implements OnInit {

  @Input() argument_id: string;
  @Input() own_team: string;

  constructor() { }

  ngOnInit() {
    console.log("argument id", this.argument_id);
  }

}
