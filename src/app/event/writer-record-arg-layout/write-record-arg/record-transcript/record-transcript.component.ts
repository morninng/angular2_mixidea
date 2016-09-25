import { Component, OnInit,NgZone } from '@angular/core';
import {RecordWavService} from './../service/record-wav.service';
import {SpeechRecognitionService} from './../service/speech-recognition.service'



declare var window:any;
declare var navigator:any;

@Component({
  selector: 'app-record-transcript',
  templateUrl: './record-transcript.component.html',
  styleUrls: ['./record-transcript.component.scss']
})
export class RecordTranscriptComponent implements OnInit {

  under_recording = false;
  recordable = false;
  audio_enabled = false;
  audio_context : any;

  constructor(private record_wav: RecordWavService,
              private speech_recog: SpeechRecognitionService,
              private _ngZone: NgZone ) {
      console.log("record transcript constructor");
  }


  ngOnInit() {

    console.log("record transcript component init");
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = ( navigator.getUserMedia ||
                      navigator.webkitGetUserMedia ||
                      navigator.mozGetUserMedia ||
                      navigator.msGetUserMedia);
    window.URL = window.URL || window.webkitURL;

    this.audio_context = new window.AudioContext();
    navigator.getUserMedia({audio: true},
      this.callback_getusermedia.bind(this),
      (e)=>{
        console.log('No live audio input: ' + e);
        alert("you cannot use this system without activating the audio.")
      }
    );
  }

  callback_getusermedia = (stream) => {
    console.log("stream start");
    this.recordable = true;
    const input = this.audio_context.createMediaStreamSource(stream);
    this.record_wav.update_setting(input, {numChannels: 1});
    this._ngZone.run(()=>{
      this.audio_enabled = true;
    })
  }



  startRecording = ()=>{
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
  }





}
