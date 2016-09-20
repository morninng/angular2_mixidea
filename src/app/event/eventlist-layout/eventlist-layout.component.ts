import { Component, OnInit, ViewChild } from '@angular/core';
import {EventcreateModalComponent} from './../eventcreate-modal/eventcreate-modal.component';

@Component({
  selector: 'app-eventlist-layout',
  templateUrl: './eventlist-layout.component.html',
  styleUrls: ['./eventlist-layout.component.scss']
})
export class EventlistLayoutComponent implements OnInit  {

  @ViewChild(EventcreateModalComponent)
  private event_create_modal :EventcreateModalComponent;


  constructor() { }

  ngOnInit() {
  }

  open_eventcreate_modal(){
    this.event_create_modal.open_modal();
  }



}
