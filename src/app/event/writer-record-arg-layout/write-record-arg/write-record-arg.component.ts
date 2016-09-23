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

  constructor(private route: ActivatedRoute) { }


  ngOnInit() {
    console.log("WriteRecordArgComponent");

    const source = this.route.params.combineLatest(this.route.queryParams, (param, query)=>{
      return {param, query}
    })
    this.router_param_subscription = source.subscribe(
      (obj)=>{
        console.log(obj);
      }
    )

  }

}
