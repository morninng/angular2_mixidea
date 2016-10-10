import { Component, OnInit,Input, OnChanges } from '@angular/core';

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
  
  converted_transcription_arr = [];
  constructor() {}



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
  



}
