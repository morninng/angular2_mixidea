import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.scss']
})
export class OpinionComponent implements OnInit {

  @Input() opinion_id :string;
  @Input() opinion :any;
  @Input() subsequent_id :string;
  @Input() opinion_status : string;

  _el;
  audio_element;

  constructor(private el: ElementRef) { }


  ngAfterViewInit(){

    this._el = this.el.nativeElement;
    const audio_container = this._el.getElementsByClassName("audio_container")[0];

    if(this.opinion.audio_url){

      console.log(this.opinion.audio_url);
      this.audio_element = new Audio();
      this.audio_element.controls = true;
      this.audio_element.src = this.opinion.audio_url;
      this.audio_element.addEventListener("play", ()=>{ console.log("play"); });
      this.audio_element.addEventListener("seeked", ()=>{ console.log("seeked"); });
      this.audio_element.addEventListener("timeupdate", ()=>{ console.log("time update"); });
      audio_container.insertBefore(this.audio_element, null);

    }
  }


  ngOnInit() {
    
  }



}
