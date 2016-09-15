import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventlist-layout',
  templateUrl: './eventlist-layout.component.html',
  styleUrls: ['./eventlist-layout.component.scss']
})
export class EventlistLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("event list component initialized");
  }

}
