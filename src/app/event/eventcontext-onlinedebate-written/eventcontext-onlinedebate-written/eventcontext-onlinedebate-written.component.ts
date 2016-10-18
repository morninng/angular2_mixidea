import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { UserauthService} from './../../../core/service/userauth.service';

import {PublishArticleFromEvent} from "./../../publish-article-from-event"

import {CREATE_MAIN_OPINION} from './../../../interface/opinion'

import{ONLINE_DEBATE_LIVE_VIDEO, ONLINE_DEBATE_WRITTEN} from './../../event_type'

import {TEAM_PROPOSITION, TEAM_OPPOSITION} from "./../../../interface/team"

import {SharedFirebaseService} from "./../../../core/service/shared-firebase.service";

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
                private user_auth : UserauthService,
                private shared_firebase : SharedFirebaseService) { }

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
    if(!this.user_auth.own_user.loggedIn){
      alert("you need to login to join event");
      this.user_auth.open_login_modal();
      return;
    }
    this.shared_firebase.join_writtendebate_event_team(this.user_auth.own_user_id, this.evnet_id, TEAM_PROPOSITION);
  }

  join_as_opposition(){
    if(!this.user_auth.own_user.loggedIn){
      alert("you need to login to join event");
      this.user_auth.open_login_modal();
      return;
    }
    this.shared_firebase.join_writtendebate_event_team(this.user_auth.own_user_id, this.evnet_id, TEAM_OPPOSITION);

  } 


  add_opinion_prop(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        phase: CREATE_MAIN_OPINION,
        team_name:TEAM_PROPOSITION}
    }
    this.router.navigate(['/event/eventcontext/writerecord_opinion',this.evnet_id], navigationExtras);
  }

  add_opinion_opp(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        phase: CREATE_MAIN_OPINION,
        team_name:TEAM_OPPOSITION}
    }
    this.router.navigate(['/event/eventcontext/writerecord_opinion',this.evnet_id], navigationExtras);
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
