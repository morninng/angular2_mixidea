import { Component, OnInit, ElementRef,ChangeDetectionStrategy } from '@angular/core';
import {CommentService} from './../../service/comment.service'

import { UserauthService} from './../../../shared/userauth.service';

@Component({
  selector: 'app-sentence-comment-container',
  templateUrl: './sentence-comment-container.component.html',
  styleUrls: ['./sentence-comment-container.component.scss'],
  host: {'(document:click)': 'onClick($event)'}
 // changeDetection: ChangeDetectionStrategy.OnPush //this component is mutable
})
export class SentenceCommentContainerComponent implements OnInit {

  open_subscription
  is_open = false;
  comment_sentence;

  constructor(private comment_service: CommentService, private _eref: ElementRef, private user_auth : UserauthService) { }


  ngOnInit() {
    const open_subject$ = this.comment_service.sentence_comment_open_subject$
    this.open_subscription = open_subject$.subscribe(
      (comment_sentence)=>{
        this.comment_sentence = comment_sentence;
        console.log("open");
        setTimeout(()=>{
          this.is_open = true;
        },100);
      }
    )
  }

  onClick(event){
    console.log()
    if (!this._eref.nativeElement.contains(event.target)){
      this.is_open = false;
    }
  }

  submit_comment(text){

    if(!this.user_auth.own_user.loggedIn){
      alert("you need to login to put a comment");
      this.user_auth.open_login_modal();
      return;
    }
    console.log(text);
    this.comment_service.put_sentence_comment(text)
  }

}
