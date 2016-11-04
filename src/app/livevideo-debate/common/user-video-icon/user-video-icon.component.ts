import { Component, OnInit, Input, OnChanges, ElementRef, ChangeDetectorRef,NgZone, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user-video-icon',
  templateUrl: './user-video-icon.component.html',
  styleUrls: ['./user-video-icon.component.scss']
})
export class UserVideoIconComponent implements OnInit, OnChanges, OnDestroy {

  @Input() video_data
  @Input() user_env
  @Input() room_users
  @Input() user_id
  /*
  @Input() type
  @Input() height
  @Input() width
  */
  video_src = null;
  _el;

  show_video = false;
  show_image = false;
  


  constructor(private el: ElementRef,
             private change_ref: ChangeDetectorRef,
             private _ngZone: NgZone) { }

  ngOnInit() {
    this._el = this.el.nativeElement;
  }

  ngOnChanges() {
    this.video_data = this.video_data || {};
    let updated_video_src = this.video_data[this.user_id];
    const user_env = this.user_env || {};
    const video_env = user_env.video || {};
    this.room_users = this.room_users || [];

    if(!updated_video_src){
      console.log("only image is shown for user ", this.user_id);
    }else if (video_env[this.user_id] == false){

      console.log("user video environment is not available", this.user_id);
      updated_video_src = null;
    }else if(this.room_users.indexOf(this.user_id) == -1) {

      console.log("user is not in the room");
      updated_video_src = null;
    }else{
          console.log("video start to be shown to ", this.user_id);
    }


    if(this.video_src && !updated_video_src){
      setTimeout(this.remove_video_area, 100);
    }

    if(updated_video_src && this.video_src !=updated_video_src){
      setTimeout(this.set_user_video, 1000);
    }
    this.video_src = updated_video_src;
  }


  remove_video_area = ()=>{
    const video_container = this._el.getElementsByClassName("video_container")[0];
    video_container.innerHTML = "";
  }
  


  set_user_video = ()=>{
    this.remove_video_area();

    console.log("video element is created with src : ",this.video_src);
    const video_container = this._el.getElementsByClassName("video_container")[0];
    const video_element = document.createElement("video");
    video_element.autoplay = true;
    video_element.src= this.video_src
    video_element.width=100
    video_element.height=100
    video_container.insertBefore(video_element, null)
    console.log(video_element.src);
    this.change_ref.detectChanges();

    this._ngZone.run(()=>{});
  }

  ngOnDestroy(){
    this.remove_video_area();
  }
  


}
