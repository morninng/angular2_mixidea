import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  }     from '@angular/router';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';

@Component({
  selector: 'app-written-debate',
  templateUrl: './written-debate.component.html',
  styleUrls: ['./written-debate.component.scss']
})
export class WrittenDebateComponent implements OnInit {

  written_debate_data: FirebaseObjectObservable<any>;
  event_data: FirebaseObjectObservable<any>;
  constructor(private route: ActivatedRoute, private af: AngularFire) { }

  ngOnInit() {
    console.log("written debate component initialize");

    this.route.params.forEach((params: Params) => {
      let event_id = params['id']; 
      console.log(event_id);

      this.written_debate_data = this.af.database.object('/event_related/written_debate/' + event_id);
      this.event_data = this.af.database.object('/event_related/event/' + event_id);
    });
  }
 
}
