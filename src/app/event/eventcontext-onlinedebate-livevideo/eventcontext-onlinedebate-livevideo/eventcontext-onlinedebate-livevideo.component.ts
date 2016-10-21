import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventcontext-onlinedebate-livevideo',
  templateUrl: './eventcontext-onlinedebate-livevideo.component.html',
  styleUrls: ['./eventcontext-onlinedebate-livevideo.component.scss']
})
export class EventcontextOnlinedebateLivevideoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  enter_video_call(){
    console.log("enter video call");
  }


}
