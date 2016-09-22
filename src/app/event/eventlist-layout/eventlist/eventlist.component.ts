import { Component, OnInit, OnDestroy } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { ONLINE_DEBATE_LIVEVIDEO, ONLINE_DEBATE_WRITTEN, ONLINE_TOURNAMENT_LIVEVIDEO, ONLINE_TOURNAMENT_WRITTEN}
   from './../../event'

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.scss']
})
export class EventlistComponent implements OnInit, OnDestroy {

  ONLINE_DEBATE_LIVEVIDEO = ONLINE_DEBATE_LIVEVIDEO;
  ONLINE_DEBATE_WRITTEN = ONLINE_DEBATE_WRITTEN;
  ONLINE_TOURNAMENT_LIVEVIDEO = ONLINE_TOURNAMENT_LIVEVIDEO;
  ONLINE_TOURNAMENT_WRITTEN = ONLINE_TOURNAMENT_WRITTEN;

  EventList_observable : FirebaseListObservable<any[]>;
  eventlist_subscription
  
  constructor( private af: AngularFire, private router: Router) { }

  ngOnInit() {

    const current_time = new Date().getTime();
    console.log("eventlist subscription start");  
    this.EventList_observable = 
      this.af.database.list('/event_related/event', {
        query: {
          limitToLast: 1000,
          orderByChild: 'date_time_finish',
          startAt: current_time
        }
      });
    this.eventlist_subscription 
     = this.EventList_observable.subscribe()

  }

  ngOnDestroy(){
    console.log("eventlist unsubscribe")
    this.eventlist_subscription.unsubscribe();
  }

  event_selected(e){
    console.log(e);
    this.router.navigate(['eventcontext/onlinedebate_written', e.id])
  }

}

