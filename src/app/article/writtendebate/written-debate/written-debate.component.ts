import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  }     from '@angular/router';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import { UserauthService} from './../../../shared/userauth.service';


@Component({
  selector: 'app-written-debate',
  templateUrl: './written-debate.component.html',
  styleUrls: ['./written-debate.component.scss']
})
export class WrittenDebateComponent implements OnInit {


  written_debate_data;
  event_id: string;
  event_data: FirebaseObjectObservable<any>;
  combined_src_subscription = null;

  /*data generated for the use of child component*/
  own_team: string = "audience";
  opinion: any;
  arg_status: any;
  comment_sentence_written : any;


  constructor(private route: ActivatedRoute, private af: AngularFire, private user_auth : UserauthService) { }



  ngOnInit() {

    this.route.params.forEach((params: Params) => {

      if(this.combined_src_subscription){
        this.combined_src_subscription.unsubscribe();
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
          if(written_debate_data.team){
            const team = written_debate_data.team;
            if(team.proposition && team.proposition[own_uid]){
              this.own_team = "proposition";
            }
            if(team.opposition && team.opposition[own_uid]){
              this.own_team = "opposition";
            }
          }

          this.opinion = Object.assign({}, written_debate_data.opinion);
          this.arg_status = Object.assign({}, written_debate_data.arg_status)
          if(!written_debate_data.comment){
            written_debate_data.comment = {};
          }
          this.comment_sentence_written = Object.assign({}, written_debate_data.comment.sentence_written);
        }
      )
      this.combined_src_subscription = combined_src.subscribe();

      this.event_data = this.af.database.object('/event_related/event/' + this.event_id);
      console.log("event data");
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
