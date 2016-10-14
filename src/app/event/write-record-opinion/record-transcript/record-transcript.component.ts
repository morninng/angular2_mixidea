import { Component, OnInit,NgZone, OnDestroy } from '@angular/core';
import {RecordWavService} from './../../service/record-wav.service';
import {SpeechRecognitionService} from './../../service/speech-recognition.service'

import { UserauthService} from './../../../shared/userauth.service';


declare var window:any;
declare var navigator:any;

@Component({
  selector: 'app-record-transcript',
  templateUrl: './record-transcript.component.html',
  styleUrls: ['./record-transcript.component.scss']
})
export class RecordTranscriptComponent implements OnInit, OnDestroy {

  under_recording = false;
  recordable = false;
  audio_enabled = false;
  audio_context : any;
  record_done = false;
  mediastream_sourcenode : any;

  constructor(private record_wav: RecordWavService,
              private speech_recog: SpeechRecognitionService,
              private _ngZone: NgZone,
              private user_auth : UserauthService ) {
      console.log("record transcript constructor");
  }


  ngOnInit() {

    console.log("record transcript component init");
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audio_context = new window.AudioContext();

    navigator.getUserMedia = ( navigator.getUserMedia ||
                      navigator.webkitGetUserMedia ||
                      navigator.mozGetUserMedia ||
                      navigator.msGetUserMedia);
    navigator.getUserMedia(
      {audio: true, video:false},
      (stream)=>{
        console.log("audio user media succeeded.")
        this.mediastream_sourcenode = this.audio_context.createMediaStreamSource(stream);

        this._ngZone.run(()=>{
          this.audio_enabled = true;
          this.recordable = true;
        })
        this.record_wav.initialize_audio_context(this.mediastream_sourcenode);
      },
      (e)=>{
        console.log('No live audio input: ' + e);
        alert("you cannot use this system without activating the audio.")
      }
    );
  }



  startRecording = ()=>{

   if(!this.user_auth.own_user.loggedIn){
      alert("you need to login to create a game");
      this.user_auth.open_login_modal();
      return;
    }
    
    console.log("start recording");
    this.record_wav.start_record();
    this.under_recording = true;
    this.recordable = false;
    this.speech_recog.start_recognition();
  }

  stopRecording = ()=>{
    console.log("stop recording");
    this.record_wav.stop_record();
    this.under_recording = false;
    this.recordable = true;
    this.speech_recog.stop_recognition();
    this.record_done = true;
  }

  reset_record(){
    this.speech_recog.stop_recognition();

    this.record_wav.finalize();
    this.record_done = false;
  }
  
  ngOnDestroy(){
    this.record_wav.finalize();
    this.speech_recog.stop_recognition();
  }


}
