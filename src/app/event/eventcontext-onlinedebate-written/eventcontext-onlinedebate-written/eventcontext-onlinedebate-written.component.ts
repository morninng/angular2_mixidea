import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { UserauthService} from './../../../shared/service/userauth.service';

import {PublishArticleFromEvent} from "./../../publish-article-from-event"

import {CREATE_MAIN_OPINION} from './../../../interface/opinion'

import{ONLINE_DEBATE_LIVE_VIDEO, ONLINE_DEBATE_WRITTEN} from './../../event_type'

@Component({
  selector: 'app-eventcontext-onlinedebate-written',
  templateUrl: './eventcontext-onlinedebate-written.component.html',
  styleUrls: ['./eventcontext-onlinedebate-written.component.scss']
})
export class EventcontextOnlinedebateWrittenComponent implements OnInit, OnDestroy {

  evnet_id : string;
  event_obj_observable : FirebaseObjectObservable<any>;
  event_obj_subscription;
  event_title;
  event_start_time;
  event_duration;

  constructor(private route: ActivatedRoute,
               private router: Router,
               private af: AngularFire,
                private user_auth : UserauthService) { }

  ngOnInit() {
    this.evnet_id = this.route.snapshot.params['id'];
    console.log(this.evnet_id);
    
    this.event_obj_observable = this.af.database.object('/event_related/event/' + this.evnet_id);
    this.event_obj_subscription = this.event_obj_observable.subscribe(
        (event_obj)=>{
          console.log(event_obj);
          this.event_title = event_obj.title;
          const start_time = event_obj.date_time_start;
          this.event_start_time = new Date(start_time);
        }
    );
  }

  join_as_proposition(){
    this.join_set_firebase("proposition");
  }

  join_as_opposition(){
    this.join_set_firebase("opposition");
  } 

  private join_set_firebase(in_team){

    if(!this.user_auth.own_user.loggedIn){
      alert("you need to login to create a game");
      this.user_auth.open_login_modal();
      return;
    }
    const participate_item = this.af.database.object("/event_related/event/" + this.evnet_id + "/participnts/" + this.user_auth.own_user_id);
    participate_item.set(true);
    const prop_item = this.af.database.object("/event_related/written_debate/" + this.evnet_id + "/team/" + in_team + "/" + this.user_auth.own_user_id);
    prop_item.set(true);

  }


  add_opinion_prop(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        phase: CREATE_MAIN_OPINION,
        team_name:"proposition"}
    }
    this.router.navigate(['/writerecord_opinion',this.evnet_id], navigationExtras);
  }

  add_opinion_opp(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        phase: CREATE_MAIN_OPINION,
        team_name:"opposition"}
    }
    this.router.navigate(['/writerecord_opinion',this.evnet_id], navigationExtras);
  }

  publish_to_public(){
    console.log("publish to public");
    const publish_article_obj = new PublishArticleFromEvent(this.af)
    publish_article_obj.publish(this.evnet_id, ONLINE_DEBATE_WRITTEN, this.event_title, [], "description ");
  }

  ngOnDestroy(){
    this.event_obj_subscription.unsubscribe();
  }

}
