import { Component, OnInit,Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationExtras } from '@angular/router';
import {CATEGORY_SUBSEQUENT, CATEGORY_MAIN} from './../../../interface/opinion'

import {UPDATE_MAIN_OPINION_AudioTranscript,
         UPDATE_SUBSEQUENT_OPINION_AudioTranscript} from './../../../interface/opinion'



@Component({
  selector: 'app-transcription',
  templateUrl: './transcription.component.html',
  styleUrls: ['./transcription.component.scss']
})
export class TranscriptionComponent implements OnInit,OnChanges {

  @Input() transcription_arr : any[];
  @Input() event_id : string;
  @Input() argument_id : string;
  @Input() opinion_id : string;
  @Input() audio_play_time : number;
  @Input() comment_sentence_transcript;
  @Input() category : string;
  @Input() own_team : string;
  
  converted_transcription_arr = [];
  constructor(private route: ActivatedRoute,
              private router: Router) {}


  ngOnInit() {

  }

  ngOnChanges(){

    let previous_time = 0;
    this.converted_transcription_arr.length=0;
    this.comment_sentence_transcript = this.comment_sentence_transcript || []
    const transcript_arr = this.transcription_arr || [];

    transcript_arr.forEach((transcript_obj, index)=>{
      let obj = Object.assign( transcript_obj, {start_time:previous_time});
      obj["num"]=index;
      this.converted_transcription_arr.push(obj);
      previous_time = transcript_obj.end_time;
    })

  }
  
  update_audio_transcript(){

    let phase;

    if(this.category == CATEGORY_MAIN){
      phase = UPDATE_MAIN_OPINION_AudioTranscript;
    }else if(this.category == CATEGORY_SUBSEQUENT){
      phase = UPDATE_SUBSEQUENT_OPINION_AudioTranscript;
    }

    let navigationExtras: NavigationExtras = {
      queryParams: {
        phase,
        argument_id: this.argument_id,
        opinion_id: this.opinion_id,
        team_name:this.own_team
      }
    }
    this.router.navigate(['/writerecord_opinion',this.event_id], navigationExtras);

  }


}
