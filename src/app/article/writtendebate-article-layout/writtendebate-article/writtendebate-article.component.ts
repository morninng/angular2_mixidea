import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  }     from '@angular/router';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';

@Component({
  selector: 'app-writtendebate-article',
  templateUrl: './writtendebate-article.component.html',
  styleUrls: ['./writtendebate-article.component.scss']
})
export class WrittendebateArticleComponent implements OnInit {

  written_debate_data: FirebaseObjectObservable<any>;
  event_data: FirebaseObjectObservable<any>;
  constructor(private route: ActivatedRoute, private af: AngularFire) { }

  test_obj = {aa:"aa", bb:"bb"};
  
  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      let event_id = params['id']; 
      console.log(event_id);

      this.written_debate_data = this.af.database.object('/event_related/written_debate/' + event_id);
      this.event_data = this.af.database.object('/event_related/event/' + event_id);

       
    });




  }



}
