import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import {RecordWavService} from './../../event-service/record-wav.service';
import {SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import {ActionCreator} from './../../../redux/action-creator';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';


declare var window:any;

@Component({
  selector: 'app-player-transcription',
  templateUrl: './player-transcription.component.html',
  styleUrls: ['./player-transcription.component.scss']
})

export class PlayerTranscriptionComponent implements OnInit, AfterViewInit {


  audio_blob;
  transcript_sentence_arr : Observable<any>;
  prev_updated_time = 0;
  audio_element;
  audio_container_element;

  record_wav_subscription;

  constructor(private record_wav: RecordWavService,
              private _ngZone: NgZone,
              private sanitizer: DomSanitizer,
              public store: Store<any>) { }


  ngOnInit() {
    // http://www.gcgate.jp/engineerblog/2014/03/28/874/
    this.record_wav_subscription = this.record_wav.audio_source$.subscribe(
      (audio_blob)=>{
        this.audio_blob = audio_blob;
        this._ngZone.run(()=>{
          this.create_audio(audio_blob);
          this.show_transcription();
        });
      }
    )
  }

  ngAfterViewInit(){
    this.audio_container_element = document.getElementById("audio_player");
  }
  


  show_transcription(){
    this.transcript_sentence_arr = this.store.select('transcript');
  }

  create_audio(audio_blob){
    window.URL = window.URL || window.webkitURL;
    let audio_src = window.URL.createObjectURL(audio_blob);
    console.log("audio src", audio_src);

    const santized_audio_src = this.sanitizer.bypassSecurityTrustResourceUrl( audio_src);
    console.log("santized url");
    console.log(santized_audio_src);

    this.audio_element = new Audio();
    this.audio_element.controls = true;
    this.audio_element.src = audio_src;
    this.audio_element.addEventListener("play", ()=>{ this.Audio_Time_update("play", this.audio_element.currentTime)});
    this.audio_element.addEventListener("seeked", ()=>{ this.Audio_Time_update("seek", this.audio_element.currentTime)});
    this.audio_element.addEventListener("timeupdate", ()=>{ this.Audio_Time_update("time_update", this.audio_element.currentTime)});

    this.audio_container_element.insertBefore(this.audio_element, null);
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


  clear_player_and_transcription(){
    this.audio_container_element.textContent = null;
    this.audio_element = null;

    const obj = ActionCreator.transcription_clearAll();
    this.store.dispatch(obj);
  }

  ngOnDestroy(){
    this.record_wav_subscription.unsubscribe();
    const obj = ActionCreator.transcription_clearAll();
    this.store.dispatch(obj);
  }


}
