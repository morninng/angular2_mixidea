import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  }     from '@angular/router';
import 'rxjs/add/operator/combineLatest'; 


@Component({
  selector: 'app-write-record-arg',
  templateUrl: './write-record-arg.component.html',
  styleUrls: ['./write-record-arg.component.scss']
})
export class WriteRecordArgComponent implements OnInit {

  router_param_subscription : any;
  event_id :string;
  team_name :string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const source = this.route.params.combineLatest(this.route.queryParams, (param: Params, query)=>{
      return {param, query}
    })
    this.router_param_subscription = source.subscribe(
      (obj)=>{
        // event id and team is included.
        console.log(obj);

        this.event_id = obj.param["id"];
        this.team_name = obj.query["team_name"];
      }
    )
  }


}
