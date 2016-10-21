import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-eventcontext-onlinedebate-livevideo',
  templateUrl: './eventcontext-onlinedebate-livevideo.component.html',
  styleUrls: ['./eventcontext-onlinedebate-livevideo.component.scss']
})
export class EventcontextOnlinedebateLivevideoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
               private router: Router) { }
  evnet_id

  ngOnInit() {
    this.evnet_id = this.route.snapshot.params['id'];
    console.log(this.evnet_id);
  }

  enter_video_call(){
    console.log("enter video call");
    this.router.navigate(['/livevideo-debate', this.evnet_id]);
  }


}
