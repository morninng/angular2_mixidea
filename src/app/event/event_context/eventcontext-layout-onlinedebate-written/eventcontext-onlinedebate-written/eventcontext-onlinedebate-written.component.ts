import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import {PublishArticleFromEvent} from "./../../../publish-article-from-event"


import{ONLINE_DEBATE_LIVE_VIDEO, ONLINE_DEBATE_WRITTEN} from './../../../event_type'

@Component({
  selector: 'app-eventcontext-onlinedebate-written',
  templateUrl: './eventcontext-onlinedebate-written.component.html',
  styleUrls: ['./eventcontext-onlinedebate-written.component.scss']
})
export class EventcontextOnlinedebateWrittenComponent implements OnInit, OnDestroy {

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

  add_arg_prop(){
    let navigationExtras: NavigationExtras = {
      queryParams: {team_name:"proposition"}
    }
    this.router.navigate(['/writerecord_opinion',this.evnet_id], navigationExtras);
  }

  add_arg_opp(){
    
    let navigationExtras: NavigationExtras = {
      queryParams: {team_name:"opposition"}
    }
    this.router.navigate(['/writerecord_opinion',this.evnet_id], navigationExtras);
  }


  publish_to_public(){
    console.log("publish to public");
    const publish_article_obj = new PublishArticleFromEvent(this.af)
    publish_article_obj.publish(this.evnet_id, ONLINE_DEBATE_WRITTEN, "thw ban tobacco", ["aaa", "bbb"], "description ");
  }


  ngOnDestroy(){
    this.event_obj_subscription.unsubscribe();
  }
  

}
