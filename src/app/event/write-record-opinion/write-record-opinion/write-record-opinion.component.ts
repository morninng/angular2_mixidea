import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params  }     from '@angular/router';
import 'rxjs/add/operator/combineLatest'; 
import {generate_id, generate_id2} from './../../../util_func';
import {PlayerTranscriptionComponent} from './../player-transcription/player-transcription.component'
import {RecordTranscriptComponent} from './../record-transcript/record-transcript.component'
import {UploadFileComponent} from './../upload-file/upload-file.component';

import {EventFirebaseService} from './../../event-service/event-firebase.service'

@Component({
  selector: 'app-write-record-opinion',
  templateUrl: './write-record-opinion.component.html',
  styleUrls: ['./write-record-opinion.component.scss']
})
export class WriteRecordOpinionComponent implements OnInit {

  router_param_subscription : any;
  event_id :string;
  arg_id : string;
  opinion_id : string;
  team_name :string;
  type: string;

  opinion_input_phase = "selecting";
  show_signpost = true;


  constructor(private route: ActivatedRoute,
              private event_firebase :EventFirebaseService) { }

  ngOnInit() {

    this.opinion_id = generate_id();

    const source = this.route.params.combineLatest(this.route.queryParams, (param: Params, query)=>{
      return {param, query}
    })
    this.router_param_subscription = source.subscribe(
      (obj)=>{
        console.log(obj);
        this.event_id = obj.param["id"];
        this.team_name = obj.query["team_name"];
        this.arg_id = obj.query["argument_id"];
        this.type = obj.query["type"];
        if(!this.arg_id){
          this.arg_id = generate_id2();
        }
      }
    )
  }

  onSelectWriting(){
    console.log("select writing is chosen");
    this.opinion_input_phase = "writing";
  }

  onSelectRecording(){
    console.log("record and transcription is chosen");
    this.opinion_input_phase = "recording";
  }



}
