import { Component, OnInit,ViewChild,ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params  }     from '@angular/router';
import 'rxjs/add/operator/combineLatest'; 
import {generate_id, generate_id2} from './../../../util_func';
import {PlayerTranscriptionComponent} from './../player-transcription/player-transcription.component'
import {RecordTranscriptComponent} from './../record-transcript/record-transcript.component'
import {UploadFileComponent} from './../upload-file/upload-file.component';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';

import {EventFirebaseService} from './../../service/event-firebase.service'

import {CREATE_MAIN_OPINION, 
        ADD_SUBSEQUENT_OPINION, 
        UPDATE_MAIN_OPINION_Written,
        UPDATE_SUBSEQUENT_OPINION_Written,
        UPDATE_MAIN_OPINION_AudioTranscript,
        UPDATE_SUBSEQUENT_OPINION_AudioTranscript
    } from './../../../interface/opinion'

import {CATEGORY_MAIN, CATEGORY_SUBSEQUENT} from './../../../interface/opinion'

import { Store } from '@ngrx/store';
import {ActionCreator} from './../../../redux/action-creator';


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
  phase : string;

  opinion_input_phase = "selecting";
  show_signpost = true;
  opinion_item: FirebaseObjectObservable<any>;

  default_text : string;
  default_signpost : string;

  audio_url : string;

  constructor(private route: ActivatedRoute,
              private event_firebase :EventFirebaseService,
              private af: AngularFire,
              public store: Store<any>,
              private change_ref: ChangeDetectorRef) { }

  ngOnInit() {


    const source = this.route.params.combineLatest(this.route.queryParams, (param: Params, query)=>{
      return {param, query}
    })
    this.router_param_subscription = source.subscribe(
      (obj)=>{
        console.log(obj);
        this.event_id = obj.param["id"];
        this.team_name = obj.query["team_name"];
        this.phase = obj.query["phase"];

        switch(this.phase){
          case CREATE_MAIN_OPINION:
            this.arg_id = generate_id2();
            this.opinion_id = generate_id();
            this.show_signpost = true;
          break;

          case ADD_SUBSEQUENT_OPINION:
            this.arg_id = obj.query["argument_id"];
            this.opinion_id = generate_id();
            this.show_signpost = false;
          break;

          case UPDATE_MAIN_OPINION_Written:
            {
            this.arg_id = obj.query["argument_id"];
            this.opinion_id = obj.query["opinion_id"];
            this.show_signpost = true;
            const reference = "event_related/written_debate/" + this.event_id + "/opinion/" + this.arg_id + "/" + this.opinion_id;
            this.opinion_item = this.af.database.object(reference);
            this.opinion_item.take(1).subscribe((opinion_data)=>{
              console.log(opinion_data);
              const content_arr = opinion_data.content_arr || [];
              let text = ""
              content_arr.forEach((data)=>{
                text = text + data.content + "\n\n";
              })
              console.log(text);
              this.default_text = text;
              this.default_signpost = opinion_data.sign_post;
            })
            }
          break;

          case UPDATE_SUBSEQUENT_OPINION_Written:
            {
            this.arg_id = obj.query["argument_id"];
            this.opinion_id = obj.query["opinion_id"];
            this.show_signpost = false;
            const reference = "event_related/written_debate/" + this.event_id + "/opinion/" + this.arg_id + "/" + this.opinion_id;
            this.opinion_item = this.af.database.object(reference);
            this.opinion_item.take(1).subscribe((opinion_data)=>{
              console.log(opinion_data);
              const content_arr = opinion_data.content_arr || [];
              let text = ""
              content_arr.forEach((data)=>{
                text = text + data.content + "\n\n";
              })
              this.default_text = text;
            })
            }
          break;

          case UPDATE_MAIN_OPINION_AudioTranscript:
            {
            this.opinion_input_phase = "update_transcript";
            const action_obj = ActionCreator.transcription_clearAll();
            this.store.dispatch(action_obj);

            this.arg_id = obj.query["argument_id"];
            this.opinion_id = obj.query["opinion_id"];
            this.show_signpost = true;
            const reference = "event_related/written_debate/" + this.event_id + "/opinion/" + this.arg_id + "/" + this.opinion_id;
            this.opinion_item = this.af.database.object(reference);
            this.opinion_item.take(1).subscribe((opinion_data)=>{
              console.log(opinion_data);

              const transcript_arr = opinion_data.transcript || [];
              transcript_arr.forEach((transcipt)=>{
                const obj = ActionCreator.transcription_addsentence(transcipt.content, transcipt.end_time);
                this.store.dispatch(obj);
              })
              this.audio_url = opinion_data.audio_url;
              this.default_signpost = opinion_data.sign_post;
              this.change_ref.markForCheck();
            })
            }
          break;


          case UPDATE_SUBSEQUENT_OPINION_AudioTranscript:
            {
            this.opinion_input_phase = "update_transcript";
            const action_obj = ActionCreator.transcription_clearAll();
            this.store.dispatch(action_obj);

            this.arg_id = obj.query["argument_id"];
            this.opinion_id = obj.query["opinion_id"];
            this.show_signpost = false;
            const reference = "event_related/written_debate/" + this.event_id + "/opinion/" + this.arg_id + "/" + this.opinion_id;
            this.opinion_item = this.af.database.object(reference);
            this.opinion_item.take(1).subscribe((opinion_data)=>{

              console.log(opinion_data);
              const transcript_arr = opinion_data.transcript || [];
              console.log("transcript arr", transcript_arr);

              const obj = ActionCreator.transcription_clearAll();
              this.store.dispatch(obj);
              transcript_arr.forEach((transcipt)=>{
                const obj = ActionCreator.transcription_addsentence(transcipt.content, transcipt.end_time);
                this.store.dispatch(obj);
              })
              this.audio_url = opinion_data.audio_url;

              this.change_ref.markForCheck();
             })
            }
          break;
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

  onClear_ReRecord(){

    const obj = ActionCreator.transcription_clearAll();
    this.store.dispatch(obj);
    this.opinion_input_phase = "recording";

    console.log("onReflesh_ReRecord is called from child component");
  }

}
