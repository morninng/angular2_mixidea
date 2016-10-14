import { Component, OnInit,Output, Input,ChangeDetectionStrategy, 
          OnChanges,EventEmitter } from '@angular/core';
import {CommentService, COMMENT_TYPE_SENTENCE_TRANSCRIPT} from './../../service/comment.service'

@Component({
  selector: 'app-sentence-transcription',
  templateUrl: './sentence-transcription.component.html',
  styleUrls: ['./sentence-transcription.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SentenceTranscriptionComponent implements OnInit,OnChanges {

  @Input() transcript 
  @Input() event_id : string;
  @Input() argument_id : string;
  @Input() opinion_id : string;
  @Input() comment_sentence_transcript
  @Input() audio_play_time
  @Output() onPlayFromHere = new EventEmitter<number>()

  under_playing = false;
  sentence_num : number;
  comment_num : number;

  constructor(private comment_service: CommentService) { }

  ngOnInit() {
  }

  ngOnChanges(){

    this.sentence_num = this.transcript.num;

    console.log("sentence transcription audio time update", this.audio_play_time);
    if(this.transcript.start_time < this.audio_play_time && this.audio_play_time < this.transcript.end_time){
      this.under_playing = true;
    }else{
      this.under_playing = false;
    }


    if(this.comment_sentence_transcript){
      let count = 0;
      for(let key in this.comment_sentence_transcript){
        count++;
      }
      this.comment_num = count;
    }

  }
  open_sentence_comment(){
    console.log("open_sentence_comment");
    this.comment_service.open_sentence_comment(
              COMMENT_TYPE_SENTENCE_TRANSCRIPT, 
              this.event_id,
              this.argument_id,
              this.opinion_id,
              this.sentence_num,
              this.comment_sentence_transcript
              );
  }
  play_from_here(){
    console.log("play_from_here", this.transcript.start_time);
    this.onPlayFromHere.emit(this.transcript.start_time);
  }

}
