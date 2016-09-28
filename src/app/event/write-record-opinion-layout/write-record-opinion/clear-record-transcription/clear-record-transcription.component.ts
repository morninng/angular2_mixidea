import { Component, OnInit, Output, EventEmitter,NgZone } from '@angular/core';
import {RecordWavService} from './../service/record-wav.service';
import { Store } from '@ngrx/store';
import {ActionCreator} from './../../../../redux/action-creator';
import {EncodeToMp3Service} from './../service/encode-to-mp3.service'
import {SpeechRecognitionService} from './../service/speech-recognition.service'


@Component({
  selector: 'app-clear-record-transcription',
  templateUrl: './clear-record-transcription.component.html',
  styleUrls: ['./clear-record-transcription.component.scss']
})
export class ClearRecordTranscriptionComponent implements OnInit {

  is_record_transcript = false;

  @Output() clear_all = new EventEmitter<boolean>();

  constructor(private _ngZone: NgZone,
              private record_wav: RecordWavService,
              public store: Store<any>,
              private encode_to_mp3: EncodeToMp3Service,
              private speech_recog: SpeechRecognitionService) { }

  ngOnInit() {

    this.record_wav.audio_source$.subscribe(
      ()=>{
        this._ngZone.run(()=>{
          this.is_record_transcript = true;
        });
      }
    )
  }

  clear_transcript_audioplayer(){
    console.log("clear transcription and audio player");
    this.clear_all.emit(true);
    this.is_record_transcript = false;


// stop service
    this.encode_to_mp3.finalize();

  }

}
