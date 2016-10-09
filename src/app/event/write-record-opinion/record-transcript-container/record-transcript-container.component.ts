import { Component, OnInit,ViewChild,Input  } from '@angular/core';

import {PlayerTranscriptionComponent} from './../player-transcription/player-transcription.component'
import {RecordTranscriptComponent} from './../record-transcript/record-transcript.component'
import {UploadFileComponent} from './../upload-file/upload-file.component';

@Component({
  selector: 'app-record-transcript-container',
  templateUrl: './record-transcript-container.component.html',
  styleUrls: ['./record-transcript-container.component.scss']
})
export class RecordTranscriptContainerComponent implements OnInit {


  @Input() event_id: string;
  @Input() team_name: string;
  @Input() opinion_id: string;
  @Input() arg_id: string;
  @Input() type:string;

  @ViewChild(PlayerTranscriptionComponent) 
  private player_transcript: PlayerTranscriptionComponent;


  @ViewChild(RecordTranscriptComponent) 
  private record_transcript: RecordTranscriptComponent;


  @ViewChild(UploadFileComponent) 
  private upload_file: UploadFileComponent;


  constructor() {}

  ngOnInit() {
  }

  clear_all(){
    console.log("clear all from parent component");
    this.player_transcript.clear_player_and_transcription();
    this.record_transcript.reset_record();
    this.upload_file.reset_encode_upload();
  }


}
