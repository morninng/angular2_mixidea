import { Component, OnInit, Input, AfterViewInit,ElementRef, ChangeDetectorRef,NgZone } from '@angular/core';

@Component({
  selector: 'app-user-video',
  templateUrl: './user-video.component.html',
  styleUrls: ['./user-video.component.scss']
})
export class UserVideoComponent implements OnInit, AfterViewInit {

  @Input() user_id;
  @Input() video_src;
  _el;
  test_initial_video_src : string;

  constructor(private el: ElementRef,
             private change_ref: ChangeDetectorRef,
             private _ngZone: NgZone) { }

  ngOnInit() {
    this._el = this.el.nativeElement;
    this.test_initial_video_src = this.video_src;
  }

  ngAfterViewInit(){
    console.log("video_src", this.video_src);
    setTimeout(this.set_user_video, 1000);
  }

  set_user_video = ()=>{
    if(!this.video_src){
      console.log("no video src for user : ", this.user_id);
      return;
    }
    console.log("video element is created with src : ",this.video_src);
    const video_container = this._el.getElementsByClassName("user_video_container")[0];
    video_container.innerHTML = "";
    const video_element = document.createElement("video");
    video_element.autoplay = true;
    video_element.src= this.video_src
    video_container.insertBefore(video_element, null)
    console.log(video_element.src);
    this.change_ref.detectChanges();

    this._ngZone.run(()=>{});
  }

}
