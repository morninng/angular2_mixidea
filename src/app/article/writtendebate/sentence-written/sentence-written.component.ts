import { Component, OnInit, Input,OnChanges,ChangeDetectionStrategy } from '@angular/core';
import {CommentService, COMMENT_TYPE_SENTENCE_WRITTEN} from './../../service/comment.service'

@Component({
  selector: 'app-sentence-written',
  templateUrl: './sentence-written.component.html',
  styleUrls: ['./sentence-written.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SentenceWrittenComponent implements OnInit,OnChanges {

  @Input() content;
  @Input() event_id : string;
  @Input() argument_id : string;
  @Input() opinion_id : string;
  @Input() comment_sentence_written : any;


  show_balloon : boolean;
  sentence_num : number;
  comment_num : number

  constructor(private comment_service: CommentService) { }

  ngOnChanges(){
    this.sentence_num = this.content.num;
    if(this.comment_sentence_written){
      let count = 0;
      for(let key in this.comment_sentence_written){
        count++;
      }
      this.comment_num = count;
    }
  }

  ngOnInit() {
  }

  content_mouseenter(){
    this.show_balloon = true;
  }
  content_mouseleave(){
    this.show_balloon = false;
  }

  open_sentence_comment(){
    console.log("open_sentence_comment");
    this.comment_service.open_sentence_comment(
              COMMENT_TYPE_SENTENCE_WRITTEN, 
              this.event_id,
              this.argument_id,
              this.opinion_id,
              this.sentence_num,
              this.comment_sentence_written
              );
  }

}
