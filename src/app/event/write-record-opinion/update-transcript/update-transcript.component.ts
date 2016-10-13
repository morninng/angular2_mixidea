import { Component, OnInit, Input, AfterViewChecked, ElementRef, OnChanges,NgZone } from '@angular/core';
import {SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import {ActionCreator} from './../../../redux/action-creator';
import {EventFirebaseService} from './../../event-service/event-firebase.service'



@Component({
  selector: 'app-update-transcript',
  templateUrl: './update-transcript.component.html',
  styleUrls: ['./update-transcript.component.scss']
})
export class UpdateTranscriptComponent implements OnInit,  OnChanges {

  @Input() audio_url :string;
  @Input() event_id :string;
  @Input() arg_id :string;
  @Input() opinion_id :string;
  _el;
  audio_src
  audio_element
  transcript_sentence_arr : Observable<any>;

  dirty = false;

  constructor(private el: ElementRef,
            public store: Store<any>,
            private event_firebase :EventFirebaseService,) { }

  ngOnInit() {
      this._el = this.el.nativeElement;
    this.transcript_sentence_arr = this.store.select('transcript');
  }

  ngOnChanges(){


    this.dirty = true;
    console.log(this.audio_url);

    if(!this.audio_url){return;}

    setTimeout(()=>{
      this.audio_element = new Audio();
      this.audio_element.controls = true;
      this.audio_element.src = this.audio_url;
      const audio_container = this._el.getElementsByClassName("audio_container")[0];
      this.audio_element.addEventListener("play", ()=>{ this.Audio_Time_update("play", this.audio_element.currentTime)});
      this.audio_element.addEventListener("seeked", ()=>{ this.Audio_Time_update("seek", this.audio_element.currentTime)});
      this.audio_element.addEventListener("timeupdate", ()=>{ this.Audio_Time_update("time_update", this.audio_element.currentTime)});

      audio_container.insertBefore(this.audio_element, null);
    },100);
  }



  Audio_Time_update(type, current_time){

    console.log(current_time);
    current_time = current_time * 1000;
    const obj = ActionCreator.transcription_play(current_time);
    this.store.dispatch(obj);

  }
  

  update_each_sentence(id, sentence){
    var obj = ActionCreator.transcription_update_sentence(id,sentence);
    this.store.dispatch(obj);
  }

  edit_each_sentence(id){
    const obj = ActionCreator.transcription_editstatus(id);
    this.store.dispatch(obj);
  }

  upload_transcript(){
      this.event_firebase.retrieve_upload_transcription(this.event_id,this.arg_id,this.opinion_id);
  }


}
