import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  }     from '@angular/router';
import 'rxjs/add/operator/combineLatest'; 
import {generate_id} from './../../../util_func';


@Component({
  selector: 'app-write-record-arg',
  templateUrl: './write-record-arg.component.html',
  styleUrls: ['./write-record-arg.component.scss']
})
export class WriteRecordArgComponent implements OnInit {

  router_param_subscription : any;
  event_id :string;
  arg_each_content_id : string;
  team_name :string;


  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.arg_each_content_id = generate_id();

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
