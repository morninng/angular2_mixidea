import { Component, OnInit, Input } from '@angular/core';
import {CommentService, COMMENT_TYPE_SENTENCE_WRITTEN} from './../../service/comment.service'

@Component({
  selector: 'app-sentence-written',
  templateUrl: './sentence-written.component.html',
  styleUrls: ['./sentence-written.component.scss']
})
export class SentenceWrittenComponent implements OnInit {

  @Input() content;
  @Input() event_id : string;
  @Input() argument_id : string;
  @Input() opinion_id : string;
  show_balloon : boolean;
  sentence_num : number;

  constructor(private comment_service: CommentService) { }

  ngOnInit() {
    this.sentence_num = this.content.num;
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
              this.sentence_num);
    
  }

}
