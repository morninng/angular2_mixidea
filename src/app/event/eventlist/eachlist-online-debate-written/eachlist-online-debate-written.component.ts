import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-eachlist-online-debate-written',
  templateUrl: './eachlist-online-debate-written.component.html',
  styleUrls: ['./eachlist-online-debate-written.component.scss']
})
export class EachlistOnlineDebateWrittenComponent implements OnInit {


   @Input() each_event : any;
   @Output() event_selected = new EventEmitter<any>();

   start_time;

  constructor() { }

  ngOnInit() {
    this.start_time = new Date(this.each_event.date_time_start)
  }

  select_event(){
    this.event_selected.emit({ id: this.each_event.$key , type:this.each_event.type })
  }

}
