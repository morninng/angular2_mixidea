import { Component, OnInit, Input, ElementRef, OnChanges,ChangeDetectionStrategy,ChangeDetectorRef } from '@angular/core';
import {ArticleFirebaseService} from './../../service/article-firebase.service'

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.component.html',
  styleUrls: ['./opinion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpinionComponent implements OnInit, OnChanges {
  
  @Input() event_id : string;
  @Input() argument_id : string
  @Input() opinion_id :string;
  @Input() opinion :any;
  @Input() opinion_status : string;
  @Input() argument_team : string;
  @Input() opinion_team : string;
  @Input() comment_sentence_written;
  @Input() comment_sentence_transcript;
  @Input() category : string;
  @Input() subsequent_id : string;


  _el;
  audio_element;
  opinion_type
  writer
  audio_url
  content_arr
  transcript_arr;
  is_opinion_prop : boolean;
  is_opinion_opp : boolean;
  audio_play_time  = -1;

  constructor(private el: ElementRef, 
              private article_firebase : ArticleFirebaseService,
              private change_ref: ChangeDetectorRef) { }


  ngOnChanges(){
    console.log("opinion component on change opinion id is", this.opinion_id);
    this.opinion_type = this.opinion.type;
    this.writer = this.opinion.writer;
    this.audio_url = this.opinion.audio_url;
    this.content_arr = this.opinion.content_arr;
    this.transcript_arr = this.opinion.transcript_arr; 

    this.is_opinion_prop = this.opinion_team=='proposition';
    this.is_opinion_opp = this.opinion_team=='opposition';
  }


  ngOnInit() {
  }


  ngAfterViewInit(){

    this._el = this.el.nativeElement;
    const audio_container = this._el.getElementsByClassName("audio_container")[0];

    if(this.opinion.audio_url){
      console.log(this.opinion.audio_url);
      this.audio_element = new Audio();
      this.audio_element.controls = true;
      this.audio_element.src = this.opinion.audio_url;
      this.audio_element.addEventListener("play", ()=>{ this.audio_time_update( "play"); });
      this.audio_element.addEventListener("seeked", ()=>{ this.audio_time_update( "seeked"); });
      this.audio_element.addEventListener("timeupdate", ()=>{ this.audio_time_update( "time_update"); });
      audio_container.insertBefore(this.audio_element, null);
    }
  }


  private audio_time_update(type){
    
    this.audio_play_time = this.audio_element.currentTime * 1000;
    console.log("audio play time update", this.audio_play_time);
    this.change_ref.markForCheck();

  }



  publish_opinion(){

    this.article_firebase.publish_opinion(
              this.event_id, 
              this.argument_id, 
              this.category,
              this.subsequent_id);


  }


}
