import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ONLINE_DEBATE_LIVEVIDEO, ONLINE_DEBATE_WRITTEN, ONLINE_TOURNAMENT_LIVEVIDEO, ONLINE_TOURNAMENT_WRITTEN}
   from './../../event'
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-eachlist-online-debate-written',
  templateUrl: './eachlist-online-debate-written.component.html',
  styleUrls: ['./eachlist-online-debate-written.component.scss']
})
export class EachlistOnlineDebateWrittenComponent implements OnInit {


   @Input() each_event : any;
   /*
   @Output() event_selected = new EventEmitter<any>();
*/
   start_time;

  constructor( private router: Router) { }

  ngOnInit() {
    this.start_time = new Date(this.each_event.date_time_start)
  }

  select_event(){
   // this.event_selected.emit({ id: this.each_event.$key , type:this.each_event.type })

    switch(this.each_event.type){
      case ONLINE_DEBATE_LIVEVIDEO:
        this.router.navigate(['/event/eventcontext/onlinedebate_livevideo', this.each_event.$key]);
      break;
      case ONLINE_DEBATE_WRITTEN:
        this.router.navigate(['/event/eventcontext/onlinedebate_written', this.each_event.$key]);
      break;
      case ONLINE_TOURNAMENT_LIVEVIDEO:
      break;
      case ONLINE_TOURNAMENT_WRITTEN:
      break;

    }



  }




}
