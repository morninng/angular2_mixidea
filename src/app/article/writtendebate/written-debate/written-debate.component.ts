import { Component, OnInit,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params,NavigationExtras  }     from '@angular/router';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import { UserauthService} from './../../../core/service/userauth.service';
import { COMMENT_TYPE_SENTENCE_WRITTEN, COMMENT_TYPE_SENTENCE_TRANSCRIPT} from './../../service/comment.service'
import {TEAM_PROPOSITION, TEAM_OPPOSITION} from "./../../../interface/team"
import {CREATE_MAIN_OPINION, 
        ADD_SUBSEQUENT_OPINION, 
        UPDATE_MAIN_OPINION_Written, 
        UPDATE_MAIN_OPINION_AudioTranscript,
        UPDATE_SUBSEQUENT_OPINION_Written,
        UPDATE_SUBSEQUENT_OPINION_AudioTranscript} from './../../../interface/opinion'

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

  event_state
  event_title
  event_start_time
  event_duration

  constructor(private route: ActivatedRoute,
               private af: AngularFire, 
               private user_auth : UserauthService,
               private change_ref: ChangeDetectorRef,
               private router: Router) { }

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
            this.own_team = TEAM_PROPOSITION;
          }

          if(this.team_members.opposition && this.team_members.opposition[own_uid]){
            this.own_team = TEAM_OPPOSITION;
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


      this.event_item$ = this.af.database.object('/event_related/event/' + this.event_id,  {preserveSnapshot: true });
      this.event_item$.subscribe(snapshot => {

        const event_data = snapshot.val() || {};
        const current_time = new Date();
        const current_time_val = current_time.getTime();

        if( event_data.date_time_start  && current_time_val < event_data.date_time_start){
          this.event_state = "not yet started";
        }else if ( event_data.date_time_finish && current_time_val < event_data.date_time_finish){
          this.event_state = "on going";
        }else if ( event_data.date_time_finish < current_time_val ){
          this.event_state = "closed";
        }

        this.event_title = event_data.title;
        this.event_start_time = event_data.date_time_start;
        this.event_duration = event_data.duration;



      });


    });

/*
    if(!this.user_auth.own_user.loggedIn){
      alert("you need to login to see event data");
      this.user_auth.open_login_modal();
    }
  */  
  }




  add_new_argument(){

    if(!this.user_auth.own_user.loggedIn){
      alert("you need to login to add argument");
      this.user_auth.open_login_modal();
      return;
    }

    if(this.own_team !=TEAM_PROPOSITION && this.own_team !=TEAM_OPPOSITION){
      alert("only the debater can add an argument, please join the event");
      return;
    }


    let navigationExtras: NavigationExtras = {
      queryParams: {
        phase: CREATE_MAIN_OPINION,
        team_name:this.own_team }
    }
    this.router.navigate(['/event/eventcontext/writerecord_opinion',this.event_id], navigationExtras);

  }


  ngOnDestroy(){
    this.combined_src_subscription.unsubscribe();
  }
  


}
