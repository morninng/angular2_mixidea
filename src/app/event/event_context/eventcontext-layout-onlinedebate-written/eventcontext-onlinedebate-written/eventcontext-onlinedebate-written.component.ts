import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
  selector: 'app-eventcontext-onlinedebate-written',
  templateUrl: './eventcontext-onlinedebate-written.component.html',
  styleUrls: ['./eventcontext-onlinedebate-written.component.scss']
})
export class EventcontextOnlinedebateWrittenComponent implements OnInit {

  evnet_id : string;
  event_obj_observable : FirebaseObjectObservable<any>;
  event_obj_subscription;

  constructor(private route: ActivatedRoute, private router: Router,private af: AngularFire) { }

  ngOnInit() {
    this.evnet_id = this.route.snapshot.params['id'];
    console.log(this.evnet_id);
    
    this.event_obj_observable = this.af.database.object('/event_related/event/' + this.evnet_id);
    this.event_obj_subscription
       = this.event_obj_observable.subscribe();

  }

}
