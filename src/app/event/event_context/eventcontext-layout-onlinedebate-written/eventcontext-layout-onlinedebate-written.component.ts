import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-eventcontext-layout-onlinedebate-written',
  templateUrl: './eventcontext-layout-onlinedebate-written.component.html',
  styleUrls: ['./eventcontext-layout-onlinedebate-written.component.scss']
})
export class EventcontextLayoutOnlinedebateWrittenComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
    const id = this.route.snapshot.params['id'];
    console.log(id);

  }

}
