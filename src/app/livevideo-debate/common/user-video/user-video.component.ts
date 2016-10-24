import { Component, OnInit, Input, AfterViewInit,ElementRef } from '@angular/core';

@Component({
  selector: 'app-user-video',
  templateUrl: './user-video.component.html',
  styleUrls: ['./user-video.component.scss']
})
export class UserVideoComponent implements OnInit {

  @Input() user_id;
  @Input() video_src;
  _el;

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this._el = this.el.nativeElement;
  }

  ngAfterViewInit(){
    if(!this.video_src){
      return;
    }
    const video_container = this._el.getElementsByClassName("user_video_container")[0];
    video_container.innerHTML = "";
    const video_element = document.createElement("video");
    video_element.autoplay = true;
    video_element.src= this.video_src
    video_container.insertBefore(video_element, null)
    console.log(video_element.src);
  }

}
