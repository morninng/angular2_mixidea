import { Component, OnInit,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params  }     from '@angular/router';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import { UserauthService} from './../../../shared/service/userauth.service';
import { COMMENT_TYPE_SENTENCE_WRITTEN, COMMENT_TYPE_SENTENCE_TRANSCRIPT} from './../../service/comment.service'


declare var window:any;

@Component({
  selector: 'app-written-debate',
  templateUrl: './written-debate.component.html',
  styleUrls: ['./written-debate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrittenDebateComponent implements OnInit {


  written_debate_data;
  event_id: string;
  event_item$: FirebaseObjectObservable<any>;
  combined_src_subscription = null;

  /*data generated for the use of child component*/
  own_team: string = "audience";
  opinion: any;
  arg_status: any;
  comment_sentence_written : any;
  comment_sentence_transcription : any;
  team_members
 

  constructor(private route: ActivatedRoute,
               private af: AngularFire, 
               private user_auth : UserauthService,
               private change_ref: ChangeDetectorRef) { }

  ngOnInit() {

    this.route.params.forEach((params: Params) => {

      if(this.combined_src_subscription){
        this.combined_src_subscription.unsubscribe();
        window.scrollTo(0,0);
      }


      this.event_id = params['id']; 
      console.log("route prams for each is called with event id", this.event_id);
      const written_debate_item$ = this.af.database.object('/event_related/written_debate/' + this.event_id);
      const combined_src = this.user_auth.own_user_subject$.combineLatest(written_debate_item$, 
        (own_user, written_debate_data : any)=>{

          console.log("written debate item is updated or user aurhentication is done")
          /*input data*/
          this.written_debate_data = written_debate_data;
          const own_uid = own_user.id;
          
          /* computed data*/ 
          this.team_members = written_debate_data.team || {};
          if(this.team_members.proposition && this.team_members.proposition[own_uid]){
            this.own_team = "proposition";
          }

          if(this.team_members.opposition && this.team_members.opposition[own_uid]){
            this.own_team = "opposition";
          }

          this.opinion = written_debate_data.opinion;
          this.opinion = written_debate_data.opinion;
          this.arg_status = written_debate_data.arg_status;
          const written_debate_comment = written_debate_data.comment || {};
          this.comment_sentence_written = written_debate_comment[COMMENT_TYPE_SENTENCE_WRITTEN] || {};
          this.comment_sentence_transcription = written_debate_comment[COMMENT_TYPE_SENTENCE_TRANSCRIPT] || {};
          this.change_ref.markForCheck();
        }
      )
      this.combined_src_subscription = combined_src.subscribe();


      this.event_item$ = this.af.database.object('/event_related/event/' + this.event_id);
    });






/*
    if(!this.user_auth.own_user.loggedIn){
      alert("you need to login to see event data");
      this.user_auth.open_login_modal();
    }
  */  
  }

  ngOnDestroy(){
    this.combined_src_subscription.unsubscribe();
  }
  


}
