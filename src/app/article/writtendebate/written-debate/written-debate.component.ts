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

  written_debate_data: FirebaseObjectObservable<any>;
  event_data: FirebaseObjectObservable<any>;
  constructor(private route: ActivatedRoute, private af: AngularFire, private user_auth : UserauthService) { }

  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      let event_id = params['id']; 
      console.log(event_id);

      this.written_debate_data = this.af.database.object('/event_related/written_debate/' + event_id);
      this.event_data = this.af.database.object('/event_related/event/' + event_id);
      console.log("event data");
    });
/*
    if(!this.user_auth.own_user.loggedIn){
      alert("you need to login to see event data");
      this.user_auth.open_login_modal();
    }
  */  
  }
 
}
