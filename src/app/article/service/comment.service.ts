import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {ArticleFirebaseService} from './../service/article-firebase.service'

export const COMMENT_TYPE_GENERAL = "general";
export const COMMENT_TYPE_REASON_DECISION = "reason_decision";
export const COMMENT_TYPE_SENTENCE_WRITTEN = "sentence_written";
export const COMMENT_TYPE_SENTENCE_TRANSCRIPT = "sentence_transcript";


@Injectable()
export class CommentService {

  sentence_comment_open = false;
  current_event_id : string
  current_arg_id : string;
  current_opinion_id : string;
  current_sentence_num : number;
  current_type : string;
  sentence_comment_open_subject$ = new Subject();

  constructor(private article_firebase : ArticleFirebaseService) {

  }

  open_sentence_comment(type,event_id, art_id, opinion_id, sentence_num , comment_sentence_written){
    
    console.log("open_sentence_comment service");
    
    this.current_event_id = event_id;
    this.current_arg_id = art_id; 
    this.current_opinion_id = opinion_id;
    this.current_sentence_num = sentence_num;
    this.current_type = type;
    this.sentence_comment_open_subject$.next(comment_sentence_written);
  }

  add_comment(){

  }
  
  put_sentence_comment(text){
    console.log("comment service : put_sentence_comment");
    this.article_firebase.put_sentence_comment(
                  this.current_type,
                  this.current_event_id,
                  this.current_arg_id,
                  this.current_opinion_id,
                  this.current_sentence_num,
                  text );
    
  }


}
