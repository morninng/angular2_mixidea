import { Component, OnInit, NgZone } from '@angular/core';
import {RecordWavService} from './../service/record-wav.service';
import {SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import {ActionCreator} from './../../../../redux/action-creator';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-player-transcription',
  templateUrl: './player-transcription.component.html',
  styleUrls: ['./player-transcription.component.scss']
})

export class PlayerTranscriptionComponent implements OnInit {


  audio_blob;
  transcript_sentence_arr : Observable<any>;
  prev_updated_time = 0;


  constructor(private record_wav: RecordWavService,
              private _ngZone: NgZone,
              private sanitizer: DomSanitizer,
              public store: Store<any>) { }


  ngOnInit() {
    // http://www.gcgate.jp/engineerblog/2014/03/28/874/
    this.record_wav.audio_source$.subscribe(
      (audio_blob)=>{
        this.audio_blob = audio_blob;
        this._ngZone.run(()=>{
          this.create_audio(audio_blob);
          this.show_transcription();
        });
      }
    )
  }

  show_transcription(){
    this.transcript_sentence_arr = this.store.select('transcript');
  }

  create_audio(audio_blob){
    let audio_src = window.URL.createObjectURL(audio_blob);
    console.log("audio src");
    console.log(audio_src);

    const santized_audio_src = this.sanitizer.bypassSecurityTrustResourceUrl( audio_src);
    console.log("santized url");
    console.log(santized_audio_src);

    const audio_element = new Audio();
    audio_element.controls = true;
    audio_element.src = audio_src;
    audio_element.addEventListener("play", ()=>{ this.Audio_Time_update("play", audio_element.currentTime)});
    audio_element.addEventListener("seeked", ()=>{ this.Audio_Time_update("seek", audio_element.currentTime)});
    audio_element.addEventListener("timeupdate", ()=>{ this.Audio_Time_update("time_update", audio_element.currentTime)});
    const audio_container_element = document.getElementById("audio_player");
    audio_container_element.insertBefore(audio_element, null);

  }


  Audio_Time_update(type, current_time){

    console.log(current_time);
    current_time = current_time * 1000;

    if(type=="time_update"){
      var duration = current_time - this.prev_updated_time;
      console.log("duration " + duration);
      if(duration > 0.5){
        const obj = ActionCreator.transcription_play(current_time);
        this.store.dispatch(obj);
      }
    }else if (type=="seek"){
        const obj = ActionCreator.transcription_play(current_time);
        this.store.dispatch(obj);
    }else if (type=="play"){
        const obj = ActionCreator.transcription_play(0);
        this.store.dispatch(obj);
    }
  }

  update_each_sentence(id, sentence){
    var obj = ActionCreator.transcription_update_sentence(id,sentence);
    this.store.dispatch(obj);
  }

  edit_each_sentence(id){
    const obj = ActionCreator.transcription_editstatus(id);
    this.store.dispatch(obj);
  }




}
