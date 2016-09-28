import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params  }     from '@angular/router';
import 'rxjs/add/operator/combineLatest'; 
import {generate_id} from './../../../util_func';
import {PlayerTranscriptionComponent} from './player-transcription/player-transcription.component'
import {RecordTranscriptComponent} from './record-transcript/record-transcript.component'
import {UploadFileComponent} from './upload-file/upload-file.component';

@Component({
  selector: 'app-write-record-opinion',
  templateUrl: './write-record-opinion.component.html',
  styleUrls: ['./write-record-opinion.component.scss']
})
export class WriteRecordOpinionComponent implements OnInit {

  router_param_subscription : any;
  event_id :string;
  opinion_id : string;
  team_name :string;


  @ViewChild(PlayerTranscriptionComponent) 
  private player_transcript: PlayerTranscriptionComponent;


  @ViewChild(RecordTranscriptComponent) 
  private record_transcript: RecordTranscriptComponent;


  @ViewChild(UploadFileComponent) 
  private upload_file: UploadFileComponent;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    this.opinion_id = generate_id();

    const source = this.route.params.combineLatest(this.route.queryParams, (param: Params, query)=>{
      return {param, query}
    })
    this.router_param_subscription = source.subscribe(
      (obj)=>{
        // event id and team is included.
        console.log(obj);

        this.event_id = obj.param["id"];
        this.team_name = obj.query["team_name"];
      }
    )
  }

  clear_all(){
    console.log("clear all from parent component");
    this.player_transcript.clear_player_and_transcription();
    this.record_transcript.reset_record();
    this.upload_file.reset_encode_upload();
  }


}
