import { Component, OnInit, AfterViewInit,ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';

import { UserauthService} from './../../core/service/userauth.service';

import {SkywayService} from './../service/skyway.service';


@Component({
  selector: 'app-environment-check',
  templateUrl: './environment-check.component.html',
  styleUrls: ['./environment-check.component.scss']
})
export class EnvironmentCheckComponent implements OnInit {

  constructor(private route: ActivatedRoute,
               private router: Router
               ,private user_auth : UserauthService,
               private skyway : SkywayService,
               private el: ElementRef) { }

  evnet_id;
  _el;

  ngOnInit() {
    this._el = this.el.nativeElement;
    this.evnet_id = this.route.snapshot.params['id'];
    console.log(this.evnet_id);

  }

  ngAfterViewInit(){

    console.log("ng after vie init of environment_check");
    this.skyway.local_video_stream_subject.subscribe((stream)=>{
      console.log("local video stream subscription");
      if(stream){
        const video_container = this._el.getElementsByClassName("own_video")[0];
        video_container.innerHTML = "";
        const video_element = document.createElement("video");
        video_element.autoplay = true;
        video_element.src= window.URL.createObjectURL(stream);
        video_container.insertBefore(video_element, null)
        console.log(video_element.src);
        
      }
    })
  }




  join_game(){

    if(!this.user_auth.own_user.loggedIn){
      alert("you need to login to enter video call");
      this.user_auth.open_login_modal();
      return;
    }
    console.log("enter video call");
    this.router.navigate(['/livevideo-debate/game/', this.evnet_id]);
  }



}
